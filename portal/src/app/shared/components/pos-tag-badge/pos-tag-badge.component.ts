import { Component, ChangeDetectionStrategy, input, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';

export type PosMode = 'full' | 'compact';

interface PosMeta {
  key: string;
  compactLabel: string;
  fullLabel: string;
  helperQuestion: string;
  bg: string;
  border: string;
  text: string;
  svgRects: string;
}

const POS_DICTIONARY: Record<string, PosMeta> = {
  noun: {
    key: 'noun',
    compactLabel: 'Danh từ (N)',
    fullLabel: 'Danh từ · Chỉ người, vật',
    helperQuestion: 'Trả lời câu hỏi: Ai? Cái gì? Con gì?',
    bg: '#E9ECE1', border: '#78815D', text: '#3D4728',
    svgRects: '<rect x="3" y="4" width="10" height="9" fill="#78815D"/><rect x="5" y="2" width="6" height="2" fill="#9BB068"/><rect x="6" y="7" width="4" height="2" fill="#F8F4EB"/>'
  },
  verb: {
    key: 'verb',
    compactLabel: 'Động từ (V)',
    fullLabel: 'Động từ · Chỉ hành động',
    helperQuestion: 'Trả lời câu hỏi: Làm hành động gì?',
    bg: '#F3E4E5', border: '#A65E65', text: '#6E2E35',
    svgRects: '<rect x="7" y="2" width="3" height="3" fill="#A65E65"/><rect x="6" y="5" width="3" height="3" fill="#A65E65"/><rect x="4" y="8" width="5" height="2" fill="#8F4D53"/><rect x="6" y="10" width="2" height="4" fill="#A65E65"/>'
  },
  adj: {
    key: 'adj',
    compactLabel: 'Tính từ (Adj)',
    fullLabel: 'Tính từ · Chỉ tính chất',
    helperQuestion: 'Trả lời câu hỏi: Trông như thế nào?',
    bg: '#FBF5E2', border: '#C99B32', text: '#6B4E0E',
    svgRects: '<rect x="7" y="2" width="2" height="12" fill="#C99B32"/><rect x="2" y="7" width="12" height="2" fill="#C99B32"/><rect x="5" y="5" width="6" height="6" fill="#E8C252"/>'
  },
  adv: {
    key: 'adv',
    compactLabel: 'Trạng từ (Adv)',
    fullLabel: 'Trạng từ · Cách thức',
    helperQuestion: 'Trả lời câu hỏi: Làm việc đó ra sao?',
    bg: '#E3EEF5', border: '#4B7FA3', text: '#224760',
    svgRects: '<rect x="2" y="5" width="8" height="2" fill="#4B7FA3"/><rect x="5" y="9" width="9" height="2" fill="#4B7FA3"/><rect x="10" y="3" width="2" height="6" fill="#224760"/>'
  },
  prep: {
    key: 'prep',
    compactLabel: 'Giới từ (Prep)',
    fullLabel: 'Giới từ · Vị trí, thời gian',
    helperQuestion: 'Trả lời câu hỏi: Ở đâu? Khi nào?',
    bg: '#EFE7DC', border: '#8C6B4F', text: '#4D3622',
    svgRects: '<rect x="5" y="3" width="6" height="6" fill="#8C6B4F"/><rect x="7" y="9" width="2" height="5" fill="#4D3622"/><rect x="7" y="5" width="2" height="2" fill="#F8F4EB"/>'
  },
  pron: {
    key: 'pron',
    compactLabel: 'Đại từ (Pron)',
    fullLabel: 'Đại từ · Từ xưng hô',
    helperQuestion: 'Dùng để xưng hô: Tôi, bạn, họ, của tôi...',
    bg: '#E6E9EE', border: '#263847', text: '#263847',
    svgRects: '<rect x="5" y="3" width="6" height="5" fill="#263847"/><rect x="3" y="9" width="10" height="5" fill="#344B5E"/>'
  }
};

export function normalizePosKey(raw: string | undefined | null): string {
  const s = (raw || '').toLowerCase().trim();
  if (s.startsWith('v') || s.includes('động')) return 'verb';
  if (s.startsWith('adj') || s.includes('tính')) return 'adj';
  if (s.startsWith('adv') || s.includes('trạng')) return 'adv';
  if (s.startsWith('prep') || s.includes('giới')) return 'prep';
  if (s.startsWith('pron') || s.includes('đại')) return 'pron';
  return 'noun';
}

@Component({
  selector: 'app-pos-tag',
  standalone: true,
  imports: [CommonModule, PixelIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pos-tag-wrap">
      <button
        type="button"
        class="pos-badge"
        [class.compact-badge]="mode() === 'compact'"
        [style.background]="meta().bg"
        [style.color]="meta().text"
        [style.borderColor]="meta().border"
        [attr.title]="meta().helperQuestion"
        (click)="toggleHint()">
        <svg viewBox="0 0 16 16" class="pos-icon" shape-rendering="crispEdges" [innerHTML]="safeSvgRects()"></svg>
        <span class="pos-label">{{ mode() === 'full' ? meta().fullLabel : meta().compactLabel }}</span>
        @if (showQuestionHint()) {
          <span class="pos-info-dot">?</span>
        }
      </button>
      @if (showQuestionHint() && hintOpen()) {
        <div class="pos-helper-popover" [style.borderColor]="meta().border" [style.color]="meta().text">
          <app-pixel-icon name="icon_lightbulb" [size]="12"></app-pixel-icon>
          <span>{{ meta().helperQuestion }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .pos-tag-wrap {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      vertical-align: middle;
    }
    .pos-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 11px;
      border-radius: 999px;
      border: 1.5px solid;
      font-size: 12.5px;
      font-weight: 600;
      line-height: 1.2;
      cursor: pointer;
      transition: transform 0.12s ease;
      white-space: nowrap;
      user-select: none;
      font-family: inherit;
    }
    .pos-badge.compact-badge {
      padding: 2px 8px;
      font-size: 11.5px;
      gap: 4px;
    }
    .pos-badge:active {
      transform: scale(0.97);
    }
    .pos-icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      display: block;
    }
    .pos-info-dot {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
      font-size: 10.5px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      margin-left: 2px;
    }
    .pos-helper-popover {
      font-size: 12px;
      font-weight: 500;
      background: #FFFDF9;
      border: 1px dashed;
      border-radius: 8px;
      padding: 6px 10px;
      line-height: 1.35;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      animation: fadeIn 0.15s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-2px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class PosTagBadgeComponent {
  private sanitizer = inject(DomSanitizer);

  readonly type = input.required<string>();
  readonly mode = input<PosMode>('full');
  readonly showQuestionHint = input<boolean>(false);
  readonly hintOpen = signal(false);

  readonly meta = computed(() => POS_DICTIONARY[normalizePosKey(this.type())] ?? POS_DICTIONARY['noun']);

  readonly safeSvgRects = computed<SafeHtml>(() => {
    return this.sanitizer.bypassSecurityTrustHtml(this.meta().svgRects);
  });

  toggleHint() {
    if (this.showQuestionHint()) {
      this.hintOpen.update(v => !v);
    }
  }
}
