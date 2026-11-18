import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  input,
  output,
  signal,
  computed,
  effect,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrokeOrderService, extractPointsFromSvgPath } from '../../../core/services/stroke-order.service';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-writing-practice',
  standalone: true,
  imports: [CommonModule, PixelIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="writing-modal-backdrop" (click)="onBackdropClick($event)">
      <div
        class="vintage-card writing-modal-card"
        [class.left-handed]="isLeftHanded()"
        (click)="$event.stopPropagation()">

        <!-- TOP BAR: TIÊU ĐỀ & NÚT ĐÓNG -->
        <div class="modal-header">
          <div class="header-left">
            <span class="header-badge">
              <app-pixel-icon name="icon_scroll" [size]="14"></app-pixel-icon>
              <span>TẬP VIẾT TỰ ĐỘNG · KANJIVG</span>
            </span>
            <h3 class="header-title font-serif">Ô Chữ Điền (米字格)</h3>
          </div>

          <div class="header-right">
            <!-- MODE TOGGLES -->
            <button
              type="button"
              class="toggle-pill"
              [class.active]="isLeftHanded()"
              (click)="toggleHandedness()"
              title="Đổi bên tay viết (tránh bị tay che gợi ý)">
              <app-pixel-icon name="icon_tools" [size]="13"></app-pixel-icon>
              <span>{{ isLeftHanded() ? 'Tay trái' : 'Tay phải' }}</span>
            </button>

            <button
              type="button"
              class="toggle-pill"
              [class.active]="showGhost()"
              (click)="toggleGhost()"
              title="Hiện / Ẩn nét mờ mẫu">
              <app-pixel-icon name="icon_search" [size]="13"></app-pixel-icon>
              <span>{{ showGhost() ? 'Tập tô' : 'Nghe viết' }}</span>
            </button>

            <button type="button" class="btn-close-modal" (click)="close.emit()" title="Đóng bảng viết">✕</button>
          </div>
        </div>

        <!-- MULTI-CHARACTER WORD STRIP: [朝] [ご] [飯] -->
        @if (availableChars().length > 1) {
          <div class="char-selector-strip">
            <span class="strip-label font-serif">Ký tự trong từ:</span>
            <div class="char-pills-row">
              @for (ch of availableChars(); track ch) {
                @let mastered = strokeService.isMastered(ch);
                @let count = strokeService.getSuccessCount(ch);
                <button
                  type="button"
                  class="char-select-pill"
                  [class.active]="selectedChar() === ch"
                  [class.mastered]="mastered"
                  (click)="selectChar(ch)">
                  <span class="pill-char">{{ ch }}</span>
                  <span class="pill-stat">{{ mastered ? '✓ Thuộc' : count + '/3' }}</span>
                </button>
              }
            </div>
          </div>
        }

        <!-- MAIN LAYOUT: WRITING PAD & INFO PANEL -->
        <div class="writing-body-grid">
          <!-- CỘT 1: BẢNG VIẾT Ô CHỮ ĐIỀN (米字格) -->
          <div class="pad-column">
            <div
              class="pad-stage"
              [class.shake]="shakeStage()"
              [class.completed]="isCompleted()">

              <!-- LAYER 1: SVG RICE-GRID (米字格) + GHOST + LOCKED INK PATHS -->
              <svg class="rice-grid-svg" viewBox="0 0 109 109">
                <!-- Viền vuông ngoài -->
                <rect x="1" y="1" width="107" height="107" fill="none" stroke="#D9C8B5" stroke-width="1.5" />
                <!-- 2 Đường trục tọa độ chữ thập vuông góc -->
                <line x1="54.5" y1="1" x2="54.5" y2="108" stroke="#D9C8B5" stroke-width="1" stroke-dasharray="3,3" />
                <line x1="1" y1="54.5" x2="108" y2="54.5" stroke="#D9C8B5" stroke-width="1" stroke-dasharray="3,3" />
                <!-- 2 Đường chéo X hỗ trợ cân đối góc -->
                <line x1="1" y1="1" x2="108" y2="108" stroke="#E8D7A8" stroke-width="0.8" stroke-dasharray="2.5,3.5" opacity="0.65" />
                <line x1="1" y1="108" x2="108" y2="1" stroke="#E8D7A8" stroke-width="0.8" stroke-dasharray="2.5,3.5" opacity="0.65" />

                <!-- GHOST STROKES (NÉT MỜ GỢI Ý) -->
                @if (showGhost()) {
                  <g class="ghost-strokes-group" fill="none" stroke="#263847" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.25">
                    @for (d of currentStrokes(); track $index) {
                      <path [attr.d]="d" />
                    }
                  </g>
                }

                <!-- LOCKED FINISHED INK STROKES (NÉT ĐÃ VIẾT ĐÚNG) -->
                <g class="locked-strokes-group" fill="none" stroke="#263847" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round">
                  @for (d of lockedStrokePaths(); track $index) {
                    <path [attr.d]="d" />
                  }
                </g>

                <!-- DEMO ANIMATION HIGHLIGHT STROKE -->
                @if (demoHighlightedPath(); as demoD) {
                  <path
                    [attr.d]="demoD"
                    fill="none"
                    stroke="#A65E65"
                    stroke-width="5.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="demo-stroke-path"
                  />
                }

                <!-- PULSING DUSTY-ROSE START POINT DOT -->
                @if (!isCompleted() && !isDemoPlaying() && currentStartPoint(); as pt) {
                  <circle
                    class="pulsing-start-dot"
                    [attr.cx]="pt[0]"
                    [attr.cy]="pt[1]"
                    r="3.5"
                    fill="#A65E65"
                    stroke="#FFFDF9"
                    stroke-width="1.5"
                  />
                }
              </svg>

              <!-- LAYER 2: INTERACTIVE POINTER CANVAS -->
              <canvas
                #canvas
                class="ink-canvas"
                (pointerdown)="onPointerDown($event)"
                (pointermove)="onPointerMove($event)"
                (pointerup)="onPointerUp($event)"
                (pointercancel)="onPointerCancel($event)">
              </canvas>

              <!-- HOÀN THÀNH STAMP -->
              @if (isCompleted()) {
                <div class="completion-stamp-badge">
                  <app-pixel-icon name="icon_check" [size]="18"></app-pixel-icon>
                  <span>Hoàn tất nét!</span>
                </div>
              }
            </div>

            <!-- FEEDBACK STATUS ALERT ROW -->
            <div class="status-feedback-bar" [ngClass]="statusType()">
              @if (statusType() === 'error') {
                <app-pixel-icon name="icon_cross" [size]="14"></app-pixel-icon>
              } @else if (statusType() === 'success') {
                <app-pixel-icon name="icon_check" [size]="14"></app-pixel-icon>
              } @else {
                <app-pixel-icon name="icon_pin" [size]="14"></app-pixel-icon>
              }
              <span class="status-msg-text">{{ statusMessage() }}</span>
            </div>

            <!-- 3 ACTION BUTTONS -->
            <div class="pad-actions-row">
              <button
                type="button"
                class="btn-pad-action btn-audio"
                (click)="playAudio()"
                title="Nghe phát âm chuẩn">
                <app-pixel-icon name="icon_speaker" [size]="15"></app-pixel-icon>
                <span>Nghe</span>
              </button>

              <button
                type="button"
                class="btn-pad-action btn-demo"
                [disabled]="isDemoPlaying()"
                (click)="playDemoSequence()"
                title="Xem thứ tự các nét theo hoạt ảnh tuần tự">
                <app-pixel-icon name="icon_search" [size]="15"></app-pixel-icon>
                <span>{{ isDemoPlaying() ? 'Đang chạy...' : 'Xem nét mẫu' }}</span>
              </button>

              <button
                type="button"
                class="btn-pad-action btn-reset"
                (click)="resetPad()"
                title="Xóa bảng và viết lại từ nét đầu">
                <app-pixel-icon name="icon_retry" [size]="15"></app-pixel-icon>
                <span>Viết lại</span>
              </button>
            </div>
          </div>

          <!-- CỘT 2: THÔNG TIN KÝ TỰ & TIẾN ĐỘ -->
          <div class="info-column">
            <div class="char-hero-display">
              <div class="char-large font-serif">{{ selectedChar() }}</div>
              <div class="char-meta">
                <div class="char-stroke-count">
                  <strong>{{ currentStrokeIndex() }}</strong> / {{ currentStrokes().length }} nét
                </div>
                <div class="mastery-status-chip" [class.mastered]="strokeService.isMastered(selectedChar())">
                  @if (strokeService.isMastered(selectedChar())) {
                    <app-pixel-icon name="icon_star" [size]="13"></app-pixel-icon>
                    <span>✓ Đã thuộc vững</span>
                  } @else {
                    <span>Đã viết đúng: {{ strokeService.getSuccessCount(selectedChar()) }}/3 lần</span>
                  }
                </div>
              </div>
            </div>

            <div class="writing-tips-box">
              <h5 class="tips-heading font-serif">Quy tắc bút thuận:</h5>
              <ul class="tips-list">
                <li>Bắt đầu đặt bút từ <strong>chấm đỏ</strong> nhấp nháy.</li>
                <li>Viết từ <em>trên xuống dưới</em>, từ <em>trái qua phải</em>.</li>
                <li>Nét ngang viết trước, nét sổ dọc viết sau.</li>
                <li>Nét xiên trái (phẩy) trước nét xiên phải (mác).</li>
              </ul>
            </div>

            @if (hasNextChar()) {
              <div class="next-char-box">
                <button type="button" class="btn-next-char" (click)="goToNextChar()">
                  <span>Ký tự tiếp: [{{ nextChar() }}]</span>
                  <span class="arrow-icon">→</span>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ================= 1. MODAL BACKDROP ================= */
    .writing-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(20, 32, 44, 0.72);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: fadeInBackdrop 0.2s ease-out;
      box-sizing: border-box;
    }
    @keyframes fadeInBackdrop {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* ================= 2. MODAL CARD CONTAINER ================= */
    .writing-modal-card {
      width: 100%;
      max-width: 740px;
      background: #F8F4EB;
      border: 2px solid #D9C8B5;
      border-radius: 18px;
      box-shadow: 0 18px 48px rgba(20, 32, 44, 0.38);
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 20px 24px;
      max-height: 92vh;
      overflow-y: auto;
      animation: scaleInCard 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
    }
    @keyframes scaleInCard {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    /* Left-handed Mode (Swaps Pad and Info on Desktop/Tablet >= 768px) */
    .writing-modal-card.left-handed .writing-body-grid {
      flex-direction: row-reverse;
    }

    /* ================= 3. MODAL HEADER ================= */
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1.5px solid var(--border);
      gap: 12px;
    }
    .header-left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--rose);
      text-transform: uppercase;
    }
    .header-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--navy);
      margin: 0;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toggle-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 10px;
      border-radius: 20px;
      background: var(--bg-card);
      border: 1.5px solid var(--border-strong);
      color: var(--navy);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      &:hover {
        background: #EDE5D6;
      }
      &.active {
        background: var(--navy);
        color: #FFFDF9;
        border-color: var(--navy);
      }
    }
    .btn-close-modal {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: var(--bg-card);
      border: 1.5px solid var(--border-strong);
      color: var(--navy);
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      &:hover {
        background: #FDF2F3;
        color: var(--rose);
        border-color: var(--rose);
      }
    }

    /* ================= 4. MULTI-CHAR SELECTOR STRIP ================= */
    .char-selector-strip {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: rgba(232, 215, 168, 0.28);
      border: 1px dashed var(--border-strong);
      border-radius: 12px;
      overflow-x: auto;
    }
    .strip-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
      white-space: nowrap;
    }
    .char-pills-row {
      display: flex;
      gap: 6px;
    }
    .char-select-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      border-radius: 8px;
      background: var(--bg-card);
      border: 1.5px solid var(--border);
      color: var(--navy);
      cursor: pointer;
      transition: all 0.15s ease;
      &:hover {
        border-color: var(--navy);
      }
      &.active {
        background: var(--navy);
        color: #FFFDF9;
        border-color: var(--navy);
        box-shadow: 0 2px 6px rgba(20, 32, 44, 0.25);
      }
      &.mastered:not(.active) {
        border-color: var(--olive);
        background: #F4F7EE;
      }
    }
    .pill-char {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
    }
    .pill-stat {
      font-size: 10.5px;
      opacity: 0.85;
    }

    /* ================= 5. BODY GRID LAYOUT ================= */
    .writing-body-grid {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    /* ================= 6. PAD COLUMN & CANVAS ================= */
    .pad-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 0;
    }
    .pad-stage {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      max-width: 380px;
      margin: 0 auto;
      background: #FFFDF9;
      border: 2px solid var(--border-strong);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      user-select: none;
      -webkit-user-select: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      &.completed {
        border-color: var(--olive);
        box-shadow: 0 0 16px rgba(120, 129, 93, 0.35);
      }
      &.shake {
        animation: horizontalShake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }
    }
    @keyframes horizontalShake {
      10%, 90% { transform: translate3d(-2px, 0, 0); }
      20%, 80% { transform: translate3d(3px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }

    .rice-grid-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .ink-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      cursor: crosshair;
    }

    .pulsing-start-dot {
      animation: pulseDot 1.2s ease-in-out infinite;
    }
    @keyframes pulseDot {
      0%, 100% { r: 3.2px; opacity: 0.9; }
      50% { r: 5.2px; opacity: 1; }
    }
    .demo-stroke-path {
      animation: demoGlow 0.65s ease-in-out infinite alternate;
    }
    @keyframes demoGlow {
      from { stroke: #A65E65; opacity: 0.8; }
      to { stroke: #D47A83; opacity: 1; }
    }

    .completion-stamp-badge {
      position: absolute;
      bottom: 12px;
      right: 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: var(--olive);
      color: #FFFDF9;
      font-size: 12px;
      font-weight: 700;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
      pointer-events: none;
      animation: popInStamp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes popInStamp {
      from { transform: scale(0.6); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    /* ================= 7. STATUS BAR & ACTIONS ================= */
    .status-feedback-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
      background: var(--bg-card);
      border: 1px solid var(--border);
      color: var(--navy);
      transition: all 0.2s ease;
      &.error {
        background: #FDF2F3;
        border-color: #E2AAB0;
        color: var(--rose);
      }
      &.success {
        background: #F4F7EE;
        border-color: #B5C97B;
        color: #3D662A;
      }
      &.info {
        background: rgba(232, 215, 168, 0.3);
      }
    }
    .status-msg-text {
      flex: 1;
      line-height: 1.35;
    }

    .pad-actions-row {
      display: flex;
      gap: 8px;
    }
    .btn-pad-action {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px 12px;
      border-radius: 8px;
      background: var(--bg-card);
      border: 1.5px solid var(--border-strong);
      color: var(--navy);
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      &:hover:not(:disabled) {
        background: #EDE5D6;
        border-color: var(--navy);
      }
      &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
    }
    .btn-reset {
      color: var(--rose);
      &:hover {
        border-color: var(--rose) !important;
      }
    }

    /* ================= 8. INFO COLUMN ================= */
    .info-column {
      width: 260px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex-shrink: 0;
    }
    .char-hero-display {
      background: var(--bg-card);
      border: 1.5px solid var(--border);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .char-large {
      font-size: 52px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1;
    }
    .char-meta {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .char-stroke-count {
      font-size: 14px;
      color: var(--navy);
    }
    .mastery-status-chip {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--ink-muted);
      &.mastered {
        color: #3D662A;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
    }
    .writing-tips-box {
      background: rgba(248, 244, 235, 0.85);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 14px;
    }
    .tips-heading {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 6px;
    }
    .tips-list {
      margin: 0;
      padding-left: 18px;
      font-size: 11.5px;
      color: #4A5568;
      line-height: 1.5;
    }
    .next-char-box {
      margin-top: auto;
    }
    .btn-next-char {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: var(--navy);
      color: #FFFDF9;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease;
      &:hover {
        background: #14202C;
      }
    }

    /* ================= 9. RESPONSIVE FOR MOBILE (< 768px) ================= */
    @media (max-width: 768px) {
      .writing-modal-backdrop {
        padding: 8px;
      }
      .writing-modal-card {
        padding: 14px 14px;
        max-height: 96vh;
        gap: 10px;
      }
      .writing-body-grid {
        flex-direction: column !important;
      }
      .info-column {
        width: 100%;
      }
      .pad-stage {
        max-width: 320px;
      }
      .char-hero-display {
        padding: 10px 14px;
      }
      .char-large {
        font-size: 40px;
      }
    }
  `]
})
export class WritingPracticeComponent implements AfterViewInit, OnDestroy {
  readonly strokeService = inject(StrokeOrderService);

  readonly wordOrChar = input.required<string>();
  readonly close = output<void>();

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  // Mode signals
  readonly isLeftHanded = signal<boolean>(false);
  readonly showGhost = signal<boolean>(true);

  // Character selection
  readonly selectedChar = signal<string>('');

  // Pad stroke state
  readonly currentStrokeIndex = signal<number>(0);
  readonly lockedStrokePaths = signal<string[]>([]);
  readonly isCompleted = signal<boolean>(false);
  readonly statusMessage = signal<string>('Bắt đầu đặt bút từ chấm đỏ.');
  readonly statusType = signal<'info' | 'error' | 'success'>('info');
  readonly shakeStage = signal<boolean>(false);

  // Demo sequence animation
  readonly isDemoPlaying = signal<boolean>(false);
  readonly demoHighlightedIndex = signal<number>(-1);
  private demoTimer: ReturnType<typeof setInterval> | null = null;

  // Pointer drawing buffer
  private isPointerDown = false;
  private currentRawPoints: [number, number][] = [];
  private resizeObserver: ResizeObserver | null = null;

  // Computed characters available in word
  readonly availableChars = computed<string[]>(() => {
    const raw = this.wordOrChar();
    const chars = this.strokeService.getCharactersInWord(raw);
    return chars.length > 0 ? chars : [raw.charAt(0) || 'あ'];
  });

  // Current stroke paths for the selected character
  readonly currentStrokes = computed<string[]>(() => {
    const ch = this.selectedChar();
    return this.strokeService.getStrokes(ch) || [];
  });

  // Start point of current stroke to render pulsing dot
  readonly currentStartPoint = computed<[number, number] | null>(() => {
    const strokes = this.currentStrokes();
    const idx = this.currentStrokeIndex();
    if (idx >= strokes.length) return null;
    const pts = extractPointsFromSvgPath(strokes[idx], 16);
    return pts.length > 0 ? pts[0] : null;
  });

  // Demo highlighted path
  readonly demoHighlightedPath = computed<string | null>(() => {
    const idx = this.demoHighlightedIndex();
    const strokes = this.currentStrokes();
    return idx >= 0 && idx < strokes.length ? strokes[idx] : null;
  });

  // Next char in word navigation
  readonly nextChar = computed<string | null>(() => {
    const chars = this.availableChars();
    const idx = chars.indexOf(this.selectedChar());
    return idx >= 0 && idx < chars.length - 1 ? chars[idx + 1] : null;
  });
  readonly hasNextChar = computed<boolean>(() => this.nextChar() !== null);

  constructor() {
    // Tự động chọn ký tự đầu tiên khi danh sách ký tự khả dụng sẵn sàng
    effect(() => {
      const chars = this.availableChars();
      if (chars.length > 0 && (!this.selectedChar() || !chars.includes(this.selectedChar()))) {
        this.selectChar(chars[0]);
      }
    });
  }

  ngAfterViewInit(): void {
    this.setupCanvasResolution();
    if (typeof window !== 'undefined' && 'ResizeObserver' in window && this.canvasRef) {
      this.resizeObserver = new ResizeObserver(() => {
        this.setupCanvasResolution();
      });
      this.resizeObserver.observe(this.canvasRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.clearDemoTimer();
  }

  selectChar(ch: string): void {
    this.selectedChar.set(ch);
    this.resetPad();
    this.statusMessage.set(`Luyện viết chữ [${ch}]. Hãy bắt đầu từ chấm đỏ.`);
    this.statusType.set('info');
  }

  toggleHandedness(): void {
    this.isLeftHanded.update(v => !v);
  }

  toggleGhost(): void {
    this.showGhost.update(v => !v);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('writing-modal-backdrop')) {
      this.close.emit();
    }
  }

  goToNextChar(): void {
    const next = this.nextChar();
    if (next) {
      this.selectChar(next);
    }
  }

  playAudio(): void {
    this.strokeService.playPronunciation(this.selectedChar());
  }

  resetPad(): void {
    this.clearDemoTimer();
    this.currentStrokeIndex.set(0);
    this.lockedStrokePaths.set([]);
    this.isCompleted.set(false);
    this.clearCanvas();
    this.statusMessage.set('Bắt đầu đặt bút từ chấm đỏ.');
    this.statusType.set('info');
  }

  playDemoSequence(): void {
    if (this.isDemoPlaying()) return;
    const strokes = this.currentStrokes();
    if (strokes.length === 0) return;

    this.isDemoPlaying.set(true);
    let step = 0;
    this.demoHighlightedIndex.set(step);

    this.clearDemoTimer();
    this.demoTimer = setInterval(() => {
      step++;
      if (step >= strokes.length) {
        this.clearDemoTimer();
        this.demoHighlightedIndex.set(-1);
        this.isDemoPlaying.set(false);
      } else {
        this.demoHighlightedIndex.set(step);
      }
    }, 650);
  }

  private clearDemoTimer(): void {
    if (this.demoTimer) {
      clearInterval(this.demoTimer);
      this.demoTimer = null;
    }
  }

  // ================= POINTER / CANVAS DRAWING ENGINE =================
  private setupCanvasResolution(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }

  private clearCanvas(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  onPointerDown(e: PointerEvent): void {
    if (this.isCompleted() || this.isDemoPlaying()) return;
    const canvas = this.canvasRef.nativeElement;
    canvas.setPointerCapture(e.pointerId);

    this.isPointerDown = true;
    const pt = this.normalizePointerCoords(e);
    this.currentRawPoints = [pt];

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const px = (pt[0] / 109) * rect.width;
      const py = (pt[1] / 109) * rect.height;
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#263847';
      ctx.fill();
    }
  }

  onPointerMove(e: PointerEvent): void {
    if (!this.isPointerDown) return;
    const pt = this.normalizePointerCoords(e);
    const last = this.currentRawPoints[this.currentRawPoints.length - 1];
    this.currentRawPoints.push(pt);

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx && last) {
      const rect = canvas.getBoundingClientRect();
      const x1 = (last[0] / 109) * rect.width;
      const y1 = (last[1] / 109) * rect.height;
      const x2 = (pt[0] / 109) * rect.width;
      const y2 = (pt[1] / 109) * rect.height;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#263847';
      ctx.lineWidth = 4.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  }

  onPointerUp(e: PointerEvent): void {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;
    const canvas = this.canvasRef.nativeElement;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {}

    this.gradeCurrentStroke();
  }

  onPointerCancel(e: PointerEvent): void {
    this.isPointerDown = false;
    this.clearCanvas();
  }

  private normalizePointerCoords(e: PointerEvent): [number, number] {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 109;
    const ny = ((e.clientY - rect.top) / rect.height) * 109;
    return [Math.max(0, Math.min(109, nx)), Math.max(0, Math.min(109, ny))];
  }

  private gradeCurrentStroke(): void {
    const strokes = this.currentStrokes();
    const idx = this.currentStrokeIndex();
    if (idx >= strokes.length) return;

    const strokePath = strokes[idx];
    const result = this.strokeService.gradeStroke(this.currentRawPoints, strokePath);

    if (result.pass) {
      // Nét đạt yêu cầu: Khóa nét vào SVG vector cố định & xóa canvas tạm
      this.lockedStrokePaths.update(paths => [...paths, strokePath]);
      this.clearCanvas();

      const nextIdx = idx + 1;
      this.currentStrokeIndex.set(nextIdx);

      if (nextIdx >= strokes.length) {
        // Đã hoàn thành toàn bộ nét của chữ
        this.isCompleted.set(true);
        const count = this.strokeService.recordSuccess(this.selectedChar());
        this.strokeService.playPronunciation(this.selectedChar());

        const masterText = count >= 3 ? ' Đã đạt mốc ✓ Thuộc!' : ` (Đúng ${count}/3 lần để thuộc).`;
        this.statusMessage.set(`Xuất sắc! Bạn đã viết hoàn hảo chữ [${this.selectedChar()}].${masterText}`);
        this.statusType.set('success');
      } else {
        this.statusMessage.set(`Đúng nét #${nextIdx}! Tiếp tục nét tiếp theo.`);
        this.statusType.set('info');
      }
    } else {
      // Nét chưa đạt: Rung nhẹ cảnh báo, thông báo lý do và xóa nét vẽ tạm
      this.statusMessage.set(result.reason || 'Nét chưa chuẩn, hãy thử lại.');
      this.statusType.set('error');
      this.shakeStage.set(true);
      setTimeout(() => this.shakeStage.set(false), 500);
      this.clearCanvas();
    }

    this.currentRawPoints = [];
  }
}
