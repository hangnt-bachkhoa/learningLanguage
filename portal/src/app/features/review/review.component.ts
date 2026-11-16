import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { GameStateService } from '../../core/services/game-state.service';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import { FarmApiService, CompleteReviewResultDto } from '../../core/services/farm-api.service';

interface ReviewCard {
  id: number;
  word: string;
  ipa: string;
  type: string;
  meaning: string;
  exampleEn: string;
  exampleVi: string;
  clueExample: string;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe],
  template: `
    <div class="review-screen">
      <!-- ======================================================== -->
      <!-- CHẾ ĐỘ 1: TỔNG QUAN KẾ HOẠCH & BẢNG EBBINGHAUS (OVERVIEW) -->
      <!-- ======================================================== -->
      @if (viewMode() === 'overview') {
        <div class="review-header">
          <a routerLink="/" class="back-link">
            <span class="chevron">‹</span>
            <span class="header-title">Kế hoạch ôn tập</span>
          </a>
          <button class="calendar-btn" title="Lịch ôn tập">📅</button>
        </div>

        <!-- BANNER ÔN TẬP ACTIVE RECALL HÔM NAY (MỚI) -->
        <div class="vintage-card due-today-banner">
          <div class="banner-top-row">
            <span class="bell-icon">🔔</span>
            <div class="banner-text-block">
              <h3 class="banner-title">Nhiệm vụ ôn tập hôm nay</h3>
              <p class="banner-subtitle">Có <strong>{{ reviewCards.length }} từ vựng</strong> đến hạn cần tưới nước & ôn luyện Active Recall.</p>
            </div>
          </div>

          <div class="reward-preview-strip">
            <span class="reward-tag">💧 +2 Nước tưới</span>
            <span class="reward-tag">🌾 +1 Phân bón</span>
            <span class="reward-tag">🪙 +20 Xu</span>
            <span class="reward-tag">⭐ +35 XP</span>
          </div>

          <button class="btn btn-primary start-review-btn" (click)="startReviewSession()">
            <span>⚡ Bắt đầu ôn tập Active Recall ({{ reviewCards.length }} từ)</span>
          </button>
        </div>

        <!-- 3 Tabs: Từ vựng | Ngữ pháp | Nghe -->
        <div class="module-tabs">
          <button class="mod-tab" [class.active]="activeTab() === 'vocab'" (click)="activeTab.set('vocab')">
            Từ vựng
          </button>
          <button class="mod-tab" [class.active]="activeTab() === 'grammar'" (click)="activeTab.set('grammar')">
            Ngữ pháp
          </button>
          <button class="mod-tab" [class.active]="activeTab() === 'listening'" (click)="activeTab.set('listening')">
            Nghe
          </button>
        </div>

        <!-- Thẻ Bảng Theo dõi ôn tập Ebbinghaus -->
        <div class="vintage-card table-card">
          <div class="card-caption-row">
            <span class="table-caption-text">Theo dõi chu kỳ ôn tập (Ebbinghaus)</span>
            <span class="botanical-leaf">🌿</span>
          </div>

          <div class="ebbinghaus-table-wrapper">
            <table class="ebbinghaus-table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Lần 1</th>
                  <th>Day 1</th>
                  <th>Day 3</th>
                  <th>Day 7</th>
                  <th>Day 14</th>
                </tr>
              </thead>
              <tbody>
                @for (row of trackingRows; track row.date) {
                  <tr>
                    <td class="col-date">{{ row.date }}</td>
                    <td>@if (row.c1) { <span class="check-icon">✓</span> }</td>
                    <td>@if (row.c2) { <span class="check-icon">✓</span> }</td>
                    <td>@if (row.c3) { <span class="check-icon">✓</span> }</td>
                    <td>@if (row.c4) { <span class="check-icon">✓</span> }</td>
                    <td>@if (row.c5) { <span class="check-icon">✓</span> }</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Thẻ Tiến độ tuần này -->
        <div class="vintage-card weekly-progress-card">
          <div class="pot-icon" [innerHTML]="assets.potSprout | safeHtml"></div>
          <div class="progress-details">
            <div class="progress-title">Tiến độ tuần này</div>
            <div class="progress-sub">Đã ôn tập 8 / 20 từ</div>
            <div class="progress-bar-rail">
              <div class="progress-bar-fill" style="width: 40%;"></div>
            </div>
          </div>
          <div class="progress-percent">40%</div>
        </div>
      }

      <!-- ======================================================== -->
      <!-- CHẾ ĐỘ 2: PHIÊN ÔN TẬP ACTIVE RECALL TƯƠNG TÁC (SESSION) -->
      <!-- ======================================================== -->
      @else if (viewMode() === 'session') {
        <div class="review-header">
          <button class="back-link btn-link" (click)="exitSession()">
            <span class="chevron">‹</span>
            <span>Thoát phiên ôn tập</span>
          </button>
          <span class="step-indicator">{{ currentIdx() + 1 }} / {{ reviewCards.length }}</span>
        </div>

        <!-- Thanh tiến độ cỗ bài -->
        <div class="session-progress-rail">
          <div class="session-progress-fill" [style.width.%]="sessionProgressPercent()"></div>
        </div>

        <!-- Thẻ Flashcard Active Recall 3D Vintage -->
        <div class="vintage-card active-recall-card" [class.is-revealed]="isRevealed()">
          <!-- Hàng đầu: Icon hoa + huy hiệu Active Recall -->
          <div class="card-head-row">
            <span class="recall-badge">
              <span>⚡ Active Recall</span>
              <span class="dot-sep">·</span>
              <span>[{{ currentCard.type }}]</span>
            </span>
            <div class="head-art" [innerHTML]="assets.botanicalFlower | safeHtml"></div>
          </div>

          <!-- MẶT TRƯỚC THẺ: Hiển thị từ vựng & gợi ý ngữ cảnh -->
          <div class="front-face">
            <h2 class="word-display">{{ currentCard.word }}</h2>
            <div class="phonetic-audio-row">
              <span class="phonetic-text">{{ currentCard.ipa }}</span>
              <button class="speaker-pill" (click)="state.speak(currentCard.word)" title="Nghe phát âm">🔊</button>
            </div>

            <div class="clue-box">
              <div class="clue-label">Gợi ý ngữ cảnh câu:</div>
              <div class="clue-sentence" [innerHTML]="currentCard.clueExample"></div>
            </div>

            @if (!isRevealed()) {
              <div class="recall-prompt-text">Hãy thử nhớ lại nghĩa tiếng Việt trước khi lật thẻ!</div>
              <button class="btn btn-primary reveal-card-btn" (click)="revealAnswer()">
                <span>👁️ Lật xem đáp án (Reveal)</span>
              </button>
            }
          </div>

          <!-- MẶT SAU THẺ: Hiển thị nghĩa & 3 Nút đánh giá mức nhớ -->
          @if (isRevealed()) {
            <div class="back-face animate-fade-in">
              <div class="meaning-reveal-box">
                <div class="meaning-label">Nghĩa tiếng Việt:</div>
                <div class="meaning-text">{{ currentCard.meaning }}</div>
                <div class="full-ex-vi">{{ currentCard.exampleVi }}</div>
              </div>

              <div class="rating-prompt">Bạn thấy từ này thế nào? (Chọn để thuật toán ghi nhận):</div>
              <div class="rating-buttons-grid">
                <button class="btn rating-btn btn-hard" (click)="rateCard('hard')">
                  <span class="rate-emoji">🔴</span>
                  <span class="rate-title">Khó / Quên</span>
                  <small class="rate-sub">Ôn lại ngày mai</small>
                </button>

                <button class="btn rating-btn btn-good" (click)="rateCard('good')">
                  <span class="rate-emoji">🟡</span>
                  <span class="rate-title">Tạm nhớ</span>
                  <small class="rate-sub">Sau 3 ngày</small>
                </button>

                <button class="btn rating-btn btn-easy" (click)="rateCard('easy')">
                  <span class="rate-emoji">🟢</span>
                  <span class="rate-title">Dễ dàng</span>
                  <small class="rate-sub">Sau 7 ngày</small>
                </button>
              </div>
            </div>
          }
        </div>
      }

      <!-- ======================================================== -->
      <!-- CHẾ ĐỘ 3: TỔNG KẾT PHIÊN ÔN TẬP & NHẬN THƯỞNG (SUMMARY) -->
      <!-- ======================================================== -->
      @else if (viewMode() === 'summary') {
        <div class="review-header">
          <button (click)="viewMode.set('overview')" class="back-link btn-link">
            <span class="chevron">‹</span>
            <span>Tổng kết ôn tập</span>
          </button>
        </div>

        <div class="vintage-card results-container">
          <div class="laurel-wreath">🌿 👑 🌿</div>
          <h2 class="result-title">Phiên ôn tập hoàn tất!</h2>
          <p class="result-tagline">Tất cả các từ vựng đã được tưới nước và cập nhật chu kỳ Ebbinghaus.</p>

          <!-- Thống kê đánh giá -->
          <div class="recall-stats-grid">
            <div class="stat-pill pill-easy">
              <span class="pill-num">{{ easyCount() }}</span>
              <span class="pill-lbl">🟢 Dễ dàng</span>
            </div>
            <div class="stat-pill pill-good">
              <span class="pill-num">{{ goodCount() }}</span>
              <span class="pill-lbl">🟡 Tạm nhớ</span>
            </div>
            <div class="stat-pill pill-hard">
              <span class="pill-num">{{ hardCount() }}</span>
              <span class="pill-lbl">🔴 Cần ôn lại</span>
            </div>
          </div>

          <!-- Phần thưởng nông trại nhận được -->
          <div class="reward-section-title">Phần thưởng chăm sóc nông trại</div>
          <div class="reward-badges-row">
            <div class="reward-kraft-box">
              <div class="reward-icon" [innerHTML]="assets.wateringCan | safeHtml"></div>
              <div class="reward-name">Nước tưới</div>
              <div class="reward-qty">× 2</div>
            </div>
            <div class="reward-kraft-box">
              <div class="reward-icon" [innerHTML]="assets.fertilizerSack | safeHtml"></div>
              <div class="reward-name">Phân bón</div>
              <div class="reward-qty">× 1</div>
            </div>
            <div class="reward-kraft-box">
              <div class="reward-icon">🪙</div>
              <div class="reward-name">Tiền Xu</div>
              <div class="reward-qty">+20</div>
            </div>
            <div class="reward-kraft-box">
              <div class="reward-icon">⭐</div>
              <div class="reward-name">Kinh nghiệm</div>
              <div class="reward-qty">+{{ earnedXp() }}</div>
            </div>
          </div>

          <!-- Các nút hành động -->
          <div class="results-actions-stack">
            <a routerLink="/farm" class="btn btn-primary go-farm-btn">
              🌱 Về nông trại tưới cây ngay
            </a>
            <button class="btn btn-secondary back-overview-btn" (click)="viewMode.set('overview')">
              📅 Xem bảng kế hoạch Ebbinghaus
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .review-screen {
      max-width: 520px;
      margin: 0 auto;
      padding-bottom: 24px;
    }
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .back-link {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--navy);
      text-decoration: none;
      font-weight: 700;
      font-size: 17px;
      cursor: pointer;
    }
    .btn-link {
      background: none;
      border: none;
      padding: 0;
    }
    .chevron {
      font-size: 24px;
      line-height: 1;
    }
    .calendar-btn {
      font-size: 18px;
      padding: 4px 8px;
      border-radius: 6px;
      background: #EAE2D2;
      border: 1px solid var(--border);
      cursor: pointer;
    }
    .step-indicator {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--ink-muted);
    }
    /* Banner Nhiệm vụ ôn tập hôm nay */
    .due-today-banner {
      background: #FAF5EB;
      border: 1.5px solid #D8C7A3;
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 18px;
      box-shadow: 0 4px 12px rgba(60, 48, 25, 0.06);
    }
    .banner-top-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }
    .bell-icon {
      font-size: 26px;
      line-height: 1;
    }
    .banner-title {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 3px;
    }
    .banner-subtitle {
      font-size: 13px;
      color: var(--ink-muted);
      margin: 0;
    }
    .reward-preview-strip {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }
    .reward-tag {
      background: #EAE0CE;
      border-radius: 6px;
      padding: 3px 8px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--navy);
    }
    .start-review-btn {
      width: 100%;
      padding: 13px;
      font-size: 14.5px;
      font-weight: 700;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-shadow: 0 4px 10px rgba(166, 94, 101, 0.25);
    }
    /* Tabs & Table */
    .module-tabs {
      display: flex;
      background: #EAE2D2;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px;
      margin-bottom: 18px;
    }
    .mod-tab {
      flex: 1;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 999px;
      color: var(--ink-muted);
      transition: all 0.15s;
      background: none;
      border: none;
      cursor: pointer;
    }
    .mod-tab.active {
      background: var(--navy);
      color: #FFFDF9;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    }
    .table-card {
      padding: 18px 16px;
      border-radius: 16px;
      margin-bottom: 18px;
    }
    .card-caption-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }
    .table-caption-text {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 700;
      color: var(--navy);
    }
    .ebbinghaus-table-wrapper {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .ebbinghaus-table {
      width: 100%;
      min-width: 280px;
      border-collapse: collapse;
      font-size: 12.5px;
      text-align: center;
    }
    .ebbinghaus-table th {
      padding: 6px;
      color: var(--ink-muted);
      font-weight: 600;
      border-bottom: 1px solid var(--border);
    }
    .ebbinghaus-table td {
      padding: 8px 4px;
      border-bottom: 1px solid rgba(216, 203, 178, 0.4);
    }
    .col-date {
      font-weight: 700;
      color: var(--navy);
      text-align: left;
    }
    .check-icon {
      color: var(--olive);
      font-weight: 800;
      font-size: 14px;
    }
    /* Weekly progress card */
    .weekly-progress-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px;
      border-radius: 14px;
    }
    .pot-icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .progress-details {
      flex: 1;
    }
    .progress-title {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 2px;
    }
    .progress-sub {
      font-size: 12px;
      color: var(--ink-muted);
      margin-bottom: 6px;
    }
    .progress-bar-rail {
      height: 7px;
      background: #EAE2D2;
      border-radius: 999px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: var(--rose);
      border-radius: 999px;
    }
    .progress-percent {
      font-weight: 700;
      font-size: 13.5px;
      color: var(--ink-muted);
    }
    /* CHẾ ĐỘ 2: ACTIVE RECALL FLASHCARD */
    .session-progress-rail {
      height: 6px;
      background: #EAE2D2;
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .session-progress-fill {
      height: 100%;
      background: var(--olive);
      transition: width 0.3s;
    }
    .active-recall-card {
      padding: 24px 20px;
      border-radius: 18px;
      min-height: 380px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1.5px solid var(--border-strong);
      box-shadow: 0 8px 24px rgba(44, 53, 64, 0.08);
    }
    .card-head-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border);
    }
    .recall-badge {
      font-size: 12px;
      font-weight: 700;
      color: var(--olive);
      display: flex;
      align-items: center;
      gap: 6px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .head-art {
      width: 32px;
      height: 32px;
    }
    .word-display {
      font-family: var(--font-serif);
      font-size: 34px;
      font-weight: 700;
      color: var(--navy);
      text-align: center;
      margin: 6px 0;
    }
    .phonetic-audio-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 18px;
    }
    .phonetic-text {
      font-family: var(--font-serif);
      font-size: 16px;
      color: var(--ink-muted);
    }
    .clue-box {
      background: #F4EFE6;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 20px;
      border: 1px solid rgba(216, 203, 178, 0.6);
    }
    .clue-label {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--ink-muted);
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .clue-sentence {
      font-family: var(--font-serif);
      font-size: 15px;
      color: var(--ink);
      line-height: 1.45;
    }
    .recall-prompt-text {
      text-align: center;
      font-size: 13px;
      color: var(--ink-muted);
      font-style: italic;
      margin-bottom: 14px;
    }
    .reveal-card-btn {
      width: 100%;
      padding: 14px;
      font-size: 15px;
      font-weight: 700;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    /* MẶT SAU (REVEALED) */
    .meaning-reveal-box {
      background: #FDFBF7;
      border: 1.5px dashed var(--olive);
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 18px;
      text-align: center;
    }
    .meaning-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--olive);
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .meaning-text {
      font-family: var(--font-serif);
      font-size: 22px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 4px;
    }
    .full-ex-vi {
      font-size: 13px;
      color: var(--ink-muted);
      font-style: italic;
    }
    .rating-prompt {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ink-muted);
      text-align: center;
      margin-bottom: 10px;
    }
    .rating-buttons-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }
    .rating-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 4px;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.15s;
    }
    .rating-btn:hover {
      transform: translateY(-2px);
    }
    .rate-emoji {
      font-size: 16px;
      margin-bottom: 2px;
    }
    .rate-title {
      font-size: 12.5px;
      font-weight: 700;
    }
    .rate-sub {
      font-size: 10px;
      opacity: 0.85;
      margin-top: 1px;
    }
    .btn-hard {
      background: #F9EAEA;
      color: #933C3C;
      border: 1px solid #E6BDBD;
    }
    .btn-good {
      background: #FDF6E2;
      color: #8C6A1A;
      border: 1px solid #EADBAB;
    }
    .btn-easy {
      background: #EBF3E6;
      color: #3B6B2B;
      border: 1px solid #C4DDBB;
    }
    /* CHẾ ĐỘ 3: TỔNG KẾT (SUMMARY) */
    .results-container {
      padding: 26px 20px;
      border-radius: 18px;
      text-align: center;
    }
    .laurel-wreath {
      font-size: 34px;
      margin-bottom: 6px;
    }
    .result-title {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 4px;
    }
    .result-tagline {
      font-size: 13px;
      color: var(--ink-muted);
      margin-bottom: 18px;
    }
    .recall-stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      margin-bottom: 22px;
    }
    .stat-pill {
      border-radius: 10px;
      padding: 10px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .pill-num {
      font-size: 20px;
      font-weight: 800;
    }
    .pill-lbl {
      font-size: 11px;
      font-weight: 600;
    }
    .pill-easy {
      background: #EBF3E6;
      color: #3B6B2B;
    }
    .pill-good {
      background: #FDF6E2;
      color: #8C6A1A;
    }
    .pill-hard {
      background: #F9EAEA;
      color: #933C3C;
    }
    .reward-section-title {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 12px;
    }
    .reward-badges-row {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 22px;
      flex-wrap: wrap;
    }
    .reward-kraft-box {
      width: 80px;
      background: #EAE2D2;
      border: 1px solid var(--border-strong);
      border-radius: 10px;
      padding: 8px 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .reward-icon {
      font-size: 20px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .reward-icon img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .reward-name {
      font-size: 10.5px;
      font-weight: 600;
      color: var(--ink);
    }
    .reward-qty {
      font-size: 12px;
      font-weight: 800;
      color: var(--rose);
    }
    .results-actions-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .go-farm-btn {
      width: 100%;
      padding: 13px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      display: block;
    }
    .back-overview-btn {
      width: 100%;
      padding: 12px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 700;
      background: #EAE2D2;
      border: 1px solid var(--border-strong);
      color: var(--navy);
      cursor: pointer;
    }
    .animate-fade-in {
      animation: fadeIn 0.25s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ================= RESPONSIVE MOBILE (< 600px) ================= */
    @media (max-width: 600px) {
      .review-screen {
        padding-bottom: 24px;
      }
      .due-today-banner {
        padding: 14px 12px;
      }
      .banner-title {
        font-size: 16px;
      }
      .banner-subtitle {
        font-size: 12px;
      }
      .reward-tag {
        font-size: 10.5px;
        padding: 2.5px 6px;
      }
      .start-review-btn {
        padding: 11px;
        font-size: 13.5px;
      }
      .table-card {
        padding: 14px 10px;
      }
      .ebbinghaus-table th, .ebbinghaus-table td {
        padding: 5px 2px;
        font-size: 11px;
      }
      .results-container {
        padding: 20px 12px;
      }
      .result-title {
        font-size: 20px;
      }
    }
  `]
})
export class ReviewComponent implements OnInit {
  state = inject(GameStateService);
  api = inject(FarmApiService);
  router = inject(Router);
  assets = FARM_ASSETS;

  viewMode = signal<'overview' | 'session' | 'summary'>('overview');
  activeTab = signal<'vocab' | 'grammar' | 'listening'>('vocab');

  currentIdx = signal<number>(0);
  isRevealed = signal<boolean>(false);

  // Thống kê kết quả đánh giá Active Recall
  hardCount = signal<number>(0);
  goodCount = signal<number>(0);
  easyCount = signal<number>(0);
  earnedXp = signal<number>(45);

  trackingRows = [
    { date: '12/01', c1: true, c2: true, c3: true, c4: false, c5: false },
    { date: '13/01', c1: true, c2: true, c3: false, c4: false, c5: false },
    { date: '14/01', c1: true, c2: false, c3: false, c4: false, c5: false },
    { date: '15/01', c1: true, c2: false, c3: false, c4: false, c5: false },
    { date: '16/01', c1: false, c2: false, c3: false, c4: false, c5: false },
    { date: '17/01', c1: false, c2: false, c3: false, c4: false, c5: false },
    { date: '18/01', c1: false, c2: false, c3: false, c4: false, c5: false }
  ];

  reviewCards: ReviewCard[] = [
    {
      id: 4,
      word: 'Appointment',
      ipa: '/əˈpɔɪntmənt/',
      type: 'noun',
      meaning: 'Cuộc hẹn',
      exampleEn: 'I have an appointment with the manager at 10 a.m.',
      exampleVi: 'Tôi có một cuộc hẹn với người quản lý lúc 10 giờ sáng.',
      clueExample: 'I have an <strong style="color:var(--rose)">[ ______ ]</strong> with the manager at 10 a.m.'
    },
    {
      id: 5,
      word: 'Briefcase',
      ipa: '/ˈbriːf.keɪs/',
      type: 'noun',
      meaning: 'Cặp tài liệu',
      exampleEn: 'He carried his documents in a leather briefcase.',
      exampleVi: 'Anh ấy đựng các tài liệu của mình trong một chiếc cặp da.',
      clueExample: 'He carried his documents in a leather <strong style="color:var(--rose)">[ ______ ]</strong>.'
    },
    {
      id: 6,
      word: 'Conference',
      ipa: '/ˈkɒn.fər.əns/',
      type: 'noun',
      meaning: 'Hội nghị',
      exampleEn: 'The annual conference will be held next week.',
      exampleVi: 'Hội nghị thường niên sẽ được tổ chức vào tuần tới.',
      clueExample: 'The annual <strong style="color:var(--rose)">[ ______ ]</strong> will be held next week.'
    },
    {
      id: 7,
      word: 'Contract',
      ipa: '/ˈkɒn.trækt/',
      type: 'noun',
      meaning: 'Hợp đồng',
      exampleEn: 'The new employee signed a one-year contract.',
      exampleVi: 'Nhân viên mới đã ký hợp đồng một năm.',
      clueExample: 'The new employee signed a one-year <strong style="color:var(--rose)">[ ______ ]</strong>.'
    },
    {
      id: 8,
      word: 'Salary',
      ipa: '/ˈsæl.ər.i/',
      type: 'noun',
      meaning: 'Tiền lương',
      exampleEn: 'The company offers a competitive salary package.',
      exampleVi: 'Công ty cung cấp một gói lương cạnh tranh.',
      clueExample: 'The company offers a competitive <strong style="color:var(--rose)">[ ______ ]</strong> package.'
    },
    {
      id: 9,
      word: 'Budget',
      ipa: '/ˈbʌdʒ.ɪt/',
      type: 'noun',
      meaning: 'Ngân sách',
      exampleEn: 'The marketing department exceeded its budget this quarter.',
      exampleVi: 'Bộ phận tiếp thị đã vượt quá ngân sách trong quý này.',
      clueExample: 'The marketing department exceeded its <strong style="color:var(--rose)">[ ______ ]</strong> this quarter.'
    },
    {
      id: 10,
      word: 'Client',
      ipa: '/ˈklaɪ.ənt/',
      type: 'noun',
      meaning: 'Khách hàng',
      exampleEn: 'The company provides excellent service to its clients.',
      exampleVi: 'Công ty cung cấp dịch vụ xuất sắc cho khách hàng.',
      clueExample: 'The company provides excellent service to its <strong style="color:var(--rose)">[ ______ ]</strong>.'
    },
    {
      id: 11,
      word: 'Deadline',
      ipa: '/ˈded.laɪn/',
      type: 'noun',
      meaning: 'Hạn chót',
      exampleEn: 'We have to meet the deadline for this project.',
      exampleVi: 'Chúng tôi phải kịp hạn chót cho dự án này.',
      clueExample: 'We have to meet the <strong style="color:var(--rose)">[ ______ ]</strong> for this project.'
    }
  ];

  ngOnInit() {
    // Nếu có activeVocabularies từ backend, nạp vào bộ cỗ bài ôn tập
    const vocabs = this.state.activeVocabularies();
    if (vocabs && vocabs.length > 0) {
      this.reviewCards = vocabs.slice(0, 8).map(v => {
        const word = v.word;
        const ex = v.exampleEn || `Example for ${word}.`;
        const regex = new RegExp(word, 'gi');
        const clue = ex.replace(regex, `<strong style="color:var(--rose)">[ ______ ]</strong>`);

        return {
          id: v.id,
          word: v.word,
          ipa: v.phonetic || v.ipaUs || '',
          type: v.wordType || 'noun',
          meaning: v.meaningVi,
          exampleEn: ex,
          exampleVi: v.exampleVi || '',
          clueExample: clue
        };
      });
    }
  }

  get currentCard(): ReviewCard {
    const list = this.reviewCards;
    const idx = Math.min(this.currentIdx(), Math.max(0, list.length - 1));
    return list[idx] || list[0];
  }

  sessionProgressPercent = computed(() => {
    return Math.round(((this.currentIdx() + 1) / this.reviewCards.length) * 100);
  });

  startReviewSession() {
    this.currentIdx.set(0);
    this.isRevealed.set(false);
    this.hardCount.set(0);
    this.goodCount.set(0);
    this.easyCount.set(0);
    this.viewMode.set('session');
  }

  revealAnswer() {
    this.isRevealed.set(true);
  }

  rateCard(rating: 'hard' | 'good' | 'easy') {
    if (rating === 'hard') this.hardCount.update(c => c + 1);
    if (rating === 'good') this.goodCount.update(c => c + 1);
    if (rating === 'easy') this.easyCount.update(c => c + 1);

    if (this.currentIdx() < this.reviewCards.length - 1) {
      this.currentIdx.update(i => i + 1);
      this.isRevealed.set(false);
    } else {
      this.finishSession();
    }
  }

  finishSession() {
    const lessonId = this.state.activeLessonId() || 4;
    const hard = this.hardCount();
    const good = this.goodCount();
    const easy = this.easyCount();

    const xpGained = 30 + (easy * 5);
    this.earnedXp.set(xpGained);

    // Gửi kết quả lên backend API
    this.api.completeReview(lessonId, hard, good, easy).subscribe({
      next: (res: CompleteReviewResultDto) => {
        // Tự động cộng Nước tưới, Phân bón, Xu & XP
        this.state.addXp(res.rewardXp);
        this.state.coins.update(c => c + res.rewardCoins);
        this.state.inventory.update(inv => ({
          ...inv,
          care: {
            water: inv.care.water + res.rewardWater,
            fertilizer: inv.care.fertilizer + res.rewardFertilizer
          }
        }));
        this.state.showToast(`🎉 Đã tưới nước cho từ vựng! Nhận +${res.rewardWater} Nước tưới, +${res.rewardCoins} Xu, +${res.rewardXp} XP`);
        this.viewMode.set('summary');
      },
      error: () => {
        // Fallback cập nhật offline
        this.state.addXp(xpGained);
        this.state.coins.update(c => c + 20);
        this.state.inventory.update(inv => ({
          ...inv,
          care: {
            water: inv.care.water + 2,
            fertilizer: inv.care.fertilizer + 1
          }
        }));
        this.state.showToast('🎉 Đã hoàn thành phiên ôn tập Active Recall!');
        this.viewMode.set('summary');
      }
    });
  }

  exitSession() {
    this.viewMode.set('overview');
  }
}
