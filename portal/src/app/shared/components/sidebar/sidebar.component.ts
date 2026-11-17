import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GameStateService } from '../../../core/services/game-state.service';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, PixelIconComponent],
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
          <span class="brand-sprout">
            <img src="assets/icons/language_farm_logo.svg" alt="Language Farm" class="brand-logo-img pixel-art" />
          </span>
          <span class="drawer-brand-name">Language Farm</span>
        </a>
        <button class="drawer-close-btn" (click)="state.closeMobileSidebar()" title="Đóng menu">
          <app-pixel-icon name="icon_cross" [size]="14"></app-pixel-icon>
        </button>
      </div>

      <!-- CHUYỂN ĐỔI NGÔN NGỮ NHANH TRÊN DESKTOP (Thanh 82px) -->
      <div class="desktop-lang-switcher" title="Chuyển đổi ngôn ngữ học tập">
        <button
          type="button"
          class="desktop-lang-chip"
          [class.active]="state.activeLang() === 'en'"
          (click)="switchLang('en')"
          [title]="'Tiếng Anh · Cấp độ ' + getEnLevel()">
          🇬🇧
        </button>
        <button
          type="button"
          class="desktop-lang-chip"
          [class.active]="state.activeLang() === 'ja'"
          (click)="switchLang('ja')"
          [title]="'Tiếng Nhật · Cấp độ ' + getJaLevel()">
          🇯🇵
        </button>
      </div>

      <!-- HỒ SƠ NGÔN NGỮ & TIẾN ĐỘ LEVEL TRÊN DRAWER MOBILE (Được đưa từ Header vào Nav bar) -->
      <div class="sidebar-profile-card">
        <div class="profile-header">
          <span class="profile-title">Hồ sơ ngôn ngữ</span>
          <span class="profile-streak" title="Chuỗi ngày học liên tục">
            <app-pixel-icon name="icon_flame" [size]="13"></app-pixel-icon>
            <span>{{ state.studyStreak() }} ngày</span>
          </span>
        </div>

        <!-- Danh sách ngôn ngữ độc lập dạng stack hàng ngang đầy đủ, không bị co ép cắt chữ -->
        <div class="lang-switch-group">
          <button
            type="button"
            class="lang-chip-btn"
            [class.active]="state.activeLang() === 'en'"
            (click)="switchLang('en')">
            <span class="chip-flag">🇬🇧</span>
            <span class="chip-label">Tiếng Anh (TOEIC)</span>
            <span class="chip-lv">Lv.{{ getEnLevel() }}</span>
          </button>

          <button
            type="button"
            class="lang-chip-btn"
            [class.active]="state.activeLang() === 'ja'"
            (click)="switchLang('ja')">
            <span class="chip-flag">🇯🇵</span>
            <span class="chip-label">Tiếng Nhật (JLPT N5)</span>
            <span class="chip-lv">Lv.{{ getJaLevel() }}</span>
          </button>
        </div>

        <!-- Tiến độ XP của ngôn ngữ đang chọn -->
        <div class="active-progression-bar-box">
          <div class="progression-text">
            <span class="prog-level font-serif">
              Lv.{{ state.level() }} · {{ state.activeLang() === 'en' ? 'TOEIC Farm' : 'JLPT N5 Farm' }}
            </span>
            <span class="prog-xp">{{ state.currentXp() }}/{{ state.xpRequired() }} XP</span>
          </div>
          <div class="prog-track">
            <div class="prog-fill" [style.width.%]="xpPercent()"></div>
          </div>
        </div>
      </div>

      <!-- Danh sách Navigation ĐẦY ĐỦ -->
      <nav class="nav-items-stack">
        @for (item of navItems(); track item.path) {
          <a
            [routerLink]="item.path"
            [class.active]="isItemActive(item)"
            class="nav-tab-btn"
            (click)="state.closeMobileSidebar()"
            [title]="item.label">
            <span class="nav-icon">
              <img [src]="item.icon" class="nav-icon-img pixel-art" [alt]="item.label" width="22" height="22" />
            </span>
            <span class="nav-text">{{ item.label }}</span>
            @if (item.path === '/farm' && hasReadyPlots()) {
              <span class="nav-dot"></span>
            }
          </a>
        }
      </nav>

      <!-- Cấp độ người chơi ở đáy -->
      <div class="nav-bottom-avatar" [title]="'Cấp độ hiện tại: Lv.' + state.level() + ' (' + state.currentXp() + '/' + state.xpRequired() + ' XP)'">
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
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: thin;
      scrollbar-color: rgba(232, 215, 168, 0.2) transparent;
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
      gap: 10px;
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

    /* CHUYỂN ĐỔI NGÔN NGỮ MINI TRÊN DESKTOP */
    .desktop-lang-switcher {
      display: flex;
      gap: 4px;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(232, 215, 168, 0.2);
      border-radius: 20px;
      padding: 3px;
      margin-bottom: 12px;
    }
    .desktop-lang-chip {
      background: transparent;
      border: none;
      font-size: 15px;
      padding: 3px 5px;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.2s;
      line-height: 1;
    }
    .desktop-lang-chip:hover {
      opacity: 1;
      transform: scale(1.1);
    }
    .desktop-lang-chip.active {
      opacity: 1;
      background: rgba(232, 215, 168, 0.25);
      box-shadow: 0 0 4px rgba(232, 215, 168, 0.5);
    }

    /* HỒ SƠ NGÔN NGỮ TRÊN MOBILE DRAWER */
    .sidebar-profile-card {
      display: none; /* Mặc định ẩn trên desktop rail */
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(232, 215, 168, 0.2);
      border-radius: 12px;
      padding: 10px 12px;
      margin-bottom: 16px;
      width: 100%;
      box-sizing: border-box;
    }
    .profile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .profile-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      font-weight: 700;
      color: rgba(232, 215, 168, 0.85);
    }
    .profile-streak {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      color: #FFB347;
      background: rgba(255, 179, 71, 0.15);
      border: 1px solid rgba(255, 179, 71, 0.35);
      padding: 2px 7px;
      border-radius: 999px;
    }
    .lang-switch-group {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-bottom: 12px;
    }
    .lang-chip-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(0, 0, 0, 0.24);
      border: 1.5px solid rgba(255, 255, 255, 0.12);
      border-radius: 9px;
      padding: 8px 10px;
      color: rgba(248, 244, 235, 0.85);
      font-size: 13px;
      cursor: pointer;
      width: 100%;
      box-sizing: border-box;
      transition: all 0.18s ease;
    }
    .lang-chip-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(232, 215, 168, 0.4);
    }
    .lang-chip-btn.active {
      background: rgba(232, 215, 168, 0.18);
      border-color: #D6A847;
      color: #FFFDF9;
      font-weight: 700;
      box-shadow: 0 0 8px rgba(214, 168, 71, 0.25);
    }
    .chip-flag {
      font-size: 17px;
      line-height: 1;
      flex-shrink: 0;
    }
    .chip-label {
      flex: 1;
      text-align: left;
      font-size: 12.5px;
      font-weight: 600;
      white-space: nowrap;
    }
    .chip-lv {
      font-size: 10.5px;
      background: #78815D;
      color: #FFFDF9;
      padding: 2px 7px;
      border-radius: 999px;
      font-weight: 700;
      margin-left: auto;
      flex-shrink: 0;
    }
    .lang-chip-btn.active .chip-lv {
      background: #8C6B4F;
      border: 1px solid #D6A847;
    }
    .active-progression-bar-box {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .progression-text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: rgba(248, 244, 235, 0.85);
    }
    .prog-level {
      font-weight: 700;
      color: #E8D7A8;
    }
    .prog-xp {
      font-size: 10.5px;
      opacity: 0.8;
    }
    .prog-track {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
    }
    .prog-fill {
      height: 100%;
      background: linear-gradient(90deg, #D6A847 0%, #E8D7A8 100%);
      border-radius: 999px;
      transition: width 0.3s ease;
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
    .brand-sprout {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand-logo-img {
      width: 28px;
      height: 28px;
      object-fit: contain;
      border-radius: 50%;
      display: block;
    }
    .nav-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nav-icon-img {
      width: 20px;
      height: 20px;
      object-fit: contain;
      display: block;
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
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(232, 215, 168, 0.15);
      border: 1.5px solid var(--gold);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 10px;
    }
    .level-indicator {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--gold);
    }

    /* ================= RESPONSIVE MOBILE & TABLET (<= 768px): OFF-CANVAS DRAWER ================= */
    @media (max-width: 768px) {
      .left-nav-bar {
        width: min(290px, 86vw);
        max-width: 320px;
        align-items: stretch;
        padding: 16px 14px;
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
        margin-bottom: 14px;
        padding: 0 2px;
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
      .desktop-lang-switcher {
        display: none; /* Ẩn nút mini trên mobile, dùng sidebar-profile-card */
      }
      .sidebar-profile-card {
        display: flex;
        flex-direction: column;
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
        display: none !important; /* Đã có trạng thái Level ở thẻ hồ sơ đầu drawer, tránh lặp lại ở đáy */
      }
    }
  `]
})
export class SidebarComponent {
  state = inject(GameStateService);
  private router = inject(Router);

  isItemActive(item: { path: string; exact?: boolean }): boolean {
    const url = this.router.url;
    if (item.path === '/') {
      return url === '/' || url === '' || url.startsWith('/dashboard') || url.startsWith('/?');
    }
    if (item.path === '/lessons') {
      return (
        url.startsWith('/lessons') ||
        url.startsWith('/vocab') ||
        url.startsWith('/quiz') ||
        url.startsWith('/vocabulary')
      );
    }
    if (item.path === '/grammar') {
      return url.startsWith('/grammar');
    }
    if (item.path === '/kana') {
      return url.startsWith('/kana');
    }
    if (item.path === '/review') {
      return url.startsWith('/review') || url.startsWith('/progress');
    }
    if (item.path === '/guide') {
      return url.startsWith('/guide') || url.startsWith('/help');
    }
    return item.exact ? url === item.path : url.startsWith(item.path);
  }

  readonly navItems = computed(() => {
    const isJa = this.state.activeLang() === 'ja';
    const items = [
      { path: '/', label: 'Trang chủ', icon: 'assets/icons/icon_home.svg', exact: true },
      { path: '/lessons', label: isJa ? 'Từ vựng N5' : 'Từ vựng', icon: 'assets/icons/icon_vocabulary.svg', exact: false },
    ];
    if (isJa) {
      items.push({ path: '/kana', label: 'Bảng chữ Kana', icon: 'assets/icons/icon_practice.svg', exact: false });
    } else {
      items.push({ path: '/grammar', label: 'Ngữ pháp', icon: 'assets/icons/icon_grammar.svg', exact: false });
    }
    items.push(
      { path: '/farm', label: 'Nông trại', icon: 'assets/icons/icon_farm.svg', exact: false },
      { path: '/shop', label: 'Cửa hàng', icon: 'assets/icons/icon_shop.svg', exact: false },
      { path: '/inventory', label: 'Kho đồ', icon: 'assets/icons/icon_inventory.svg', exact: false },
      { path: '/review', label: 'Tiến độ', icon: 'assets/icons/icon_progress.svg', exact: false },
      { path: '/quiz', label: 'Luyện tập', icon: 'assets/icons/icon_practice.svg', exact: false },
      { path: '/guide', label: 'Hướng dẫn', icon: 'assets/icons/icon_guide.svg', exact: false }
    );
    return items;
  });

  hasReadyPlots(): boolean {
    return this.state.plots().some(p => p.status === 'ready');
  }

  getEnLevel(): number {
    return this.state.activeLang() === 'en' ? this.state.level() : this.state.getOtherLanguageLevel();
  }

  getJaLevel(): number {
    return this.state.activeLang() === 'ja' ? this.state.level() : this.state.getOtherLanguageLevel();
  }

  xpPercent(): number {
    const req = this.state.xpRequired() || 100;
    return Math.min(100, Math.max(0, Math.round((this.state.currentXp() / req) * 100)));
  }

  switchLang(lang: 'en' | 'ja') {
    if (this.state.activeLang() !== lang) {
      this.state.setLanguage(lang);
    }
  }
}
