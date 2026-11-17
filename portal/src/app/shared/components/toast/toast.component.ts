import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../core/services/game-state.service';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, PixelIconComponent],
  template: `
    <div class="toast-viewport" aria-live="polite" aria-atomic="true">
      @for (toast of state.toasts(); track toast.id) {
        <div
          class="vintage-toast-card"
          [ngClass]="'toast-' + (toast.type || 'info')"
          (click)="state.dismissToast(toast.id)"
          role="alert">

          <!-- Icon pixel-art theo loại thông báo -->
          <div class="toast-icon-box">
            @switch (toast.type) {
              @case ('warning') {
                <app-pixel-icon name="icon_warning" [size]="16"></app-pixel-icon>
              }
              @case ('error') {
                <app-pixel-icon name="icon_cross" [size]="14"></app-pixel-icon>
              }
              @case ('success') {
                <app-pixel-icon name="icon_check" [size]="15"></app-pixel-icon>
              }
              @default {
                <app-pixel-icon name="icon_lightbulb" [size]="15"></app-pixel-icon>
              }
            }
          </div>

          <!-- Nội dung thông báo -->
          <div class="toast-content">
            <div class="toast-header-row">
              <span class="toast-tag font-serif">
                @switch (toast.type) {
                  @case ('warning') { Lưu ý canh tác }
                  @case ('error') { Thao tác chưa đúng }
                  @case ('success') { Thành công }
                  @default { Nhắc nhở }
                }
              </span>
              @if (toast.count && toast.count > 1) {
                <span class="toast-repeat-badge">×{{ toast.count }}</span>
              }
            </div>
            <p class="toast-message">{{ toast.text }}</p>
          </div>

          <!-- Nút đóng nhanh -->
          <button
            type="button"
            class="toast-close-btn"
            (click)="state.dismissToast(toast.id); $event.stopPropagation()"
            title="Đóng thông báo">
            ✕
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-viewport {
      position: fixed;
      top: 68px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 92%;
      max-width: 440px;
      pointer-events: none;
    }

    .vintage-toast-card {
      pointer-events: auto;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 14px;
      box-shadow: 0 6px 20px rgba(38, 56, 71, 0.16), 0 1px 4px rgba(0,0,0,0.06);
      cursor: pointer;
      user-select: none;
      animation: toastSlideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      transition: transform 0.15s ease, opacity 0.2s ease;
      box-sizing: border-box;

      &:hover {
        transform: translateY(-1px);
      }
      &:active {
        transform: scale(0.99);
      }
    }

    /* ================= 1. WARNING VINTAGE (MÀU CẢNH BÁO CỔ ĐIỂN - THEO YÊU CẦU) ================= */
    .vintage-toast-card.toast-warning {
      background: #FEF8ED;
      border: 1.5px solid #D6A847;
      color: #453110;

      .toast-icon-box {
        background: #FDF0D0;
        border: 1px solid #D6A847;
        color: #B38318;
      }
      .toast-tag {
        color: #8C6314;
      }
      .toast-message {
        color: #453110;
      }
      .toast-repeat-badge {
        background: #D6A847;
        color: #FFFDF9;
      }
      .toast-close-btn {
        color: #A67B22;
        &:hover { color: #523A0B; background: rgba(214, 168, 71, 0.2); }
      }
    }

    /* ================= 2. SUCCESS VINTAGE (XANH THẢO MỘC CỔ ĐIỂN - NHƯ MÀN QUIZ ĐÚNG) ================= */
    .vintage-toast-card.toast-success {
      background: #EBF3EA;
      border: 1.5px solid #789A72;
      color: #1E381A;

      .toast-icon-box {
        background: #DCEDD9;
        border: 1px solid #789A72;
        color: #386B30;
      }
      .toast-tag {
        color: #335E2B;
      }
      .toast-message {
        color: #1E381A;
      }
      .toast-repeat-badge {
        background: #5D8557;
        color: #FFFDF9;
      }
      .toast-close-btn {
        color: #5D8557;
        &:hover { color: #1E381A; background: rgba(120, 154, 114, 0.2); }
      }
    }

    /* ================= 3. ERROR VINTAGE (HỒNG TÍM ĐẤT CỔ ĐIỂN - NHƯ MÀN QUIZ SAI) ================= */
    .vintage-toast-card.toast-error {
      background: #FDF2F3;
      border: 1.5px solid #C48D93;
      color: #4E2328;

      .toast-icon-box {
        background: #FBE4E7;
        border: 1px solid #C48D93;
        color: #A65E65;
      }
      .toast-tag {
        color: #8F4D53;
      }
      .toast-message {
        color: #4E2328;
      }
      .toast-repeat-badge {
        background: #A65E65;
        color: #FFFDF9;
      }
      .toast-close-btn {
        color: #A65E65;
        &:hover { color: #4E2328; background: rgba(166, 94, 101, 0.2); }
      }
    }

    /* ================= 4. INFO VINTAGE (GIẤY DA CỔ ĐIỂN) ================= */
    .vintage-toast-card.toast-info {
      background: #F8F4EB;
      border: 1.5px solid #C2AD95;
      color: #263847;

      .toast-icon-box {
        background: #ECE3D2;
        border: 1px solid #C2AD95;
        color: #78815D;
      }
      .toast-tag {
        color: #554A3E;
      }
      .toast-message {
        color: #263847;
      }
      .toast-repeat-badge {
        background: #78815D;
        color: #FFFDF9;
      }
      .toast-close-btn {
        color: #8C6B4F;
        &:hover { color: #263847; background: rgba(140, 107, 79, 0.18); }
      }
    }

    /* ================= CÁC THÀNH PHẦN CHUNG ================= */
    .toast-icon-box {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .toast-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .toast-header-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .toast-tag {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .toast-repeat-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: 999px;
      line-height: 1.2;
    }

    .toast-message {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.35;
      word-break: break-word;
    }

    .toast-close-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.12s;
    }

    @keyframes toastSlideDown {
      from {
        transform: translateY(-16px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @media (max-width: 480px) {
      .toast-viewport {
        top: 60px;
        width: 94%;
      }
      .vintage-toast-card {
        padding: 8px 12px;
        gap: 10px;
      }
      .toast-icon-box {
        width: 28px;
        height: 28px;
      }
      .toast-message {
        font-size: 12.5px;
      }
    }
  `]
})
export class ToastComponent {
  readonly state = inject(GameStateService);
}
