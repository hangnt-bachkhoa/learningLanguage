import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GameStateService } from '../../../core/services/game-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="left-nav-bar">
      <!-- Logo thương hiệu -->
      <a routerLink="/" class="nav-brand" title="Language Farm">
        <span class="brand-sprout">🌱</span>
      </a>

      <!-- Danh sách Navigation ĐẦY ĐỦ (Bao gồm Cửa hàng & Kho đồ) -->
      <nav class="nav-items-stack">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: item.exact}"
            class="nav-tab-btn"
            [title]="item.label">
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.label }}</span>
            @if (item.path === '/farm' && hasReadyPlots()) {
              <span class="nav-dot"></span>
            }
          </a>
        }
      </nav>

      <!-- Badge Cấp độ người chơi ở đáy -->
      <div class="nav-bottom-avatar" title="Cấp độ người chơi">
        <span class="level-indicator">L{{ state.level() }}</span>
      </div>
    </aside>
  `,
  styles: [`
    .left-nav-bar {
      width: 82px;
      background: var(--navy);
      color: #F8F4EB;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 0;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 40;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }
    .nav-brand {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(232, 215, 168, 0.15);
      border: 1px solid rgba(232, 215, 168, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      margin-bottom: 14px;
      text-decoration: none;
    }
    .nav-items-stack {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      padding: 0 6px;
      flex: 1;
    }
    .nav-tab-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 8px 2px;
      border-radius: 10px;
      color: rgba(248, 244, 235, 0.7);
      text-decoration: none;
      position: relative;
      transition: all 0.15s;
    }
    .nav-tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #FFFDF9;
    }
    .nav-tab-btn.active {
      background: rgba(232, 215, 168, 0.2);
      color: #FFFDF9;
      font-weight: 700;
    }
    .nav-icon {
      font-size: 20px;
    }
    .nav-text {
      font-size: 11px;
      letter-spacing: 0.2px;
      text-align: center;
      white-space: nowrap;
    }
    .nav-dot {
      position: absolute;
      top: 6px;
      right: 14px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--gold-pixel);
      box-shadow: 0 0 6px var(--gold-pixel);
    }
    .nav-bottom-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(232, 215, 168, 0.2);
      border: 1.5px solid var(--gold);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .level-indicator {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--gold);
    }
  `]
})
export class SidebarComponent {
  state = inject(GameStateService);

  navItems = [
    { path: '/', label: 'Trang chủ', icon: '🏠', exact: true },
    { path: '/lessons', label: 'Học tập', icon: '📖', exact: false },
    { path: '/farm', label: 'Nông trại', icon: '🌱', exact: false },
    { path: '/shop', label: 'Cửa hàng', icon: '🏪', exact: false },
    { path: '/inventory', label: 'Kho đồ', icon: '🎒', exact: false },
    { path: '/review', label: 'Tiến độ', icon: '📊', exact: false },
    { path: '/quiz', label: 'Luyện tập', icon: '✓', exact: false }
  ];

  hasReadyPlots(): boolean {
    return this.state.plots().some(p => p.status === 'ready');
  }
}
