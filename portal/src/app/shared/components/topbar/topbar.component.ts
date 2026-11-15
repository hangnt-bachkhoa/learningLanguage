import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../core/services/game-state.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <!-- NÚT ĐÓNG / MỞ THANH ĐIỀU HƯỚNG (COLLAPSE / EXPAND) -->
        <button class="nav-toggle-btn" (click)="state.toggleSidebar()" title="Đóng / Mở menu điều hướng">
          <span class="toggle-icon">☰</span>
        </button>

        <h1 class="page-title">
          <span class="title-logo">🌱</span>
          <span class="title-text">{{ title }}</span>
        </h1>
      </div>
      <div class="topbar-right">
        <div class="stat-pill">★ {{ state.xp() }}<span class="hide-mobile"> XP</span></div>
        <div class="stat-pill gold">🪙 {{ state.coins() }}<span class="hide-mobile"> Xu</span></div>
        <button class="cart-btn" (click)="openCart.emit()" title="Mở giỏ hàng">
          <span>🛒</span>
          <span class="cart-text hide-mobile">Giỏ hàng</span>
          @if (state.cartCount() > 0) {
            <span class="cart-badge">{{ state.cartCount() }}</span>
          }
        </button>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      height: 60px;
      background: rgba(245, 241, 232, 0.94);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
    .topbar-left {
      display: flex;
      align-items: center;
      gap: 12px;
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
    .toggle-icon {
      line-height: 1;
    }
    .page-title {
      font-family: var(--font-serif);
      font-size: 19px;
      font-weight: 700;
      color: var(--navy);
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0;
    }
    .topbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
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

    /* ================= RESPONSIVE MOBILE (< 600px) ================= */
    @media (max-width: 600px) {
      .topbar {
        height: 52px;
        padding: 0 10px;
      }
      .page-title {
        font-size: 15.5px;
      }
      .hide-mobile {
        display: none !important;
      }
      .topbar-right {
        gap: 5px;
      }
      .stat-pill {
        padding: 3.5px 7px;
        font-size: 11px;
      }
      .cart-btn {
        padding: 4px 8px;
        font-size: 13px;
      }
    }
  `]
})
export class TopbarComponent {
  state = inject(GameStateService);
  openCart = output<void>();

  get title(): string {
    return 'English Farm';
  }
}
