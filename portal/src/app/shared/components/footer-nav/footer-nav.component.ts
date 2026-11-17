import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { GameStateService } from '../../../core/services/game-state.service';
import { PixelIconComponent } from '../pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-footer-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, PixelIconComponent],
  template: `
    <!-- 1. WEB EDITORIAL ARCHIVAL FOOTER (Hiển thị chân trang phong cách tạp chí cổ điển trên Desktop) -->
    <footer class="web-archival-footer">
      <div class="footer-grid">
        <!-- Cột 1: Thương hiệu & Giới thiệu -->
        <div class="footer-col brand-col">
          <div class="footer-brand-header">
            <span class="footer-brand-logo">
              <img src="assets/icons/language_farm_logo.svg" alt="Language Farm" class="pixel-art" width="22" height="22" />
            </span>
            <strong class="footer-brand-title font-serif">Language Farm</strong>
          </div>
          <p class="footer-brand-desc">
            Sổ tay học ngoại ngữ cổ điển kết hợp nông trại Pixel-Art. Học từ vựng, vượt Quiz 3 Sao và chăm sóc khu vườn mỗi ngày.
          </p>
        </div>

        <!-- Cột 2: Danh mục Học tập -->
        <div class="footer-col">
          <div class="footer-col-title">Học tập</div>
          <div class="footer-links">
            <a routerLink="/lessons" class="footer-link">Từ vựng trọng điểm</a>
            <a routerLink="/grammar" class="footer-link">13 Chuyên đề Ngữ pháp</a>
            @if (state.activeLang() === 'ja') {
              <a routerLink="/kana" class="footer-link">Bảng chữ cái Kana (N5)</a>
            }
            <a routerLink="/review" class="footer-link">Luyện tập &amp; Ôn Ebbinghaus</a>
          </div>
        </div>

        <!-- Cột 3: Nông trại & Kinh tế -->
        <div class="footer-col">
          <div class="footer-col-title">Nông trại &amp; Kinh tế</div>
          <div class="footer-links">
            <a routerLink="/farm" class="footer-link">Vườn của tôi (3×3)</a>
            <a routerLink="/shop" class="footer-link">Cửa hàng Hạt giống</a>
            <a routerLink="/inventory" class="footer-link">Kho đồ &amp; Phân bón</a>
            <a routerLink="/progress" class="footer-link">Thống kê Tiến độ</a>
          </div>
        </div>

        <!-- Cột 4: Sao lưu & Phục hồi dữ liệu LocalStorage -->
        <div class="footer-col">
          <div class="footer-col-title">Dữ liệu LocalStorage</div>
          <p class="footer-col-desc">Sao lưu hoặc khôi phục tiến độ học &amp; nông trại giữa điện thoại và máy tính:</p>
          <div class="backup-actions-wrap">
            <button type="button" class="chip-backup-btn" (click)="state.exportBackupJson()">
              <app-pixel-icon name="icon_scroll" [size]="12"></app-pixel-icon>
              <span>Xuất JSON</span>
            </button>
            <button type="button" class="chip-backup-btn" (click)="fileInput.click()">
              <app-pixel-icon name="icon_tools" [size]="12"></app-pixel-icon>
              <span>Nhập JSON</span>
            </button>
            <input #fileInput type="file" accept=".json" style="display:none" (change)="onFileSelected($event)" />
          </div>
        </div>
      </div>

      <div class="footer-bottom-row">
        <span>© 2026 Language Farm · Vintage Botanical &amp; Pixel-Art Edition</span>
        <span class="streak-pill">
          <app-pixel-icon name="icon_flame" [size]="14"></app-pixel-icon>
          <span>Streak: <strong>{{ state.studyStreak() }} ngày</strong> · Đã lưu tự động vào thiết bị</span>
        </span>
      </div>
    </footer>

    <!-- 2. EXPANDABLE "MORE" DRAWER SHEET (Ngăn kéo mở rộng trên Mobile) -->
    <div
      class="more-drawer-backdrop"
      [class.open]="isDrawerOpen()"
      (click)="closeDrawer($event)">
      <div class="more-drawer-sheet" (click)="$event.stopPropagation()">
        <div class="drawer-handle"></div>
        <div class="drawer-header-row">
          <strong class="drawer-title font-serif">Danh mục mở rộng</strong>
          <button type="button" class="drawer-close-text" (click)="isDrawerOpen.set(false)">Đóng ✕</button>
        </div>
        <div class="drawer-grid">
          @if (state.activeLang() === 'ja') {
            <a routerLink="/grammar" class="drawer-tile" (click)="isDrawerOpen.set(false)" [class.active]="isGrammarActive()">
              <app-pixel-icon name="icon_scroll" [size]="18"></app-pixel-icon>
              <span>Ngữ pháp</span>
            </a>
          } @else {
            <a routerLink="/kana" class="drawer-tile" (click)="isDrawerOpen.set(false)" [class.active]="isKanaActive()">
              <app-pixel-icon name="icon_target" [size]="18"></app-pixel-icon>
              <span>Chữ cái Kana</span>
            </a>
          }

          <a routerLink="/inventory" class="drawer-tile" (click)="isDrawerOpen.set(false)" [class.active]="currentUrl().startsWith('/inventory')">
            <app-pixel-icon name="icon_harvest_basket" [size]="18"></app-pixel-icon>
            <span>Kho đồ</span>
          </a>

          <a routerLink="/review" class="drawer-tile" (click)="isDrawerOpen.set(false)" [class.active]="currentUrl().startsWith('/review') || currentUrl().startsWith('/progress')">
            <app-pixel-icon name="icon_trophy" [size]="18"></app-pixel-icon>
            <span>Tiến độ &amp; Ôn tập</span>
          </a>

          <a routerLink="/guide" class="drawer-tile" (click)="isDrawerOpen.set(false)" [class.active]="currentUrl().startsWith('/guide') || currentUrl().startsWith('/help')">
            <app-pixel-icon name="icon_book_open" [size]="18"></app-pixel-icon>
            <span>Hướng dẫn</span>
          </a>
        </div>

        <div class="drawer-backup-box">
          <span class="drawer-backup-title">Sao lưu dữ liệu cá nhân</span>
          <div class="drawer-backup-btns">
            <button type="button" class="drawer-backup-btn" (click)="state.exportBackupJson()">
              <app-pixel-icon name="icon_scroll" [size]="14"></app-pixel-icon>
              <span>Xuất bản sao lưu JSON</span>
            </button>
            <button type="button" class="drawer-backup-btn" (click)="fileInputDrawer.click()">
              <app-pixel-icon name="icon_tools" [size]="14"></app-pixel-icon>
              <span>Khôi phục từ file JSON</span>
            </button>
            <input #fileInputDrawer type="file" accept=".json" style="display:none" (change)="onFileSelected($event)" />
          </div>
        </div>
      </div>
    </div>

    <!-- 3. MOBILE BOTTOM NAVIGATION DOCK (Navy Vintage Dock - Trang chủ ở vị trí giữa) -->
    <nav class="mobile-footer-dock style-navy" aria-label="Điều hướng đáy di động">
      <!-- 1. Từ vựng (Active khi ở /lessons, /vocab, /quiz) -->
      <a routerLink="/lessons" class="dock-tab" [class.active]="isVocabActive()" title="Từ vựng">
        <app-pixel-icon name="icon_books_stack" [size]="18"></app-pixel-icon>
        <span class="dock-label">Từ vựng</span>
      </a>

      <!-- 2. Nông trại (Có chấm thông báo khi cây chín) -->
      <a routerLink="/farm" class="dock-tab" [class.active]="isFarmActive()" title="Nông trại">
        @if (hasReadyPlots()) {
          <span class="dock-dot" title="Có nông sản chín sẵn sàng thu hoạch!"></span>
        }
        <app-pixel-icon name="icon_sprout_action" [size]="19"></app-pixel-icon>
        <span class="dock-label">Nông trại</span>
      </a>

      <!-- 3. TRANG CHỦ (Vị trí giữa - Center Raised Button) -->
      <a routerLink="/" class="dock-tab center-tab" [class.active]="isHomeActive()" title="Trang chủ">
        <app-pixel-icon name="icon_home" [size]="20"></app-pixel-icon>
        <span class="dock-label">Trang chủ</span>
      </a>

      <!-- 4. Kana (nếu Tiếng Nhật) hoặc Ngữ pháp (nếu Tiếng Anh) -->
      @if (state.activeLang() === 'ja') {
        <a routerLink="/kana" class="dock-tab" [class.active]="isKanaActive()" title="Bảng chữ cái Kana">
          <app-pixel-icon name="icon_target" [size]="18"></app-pixel-icon>
          <span class="dock-label">Kana あア</span>
        </a>
      } @else {
        <a routerLink="/grammar" class="dock-tab" [class.active]="isGrammarActive()" title="Ngữ pháp">
          <app-pixel-icon name="icon_scroll" [size]="18"></app-pixel-icon>
          <span class="dock-label">Ngữ pháp</span>
        </a>
      }

      <!-- 5. Cửa hàng -->
      <a routerLink="/shop" class="dock-tab" [class.active]="isShopActive()" title="Cửa hàng">
        <app-pixel-icon name="icon_cart" [size]="18"></app-pixel-icon>
        <span class="dock-label">Cửa hàng</span>
      </a>

      <!-- 6. Thêm (More Drawer Trigger) -->
      <button
        type="button"
        class="dock-tab more-tab"
        [class.active]="isMoreActive()"
        (click)="toggleDrawer()"
        title="Danh mục mở rộng">
        <app-pixel-icon name="icon_menu" [size]="18"></app-pixel-icon>
        <span class="dock-label">Thêm</span>
      </button>
    </nav>
  `,
  styles: [`
    /* ================= 1. WEB ARCHIVAL FOOTER ================= */
    .web-archival-footer {
      background: var(--bg-card);
      border-top: 1.5px solid var(--border-strong);
      padding: 32px 24px 20px;
      margin-top: 48px;
      color: var(--ink);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
      gap: 24px;
      padding-bottom: 24px;
      border-bottom: 1px dashed var(--border);
    }
    .footer-brand-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }
    .footer-brand-title {
      font-size: 19px;
      color: var(--navy);
      font-weight: 700;
    }
    .footer-brand-desc,
    .footer-col-desc {
      font-size: 12.5px;
      line-height: 1.55;
      color: var(--ink-muted);
    }
    .footer-col-title {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--olive);
      margin-bottom: 12px;
    }
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .footer-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--ink-muted);
      text-decoration: none;
      transition: color 0.15s ease, transform 0.1s ease;
      &:hover {
        color: var(--rose);
        transform: translateX(2px);
      }
    }
    .backup-actions-wrap {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .chip-backup-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid var(--border-strong);
      background: var(--bg-paper);
      color: var(--navy);
      cursor: pointer;
      transition: all 0.15s ease;
      &:hover {
        background: #EAE2D2;
        border-color: var(--navy);
      }
    }
    .footer-bottom-row {
      padding-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 12px;
      color: var(--ink-muted);
    }
    .streak-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #FDF4E7;
      border: 1px solid #E8C252;
      padding: 3px 10px;
      border-radius: 999px;
      color: #7A5B17;
      font-weight: 600;
    }

    /* ================= 2. MOBILE BOTTOM NAVIGATION DOCK ================= */
    .mobile-footer-dock {
      display: none; /* Chỉ hiện trên Mobile & Tablet (<= 768px) */
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 140;
      align-items: center;
      justify-content: space-around;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    /* Style Navy Vintage Dock (Đồng bộ với Left Sidebar) */
    .mobile-footer-dock.style-navy {
      background: #1C2B36;
      border-top: 1.5px solid rgba(232, 215, 168, 0.28);
      padding: 5px 4px 7px;
      box-shadow: 0 -4px 18px rgba(20, 32, 44, 0.35);
    }

    .dock-tab {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 5px 6px;
      border-radius: 10px;
      min-width: 48px;
      text-decoration: none;
      color: rgba(248, 244, 235, 0.72);
      transition: all 0.15s ease;
      background: transparent;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .dock-tab:hover {
      color: #FFFDF9;
    }
    .dock-tab.active {
      background: rgba(166, 94, 101, 0.95);
      color: #FFFDF9 !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
    }

    .dock-label {
      font-size: 10px;
      font-weight: 600;
      line-height: 1.1;
      white-space: nowrap;
    }
    .dock-tab.active .dock-label {
      font-weight: 700;
      color: #FFFDF9;
    }

    /* Center Raised Button (Trang chủ ở vị trí giữa) */
    .dock-tab.center-tab {
      transform: translateY(-7px);
      background: #233442;
      color: rgba(248, 244, 235, 0.85);
      border: 1.5px solid rgba(232, 215, 168, 0.45);
      border-radius: 14px;
      padding: 6px 10px;
      min-width: 52px;
      box-shadow: 0 4px 12px rgba(20, 32, 44, 0.35);
    }
    .dock-tab.center-tab:hover {
      background: #2D4152;
      color: #FFFDF9;
      border-color: rgba(232, 215, 168, 0.7);
    }
    .dock-tab.center-tab.active {
      background: #A65E65;
      color: #FFFDF9 !important;
      border: 2px solid #E8D7A8;
      box-shadow: 0 6px 16px rgba(166, 94, 101, 0.5), 0 0 10px rgba(232, 215, 168, 0.35);
    }

    .dock-dot {
      position: absolute;
      top: 3px;
      right: 6px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #E8C252;
      border: 1px solid #1C2B36;
      box-shadow: 0 0 6px #E8C252;
    }

    /* ================= 3. MORE DRAWER SHEET ================= */
    .more-drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(20, 32, 44, 0.55);
      backdrop-filter: blur(4px);
      z-index: 135;
      display: none;
      align-items: flex-end;
      animation: fadeIn 0.2s ease-out;
    }
    .more-drawer-backdrop.open {
      display: flex;
    }
    .more-drawer-sheet {
      width: 100%;
      max-width: 520px;
      margin: 0 auto;
      background: var(--bg-card);
      border-top: 2px solid var(--border-strong);
      border-radius: 20px 20px 0 0;
      padding: 16px 18px 84px;
      box-shadow: 0 -10px 32px rgba(0,0,0,0.22);
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .drawer-handle {
      width: 44px;
      height: 4px;
      background: var(--border-strong);
      border-radius: 999px;
      margin: 0 auto 14px;
    }
    .drawer-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .drawer-title {
      font-size: 17px;
      color: var(--navy);
    }
    .drawer-close-text {
      font-size: 13px;
      font-weight: 700;
      color: var(--rose);
      cursor: pointer;
      background: none;
      border: none;
    }
    .drawer-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .drawer-tile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: var(--bg-paper);
      border: 1.5px solid var(--border);
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--navy);
      text-decoration: none;
      transition: all 0.15s ease;
      &:hover, &.active {
        border-color: var(--rose);
        background: #FDF2F3;
        color: var(--rose);
      }
    }
    .drawer-backup-box {
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px dashed var(--border);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .drawer-backup-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .drawer-backup-btns {
      display: flex;
      gap: 8px;
    }
    .drawer-backup-btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      background: var(--bg-paper);
      color: var(--navy);
      border: 1px solid var(--border-strong);
      cursor: pointer;
      transition: background 0.15s ease;
      &:hover {
        background: #EAE2D2;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    /* ================= RESPONSIVE ================= */
    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 18px;
      }
      .mobile-footer-dock {
        display: flex;
      }
      .web-archival-footer {
        padding-bottom: 74px; /* Tránh bị che bởi Bottom Dock */
      }
    }
  `]
})
export class FooterNavComponent {
  readonly state = inject(GameStateService);
  private readonly router = inject(Router);

  readonly currentUrl = signal<string>(this.router.url);
  readonly isDrawerOpen = signal<boolean>(false);

  readonly hasReadyPlots = computed(() => {
    return this.state.plots().some(p => p.status === 'ready');
  });

  readonly isHomeActive = computed(() => {
    const u = this.currentUrl();
    return u === '/' || u === '' || u.startsWith('/dashboard') || u.startsWith('/?');
  });

  readonly isVocabActive = computed(() => {
    const u = this.currentUrl();
    return (
      u.startsWith('/lessons') ||
      u.startsWith('/vocab') ||
      u.startsWith('/quiz') ||
      u.startsWith('/vocabulary')
    );
  });

  readonly isFarmActive = computed(() => {
    const u = this.currentUrl();
    return u.startsWith('/farm');
  });

  readonly isKanaActive = computed(() => {
    const u = this.currentUrl();
    return u.startsWith('/kana');
  });

  readonly isGrammarActive = computed(() => {
    const u = this.currentUrl();
    return u.startsWith('/grammar');
  });

  readonly isShopActive = computed(() => {
    const u = this.currentUrl();
    return u.startsWith('/shop');
  });

  readonly isMoreActive = computed(() => {
    const u = this.currentUrl();
    return (
      this.isDrawerOpen() ||
      u.startsWith('/inventory') ||
      u.startsWith('/progress') ||
      u.startsWith('/review') ||
      u.startsWith('/guide') ||
      u.startsWith('/help')
    );
  });

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        this.currentUrl.set(e.urlAfterRedirects || e.url);
        this.isDrawerOpen.set(false);
      });
  }

  toggleDrawer() {
    this.isDrawerOpen.update(v => !v);
  }

  closeDrawer(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('more-drawer-backdrop')) {
      this.isDrawerOpen.set(false);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          this.state.importBackupJson(text);
        }
      };
      reader.readAsText(file);
    }
  }
}
