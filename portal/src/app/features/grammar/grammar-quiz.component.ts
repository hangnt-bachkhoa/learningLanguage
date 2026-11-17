import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GrammarService, GrammarQuizSubmitResult } from '../../core/services/grammar.service';
import { GrammarTopic, GrammarQuestion } from '../../core/constants/default-grammar-topics.constant';
import { GameStateService } from '../../core/services/game-state.service';
import { GrammarQuizGeneratorService, CandidateVocabWord } from '../../core/services/grammar-quiz-generator.service';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

interface QueueItem {
  uid: number;
  originalIdx: number;
  sourceType: 'DYNAMIC_VOCAB' | 'STATIC_GRAMMAR';
  question: GrammarQuestion;
  isRetry?: boolean;
}

@Component({
  selector: 'app-grammar-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink, PixelIconComponent],
  template: `
    <div class="grammar-quiz-screen">
      @if (!isFinished()) {
        <article class="quiz-card">
          <!-- TOP HEADER: THOÁT & TIẾN ĐỘ -->
          <div class="quiz-top-bar">
            <a [routerLink]="['/grammar', topic()?.code]" class="btn btn-secondary btn-sm exit-btn" style="display:inline-flex; align-items:center; gap:5px;">
              <app-pixel-icon name="icon_cross" [size]="12"></app-pixel-icon>
              <span>Thoát</span>
            </a>
            <span class="score-status">Đã đúng: {{ masteredUids().size }}/{{ totalInitial() }}</span>
          </div>

          <div class="progress-track">
            <div class="progress-fill" [style.width.%]="progressPercent()"></div>
          </div>

          @if (queue().length === 0) {
            <div class="empty-quiz-state">
              <span class="empty-icon"><app-pixel-icon name="icon_sprout_action" [size]="32"></app-pixel-icon></span>
              <p>Không có câu hỏi kiểm tra cho chuyên đề này.</p>
              <a routerLink="/grammar" class="btn btn-secondary btn-sm">Về sổ tay Ngữ pháp</a>
            </div>
          } @else {
            @if (currentQuestion(); as qItem) {
              <!-- NỘI DUNG CÂU HỎI -->
              <div class="question-main">
                <div class="badges-row">
                  <span class="tag-pill source-pill" style="display:inline-flex; align-items:center; gap:4px;">
                    @if (qItem.sourceType === 'DYNAMIC_VOCAB') {
                      <app-pixel-icon name="icon_sprout_action" [size]="13"></app-pixel-icon>
                      <span>Ngữ pháp thực chiến TOEIC</span>
                    } @else {
                      <app-pixel-icon name="icon_scroll" [size]="13"></app-pixel-icon>
                      <span>Trọng điểm Part 5</span>
                    }
                  </span>
                  @if (qItem.isRetry) {
                    <span class="tag-pill retry-pill" style="display:inline-flex; align-items:center; gap:4px;">
                      <app-pixel-icon name="icon_retry" [size]="12"></app-pixel-icon>
                      <span>Làm lại câu chưa đúng</span>
                    </span>
                  }
                </div>

                <h2 class="grammar-prompt">{{ qItem.question.prompt }}</h2>

                <!-- 4 ĐÁP ÁN TRẮC NGHIỆM PHẲNG -->
                <div class="quiz-options-list">
                  @for (opt of qItem.question.options; track opt; let idx = $index) {
                    <button
                      type="button"
                      class="quiz-option"
                      [class.selected]="selectedOptionIdx() === idx && feedbackState() === 'none'"
                      [class.correct]="feedbackState() !== 'none' && idx === qItem.question.correctIndex"
                      [class.wrong]="feedbackState() === 'wrong' && selectedOptionIdx() === idx"
                      [disabled]="feedbackState() !== 'none'"
                      (click)="selectOption(idx)">
                      <span class="opt-label">
                        <strong>{{ ['A', 'B', 'C', 'D'][idx] }}.</strong> {{ opt }}
                      </span>
                      @if (feedbackState() !== 'none' && idx === qItem.question.correctIndex) {
                        <span class="opt-status-icon ok"><app-pixel-icon name="icon_check" [size]="12"></app-pixel-icon></span>
                      } @else if (feedbackState() === 'wrong' && selectedOptionIdx() === idx) {
                        <span class="opt-status-icon err"><app-pixel-icon name="icon_cross" [size]="12"></app-pixel-icon></span>
                      }
                    </button>
                  }
                </div>

                <!-- HÀNH ĐỘNG DƯỚI CÙNG HOẶC FEEDBACK PANEL PHẲNG -->
                @if (feedbackState() === 'none') {
                  <div class="quiz-action-bar">
                    <button
                      type="button"
                      class="btn btn-primary check-btn"
                      [disabled]="selectedOptionIdx() === null"
                      (click)="checkAnswer()">
                      Kiểm tra
                    </button>
                  </div>
                } @else {
                  <div class="feedback-sheet" [class.ok]="feedbackState() === 'correct'" [class.err]="feedbackState() === 'wrong'">
                    <div class="feedback-body">
                      <div class="feedback-headline" style="display:inline-flex; align-items:center; gap:6px;">
                        <app-pixel-icon [name]="feedbackState() === 'correct' ? 'icon_check' : 'icon_cross'" [size]="15"></app-pixel-icon>
                        <span>{{ feedbackState() === 'correct' ? 'Chính xác!' : 'Chưa chính xác · Câu này sẽ được đẩy về cuối bài' }}</span>
                      </div>
                      @if (currentExplanation(); as exp) {
                        <div class="feedback-explanation" style="display:flex; align-items:flex-start; gap:6px;">
                          <app-pixel-icon name="icon_lightbulb" [size]="14"></app-pixel-icon>
                          <span><strong>Giải thích:</strong> {{ exp }}</span>
                        </div>
                      }
                    </div>
                    <button
                      type="button"
                      class="btn sheet-btn"
                      [class.btn-olive]="feedbackState() === 'correct'"
                      [class.btn-primary]="feedbackState() === 'wrong'"
                      (click)="continueQueue()">
                      {{ feedbackState() === 'correct' ? (queue().length === 1 ? 'Hoàn tất bài thi ›' : 'Tiếp tục ›') : 'Đã hiểu ›' }}
                    </button>
                  </div>
                }
              </div>
            }
          }
        </article>
      } @else {
        <!-- MÀN HÌNH TỔNG KẾT & NHẬN THƯỞNG 3 SAO -->
        <main class="results-screen">
          <article class="results-card">
            <div class="laurel-icon"><app-pixel-icon name="icon_trophy" [size]="32"></app-pixel-icon></div>

            <div class="stars-display-row">
              <span class="star-item">
                <app-pixel-icon [name]="(result()?.stars || 1) >= 1 ? 'icon_star' : 'icon_star_empty'" [size]="28"></app-pixel-icon>
              </span>
              <span class="star-item star-mid">
                <app-pixel-icon [name]="(result()?.stars || 1) >= 2 ? 'icon_star' : 'icon_star_empty'" [size]="32"></app-pixel-icon>
              </span>
              <span class="star-item">
                <app-pixel-icon [name]="(result()?.stars || 1) >= 3 ? 'icon_star' : 'icon_star_empty'" [size]="28"></app-pixel-icon>
              </span>
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
              <div class="new-record-tag" style="display:inline-flex; align-items:center; gap:6px;">
                <app-pixel-icon name="icon_trophy" [size]="16"></app-pixel-icon>
                <span>KỶ LỤC MỚI VỀ SAO</span>
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
                <span class="col-value" style="display:inline-flex; align-items:center; gap:4px;">
                  <span>{{ result()?.stars || 1 }}</span>
                  <app-pixel-icon name="icon_star" [size]="13"></app-pixel-icon>
                </span>
                <span class="col-label">Xếp hạng</span>
              </div>
            </div>

            <!-- PHẦN THƯỞNG DELTA REWARD (10-20-30 XP & 20-35-50 XU) -->
            <div class="reward-section">
              <div class="reward-heading">Phần thưởng Chuyên đề (Quiz Delta)</div>
              @if ((result()?.rewardXp || 0) > 0 || (result()?.rewardCoins || 0) > 0) {
                <div class="rewards-grid">
                  @if ((result()?.rewardCoins || 0) > 0) {
                    <div class="reward-box">
                      <span class="reward-emoji"><app-pixel-icon name="icon_coin" [size]="20"></app-pixel-icon></span>
                      <span class="reward-title">Xu vàng</span>
                      <span class="reward-qty">+{{ result()?.rewardCoins }}</span>
                    </div>
                  }
                  @if ((result()?.rewardXp || 0) > 0) {
                    <div class="reward-box">
                      <span class="reward-emoji"><app-pixel-icon name="icon_sparkle" [size]="20"></app-pixel-icon></span>
                      <span class="reward-title">Điểm XP</span>
                      <span class="reward-qty">+{{ result()?.rewardXp }}</span>
                    </div>
                  }
                </div>
              } @else {
                <div class="max-reward-notice" style="display:inline-flex; align-items:center; gap:8px;">
                  <app-pixel-icon name="icon_star" [size]="14"></app-pixel-icon>
                  <span>Đã nhận tối đa ở các lần thi trước (Kỷ lục: {{ result()?.bestStarsClaimed }}★) · Không lặp lại Xu &amp; XP khi làm lại</span>
                </div>
              }
            </div>

            <!-- NÚT ĐIỀU HƯỚNG TIẾP THEO -->
            <div class="actions-stack">
              <button type="button" class="btn btn-primary action-nav-btn" (click)="retakeQuiz()" style="display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                <app-pixel-icon name="icon_retry" [size]="16"></app-pixel-icon>
                <span>Luyện tập lại bài này</span>
              </button>
              <a [routerLink]="['/grammar', topic()?.code]" class="btn btn-secondary action-nav-btn" style="display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                <app-pixel-icon name="icon_book_open" [size]="16"></app-pixel-icon>
                <span>Ôn lại lý thuyết chuyên đề</span>
              </a>
              <a routerLink="/grammar" class="btn btn-secondary action-nav-btn" style="display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                <app-pixel-icon name="icon_books_stack" [size]="16"></app-pixel-icon>
                <span>Về Sổ tay Ngữ pháp TOEIC</span>
              </a>
            </div>
          </article>
        </main>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .grammar-quiz-screen {
      max-width: 680px;
      margin: 0 auto;
      padding: 14px 16px 56px;
    }

    .quiz-card {
      background: var(--bg-card, #FFFDF9);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: var(--radius-lg, 16px);
      padding: 22px;
      box-shadow: 0 4px 16px rgba(38, 56, 71, 0.03);
    }

    .quiz-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .exit-btn {
      text-decoration: none;
      font-weight: 600;
    }

    .score-status {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy, #263847);
    }

    .progress-track {
      width: 100%;
      height: 7px;
      background: #EFE8D8;
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .progress-fill {
      height: 100%;
      background: var(--olive, #78815D);
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .badges-row {
      display: flex;
      gap: 6px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }

    .tag-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--bg-paper, #F8F4EB);
      border: 1px solid var(--border, #D9C8B5);
      color: var(--ink-muted, #6D665C);
    }

    .retry-pill {
      background: var(--rose-soft, #FBE8E6);
      color: var(--rose, #A65E65);
      border-color: #E5B9B5;
    }

    .grammar-prompt {
      font-family: var(--font-serif, 'Newsreader', Georgia, serif);
      font-size: 20px;
      font-weight: 700;
      color: var(--navy, #263847);
      line-height: 1.35;
      margin: 0 0 18px;
    }

    /* 4 ĐÁP ÁN TRẮC NGHIỆM */
    .quiz-options-list {
      display: flex;
      flex-direction: column;
      gap: 9px;
      margin-bottom: 20px;
    }

    .quiz-option {
      width: 100%;
      text-align: left;
      padding: 13px 15px;
      border-radius: 10px;
      border: 1.5px solid var(--border, #D9C8B5);
      background: #FFFDF9;
      font-size: 14px;
      font-weight: 500;
      color: var(--ink, #2C2A25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.12s ease;
    }

    .quiz-option:hover:not(:disabled) {
      border-color: var(--border-strong, #C2AD95);
      background: var(--bg-paper, #F8F4EB);
    }

    .quiz-option.selected {
      border-color: var(--navy, #263847);
      background: var(--bg-paper, #F8F4EB);
      font-weight: 600;
    }

    .quiz-option.correct {
      border-color: var(--olive, #78815D);
      background: var(--olive-soft, #D7ECD9);
      color: #2D3D24;
      font-weight: 700;
    }

    .quiz-option.wrong {
      border-color: var(--rose, #A65E65);
      background: var(--rose-soft, #FBE8E6);
      color: #6B2D33;
    }

    .opt-status-icon {
      font-weight: 700;
      font-size: 14px;
    }

    .opt-status-icon.ok {
      color: #2D3D24;
    }

    .opt-status-icon.err {
      color: var(--rose, #A65E65);
    }

    .quiz-action-bar {
      display: flex;
      justify-content: flex-end;
    }

    .check-btn {
      min-width: 130px;
      font-weight: 700;
    }

    /* FEEDBACK SHEET DƯỚI CÙNG */
    .feedback-sheet {
      margin-top: 16px;
      border-radius: 12px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
    }

    .feedback-sheet.ok {
      background: var(--olive-soft, #D7ECD9);
      border: 1px solid #9EC4A2;
      color: #263E28;
    }

    .feedback-sheet.err {
      background: var(--rose-soft, #FBE8E6);
      border: 1px solid #E2ABA7;
      color: #6B2D33;
    }

    .feedback-body {
      flex: 1;
      min-width: 220px;
    }

    .feedback-headline {
      font-weight: 700;
      font-size: 14px;
      line-height: 1.35;
    }

    .feedback-explanation {
      font-size: 13px;
      margin-top: 4px;
      line-height: 1.45;
    }

    .sheet-btn {
      font-weight: 700;
      white-space: nowrap;
      min-width: 120px;
    }

    /* EMPTY STATE */
    .empty-quiz-state {
      text-align: center;
      padding: 36px 16px;
      color: var(--ink-muted, #6D665C);
    }

    .empty-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 8px;
    }

    /* RESULTS SCREEN */
    .results-screen {
      max-width: 600px;
      margin: 0 auto;
    }

    .results-card {
      background: var(--bg-card, #FFFDF9);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: var(--radius-lg, 16px);
      padding: 28px 22px;
      text-align: center;
      box-shadow: 0 4px 16px rgba(38, 56, 71, 0.03);
    }

    .laurel-icon {
      font-size: 36px;
      margin-bottom: 8px;
    }

    .stars-display-row {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .star-item {
      font-size: 30px;
      color: #DDD3C3;
      transition: transform 0.2s;
    }

    .star-item.active-star {
      color: #E2A03F;
    }

    .star-mid {
      font-size: 36px;
      transform: translateY(-4px);
    }

    .result-title {
      font-family: var(--font-serif, 'Newsreader', Georgia, serif);
      font-size: 24px;
      font-weight: 800;
      color: var(--navy, #263847);
      margin: 0 0 6px;
    }

    .result-subtitle {
      font-size: 14px;
      color: var(--ink-muted, #6D665C);
      line-height: 1.45;
      margin: 0 0 16px;
    }

    .new-record-tag {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.6px;
      padding: 4px 12px;
      background: #FBF6E6;
      border: 1px solid #DFC98E;
      color: #9B7424;
      border-radius: 999px;
      margin-bottom: 16px;
    }

    .stats-summary-card {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: var(--bg-paper, #F8F4EB);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: 12px;
      padding: 12px 8px;
      margin-bottom: 18px;
    }

    .summary-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .col-value {
      font-family: var(--font-serif, 'Newsreader', Georgia, serif);
      font-size: 20px;
      font-weight: 800;
      color: var(--navy, #263847);
    }

    .col-label {
      font-size: 11.5px;
      color: var(--ink-muted, #6D665C);
    }

    .summary-divider {
      width: 1px;
      height: 30px;
      background: var(--border, #D9C8B5);
    }

    .reward-section {
      background: var(--bg-card, #FFFDF9);
      border: 1px dashed var(--border, #D9C8B5);
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 20px;
    }

    .reward-heading {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--navy, #263847);
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-bottom: 10px;
    }

    .rewards-grid {
      display: flex;
      justify-content: center;
      gap: 16px;
    }

    .reward-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--bg-paper, #F8F4EB);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: 10px;
      padding: 8px 18px;
      min-width: 90px;
    }

    .reward-emoji {
      font-size: 20px;
    }

    .reward-title {
      font-size: 11px;
      color: var(--ink-muted, #6D665C);
    }

    .reward-qty {
      font-size: 15px;
      font-weight: 800;
      color: var(--olive, #78815D);
    }

    .max-reward-notice {
      font-size: 12px;
      color: var(--ink-muted, #6D665C);
      line-height: 1.4;
    }

    .actions-stack {
      display: flex;
      flex-direction: column;
      gap: 9px;
    }

    .action-nav-btn {
      padding: 11px 16px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
    }

    /* RESPONSIVE DESIGN (<= 767px) */
    @media (max-width: 767px) {
      .grammar-quiz-screen {
        padding: 4px 2px 64px;
      }

      .quiz-card {
        padding: 16px;
      }

      .grammar-prompt {
        font-size: 18px;
      }

      .quiz-option {
        padding: 12px 14px;
        font-size: 13.5px;
      }

      .feedback-sheet {
        flex-direction: column;
        align-items: stretch;
      }

      .sheet-btn {
        width: 100%;
        text-align: center;
      }

      .check-btn {
        width: 100%;
      }
    }
  `]
})
export class GrammarQuizComponent implements OnInit {
  private route = inject(ActivatedRoute);
  grammarService = inject(GrammarService);
  state = inject(GameStateService);
  quizGenerator = inject(GrammarQuizGeneratorService);

  topic = signal<GrammarTopic | null>(null);

  queue = signal<QueueItem[]>([]);
  totalInitial = signal<number>(0);
  masteredUids = signal<Set<number>>(new Set());
  firstTryResults = new Map<number, boolean>();

  selectedOptionIdx = signal<number | null>(null);
  feedbackState = signal<'none' | 'correct' | 'wrong'>('none');
  isFinished = signal<boolean>(false);
  result = signal<GrammarQuizSubmitResult | null>(null);

  currentQuestion = computed(() => this.queue()[0] || null);

  correctOptionIndex = computed(() => {
    return this.currentQuestion()?.question.correctIndex ?? 0;
  });

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
    const unlockedLessons = this.state.lessons().filter(l => l.isUnlocked).map(l => l.id);
    const vocabMap = this.state.vocabulariesByLesson();
    const unlockedPool: CandidateVocabWord[] = [];

    for (const lid of unlockedLessons) {
      if (vocabMap[lid] && vocabMap[lid].length > 0) {
        unlockedPool.push(...vocabMap[lid]);
      }
    }

    if (unlockedPool.length === 0) {
      for (let i = 1; i <= 4; i++) {
        if (vocabMap[i]) unlockedPool.push(...vocabMap[i]);
      }
    }

    const hybridSession = this.quizGenerator.buildGrammarTestSession(
      topic.code,
      unlockedPool,
      topic.questions,
      10
    );

    const initialQueue: QueueItem[] = hybridSession.map((q, idx) => ({
      uid: idx + 1,
      originalIdx: idx,
      sourceType: q.sourceType,
      question: {
        prompt: q.prompt,
        options: q.options,
        correctIndex: q.correctIndex,
        explanationVi: q.explanationVi
      }
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
      this.masteredUids.update(set => {
        const next = new Set(set);
        next.add(qItem.uid);
        return next;
      });
      currentQueue.shift();
    } else {
      const wrong = currentQueue.shift();
      if (wrong) {
        currentQueue.push({ ...wrong, isRetry: true });
      }
    }

    this.queue.set(currentQueue);
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');

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
