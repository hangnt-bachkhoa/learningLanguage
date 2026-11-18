import { Component, inject, output, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../core/services/game-state.service';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';
import { NotificationCenterService, NotificationAlert } from '../../../core/services/notification-center.service';

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

        <!-- NÚT CHUÔNG THÔNG BÁO HỆ THỐNG (🔔 PIXEL-ART VINTAGE) -->
        <div class="bell-wrapper">
          <button
            type="button"
            class="bell-btn"
            [class.has-unread]="notif.unreadCount() > 0"
            (click)="toggleBell($event)"
            title="Thông báo hệ thống">
            <app-pixel-icon name="icon_bell" [size]="16"></app-pixel-icon>
            @if (notif.unreadCount() > 0) {
              <span class="bell-badge">{{ notif.unreadCount() }}</span>
            }
          </button>

          <!-- DROPDOWN THÔNG BÁO VINTAGE -->
          @if (isBellOpen()) {
            <div class="bell-dropdown" (click)="$event.stopPropagation()">
              <div class="dropdown-header">
                <div class="header-title-box">
                  <span class="header-title">Thông báo</span>
                  @if (notif.unreadCount() > 0) {
                    <span class="unread-pill">{{ notif.unreadCount() }} mới</span>
                  }
                </div>
                <button type="button" class="close-dropdown-btn" (click)="closeBell()" title="Đóng">✕</button>
              </div>

              <div class="dropdown-body">
                @if (notif.alerts().length === 0) {
                  <div class="empty-alerts">
                    <app-pixel-icon name="icon_sprout_action" [size]="24"></app-pixel-icon>
                    <p class="empty-title">Nông trại yên bình</p>
                    <p class="empty-desc">Không có cây trồng chín hay nhiệm vụ cần nhận thưởng lúc này.</p>
                  </div>
                } @else {
                  <div class="alerts-list">
                    @for (item of notif.alerts(); track item.id) {
                      <div class="alert-item" (click)="handleAlertClick(item)">
                        <div class="alert-icon-box" [ngClass]="item.type">
                          <app-pixel-icon [name]="item.iconName" [size]="16"></app-pixel-icon>
                        </div>
                        <div class="alert-content">
                          <div class="alert-title">{{ item.title }}</div>
                          <div class="alert-msg">{{ item.message }}</div>
                        </div>
                        <div class="alert-arrow">›</div>
                      </div>
                    }
                  </div>
                }
              </div>

              <!-- FOOTER & CÀI ĐẶT THÔNG BÁO -->
              <div class="dropdown-footer">
                @if (notif.permission() !== 'granted') {
                  <button type="button" class="btn-enable-notif" (click)="requestNotifPermission()">
                    <app-pixel-icon name="icon_bell" [size]="14"></app-pixel-icon>
                    <span>Bật thông báo khi mở app</span>
                  </button>
                } @else {
                  <div class="notif-enabled-chip">
                    <app-pixel-icon name="icon_check" [size]="12"></app-pixel-icon>
                    <span>✓ Đã bật thông báo trình duyệt</span>
                  </div>
                }

                @if (!isStandalone()) {
                  <div class="ios-hint-box">
                    <span>📱 Mẹo iPhone: Chọn <strong>Chia sẻ → Thêm vào MH chính</strong> để dùng như App.</span>
                  </div>
                }
              </div>
            </div>
          }
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
      min-height: 60px;
      height: auto;
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
      padding-top: max(10px, env(safe-area-inset-top, 0px));
      padding-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;
      box-sizing: border-box;
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
    /* Bell Notification Button & Dropdown */
    .bell-wrapper {
      position: relative;
    }
    .bell-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      color: var(--navy);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .bell-btn:hover {
      background: #EDE5D6;
    }
    .bell-btn.has-unread {
      border-color: rgba(166, 94, 101, 0.45);
    }
    .bell-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 17px;
      height: 17px;
      padding: 0 4px;
      border-radius: 999px;
      background: #A65E65; /* #A65E65 count badge */
      color: #FFFDF9;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      border: 1.5px solid #F8F4EB;
    }
    .bell-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 320px;
      background: #FFFDF9;
      border: 1.5px solid var(--border-strong);
      border-radius: 12px;
      box-shadow: 0 10px 32px rgba(20, 32, 44, 0.22);
      z-index: 100;
      display: flex;
      flex-direction: column;
      animation: dropFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
      text-align: left;
    }
    @keyframes dropFadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .dropdown-header {
      background: #F8F4EB;
      border-bottom: 1px solid var(--border);
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-title-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .header-title {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy);
    }
    .unread-pill {
      background: #A65E65;
      color: #FFFDF9;
      font-size: 10.5px;
      font-weight: 700;
      padding: 1.5px 7px;
      border-radius: 999px;
    }
    .close-dropdown-btn {
      background: none;
      border: none;
      color: var(--ink-muted);
      font-size: 14px;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      transition: background 0.15s;
      &:hover {
        background: rgba(0,0,0,0.06);
        color: var(--navy);
      }
    }
    .dropdown-body {
      max-height: 270px;
      overflow-y: auto;
    }
    .empty-alerts {
      padding: 28px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 6px;
      color: var(--ink-muted);
    }
    .empty-title {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 700;
      color: var(--navy);
      margin: 6px 0 0;
    }
    .empty-desc {
      font-size: 12px;
      line-height: 1.4;
      margin: 0;
    }
    .alerts-list {
      display: flex;
      flex-direction: column;
    }
    .alert-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-bottom: 1px solid rgba(217, 200, 181, 0.45);
      cursor: pointer;
      transition: background 0.12s ease;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #F8F4EB;
      }
    }
    .alert-icon-box {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: var(--bg-paper);
      border: 1px solid var(--border-strong);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .alert-icon-box.crop {
      background: #F4F7EE;
      border-color: #B5C97B;
    }
    .alert-icon-box.review {
      background: #FDF2F3;
      border-color: #E2AAB0;
    }
    .alert-icon-box.quest {
      background: #FFF9E6;
      border-color: #F0D78C;
    }
    .alert-content {
      flex: 1;
      min-width: 0;
    }
    .alert-title {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.2;
    }
    .alert-msg {
      font-size: 11.5px;
      color: #5C6B73;
      line-height: 1.35;
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .alert-arrow {
      font-size: 18px;
      color: #A0AEC0;
      font-weight: 700;
      line-height: 1;
    }
    .dropdown-footer {
      padding: 10px 14px;
      background: #F8F4EB;
      border-top: 1.5px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .btn-enable-notif {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 10px;
      border-radius: 8px;
      background: var(--bg-card);
      border: 1.5px solid var(--border-strong);
      color: var(--navy);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
      &:hover {
        background: #EDE5D6;
      }
    }
    .notif-enabled-chip {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 700;
      color: #5E8A42;
      padding: 4px 0;
    }
    .ios-hint-box {
      font-size: 11px;
      color: #4A5568;
      line-height: 1.35;
      padding: 6px 8px;
      background: rgba(232, 215, 168, 0.3);
      border: 1px dashed var(--border-strong);
      border-radius: 6px;
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
        min-height: 52px;
        padding-top: max(8px, env(safe-area-inset-top, 0px));
        padding-bottom: 8px;
        padding-left: 12px;
        padding-right: 12px;
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
      .bell-btn {
        width: 32px;
        height: 32px;
      }
    }

    @media (max-width: 480px) {
      .topbar {
        padding-left: 8px;
        padding-right: 8px;
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
      .bell-dropdown {
        position: fixed;
        top: calc(54px + env(safe-area-inset-top, 0px));
        left: 10px;
        right: 10px;
        width: auto;
        max-width: 420px;
        margin: 0 auto;
      }
    }
  `]
})
export class TopbarComponent {
  state = inject(GameStateService);
  notif = inject(NotificationCenterService);
  openCart = output<void>();

  // Đồng bộ tên ứng dụng sang Language Farm trên toàn hệ thống
  readonly title = 'Language Farm';
  readonly isBellOpen = signal<boolean>(false);

  readonly isStandalone = signal<boolean>(
    typeof window !== 'undefined'
      ? window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true
      : true
  );

  toggleBell(event?: Event): void {
    if (event) event.stopPropagation();
    this.isBellOpen.update(v => !v);
  }

  closeBell(): void {
    this.isBellOpen.set(false);
  }

  handleAlertClick(alert: NotificationAlert): void {
    this.isBellOpen.set(false);
    this.notif.navigateToAlert(alert);
  }

  async requestNotifPermission(): Promise<void> {
    await this.notif.requestPermission();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.bell-wrapper')) {
      this.isBellOpen.set(false);
    }
  }
}
