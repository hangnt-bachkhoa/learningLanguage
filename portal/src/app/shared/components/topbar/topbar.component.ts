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
        <h1 class="page-title">{{ title }}</h1>
      </div>
      <div class="topbar-right">
        <div class="stat-pill">★ {{ state.xp() }} XP</div>
        <div class="stat-pill gold">🪙 {{ state.coins() }} Xu</div>
        <button class="cart-btn" (click)="openCart.emit()">
          🛒 Giỏ hàng
          @if (state.cartCount() > 0) {
            <span class="cart-badge">{{ state.cartCount() }}</span>
          }
        </button>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      height: 64px;
      background: rgba(245, 241, 232, 0.92);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
    }
    .page-title {
      font-family: var(--font-serif);
      font-size: 20px;
      font-weight: 700;
      color: var(--navy);
    }
    .topbar-right {
      display: flex;
      align-items: center;
      gap: 10px;
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
  `]
})
export class TopbarComponent {
  state = inject(GameStateService);
  openCart = output<void>();

  get title(): string {
    return 'Language Farm Naturalist Portal';
  }
}
