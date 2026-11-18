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
    <!-- 1. EXPANDABLE "MORE" DRAWER SHEET (Ngăn kéo mở rộng trên Mobile) -->
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

      <!-- 3. TRANG CHỦ (Vị trí giữa - đồng bộ phẳng với các tab khác) -->
      <a routerLink="/" class="dock-tab center-tab" [class.active]="isHomeActive()" title="Trang chủ">
        <app-pixel-icon name="icon_home" [size]="18"></app-pixel-icon>
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
    /* ================= 1. MOBILE BOTTOM NAVIGATION DOCK ================= */
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
      padding-top: 7px;
      padding-left: 6px;
      padding-right: 6px;
      padding-bottom: max(10px, env(safe-area-inset-bottom));
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

    /* Center Tab đồng bộ phẳng tuyệt đối với các tab khác */
    .dock-tab.center-tab {
      /* Đồng bộ hoàn toàn thuộc tính với .dock-tab, không nhô cao và không viền riêng */
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
      padding: 16px 18px calc(92px + env(safe-area-inset-bottom, 16px));
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
      .mobile-footer-dock {
        display: flex;
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
