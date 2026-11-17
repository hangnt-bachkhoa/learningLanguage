import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../core/services/game-state.service';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, PixelIconComponent],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <!-- NÚT ĐÓNG / MỞ THANH ĐIỀU HƯỚNG (COLLAPSE / EXPAND) -->
        <button class="nav-toggle-btn" (click)="state.toggleSidebar()" title="Đóng / Mở menu điều hướng">
          <app-pixel-icon name="icon_menu" [size]="16"></app-pixel-icon>
        </button>

        <h1 class="page-title">
          <span class="title-logo">
            <img src="assets/icons/language_farm_logo.svg" alt="Language Farm" class="topbar-logo-img pixel-art" />
          </span>
          <span class="title-text">{{ title }}</span>
        </h1>
      </div>
      <div class="topbar-right">
        <!-- BIỂU TƯỢNG CỜ NGÔN NGỮ HIỆN TẠI (ĐỒNG BỘ VỚI HỒ SƠ NGÔN NGỮ) -->
        <div class="stat-pill lang-pill" [title]="'Hồ sơ đang học: ' + (state.activeLang() === 'en' ? 'Tiếng Anh (TOEIC)' : 'Tiếng Nhật (JLPT N5)')">
          <span class="flag-icon">{{ state.activeLang() === 'en' ? '🇬🇧' : '🇯🇵' }}</span>
          <span class="hide-mobile">{{ state.activeLang() === 'en' ? 'EN' : 'JA' }}</span>
        </div>

        <!-- BIỂU TƯỢNG CHUỖI VÀ SỐ NGÀY CHUỖI TƯƠNG ỨNG (FIRE ICON) -->
        <div class="stat-pill streak-pill" [title]="'Chuỗi học tập liên tục: ' + state.studyStreak() + ' ngày'">
          <app-pixel-icon name="icon_flame" [size]="14"></app-pixel-icon>
          <span>{{ state.studyStreak() }}</span>
          <span class="hide-mobile"> ngày</span>
        </div>

        <!-- TIẾN ĐỘ XP (Hiện trên Desktop/Tablet, ẩn trên Mobile để Header luôn thoáng) -->
        <div class="stat-pill xp-pill hide-mobile" title="Tiến độ thăng cấp: {{ state.currentXp() }}/{{ state.xpRequired() }} XP (Tối đa 1000 XP)">
          <app-pixel-icon name="icon_star" [size]="14"></app-pixel-icon>
          <span>{{ state.currentXp() }}/{{ state.xpRequired() }} XP</span>
        </div>

        <!-- SỐ XU VÀNG -->
        <div class="stat-pill gold" title="Số Xu hiện có">
          <app-pixel-icon name="icon_coin" [size]="14"></app-pixel-icon>
          <span>{{ state.coins() }}</span>
          <span class="hide-mobile"> Xu</span>
        </div>

        <!-- NÚT GIỎ HÀNG -->
        <button class="cart-btn" (click)="openCart.emit()" title="Mở giỏ hàng">
          <app-pixel-icon name="icon_cart" [size]="16"></app-pixel-icon>
          <span class="cart-text hide-mobile">Giỏ hàng</span>
          @if (state.cartCount() > 0) {
            <span class="cart-badge">{{ state.cartCount() }}</span>
          }
        </button>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
      width: 100%;
    }
    .topbar {
      height: 60px;
      background: rgba(245, 241, 232, 0.94);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
    .topbar-left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .nav-toggle-btn {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-sm);
      background: var(--bg-card);
      border: 1.5px solid var(--border-strong);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      color: var(--navy);
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      transition: all 0.15s ease;
    }
    .nav-toggle-btn:hover {
      background: #EDE5D6;
      border-color: var(--navy);
      transform: scale(1.03);
    }
    .page-title {
      font-family: var(--font-serif);
      font-size: 19px;
      font-weight: 700;
      color: var(--navy);
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      white-space: nowrap;
    }
    .title-logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .topbar-logo-img {
      width: 28px;
      height: 28px;
      object-fit: contain;
      border-radius: 50%;
      display: block;
    }
    .topbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .lang-pill {
      font-weight: 700;
      background: #FFFDF9;
      color: var(--navy);
      border: 1.5px solid var(--border-strong);
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .flag-icon {
      font-size: 14px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
    }
    .streak-pill {
      font-weight: 700;
      background: #FFF7ED;
      color: #C05621;
      border: 1.5px solid #FBD38D;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      letter-spacing: 0.2px;
    }
    .cart-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      font-weight: 600;
      font-size: 13px;
      color: var(--navy);
      transition: background 0.15s;
    }
    .cart-btn:hover {
      background: #EDE5D6;
    }
    .cart-badge {
      background: var(--rose);
      color: #FFF;
      font-size: 10px;
      padding: 1px 6px;
      border-radius: 999px;
    }

    /* ================= RESPONSIVE MOBILE (< 600px & < 480px) ================= */
    @media (max-width: 600px) {
      .topbar {
        height: 52px;
        padding: 0 12px;
      }
      .page-title {
        font-size: 16px;
      }
      .hide-mobile {
        display: none !important;
      }
      .topbar-right {
        gap: 6px;
      }
      .stat-pill {
        padding: 3.5px 8px;
        font-size: 11.5px;
      }
      .cart-btn {
        padding: 4px 8px;
        font-size: 13px;
      }
    }

    @media (max-width: 480px) {
      .topbar {
        padding: 0 8px;
      }
      .topbar-left {
        gap: 8px;
      }
      .nav-toggle-btn {
        width: 34px;
        height: 34px;
      }
      .page-title {
        font-size: 15px;
      }
      .page-title .title-text {
        white-space: nowrap;
      }
      .topbar-right {
        gap: 4px;
      }
      .stat-pill {
        padding: 3px 6px;
        font-size: 11px;
      }
      .cart-btn {
        padding: 3px 7px;
        font-size: 12px;
      }
    }
  `]
})
export class TopbarComponent {
  state = inject(GameStateService);
  openCart = output<void>();

  // Đồng bộ tên ứng dụng sang Language Farm trên toàn hệ thống
  readonly title = 'Language Farm';
}
