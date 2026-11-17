import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameStateService } from '../../core/services/game-state.service';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import { DailyQuestsWidgetComponent } from './daily-quests-widget.component';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe, DailyQuestsWidgetComponent, PixelIconComponent],
  template: `
    <div class="dashboard-screen">
      <!-- Header với tiêu đề sách và cối xay gió (Screen 1 Mockup) -->
      <div class="home-header">
        <div class="header-titles">
          <h1 class="brand-heading">Language Farm</h1>
          <p class="brand-tagline">Học tiếng Anh · Trồng và thu hoạch</p>
        </div>
        <div class="windmill-box" [innerHTML]="assets.windmillSketch | safeHtml"></div>
      </div>

      <!-- Thư viện học tập (3 Sổ tay da vintage mạ vàng) -->
      <div class="section-header-row">
        <div class="section-title">Thư viện học tập</div>
        <a routerLink="/lessons" class="view-all-link">Xem tất cả 51 bài học →</a>
      </div>
      
      <div class="books-showcase">
        <!-- Sổ 1: Vocabulary Learning Planner (Xanh olive) - Chuyển sang màn Danh sách bài học -->
        <a routerLink="/lessons" class="leather-book book-olive" title="Mở danh sách bài học">
          <div class="book-emboss-border">
            <div class="book-title-main">Vocabulary</div>
            <div class="book-sub">Learning Planner</div>
            <div class="book-emblem">
              <img src="assets/icons/icon_vocabulary.svg" class="pixel-art" width="28" height="28" alt="Vocabulary" />
            </div>
          </div>
        </a>

        <!-- Sổ 2: Grammar Learning Planner (Xanh navy với cột Hy Lạp) -->
        <a routerLink="/grammar" class="leather-book book-navy" title="Mở sổ tay Ngữ pháp TOEIC">
          <div class="book-emboss-border">
            <div class="book-title-main">Grammar</div>
            <div class="book-sub">Learning Planner</div>
            <div class="book-emblem">
              <img src="assets/icons/icon_grammar.svg" class="pixel-art" width="28" height="28" alt="Grammar" />
            </div>
          </div>
        </a>

        <!-- Sổ 3: Listening Practice Planner (Hồng đất rose với tai nghe) -->
        <a routerLink="/review" class="leather-book book-rose">
          <div class="book-emboss-border">
            <div class="book-title-main">Listening</div>
            <div class="book-sub">Practice Planner</div>
            <div class="book-emblem">
              <img src="assets/icons/icon_practice.svg" class="pixel-art" width="28" height="28" alt="Listening" />
            </div>
          </div>
        </a>
      </div>

      <!-- Khung Nhiệm Vụ Hôm Nay (Daily Quests & Streak Engine) -->
      <app-daily-quests-widget></app-daily-quests-widget>

      <!-- Cẩm Nang Hướng Dẫn Sử Dụng -->
      <a routerLink="/guide" class="guide-banner" title="Mở Cẩm nang Hướng dẫn">
        <div class="guide-banner-left">
          <div class="guide-banner-icon">
            <app-pixel-icon name="icon_books_stack" [size]="20"></app-pixel-icon>
          </div>
          <div class="guide-banner-text">
            <div class="guide-banner-title">Cẩm nang Nông dân English Farm</div>
            <div class="guide-banner-sub">Xem vòng lặp Farm, Lịch Ebbinghaus và cơ chế nhiệm vụ</div>
          </div>
        </div>
        <span class="guide-banner-arrow">Khám phá ›</span>
      </a>
    </div>
  `,
  styles: [`
    .dashboard-screen {
      max-width: 520px;
      margin: 0 auto;
      padding-bottom: 24px;
    }
    .home-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-top: 6px;
    }
    .brand-heading {
      font-family: var(--font-serif);
      font-size: 26px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.1;
    }
    .brand-tagline {
      font-size: 13px;
      color: var(--ink-muted);
      margin-top: 2px;
    }
    .windmill-box {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .section-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .section-title {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 0;
    }
    .view-all-link {
      font-size: 13px;
      font-weight: 700;
      color: var(--rose);
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .view-all-link:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
    /* Sổ tay da 3D cổ điển */
    .books-showcase {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 250px;
      margin-bottom: 24px;
    }
    .leather-book {
      position: absolute;
      width: 145px;
      height: 205px;
      border-radius: 6px 14px 14px 6px;
      box-shadow: 4px 8px 18px rgba(38, 56, 71, 0.22);
      padding: 10px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s;
    }
    .leather-book:hover {
      transform: translateY(-8px) scale(1.04) !important;
      box-shadow: 6px 14px 24px rgba(38, 56, 71, 0.32);
      z-index: 10 !important;
    }
    /* Xếp lớp 3 quyển sách nghiêng nhẹ như mockup */
    .book-olive {
      background: linear-gradient(135deg, #78815D 0%, #5E6646 100%);
      left: 35px;
      top: 15px;
      transform: rotate(-7deg);
      z-index: 1;
    }
    .book-navy {
      background: linear-gradient(135deg, #4A637A 0%, #2E4357 100%);
      right: 35px;
      top: 35px;
      transform: rotate(6deg);
      z-index: 2;
    }
    .book-rose {
      background: linear-gradient(135deg, #A8656C 0%, #8C4E54 100%);
      left: 65px;
      top: 45px;
      transform: rotate(-1deg);
      z-index: 3;
    }
    .book-emboss-border {
      border: 1.5px solid rgba(232, 215, 168, 0.7);
      height: 100%;
      border-radius: 4px 10px 10px 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 8px 4px;
      position: relative;
    }
    .book-emboss-border::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: rgba(232, 215, 168, 0.4);
    }
    .book-title-main {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 700;
      color: #FFFDF8;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      line-height: 1.15;
    }
    .book-sub {
      font-size: 10.5px;
      color: #E8D7A8;
      letter-spacing: 0.5px;
      margin-top: 2px;
      font-weight: 500;
    }
    .book-emblem {
      margin-top: 12px;
      font-size: 22px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    }
    /* Nhiệm vụ hôm nay */
    .tasks-card {
      padding: 16px 20px;
      border-radius: 14px;
    }
    .tasks-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .tasks-title {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy);
    }
    .leaf-icon {
      font-size: 15px;
      color: var(--olive);
    }
    .task-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .task-row {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    .vintage-chk {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      border: 1.5px solid #D9C8B5;
      background: #FAF6EF;
      color: transparent;
      font-size: 11px;
      font-weight: 800;
    }
    .vintage-chk.done {
      background: var(--olive, #78815D);
      border-color: #555E3E;
      color: #FFF;
    }
    .task-row-done .task-name {
      text-decoration: line-through;
      color: var(--ink-muted);
    }
    .task-name {
      flex: 1;
      font-size: 13.5px;
      color: var(--navy);
    }
    .task-count {
      font-size: 12.5px;
      color: var(--ink-muted);
      font-weight: 500;
    }

    /* ================= RESPONSIVE MOBILE (< 480px) ================= */
    @media (max-width: 480px) {
      .home-header {
        margin-bottom: 12px;
      }
      .brand-heading {
        font-size: 22px;
      }
      .windmill-box {
        width: 42px;
        height: 42px;
      }
      .books-showcase {
        height: 215px;
        margin-bottom: 16px;
      }
      .leather-book {
        width: 122px;
        height: 175px;
      }
      .book-olive {
        left: 8px;
        top: 10px;
      }
      .book-navy {
        right: 8px;
        top: 25px;
      }
      .book-rose {
        left: calc(50% - 61px);
        top: 32px;
      }
      .book-title-main {
        font-size: 13px;
      }
      .book-sub {
        font-size: 9.5px;
      }
      .book-emblem {
        font-size: 18px;
        margin-top: 8px;
      }
      .tasks-card {
        padding: 14px 14px;
      }
    }

    /* GUIDE BANNER AT BOTTOM */
    .guide-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 18px;
      padding: 12px 16px;
      background: #FFFDF9;
      border: 1.5px solid #D9C8B5;
      border-radius: 14px;
      text-decoration: none !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
      transition: all 0.15s ease;

      &:hover {
        background: #F4EFE6;
        border-color: #C2AD95;
        transform: translateY(-1px);
      }
    }
    .guide-banner-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .guide-banner-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: #EFE9DD;
      border: 1px solid #D9C8B5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .guide-banner-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 2px;
    }
    .guide-banner-sub {
      font-size: 11.5px;
      color: var(--ink-muted);
    }
    .guide-banner-arrow {
      font-size: 12px;
      font-weight: 700;
      color: #78815D;
      white-space: nowrap;
    }
  `]
})
export class DashboardComponent {
  state = inject(GameStateService);
  assets = FARM_ASSETS;

  task1Done = false;
  task2Done = false;
  task3Done = false;
}
