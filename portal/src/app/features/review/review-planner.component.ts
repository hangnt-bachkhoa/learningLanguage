import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../core/services/game-state.service';
import { UserVocabReview, ReviewStage, DailyCohortRow } from '../../core/models/game.models';
import { formatVnDate, formatShortVnDate } from '../../core/utils/ebbinghaus.util';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { PosTagBadgeComponent } from '../../shared/components/pos-tag-badge/pos-tag-badge.component';

@Component({
  selector: 'app-review-planner',
  standalone: true,
  imports: [CommonModule, PosTagBadgeComponent],
  template: `
    <div class="review-planner-container">
      <!-- 1. TOP SUMMARY BAR (Thanh tổng quan điều phối) -->
      <div class="vintage-card summary-card">
        <div class="summary-header">
          <div class="summary-left">
            <span class="bell-glyph">🔔</span>
            <div>
              <h3 class="summary-title">Lịch Ôn Tập Ngắt Quãng (Ebbinghaus)</h3>
              <p class="summary-sub">
                Hôm nay có <strong class="highlight-count">{{ state.dueTodayCount() }} từ vựng</strong> đến hạn ôn tập Active Recall.
              </p>
            </div>
          </div>

          <!-- Lượt nhận Nước & Phân bón hôm nay (Cap: 5 lần/ngày) -->
          <div class="reward-quota-pill" title="Mỗi phiên ôn tập hoàn tất thưởng +1 Nước +1 Phân bón (Tối đa 5 lượt/ngày)">
            <span class="quota-label">💧+🌿 Thưởng hôm nay:</span>
            <span class="quota-val">{{ state.dailyReviewRewardsClaimed() }}/5 lượt</span>
          </div>
        </div>

        <div class="summary-action-row">
          <button
            class="btn btn-primary start-all-btn"
            [disabled]="state.dueTodayCount() === 0"
            (click)="reviewAllDue()">
            <span>⚡ Ôn tập tất cả từ đến hạn ({{ Math.min(10, state.dueTodayCount()) }}/{{ state.dueTodayCount() }} từ)</span>
          </button>
          <div class="care-perk-hint">
            <img src="assets/farm-assets/tools/watering_can.png" class="mini-tool-icon pixel-sprite" alt="Nước" />
            <span>+1 Nước</span>
            <span class="dot-sep">·</span>
            <img src="assets/farm-assets/tools/fertilizer.png" class="mini-tool-icon pixel-sprite" alt="Phân" />
            <span>+1 Phân bón</span>
            <span class="hint-paren">(mỗi phiên ôn)</span>
          </div>
        </div>
      </div>

      <!-- 2. BẢNG CHU KỲ EBBINGHAUS (COHORT TABLE) -->
      <div class="vintage-card table-wrapper-card">
        <div class="table-card-header">
          <div class="header-text-group">
            <span class="leaf-icon">🌿</span>
            <h4 class="table-card-title">Chu kỳ ôn tập</h4>
          </div>
          <span class="total-cohorts-badge">{{ state.dailyCohorts().length }} ngày học</span>
        </div>

        @if (state.dailyCohorts().length === 0) {
          <div class="empty-cohorts-box">
            <div class="empty-icon">📖</div>
            <p class="empty-title">Chưa có từ vựng nào trong danh sách ôn tập</p>
            <p class="empty-desc">
              Khi bạn học từ vựng trong mục <strong>Từ vựng</strong> và bấm <em>"Đã học"</em>, từ sẽ tự động được xếp vào chu kỳ Ebbinghaus 5 giai đoạn tại đây!
            </p>
          </div>
        } @else {
          <!-- Table with horizontal scroll container for mobile screens -->
          <div class="ebbinghaus-scroll-rail">
            <table class="ebbinghaus-table">
              <thead>
                <tr>
                  <th class="th-no">No</th>
                  <th class="th-date">Ngày học</th>
                  <th class="th-count">Số từ</th>
                  <th class="th-stage">Lần đầu</th>
                  <th class="th-stage">Day 1</th>
                  <th class="th-stage">Day 3</th>
                  <th class="th-stage">Day 7</th>
                  <th class="th-stage">Day 14</th>
                </tr>
              </thead>
              <tbody>
                @for (cohort of state.dailyCohorts(); track cohort.learnedDate) {
                  <tr>
                    <td class="col-no">#{{ cohort.index }}</td>
                    <td class="col-date clickable" (click)="toggleCohortExpand(cohort.learnedDate)" title="Bấm để xem danh sách từ và loại từ">
                      <span class="date-main">{{ formatDate(cohort.learnedDate) }}</span>
                      @if (cohort.learnedDate === state.todayVn()) {
                        <span class="today-tag">Hôm nay</span>
                      }
                    </td>
                    <td class="col-count clickable" (click)="toggleCohortExpand(cohort.learnedDate)" title="Bấm để xem danh sách từ và loại từ">
                      <span class="count-bubble">{{ cohort.count }} từ ▾</span>
                    </td>

                    <!-- Cột 1: Lần đầu (Luôn hoàn thành khi vừa học) -->
                    <td class="col-cell">
                      <span class="status-circle done" title="Đã học lần đầu">✓</span>
                    </td>

                    <!-- Cột 2: Day 1 -->
                    <td class="col-cell">
                      @if (cohort.day1Status === 'done') {
                        <span class="status-circle done" title="Đã vượt qua bài kiểm tra Day 1">✓</span>
                      } @else if (cohort.day1Status === 'due') {
                        <button
                          class="due-pill-btn"
                          (click)="reviewCohortStage(cohort.learnedDate, 1)"
                          title="Bấm để làm bài kiểm tra Day 1">
                          ⚡ Ôn ngay ({{ cohort.day1DueCount }})
                        </button>
                      } @else {
                        <span class="lock-badge" title="Chưa đến hạn">
                          🔒 {{ cohort.day1NextDate ? formatShortDate(cohort.day1NextDate) : '--' }}
                        </span>
                      }
                    </td>

                    <!-- Cột 3: Day 3 -->
                    <td class="col-cell">
                      @if (cohort.day3Status === 'done') {
                        <span class="status-circle done" title="Đã vượt qua bài kiểm tra Day 3">✓</span>
                      } @else if (cohort.day3Status === 'due') {
                        <button
                          class="due-pill-btn"
                          (click)="reviewCohortStage(cohort.learnedDate, 2)"
                          title="Bấm để làm bài kiểm tra Day 3">
                          ⚡ Ôn ngay ({{ cohort.day3DueCount }})
                        </button>
                      } @else {
                        <span class="lock-badge" title="Chưa đến hạn">
                          🔒 {{ cohort.day3NextDate ? formatShortDate(cohort.day3NextDate) : '--' }}
                        </span>
                      }
                    </td>

                    <!-- Cột 4: Day 7 -->
                    <td class="col-cell">
                      @if (cohort.day7Status === 'done') {
                        <span class="status-circle done" title="Đã vượt qua bài kiểm tra Day 7">✓</span>
                      } @else if (cohort.day7Status === 'due') {
                        <button
                          class="due-pill-btn"
                          (click)="reviewCohortStage(cohort.learnedDate, 3)"
                          title="Bấm để làm bài kiểm tra Day 7">
                          ⚡ Ôn ngay ({{ cohort.day7DueCount }})
                        </button>
                      } @else {
                        <span class="lock-badge" title="Chưa đến hạn">
                          🔒 {{ cohort.day7NextDate ? formatShortDate(cohort.day7NextDate) : '--' }}
                        </span>
                      }
                    </td>

                    <!-- Cột 5: Day 14 (Thuộc lòng) -->
                    <td class="col-cell">
                      @if (cohort.day14Status === 'done') {
                        <span class="status-circle done mastered" title="Đã thuộc lòng vĩnh viễn (Mastered)">👑</span>
                      } @else if (cohort.day14Status === 'due') {
                        <button
                          class="due-pill-btn gold"
                          (click)="reviewCohortStage(cohort.learnedDate, 4)"
                          title="Bấm để hoàn tất mốc Thuộc Lòng Day 14">
                          👑 Ôn ngay ({{ cohort.day14DueCount }})
                        </button>
                      } @else {
                        <span class="lock-badge" title="Chưa đến hạn">
                          🔒 {{ cohort.day14NextDate ? formatShortDate(cohort.day14NextDate) : '--' }}
                        </span>
                      }
                    </td>
                  </tr>

                  <!-- Chi tiết danh sách từ vựng trong ngày học kèm thẻ loại từ compact -->
                  @if (expandedCohortDate() === cohort.learnedDate) {
                    <tr class="cohort-words-subrow">
                      <td colspan="7">
                        <div class="cohort-words-box">
                          <div class="subrow-title">Từ vựng học ngày {{ formatDate(cohort.learnedDate) }}:</div>
                          <div class="cohort-words-grid">
                            @for (w of cohort.words; track w.vocabId) {
                              <div class="cohort-word-chip">
                                <span class="chip-word">{{ w.word }}</span>
                                <app-pos-tag [type]="getWordType(w.word)" mode="compact"></app-pos-tag>
                              </div>
                            }
                          </div>
                        </div>
                      </td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        }

        <!-- Ghi chú nguyên lý Ebbinghaus -->
        <div class="table-footer-legend">
          <div class="legend-item">
            <span class="legend-dot done">✓</span>
            <span>Đã vượt qua Quiz ôn tập</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot due">⚡</span>
            <span>Đến hạn hôm nay (Bấm để ôn)</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot lock">🔒</span>
            <span>Đang trong khoảng cách ngắt quãng</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot crown">👑</span>
            <span>Đã thuộc lòng vĩnh viễn</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .review-planner-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* 1. TOP SUMMARY CARD */
    .summary-card {
      padding: 18px 20px;
      border-radius: 16px;
      background: #FFFDF9;
      border: 1.5px solid var(--border, #D9C8B5);
      box-shadow: 0 4px 12px rgba(38, 56, 71, 0.05);
    }
    .summary-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .summary-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .bell-glyph {
      font-size: 26px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.12));
    }
    .summary-title {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 18px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0 0 3px;
    }
    .summary-sub {
      font-size: 13px;
      color: var(--ink-muted, #5A6D7C);
      margin: 0;
    }
    .highlight-count {
      color: var(--rose, #A65E65);
      font-weight: 700;
      font-size: 14px;
    }
    .reward-quota-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #F4EFE6;
      border: 1px solid #D9C8B5;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 600;
      color: var(--navy, #263847);
    }
    .quota-val {
      color: var(--olive, #78815D);
      font-weight: 700;
    }

    .summary-action-row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      padding-top: 10px;
      border-top: 1px dashed var(--border, #D9C8B5);
    }
    .start-all-btn {
      padding: 10px 18px;
      font-size: 13.5px;
      font-weight: 700;
      border-radius: 10px;
      box-shadow: 0 3px 8px rgba(166, 94, 101, 0.25);
    }
    .start-all-btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      box-shadow: none;
    }
    .care-perk-hint {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      font-weight: 600;
      color: var(--ink-muted, #5A6D7C);
    }
    .mini-tool-icon {
      width: 18px;
      height: 18px;
      object-fit: contain;
    }
    .dot-sep {
      opacity: 0.5;
    }
    .hint-paren {
      font-size: 11px;
      opacity: 0.8;
    }

    /* 2. COHORT TABLE CARD */
    .table-wrapper-card {
      padding: 18px 20px;
      border-radius: 16px;
      background: #FFFDF9;
      border: 1.5px solid var(--border, #D9C8B5);
      box-shadow: 0 4px 12px rgba(38, 56, 71, 0.05);
    }
    .table-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .header-text-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .leaf-icon {
      font-size: 18px;
    }
    .table-card-title {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0;
    }
    .total-cohorts-badge {
      font-size: 11.5px;
      font-weight: 700;
      background: #F4EFE6;
      border: 1px solid #D9C8B5;
      padding: 3px 9px;
      border-radius: 999px;
      color: var(--navy, #263847);
    }

    .empty-cohorts-box {
      text-align: center;
      padding: 36px 16px;
      background: #FAF6EF;
      border: 1px dashed #D9C8B5;
      border-radius: 12px;
    }
    .empty-icon {
      font-size: 36px;
      margin-bottom: 8px;
    }
    .empty-title {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0 0 6px;
    }
    .empty-desc {
      font-size: 12.5px;
      color: var(--ink-muted, #5A6D7C);
      max-width: 420px;
      margin: 0 auto;
      line-height: 1.5;
    }

    /* Horizontal scroll rail for table on mobile */
    .ebbinghaus-scroll-rail {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      margin-bottom: 12px;
    }
    .ebbinghaus-table {
      width: 100%;
      min-width: 580px;
      border-collapse: separate;
      border-spacing: 0;
      font-size: 12.5px;
    }
    .ebbinghaus-table th {
      background: #EFE8DA;
      color: var(--navy, #263847);
      font-weight: 700;
      padding: 10px 8px;
      text-align: center;
      border-bottom: 2px solid #D9C8B5;
      white-space: nowrap;
    }
    .ebbinghaus-table th.th-no {
      width: 44px;
      border-top-left-radius: 8px;
    }
    .ebbinghaus-table th.th-date {
      text-align: left;
      padding-left: 12px;
      width: 120px;
    }
    .ebbinghaus-table th.th-count {
      width: 70px;
    }
    .ebbinghaus-table th.th-stage:last-child {
      border-top-right-radius: 8px;
    }

    .ebbinghaus-table td {
      padding: 10px 8px;
      border-bottom: 1px solid #ECE3D4;
      text-align: center;
      vertical-align: middle;
    }
    .ebbinghaus-table tr:last-child td {
      border-bottom: none;
    }
    .col-no {
      font-family: monospace;
      font-weight: 700;
      color: var(--ink-muted, #7A8D9C);
      font-size: 11px;
    }
    .col-date {
      text-align: left !important;
      padding-left: 12px !important;
      font-weight: 600;
      color: var(--navy, #263847);
      white-space: nowrap;
    }
    .today-tag {
      font-size: 9.5px;
      font-weight: 700;
      background: #F3E4E5;
      color: var(--rose, #A65E65);
      border-radius: 4px;
      padding: 1px 4px;
      margin-left: 4px;
    }
    .col-count {
      font-weight: 600;
      color: var(--navy, #263847);
    }
    .count-bubble {
      background: #F4EFE6;
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 11.5px;
    }

    .col-cell {
      position: relative;
    }

    /* Cell States */
    .status-circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      user-select: none;
    }
    .status-circle.done {
      background: var(--rose, #A65E65);
      color: #FFFDF9;
      font-weight: 800;
      font-size: 13px;
      box-shadow: 0 1px 3px rgba(166, 94, 101, 0.35);
    }
    .status-circle.mastered {
      background: #78815D;
      font-size: 14px;
    }

    .due-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: #FCE8CA;
      border: 1.5px solid #E8A838;
      color: #8C5311;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 8px;
      border-radius: 999px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(232, 168, 56, 0.25);
      transition: all 0.15s;
      white-space: nowrap;
    }
    .due-pill-btn:hover {
      background: #F8D9A8;
      transform: translateY(-1px);
    }
    .due-pill-btn.gold {
      background: #FFF3CC;
      border-color: #D4A31C;
      color: #7A5805;
    }

    .lock-badge {
      display: inline-block;
      font-size: 10.5px;
      font-weight: 600;
      color: var(--ink-muted, #7A8D9C);
      background: #F0EAE1;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }

    /* Footer Legend */
    .table-footer-legend {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding-top: 12px;
      border-top: 1px dashed #D9C8B5;
      flex-wrap: wrap;
      font-size: 11.5px;
      color: var(--ink-muted, #5A6D7C);
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .legend-dot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 10px;
      font-weight: 700;
    }
    .legend-dot.done {
      background: var(--rose, #A65E65);
      color: #FFF;
    }
    .legend-dot.due {
      background: #FCE8CA;
      color: #8C5311;
      border: 1px solid #E8A838;
    }
    .legend-dot.lock {
      background: #F0EAE1;
      color: #7A8D9C;
    }
    .legend-dot.crown {
      background: #78815D;
      color: #FFF;
    }

    @media (max-width: 600px) {
      .summary-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .summary-action-row {
        flex-direction: column;
        align-items: stretch;
      }
      .start-all-btn {
        width: 100%;
        text-align: center;
        justify-content: center;
      }
      .clickable {
        cursor: pointer;
      }
      .clickable:hover {
        text-decoration: underline;
      }
      .cohort-words-subrow td {
        background: #FAF7F0;
        padding: 12px 14px;
        border-bottom: 2px solid #EAE3D5;
      }
      .cohort-words-box {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .subrow-title {
        font-size: 12px;
        font-weight: 700;
        color: var(--navy, #263847);
      }
      .cohort-words-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .cohort-word-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #FFFDF9;
        border: 1px solid #D9C8B5;
        border-radius: 8px;
        padding: 4px 8px;
        font-size: 12.5px;
      }
      .chip-word {
        font-weight: 700;
        color: var(--navy, #263847);
      }
      .table-wrapper-card {
        padding: 14px 12px;
      }
    }
  `]
})
export class ReviewPlannerComponent {
  state = inject(GameStateService);
  assets = FARM_ASSETS;
  Math = Math;

  expandedCohortDate = signal<string | null>(null);

  startSession = output<UserVocabReview[]>();

  toggleCohortExpand(dateStr: string) {
    this.expandedCohortDate.update(curr => curr === dateStr ? null : dateStr);
  }

  getWordType(word?: string): string {
    if (!word) return 'noun';
    const info = this.state.findVocab(word);
    return info?.vocab?.wordType || 'noun';
  }

  formatDate(dateStr: string): string {
    return formatVnDate(dateStr);
  }

  formatShortDate(dateStr: string): string {
    return formatShortVnDate(dateStr);
  }

  reviewAllDue() {
    const dueBatch = this.state.getAllDueWordsBatch(10);
    if (dueBatch.length === 0) {
      this.state.showToast('✅ Bạn không có từ nào đến hạn cần ôn hôm nay!');
      return;
    }
    this.startSession.emit(dueBatch);
  }

  reviewCohortStage(learnedDate: string, targetStage: ReviewStage) {
    const dueCohortWords = this.state.getDueWordsForCohortAndStage(learnedDate, targetStage, 10);
    if (dueCohortWords.length === 0) {
      this.state.showToast('ℹ️ Các từ trong mốc này chưa đến hạn ôn tập.');
      return;
    }
    this.startSession.emit(dueCohortWords);
  }
}
