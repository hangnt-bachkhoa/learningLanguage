import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GameStateService } from '../../../core/services/game-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- MÀN PHỦ TỐI KHI MỞ MENU TRÊN MOBILE (BẤM VÀO ĐỂ ĐÓNG) -->
    @if (state.isMobileSidebarOpen()) {
      <div class="sidebar-backdrop" (click)="state.closeMobileSidebar()"></div>
    }

    <!-- THANH MENU CHÍNH: HỖ TRỢ COLLAPSE / EXPAND TRÊN MỌI MÀN HÌNH -->
    <aside
      class="left-nav-bar"
      [class.mobile-open]="state.isMobileSidebarOpen()"
      [class.desktop-collapsed]="state.isDesktopSidebarCollapsed()">

      <!-- Phần Header Menu (Logo thương hiệu + Nút đóng X trên mobile) -->
      <div class="sidebar-top-section">
        <a routerLink="/" class="nav-brand" (click)="state.closeMobileSidebar()" title="Language Farm">
          <span class="brand-sprout">🌱</span>
          <span class="drawer-brand-name">English Farm</span>
        </a>
        <button class="drawer-close-btn" (click)="state.closeMobileSidebar()" title="Đóng menu">✕</button>
      </div>

      <!-- Danh sách Navigation ĐẦY ĐỦ -->
      <nav class="nav-items-stack">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: item.exact}"
            class="nav-tab-btn"
            (click)="state.closeMobileSidebar()"
            [title]="item.label">
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.label }}</span>
            @if (item.path === '/farm' && hasReadyPlots()) {
              <span class="nav-dot"></span>
            }
          </a>
        }
      </nav>

      <!-- Cấp độ người chơi ở đáy -->
      <div class="nav-bottom-avatar" title="Cấp độ người chơi">
        <span class="level-indicator">Lv.{{ state.level() }}</span>
      </div>
    </aside>
  `,
  styles: [`
    /* Backdrop nền tối khi mở menu trên điện thoại */
    .sidebar-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(20, 32, 44, 0.6);
      backdrop-filter: blur(3px);
      z-index: 150;
      animation: backdropFade 0.2s ease-out;
    }
    @keyframes backdropFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

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
      z-index: 160;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s ease;
    }

    /* Thu gọn trên Desktop khi bấm nút toggle */
    .left-nav-bar.desktop-collapsed {
      transform: translateX(-100%);
      pointer-events: none;
    }

    .sidebar-top-section {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 12px;
      padding: 0 8px;
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
      text-decoration: none;
      gap: 8px;
    }
    .drawer-brand-name {
      display: none;
      font-family: var(--font-serif);
      font-size: 17px;
      font-weight: 700;
      color: #FFFDF8;
      white-space: nowrap;
    }
    .drawer-close-btn {
      display: none;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFDF8;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 700;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s;
    }
    .drawer-close-btn:hover {
      background: rgba(255, 255, 255, 0.25);
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
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(232, 215, 168, 0.2);
      border: 1.5px solid var(--gold);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .level-indicator {
      font-size: 11px;
      font-weight: 800;
      color: var(--gold);
    }

    /* ================= RESPONSIVE MOBILE & TABLET (<= 768px): OFF-CANVAS DRAWER ================= */
    @media (max-width: 768px) {
      .left-nav-bar {
        width: 240px;
        align-items: stretch;
        padding: 16px 12px;
        transform: translateX(-100%); /* MẶC ĐỊNH ĐÓNG KÍN, HOÀN TOÀN KHÔNG CHE NỘI DUNG */
        box-shadow: none;
        z-index: 200;
      }
      .left-nav-bar.mobile-open {
        transform: translateX(0); /* TRƯỢT RA KHI BẤM NÚT MENU */
        box-shadow: 6px 0 30px rgba(0, 0, 0, 0.5);
      }
      .sidebar-top-section {
        justify-content: space-between;
        margin-bottom: 18px;
        padding: 0 4px;
      }
      .nav-brand {
        width: auto;
        height: auto;
        background: none;
        border: none;
      }
      .drawer-brand-name {
        display: inline-block;
      }
      .drawer-close-btn {
        display: flex;
      }
      .nav-items-stack {
        gap: 6px;
        padding: 0;
      }
      .nav-tab-btn {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 14px;
        padding: 11px 14px;
        border-radius: 12px;
      }
      .nav-icon {
        font-size: 21px;
        line-height: 1;
      }
      .nav-text {
        font-size: 14px;
        font-weight: 600;
        text-align: left;
      }
      .nav-dot {
        position: static;
        margin-left: auto;
      }
      .nav-bottom-avatar {
        width: 100%;
        border-radius: 10px;
        height: 38px;
        margin-top: 10px;
      }
      .level-indicator {
        font-size: 12.5px;
      }
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
