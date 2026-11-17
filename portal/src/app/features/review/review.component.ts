import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameStateService } from '../../core/services/game-state.service';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { UserVocabReview } from '../../core/models/game.models';
import { DEFAULT_VOCABULARIES } from '../../core/constants/default-vocabularies.constant';
import { VocabularyDto } from '../../core/services/farm-api.service';
import { ReviewPlannerComponent } from './review-planner.component';
import { ProgressDashboardComponent } from './progress-dashboard.component';

interface ReviewQuizQuestion {
  vocabId: number;
  word: string;
  ipa: string;
  type: string;
  meaningVi: string;
  clueSentence: string;
  options: string[];
  correctIndex: number;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, RouterLink, ReviewPlannerComponent, ProgressDashboardComponent],
  template: `
    <div class="review-screen">

      <!-- ======================================================== -->
      <!-- CHẾ ĐỘ 1: GIAO DIỆN CHÍNH (PLANNER & ANALYTICS TABS)     -->
      <!-- ======================================================== -->
      @if (viewMode() === 'main') {
        <div class="screen-header">
          <div class="header-nav-row">
            <a routerLink="/" class="back-link">
              <span class="chevron">‹</span>
              <span>Trang chủ</span>
            </a>
            <h2 class="serif-title">Tiến Độ & Ôn Tập</h2>
            <div class="header-ghost"></div>
          </div>

          <!-- 2 TABS CHÍNH: Lịch Ôn Tập (Ebbinghaus) | Thống Kê Tiến Độ -->
          <div class="vintage-tabs">
            <button
              class="v-tab"
              [class.active]="activeMainTab() === 'planner'"
              (click)="activeMainTab.set('planner')">
              🌿 Lịch Ôn Tập (Ebbinghaus)
              @if (state.dueTodayCount() > 0) {
                <span class="due-badge">{{ state.dueTodayCount() }}</span>
              }
            </button>
            <button
              class="v-tab"
              [class.active]="activeMainTab() === 'analytics'"
              (click)="activeMainTab.set('analytics')">
              📊 Thống Kê Tiến Độ
            </button>
          </div>
        </div>

        <!-- TAB 1: REVIEW PLANNER -->
        @if (activeMainTab() === 'planner') {
          <app-review-planner (startSession)="onStartReviewSession($event)"></app-review-planner>
        }

        <!-- TAB 2: PROGRESS DASHBOARD -->
        @if (activeMainTab() === 'analytics') {
          <app-progress-dashboard></app-progress-dashboard>
        }
      }

      <!-- ======================================================== -->
      <!-- CHẾ ĐỘ 2: PHIÊN QUIZ ÔN TẬP ACTIVE RECALL TƯƠNG TÁC      -->
      <!-- ======================================================== -->
      @else if (viewMode() === 'session') {
        @let q = currentQuestion();
        <div class="session-container">
          <!-- Session Header -->
          <div class="session-header">
            <button class="back-btn" (click)="confirmExitSession()">
              <span class="chevron">‹</span>
              <span>Dừng phiên ôn</span>
            </button>
            <span class="progress-pill">
              {{ sessionMasteredIds().size }} / {{ sessionInitialWords().length }} từ thuộc
            </span>
          </div>

          <!-- Progress Rail -->
          <div class="session-progress-wrap">
            <div class="session-progress-fill" [style.width.%]="sessionProgressPercent()"></div>
          </div>

          @if (q) {
            <!-- Active Recall Quiz Card -->
            <div class="vintage-card quiz-card">
              <div class="card-top-tag">
                <span class="tag-badge">⚡ Active Recall</span>
                <span class="tag-type">[{{ q.type || 'Từ vựng' }}]</span>
              </div>

              <!-- Thẻ từ vựng câu hỏi -->
              <div class="prompt-box">
                <h2 class="prompt-word">{{ q.word }}</h2>
                <div class="prompt-phonetic-row">
                  <span class="phonetic-text">{{ q.ipa }}</span>
                  <button class="speak-btn" (click)="state.speak(q.word)" title="Phát âm">🔊</button>
                </div>
                <div class="clue-box">
                  <div class="clue-label">Ngữ cảnh ứng dụng:</div>
                  <div class="clue-text">{{ q.clueSentence }}</div>
                </div>
              </div>

              <!-- 4 Đáp án lựa chọn -->
              <div class="options-grid">
                @for (opt of q.options; track opt; let optIdx = $index) {
                  @let isSelected = selectedOptionIdx() === optIdx;
                  @let isCorrectOpt = optIdx === q.correctIndex;
                  @let showState = feedbackState() !== 'none';

                  <button
                    class="option-btn"
                    [class.selected]="isSelected"
                    [class.correct]="showState && isCorrectOpt"
                    [class.wrong]="showState && isSelected && !isCorrectOpt"
                    [disabled]="feedbackState() !== 'none'"
                    (click)="chooseOption(optIdx)">
                    <span class="opt-prefix">{{ ['A', 'B', 'C', 'D'][optIdx] }}</span>
                    <span class="opt-text">{{ opt }}</span>
                  </button>
                }
              </div>

              <!-- Feedback Tray Bottom -->
              @if (feedbackState() !== 'none') {
                <div class="feedback-tray" [class.is-correct]="feedbackState() === 'correct'" [class.is-wrong]="feedbackState() === 'wrong'">
                  <div class="feedback-message">
                    @if (feedbackState() === 'correct') {
                      <span class="fb-icon">🎉</span>
                      <span class="fb-text">Chính xác! Bạn đã ghi nhớ từ này.</span>
                    } @else {
                      <span class="fb-icon">💡</span>
                      <span class="fb-text">Đáp án đúng: <strong>{{ q.meaningVi }}</strong> (Từ sẽ được xếp ôn lại ở cuối phiên)</span>
                    }
                  </div>
                  <button class="btn btn-primary next-btn" (click)="nextQuestion()">
                    <span>{{ sessionQueue().length > 1 ? 'Câu tiếp theo →' : 'Xem kết quả ✨' }}</span>
                  </button>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- ======================================================== -->
      <!-- CHẾ ĐỘ 3: TỔNG KẾT PHIÊN ÔN TẬP & CẤP THƯỞNG             -->
      <!-- ======================================================== -->
      @else if (viewMode() === 'summary') {
        @let res = summaryResult();
        <div class="summary-container">
          <div class="vintage-card summary-card-final">
            <div class="laurel-wreath">🌿 👑 🌿</div>
            <h2 class="final-title">Phiên Ôn Tập Hoàn Tất!</h2>
            <p class="final-sub">
              Tất cả <strong>{{ res?.totalQuestions || 0 }} từ vựng</strong> trong phiên đã được kiểm tra và cập nhật tiến trình Ebbinghaus.
            </p>

            <!-- Thống kê kết quả -->
            <div class="final-stats-grid">
              <div class="stat-box">
                <span class="stat-num">{{ res?.firstTryCorrectCount || 0 }}/{{ res?.totalQuestions || 0 }}</span>
                <span class="stat-label">Đúng lần đầu</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">{{ (res?.totalQuestions || 0) - (res?.firstTryCorrectCount || 0) }}</span>
                <span class="stat-label">Cần củng cố thêm</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">{{ res?.claimedToday || 0 }}/5</span>
                <span class="stat-label">Lượt nhận thưởng hôm nay</span>
              </div>
            </div>

            <!-- Bộ quà tặng kích hoạt cây -->
            <div class="care-reward-box">
              <h4 class="care-reward-title">Bộ Nguyên Liệu Kích Hoạt Cây Trồng</h4>
              <p class="care-reward-desc">
                Cung cấp đầy đủ nguyên liệu để ô đất mới gieo bắt đầu nảy mầm tính giờ!
              </p>

              <div class="care-items-row">
                <div class="care-drop-card">
                  <img src="assets/farm-assets/tools/watering_can.png" class="care-drop-img pixel-sprite" alt="Bình tưới" />
                  <span class="care-drop-name">Nước tưới</span>
                  <strong class="care-drop-qty">+{{ res?.waterGained || 0 }}</strong>
                </div>
                <div class="care-drop-card">
                  <img src="assets/farm-assets/tools/fertilizer.png" class="care-drop-img pixel-sprite" alt="Phân bón" />
                  <span class="care-drop-name">Phân bón cơ bản</span>
                  <strong class="care-drop-qty">+{{ res?.baseFertilizerGained || 0 }}</strong>
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="final-actions-row">
              <button class="btn btn-primary" (click)="viewMode.set('main')">
                <span>Về Lịch Ôn Tập</span>
              </button>
              <a routerLink="/farm" class="btn btn-secondary">
                <span>Về Nông Trại Trồng Cây 🌾</span>
              </a>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .review-screen {
      max-width: 640px;
      margin: 0 auto;
      padding-bottom: 30px;
    }

    /* HEADER */
    .screen-header {
      margin-bottom: 16px;
    }
    .header-nav-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--navy, #263847);
      text-decoration: none;
      background: #F4EFE6;
      border: 1px solid var(--border, #D9C8B5);
      padding: 4px 10px;
      border-radius: 999px;
    }
    .serif-title {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 22px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0;
    }
    .header-ghost {
      width: 70px;
    }

    /* VINTAGE TABS */
    .vintage-tabs {
      display: flex;
      background: #E8DFC8;
      border: 1px solid var(--border, #D9C8B5);
      border-radius: 999px;
      padding: 3px;
      gap: 4px;
    }
    .v-tab {
      flex: 1;
      padding: 8px 12px;
      border-radius: 999px;
      border: none;
      background: transparent;
      font-size: 13px;
      font-weight: 700;
      color: var(--ink-muted, #5A6D7C);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .v-tab.active {
      background: #FFFDF9;
      color: var(--navy, #263847);
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
    .due-badge {
      background: var(--rose, #A65E65);
      color: #FFF;
      font-size: 10px;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 999px;
    }

    /* SESSION QUIZ */
    .session-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .session-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .back-btn {
      background: #F4EFE6;
      border: 1px solid var(--border, #D9C8B5);
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--navy, #263847);
      cursor: pointer;
    }
    .progress-pill {
      font-size: 12px;
      font-weight: 700;
      background: #F4EFE6;
      border: 1px solid var(--border, #D9C8B5);
      padding: 4px 10px;
      border-radius: 999px;
      color: var(--navy, #263847);
      font-family: monospace;
    }

    .session-progress-wrap {
      width: 100%;
      height: 6px;
      background: #E8DFC8;
      border-radius: 999px;
      overflow: hidden;
      border: 0.5px solid var(--border, #D9C8B5);
    }
    .session-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #A65E65, #E8A838);
      border-radius: 999px;
      transition: width 0.35s ease;
    }

    .quiz-card {
      padding: 22px 20px;
      border-radius: 18px;
      background: #FFFDF9;
      border: 1.5px solid var(--border, #D9C8B5);
      box-shadow: 0 6px 16px rgba(38, 56, 71, 0.06);
    }
    .card-top-tag {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .tag-badge {
      background: #FBEFEF;
      color: var(--rose, #A65E65);
      font-size: 11px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid #EAC8C8;
    }
    .tag-type {
      font-size: 11px;
      color: var(--ink-muted, #7A8D9C);
      font-weight: 600;
    }

    .prompt-box {
      text-align: center;
      padding: 12px 10px 18px;
      border-bottom: 1px dashed var(--border, #D9C8B5);
      margin-bottom: 18px;
    }
    .prompt-word {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 26px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0 0 6px;
    }
    .prompt-phonetic-row {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .phonetic-text {
      font-size: 14px;
      color: var(--ink-muted, #5A6D7C);
      font-style: italic;
    }
    .speak-btn {
      background: #F4EFE6;
      border: 1px solid #D9C8B5;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
    }

    .clue-box {
      background: #FAF6EF;
      border: 1px solid #EAE0CF;
      border-radius: 10px;
      padding: 10px 14px;
      text-align: left;
      max-width: 460px;
      margin: 0 auto;
    }
    .clue-label {
      font-size: 10.5px;
      font-weight: 700;
      color: var(--ink-muted, #7A8D9C);
      margin-bottom: 3px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .clue-text {
      font-size: 13px;
      color: var(--navy, #263847);
      line-height: 1.45;
    }

    /* Options */
    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 16px;
    }
    .option-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: #FCF9F2;
      border: 1.5px solid var(--border, #D9C8B5);
      border-radius: 12px;
      cursor: pointer;
      font-size: 13.5px;
      text-align: left;
      transition: all 0.15s;
    }
    .option-btn:hover:not(:disabled) {
      background: #F4EFE6;
      border-color: #CBB9A3;
      transform: translateY(-1px);
    }
    .opt-prefix {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: #EFE8DA;
      font-weight: 800;
      font-size: 12px;
      color: var(--navy, #263847);
      flex-shrink: 0;
    }
    .opt-text {
      flex: 1;
      font-weight: 600;
      color: var(--navy, #263847);
    }

    .option-btn.selected {
      border-color: var(--navy, #263847);
      background: #F0EAE1;
    }
    .option-btn.correct {
      background: #EEF5E6 !important;
      border-color: #78815D !important;
      box-shadow: 0 0 0 1px #78815D;
    }
    .option-btn.correct .opt-prefix {
      background: #78815D;
      color: #FFF;
    }
    .option-btn.wrong {
      background: #FDF0F0 !important;
      border-color: #A65E65 !important;
      box-shadow: 0 0 0 1px #A65E65;
    }
    .option-btn.wrong .opt-prefix {
      background: #A65E65;
      color: #FFF;
    }

    /* Feedback Tray */
    .feedback-tray {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-radius: 12px;
      gap: 12px;
      animation: fadeIn 0.2s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .feedback-tray.is-correct {
      background: #EEF5E6;
      border: 1px solid #C7D8B6;
      color: #3B541C;
    }
    .feedback-tray.is-wrong {
      background: #FDF0F0;
      border: 1px solid #EAC8C8;
      color: #79373D;
    }
    .feedback-message {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      flex: 1;
    }
    .fb-icon {
      font-size: 18px;
    }
    .next-btn {
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }

    /* SUMMARY FINAL */
    .summary-card-final {
      padding: 28px 24px;
      text-align: center;
      border-radius: 18px;
      background: #FFFDF9;
      border: 1.5px solid var(--border, #D9C8B5);
      box-shadow: 0 6px 18px rgba(38, 56, 71, 0.08);
    }
    .laurel-wreath {
      font-size: 32px;
      margin-bottom: 8px;
    }
    .final-title {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 24px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0 0 6px;
    }
    .final-sub {
      font-size: 13px;
      color: var(--ink-muted, #5A6D7C);
      max-width: 420px;
      margin: 0 auto 20px;
      line-height: 1.5;
    }

    .final-stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 22px;
    }
    .stat-box {
      padding: 10px;
      background: #FAF6EF;
      border: 1px solid #EAE0CF;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .stat-num {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 18px;
      font-weight: 700;
      color: var(--navy, #263847);
    }
    .stat-label {
      font-size: 11px;
      color: var(--ink-muted, #5A6D7C);
      font-weight: 600;
    }

    .care-reward-box {
      background: #F4EFE6;
      border: 1.5px solid #D9C8B5;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 22px;
    }
    .care-reward-title {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0 0 4px;
    }
    .care-reward-desc {
      font-size: 11.5px;
      color: var(--ink-muted, #5A6D7C);
      margin: 0 0 14px;
    }
    .care-items-row {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    .care-drop-card {
      background: #FFFDF9;
      border: 1px solid #D9C8B5;
      border-radius: 12px;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-width: 100px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
    }
    .care-drop-img {
      width: 36px;
      height: 36px;
      object-fit: contain;
    }
    .care-drop-name {
      font-size: 11px;
      font-weight: 600;
      color: var(--navy, #263847);
    }
    .care-drop-qty {
      font-size: 14px;
      font-weight: 800;
      color: var(--olive, #78815D);
    }

    .final-actions-row {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    @media (max-width: 600px) {
      .final-stats-grid {
        grid-template-columns: 1fr;
      }
      .feedback-tray {
        flex-direction: column;
        align-items: stretch;
      }
      .next-btn {
        width: 100%;
      }
    }
  `]
})
export class ReviewComponent {
  state = inject(GameStateService);
  assets = FARM_ASSETS;

  viewMode = signal<'main' | 'session' | 'summary'>('main');
  activeMainTab = signal<'planner' | 'analytics'>('planner');

  // Session state
  sessionInitialWords = signal<UserVocabReview[]>([]);
  sessionQueue = signal<ReviewQuizQuestion[]>([]);
  sessionMasteredIds = signal<Set<number>>(new Set());
  firstTryResults = new Map<number, boolean>();

  currentQuestionIdx = signal<number>(0);
  selectedOptionIdx = signal<number | null>(null);
  feedbackState = signal<'none' | 'correct' | 'wrong'>('none');
  summaryResult = signal<any>(null);

  currentQuestion = computed(() => {
    const queue = this.sessionQueue();
    return queue.length > 0 ? queue[0] : null;
  });

  sessionProgressPercent = computed(() => {
    const total = this.sessionInitialWords().length;
    if (total === 0) return 100;
    return Math.min(100, Math.round((this.sessionMasteredIds().size / total) * 100));
  });

  onStartReviewSession(dueWords: UserVocabReview[]) {
    if (!dueWords || dueWords.length === 0) return;

    this.sessionInitialWords.set(dueWords);
    this.sessionMasteredIds.set(new Set());
    this.firstTryResults.clear();
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');

    // Build questions for each due word
    const questions: ReviewQuizQuestion[] = [];
    const allVocabs = Object.values(DEFAULT_VOCABULARIES).flat();

    for (const item of dueWords) {
      // Find vocabulary details
      const info = this.state.findVocab(item.vocabId) || (item.word ? this.state.findVocab(item.word) : null);
      const vocab: VocabularyDto = info?.vocab || {
        id: item.vocabId,
        word: item.word || `Word #${item.vocabId}`,
        phonetic: null,
        ipaUs: null,
        ipaUk: null,
        wordType: 'Từ vựng',
        meaningVi: 'Nghĩa tiếng Việt',
        exampleEn: null,
        exampleVi: null,
        spriteKey: null
      };

      // Get 3 random distractor meanings
      const distractors = allVocabs
        .filter(v => v.id !== vocab.id && v.meaningVi !== vocab.meaningVi)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(v => v.meaningVi);

      const options = [vocab.meaningVi, ...distractors].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(vocab.meaningVi);

      questions.push({
        vocabId: vocab.id,
        word: vocab.word,
        ipa: vocab.ipaUs || vocab.phonetic || '',
        type: vocab.wordType || 'noun',
        meaningVi: vocab.meaningVi,
        clueSentence: vocab.exampleEn || `I will remember how to use "${vocab.word}" in context.`,
        options,
        correctIndex
      });
    }

    this.sessionQueue.set(questions);
    this.viewMode.set('session');
  }

  chooseOption(optIdx: number) {
    if (this.feedbackState() !== 'none') return;

    this.selectedOptionIdx.set(optIdx);
    const q = this.currentQuestion();
    if (!q) return;

    const isCorrect = optIdx === q.correctIndex;

    // Track first-try result for this vocabId
    if (!this.firstTryResults.has(q.vocabId)) {
      this.firstTryResults.set(q.vocabId, isCorrect);
    }

    if (isCorrect) {
      this.feedbackState.set('correct');
      this.sessionMasteredIds.update(set => {
        const next = new Set(set);
        next.add(q.vocabId);
        return next;
      });
    } else {
      this.feedbackState.set('wrong');
    }
  }

  nextQuestion() {
    const q = this.currentQuestion();
    if (!q) return;

    const isCorrect = this.selectedOptionIdx() === q.correctIndex;
    const currentQueue = this.sessionQueue();

    // Reset feedback
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');

    if (isCorrect) {
      // Remove from queue
      const nextQueue = currentQueue.slice(1);
      this.sessionQueue.set(nextQueue);
    } else {
      // Error Recycling Loop: Move failed question to the end of the queue
      const nextQueue = [...currentQueue.slice(1), q];
      this.sessionQueue.set(nextQueue);
    }

    // Check if session is finished
    if (this.sessionQueue().length === 0) {
      this.finishSession();
    }
  }

  finishSession() {
    const result = this.state.completeReviewQuizSession(
      this.sessionInitialWords(),
      this.firstTryResults
    );
    this.summaryResult.set(result);
    this.viewMode.set('summary');
  }

  confirmExitSession() {
    if (confirm('Bạn có muốn dừng phiên ôn tập dở dang không? (Tiến trình của các từ chưa xong sẽ không được lưu)')) {
      this.viewMode.set('main');
    }
  }
}
