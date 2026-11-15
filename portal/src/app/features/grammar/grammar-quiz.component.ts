import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GrammarService, GrammarQuizSubmitResult } from '../../core/services/grammar.service';
import { GrammarTopic, GrammarQuestion } from '../../core/constants/default-grammar-topics.constant';
import { GameStateService } from '../../core/services/game-state.service';

interface QueueItem {
  uid: number; // Unique identifier for tracking first try
  originalIdx: number;
  question: GrammarQuestion;
}

@Component({
  selector: 'app-grammar-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="grammar-quiz-screen">
      @if (!isFinished()) {
        <!-- HEADER TIẾN ĐỘ & 3 SAO -->
        <header class="quiz-header">
          <a [routerLink]="['/grammar', topic()?.code]" class="back-link" title="Quay lại lý thuyết">
            <span class="chevron">‹</span>
            <span class="header-title">{{ topic()?.titleEn || 'Ngữ pháp' }}</span>
          </a>

          <!-- THANH TIẾN ĐỘ ĐƠN ĐIỆU (MONOTONIC) -->
          <div class="progress-container">
            <div class="progress-bar-rail">
              <div class="progress-bar-fill" [style.width.%]="progressPercent()"></div>
            </div>
            <span class="progress-count">{{ masteredUids().size }}/{{ totalInitial() }}</span>
          </div>

          <!-- 3 GIỌT SƯƠNG / SAO CHỈ BÁO HẠNG -->
          <div class="dew-drops-row" [title]="dewDropsTooltip()">
            @for (active of starsState(); track $index) {
              <span class="star-badge" [class.star-active]="active" [class.star-lost]="!active">
                ★
              </span>
            }
          </div>
        </header>

        @if (queue().length === 0) {
          <div class="vintage-card empty-card">
            <span class="pulse-icon">🍃</span>
            <p>Không có câu hỏi kiểm tra cho chuyên đề này.</p>
            <a routerLink="/grammar" class="btn btn-secondary">Về danh mục chuyên đề</a>
          </div>
        } @else {
          <!-- ======================================================== -->
          <!-- THÔNG BÁO BANNER PHÍA TRÊN NỘI DUNG (TOP BANNER FEEDBACK)-->
          <!-- ======================================================== -->
          @if (feedbackState() !== 'none') {
            <div
              class="feedback-banner"
              [class.sheet-correct]="feedbackState() === 'correct'"
              [class.sheet-wrong]="feedbackState() === 'wrong'">
              <div class="sheet-content">
                <div class="sheet-info">
                  @if (feedbackState() === 'correct') {
                    <div class="sheet-header correct-header">
                      <span class="status-icon">✓</span>
                      <span class="status-title">Chính xác!</span>
                    </div>
                  } @else {
                    <div class="sheet-header wrong-header">
                      <span class="status-icon">✕</span>
                      <span class="status-title">
                        Chưa chính xác · Đáp án đúng: {{ correctOptionText() }}
                      </span>
                    </div>
                  }
                  <!-- GIẢI THÍCH CHI TIẾT NGỮ PHÁP (EXPLANATION) -->
                  @if (currentExplanation(); as exp) {
                    <p class="sheet-sub">💡 <strong>Giải thích:</strong> {{ exp }}</p>
                  }
                </div>

                <!-- NÚT TIẾP TỤC ĐỂ CHUYỂN HÀNG ĐỢI (Algorithm 3: Error Recycling) -->
                <button
                  class="btn sheet-action-btn"
                  [class.btn-success]="feedbackState() === 'correct'"
                  [class.btn-danger]="feedbackState() === 'wrong'"
                  (click)="continueQueue()">
                  @if (feedbackState() === 'correct') {
                    {{ queue().length === 1 ? 'Hoàn tất bài thi ›' : 'Tiếp tục ›' }}
                  } @else {
                    Đã hiểu ›
                  }
                </button>
              </div>
            </div>
          }

          @if (currentQuestion(); as qItem) {
            <!-- THẺ CÂU HỎI NGỮ PHÁP PHẲNG (2D FLAT NATURALIST) -->
            <main class="question-container">
              <div class="vintage-card question-card">
                <div class="question-type-badge">
                  <span>📝 Ngữ pháp Part 5</span>
                </div>

                <!-- CÂU HỎI TRẮC NGHIỆM -->
                <div class="prompt-box">
                  <h2 class="grammar-prompt">{{ qItem.question.prompt }}</h2>
                </div>

                <!-- 4 ĐÁP ÁN TRẮC NGHIỆM PHẲNG (A, B, C, D) -->
                <div class="options-grid">
                  @for (opt of qItem.question.options; track opt; let idx = $index) {
                    <button
                      type="button"
                      class="option-flat-btn"
                      [class.selected]="selectedOptionIdx() === idx"
                      [disabled]="feedbackState() !== 'none'"
                      (click)="selectOption(idx)">
                      <span class="option-idx">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                      <span class="option-content">{{ opt }}</span>
                    </button>
                  }
                </div>

                <!-- NÚT HÀNH ĐỘNG -->
                <div class="check-action-bar">
                  @if (feedbackState() === 'none') {
                    <button
                      class="btn btn-primary check-btn"
                      [disabled]="selectedOptionIdx() === null"
                      (click)="checkAnswer()">
                      Kiểm tra đáp án
                    </button>
                  } @else {
                    <button
                      class="btn check-btn"
                      [class.btn-success]="feedbackState() === 'correct'"
                      [class.btn-danger]="feedbackState() === 'wrong'"
                      (click)="continueQueue()">
                      @if (feedbackState() === 'correct') {
                        {{ queue().length === 1 ? 'Hoàn tất bài thi ›' : 'Tiếp tục ›' }}
                      } @else {
                        Đã hiểu ›
                      }
                    </button>
                  }
                </div>
              </div>
            </main>
          }
        }
      } @else {
        <!-- ======================================================== -->
        <!-- MÀN HÌNH TỔNG KẾT & NHẬN THƯỞNG 3-STAR DELTA REWARDS     -->
        <!-- ======================================================== -->
        <main class="results-screen">
          <div class="vintage-card results-card">
            <div class="laurel-wreath">🌿</div>

            <div class="stars-display-row">
              <span class="star-item" [class.active-star]="(result()?.stars || 1) >= 1">⭐</span>
              <span class="star-item star-mid" [class.active-star]="(result()?.stars || 1) >= 2">⭐</span>
              <span class="star-item" [class.active-star]="(result()?.stars || 1) >= 3">⭐</span>
            </div>

            <h1 class="result-title">
              @if ((result()?.stars || 1) === 3) {
                Xuất sắc! Đạt hạng 3 Sao
              } @else if ((result()?.stars || 1) === 2) {
                Khá tốt! Đạt hạng 2 Sao
              } @else {
                Hoàn thành! Đạt hạng 1 Sao
              }
            </h1>

            <p class="result-subtitle">
              {{ result()?.message }}
            </p>

            @if (result()?.isNewRecord) {
              <div class="new-record-pill">
                🏆 KỶ LỤC MỚI VỀ SAO
              </div>
            }

            <!-- BẢNG ĐIỂM CHI TIẾT -->
            <div class="stats-summary-card">
              <div class="summary-col">
                <span class="col-value">{{ result()?.firstTryCorrect || 0 }}/{{ totalInitial() }}</span>
                <span class="col-label">Đúng lần đầu</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-col">
                <span class="col-value">{{ result()?.scorePercent || 100 }}%</span>
                <span class="col-label">Độ chính xác</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-col">
                <span class="col-value">{{ result()?.stars || 1 }} ★</span>
                <span class="col-label">Xếp hạng</span>
              </div>
            </div>

            <!-- PHẦN THƯỞNG DELTA REWARD (10-20-30 XP & 20-35-50 Xu) -->
            <div class="reward-section">
              <div class="reward-heading">Phần thưởng Ngữ pháp (Quiz Delta)</div>
              @if ((result()?.rewardXp || 0) > 0 || (result()?.rewardCoins || 0) > 0) {
                <div class="rewards-grid">
                  @if ((result()?.rewardCoins || 0) > 0) {
                    <div class="reward-item-box">
                      <span class="reward-emoji">🪙</span>
                      <span class="reward-title">Xu vàng</span>
                      <span class="reward-qty">+{{ result()?.rewardCoins }}</span>
                    </div>
                  }
                  @if ((result()?.rewardXp || 0) > 0) {
                    <div class="reward-item-box">
                      <span class="reward-emoji">✨</span>
                      <span class="reward-title">Điểm XP</span>
                      <span class="reward-qty">+{{ result()?.rewardXp }}</span>
                    </div>
                  }
                </div>
              } @else {
                <div class="max-reward-notice">
                  <span class="notice-icon">🎖️</span>
                  <span>Đã nhận tối đa ở các lần thi trước (Kỷ lục: {{ result()?.bestStarsClaimed }}★) · Không lặp lại Xu & XP khi làm lại</span>
                </div>
              }
            </div>

            <!-- NÚT ĐIỀU HƯỚNG TIẾP THEO -->
            <div class="actions-stack">
              <button class="btn btn-primary retake-btn" (click)="retakeQuiz()">
                🔄 Luyện tập lại bài này
              </button>
              <a [routerLink]="['/grammar', topic()?.code]" class="btn btn-secondary back-detail-btn">
                📖 Ôn lại lý thuyết chuyên đề
              </a>
              <a routerLink="/grammar" class="btn btn-outline back-list-btn">
                📜 Danh sách 13 chuyên đề ngữ pháp
              </a>
              <a routerLink="/farm" class="btn btn-outline go-farm-btn">
                🌱 Về Nông trại chăm sóc cây
              </a>
            </div>
          </div>
        </main>
      }
    </div>
  `,
  styles: [`
    .grammar-quiz-screen {
      max-width: 580px;
      margin: 0 auto;
      padding: 8px 16px 40px;
      position: relative;
    }

    /* HEADER */
    .quiz-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }

    .back-link {
      display: flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      color: var(--navy);
      font-weight: 700;
      font-size: 14.5px;
      flex-shrink: 0;
      max-width: 140px;
    }

    .chevron {
      font-size: 24px;
      line-height: 1;
    }

    .header-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* TIẾN ĐỘ ĐƠN ĐIỆU */
    .progress-container {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .progress-bar-rail {
      flex: 1;
      height: 9px;
      background: #EAE2D2;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid #DDD3C3;
    }

    .progress-bar-fill {
      height: 100%;
      background: #78815D;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .progress-count {
      font-size: 12px;
      font-weight: 700;
      color: var(--ink-muted);
      white-space: nowrap;
    }

    /* 3 SAO CHỈ BÁO */
    .dew-drops-row {
      display: flex;
      gap: 3px;
      padding: 4px 8px;
      background: #FAF6EF;
      border: 1px solid #E2D7C7;
      border-radius: 999px;
      align-items: center;
    }

    .star-badge {
      font-size: 14px;
      transition: all 0.25s ease;
      color: #DDD3C3;
    }

    .star-badge.star-active {
      color: #E2A03F;
    }

    .star-badge.star-lost {
      opacity: 0.3;
      filter: grayscale(100%);
    }

    /* BANNER PHẢN HỒI */
    .feedback-banner {
      width: 100%;
      margin-bottom: 14px;
      padding: 14px 18px;
      border-radius: 16px;
      box-shadow: 0 3px 12px rgba(44, 53, 64, 0.05);
      animation: slideDown 0.25s ease-out;
      box-sizing: border-box;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .sheet-correct {
      background: #D7ECD9;
      border: 1.5px solid #78815D;
    }

    .sheet-wrong {
      background: #FBE8E6;
      border: 1.5px solid #A65E65;
    }

    .sheet-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .sheet-info {
      flex: 1;
    }

    .sheet-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .correct-header {
      color: #3B5B3B;
    }

    .wrong-header {
      color: #8C3E44;
    }

    .status-icon {
      font-size: 18px;
    }

    .sheet-sub {
      font-size: 13.5px;
      color: #3C443D;
      line-height: 1.45;
      margin: 0;
    }

    .sheet-action-btn {
      padding: 9px 18px;
      font-size: 13.5px;
      font-weight: 700;
      border-radius: 10px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* THẺ CÂU HỎI */
    .question-container {
      margin-bottom: 24px;
    }

    .question-card {
      padding: 24px 22px;
      border-radius: 18px;
      text-align: center;
      border: 1.5px solid #DDD3C3;
      background: #FAF6EF;
      box-shadow: 0 4px 12px rgba(44, 53, 64, 0.04);
    }

    .question-type-badge {
      display: inline-block;
      padding: 4px 12px;
      background: #EAEFE6;
      border: 1px solid #C4D7BE;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      color: #385E38;
      margin-bottom: 18px;
    }

    .prompt-box {
      margin-bottom: 22px;
    }

    .grammar-prompt {
      font-family: var(--font-serif);
      font-size: 20px;
      font-weight: 700;
      line-height: 1.45;
      color: var(--navy);
      margin: 0;
      text-align: left;
    }

    /* OPTIONS */
    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }

    .option-flat-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 13px 16px;
      background: #FAF6EF;
      border: 1.5px solid #DDD3C3;
      border-radius: 12px;
      cursor: pointer;
      text-align: left;
      font-family: var(--font-sans);
      font-size: 15px;
      color: var(--navy);
      transition: all 0.15s ease;
    }

    .option-flat-btn:hover:not(:disabled) {
      border-color: #78815D;
      background: #F4F7F2;
    }

    .option-flat-btn.selected {
      border-color: #78815D;
      background: #EAEFE6;
      font-weight: 700;
      box-shadow: 0 0 0 1px #78815D;
    }

    .option-flat-btn:disabled {
      cursor: default;
    }

    .option-idx {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background: #EAE2D2;
      font-size: 12.5px;
      font-weight: 800;
      color: var(--navy);
      flex-shrink: 0;
    }

    .option-flat-btn.selected .option-idx {
      background: #78815D;
      color: #FFF;
    }

    .option-content {
      flex: 1;
      line-height: 1.4;
    }

    .check-btn {
      width: 100%;
      padding: 13px;
      font-size: 15.5px;
      font-weight: 700;
      border-radius: 12px;
    }

    /* MÀN HÌNH KẾT QUẢ */
    .results-screen {
      padding-top: 10px;
    }

    .results-card {
      padding: 28px 24px;
      border-radius: 20px;
      background: #FAF6EF;
      border: 1.5px solid #DDD3C3;
      text-align: center;
      box-shadow: 0 6px 20px rgba(44, 53, 64, 0.05);
    }

    .laurel-wreath {
      font-size: 38px;
      line-height: 1;
      margin-bottom: 6px;
    }

    .stars-display-row {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .star-item {
      font-size: 32px;
      filter: grayscale(100%);
      opacity: 0.3;
      transition: all 0.3s ease;
    }

    .star-item.active-star {
      filter: none;
      opacity: 1;
      transform: scale(1.08);
    }

    .star-mid {
      transform: translateY(-4px);
    }

    .result-title {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 800;
      color: var(--navy);
      margin: 0 0 6px;
    }

    .result-subtitle {
      font-size: 14.5px;
      color: var(--ink-muted);
      margin: 0 0 16px;
      line-height: 1.4;
    }

    .new-record-pill {
      display: inline-block;
      padding: 5px 14px;
      background: #FDF3E3;
      border: 1px solid #F0C987;
      color: #8C5B14;
      font-weight: 800;
      font-size: 12px;
      border-radius: 999px;
      margin-bottom: 20px;
    }

    .stats-summary-card {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #F4EFE6;
      border: 1px solid #E2D7C7;
      border-radius: 14px;
      padding: 14px 10px;
      margin-bottom: 24px;
    }

    .summary-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .col-value {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 800;
      color: var(--navy);
    }

    .col-label {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--ink-muted);
    }

    .summary-divider {
      width: 1px;
      height: 28px;
      background: #D8CFBF;
    }

    .reward-section {
      margin-bottom: 24px;
    }

    .reward-heading {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .rewards-grid {
      display: flex;
      justify-content: center;
      gap: 12px;
    }

    .reward-item-box {
      background: #FAF6EF;
      border: 1.5px solid #DDD3C3;
      border-radius: 12px;
      padding: 12px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-width: 90px;
    }

    .reward-emoji {
      font-size: 24px;
    }

    .reward-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--navy);
    }

    .reward-qty {
      font-weight: 800;
      font-size: 14px;
      color: #78815D;
    }

    .max-reward-notice {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #F4EFE6;
      border: 1px solid #D9C8B5;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 13px;
      color: var(--navy);
      font-weight: 500;
      text-align: left;
    }

    .actions-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .retake-btn, .back-detail-btn, .back-list-btn, .go-farm-btn {
      padding: 12px;
      font-size: 14.5px;
      font-weight: 600;
      border-radius: 12px;
      text-decoration: none;
    }

    .empty-card {
      text-align: center;
      padding: 40px;
      border-radius: 16px;
    }

    .pulse-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 10px;
    }

    @media (max-width: 600px) {
      .grammar-quiz-screen {
        padding: 4px 6px 24px;
      }
      .question-card {
        padding: 18px 14px;
      }
      .grammar-prompt {
        font-size: 17px;
      }
      .sheet-content {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .sheet-action-btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class GrammarQuizComponent implements OnInit {
  private route = inject(ActivatedRoute);
  grammarService = inject(GrammarService);
  state = inject(GameStateService);

  topic = signal<GrammarTopic | null>(null);

  // Queue và First Try Tracking
  queue = signal<QueueItem[]>([]);
  totalInitial = signal<number>(0);
  masteredUids = signal<Set<number>>(new Set());
  firstTryResults = new Map<number, boolean>();

  selectedOptionIdx = signal<number | null>(null);
  feedbackState = signal<'none' | 'correct' | 'wrong'>('none');
  isFinished = signal<boolean>(false);
  result = signal<GrammarQuizSubmitResult | null>(null);

  currentQuestion = computed(() => this.queue()[0] || null);

  correctOptionText = computed(() => {
    const qItem = this.currentQuestion();
    if (!qItem) return '';
    return qItem.question.options[qItem.question.correctIndex] || '';
  });

  currentExplanation = computed(() => {
    return this.currentQuestion()?.question.explanationVi || '';
  });

  progressPercent = computed(() => {
    const total = this.totalInitial() || 1;
    return Math.min(100, Math.round((this.masteredUids().size / total) * 100));
  });

  firstTryWrongCount = computed(() => {
    let wrong = 0;
    this.firstTryResults.forEach(isCorrect => {
      if (!isCorrect) wrong++;
    });
    return wrong;
  });

  starsRemaining = computed(() => {
    const wrongs = this.firstTryWrongCount();
    if (wrongs === 0) return 3;
    if (wrongs === 1 && this.totalInitial() >= 4) return 2;
    if (wrongs <= 2 && this.totalInitial() >= 6) return 2;
    return 1;
  });

  starsState = computed(() => {
    const remaining = this.starsRemaining();
    return [remaining >= 1, remaining >= 2, remaining >= 3];
  });

  dewDropsTooltip = computed(() => {
    const s = this.starsRemaining();
    if (s === 3) return '3 Sao ⭐⭐⭐: 100% độ chính xác lần đầu';
    if (s === 2) return '2 Sao ⭐⭐: Độ chính xác khá tốt (>= 80%)';
    return '1 Sao ⭐: Cần nỗ lực sửa sai';
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const code = params.get('code') || '';
      const found = this.grammarService.getTopicByCode(code);
      this.topic.set(found || null);
      if (found) {
        this.initQuiz(found);
      }
    });
  }

  initQuiz(topic: GrammarTopic): void {
    const questions = topic.questions || [];
    const initialQueue: QueueItem[] = questions.map((q, idx) => ({
      uid: idx + 1,
      originalIdx: idx,
      question: q
    }));

    this.queue.set(initialQueue);
    this.totalInitial.set(initialQueue.length);
    this.masteredUids.set(new Set());
    this.firstTryResults.clear();
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');
    this.isFinished.set(false);
    this.result.set(null);
  }

  selectOption(idx: number): void {
    if (this.feedbackState() !== 'none') return;
    this.selectedOptionIdx.set(idx);
  }

  checkAnswer(): void {
    const qItem = this.currentQuestion();
    const selected = this.selectedOptionIdx();
    if (!qItem || selected === null) return;

    const isCorrect = selected === qItem.question.correctIndex;

    // Ghi nhận kết quả cho lần đầu gặp câu hỏi
    if (!this.firstTryResults.has(qItem.uid)) {
      this.firstTryResults.set(qItem.uid, isCorrect);
    }

    this.feedbackState.set(isCorrect ? 'correct' : 'wrong');
  }

  continueQueue(): void {
    const qItem = this.currentQuestion();
    if (!qItem) return;

    const isCorrect = this.feedbackState() === 'correct';
    const currentQueue = [...this.queue()];

    if (isCorrect) {
      // Đúng: thêm vào danh sách mastered, loại khỏi hàng đợi
      this.masteredUids.update(set => {
        const next = new Set(set);
        next.add(qItem.uid);
        return next;
      });
      currentQueue.shift();
    } else {
      // Sai: Error Recycling Loop - đẩy xuống cuối hàng đợi để làm lại
      const wrong = currentQueue.shift();
      if (wrong) {
        currentQueue.push({ ...wrong });
      }
    }

    this.queue.set(currentQueue);
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');

    // Nếu đã hoàn tất toàn bộ hàng đợi -> hoàn thành bài thi
    if (currentQueue.length === 0) {
      this.finishQuiz();
    }
  }

  finishQuiz(): void {
    const t = this.topic();
    if (!t) return;

    let firstTryCorrect = 0;
    this.firstTryResults.forEach(correct => {
      if (correct) firstTryCorrect++;
    });

    const submitResult = this.grammarService.recordQuizCompletion(
      t.code,
      firstTryCorrect,
      this.totalInitial()
    );

    this.result.set(submitResult);
    this.isFinished.set(true);
  }

  retakeQuiz(): void {
    const t = this.topic();
    if (t) {
      this.initQuiz(t);
    }
  }
}
