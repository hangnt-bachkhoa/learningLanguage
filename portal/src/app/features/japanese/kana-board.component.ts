import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JapaneseLearningService, JaQuizQuestion } from '../../core/services/japanese-learning.service';
import { GameStateService } from '../../core/services/game-state.service';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';
import { KanaItem } from '../../core/constants/kana-catalog.constant';

@Component({
  selector: 'app-kana-board',
  standalone: true,
  imports: [CommonModule, RouterLink, PixelIconComponent],
  template: `
    <div class="kana-screen">
      <!-- HEADER -->
      <header class="kana-header">
        <a routerLink="/" class="back-link">
          <span class="chevron">‹</span>
          <span>Trang chủ</span>
        </a>
        <div class="header-center">
          <h1 class="page-title font-serif">Bảng Chữ Cái Kana Nhật Bản</h1>
          <p class="page-sub">Luyện phát âm &amp; ghi nhớ 46 chữ cái Hiragana &amp; Katakana cốt lõi</p>
        </div>
        <div class="header-stats">
          <span class="stat-badge">
            <app-pixel-icon name="icon_check" [size]="12"></app-pixel-icon>
            <span>{{ jaService.kanaLearnedCount() }}/{{ kanaList().length }} Đã thuộc</span>
          </span>
        </div>
      </header>

      <!-- VIEW MODE: BẢNG CHỮ CÁI vs BÀI THI QUIZ KANA -->
      @if (viewMode() === 'board') {
        <!-- CONTROLS & TABS -->
        <div class="kana-controls-bar">
          <div class="kana-tabs">
            <button
              type="button"
              class="k-tab"
              [class.active]="scriptMode() === 'hiragana'"
              (click)="scriptMode.set('hiragana')">
              <span>Hiragana (ひらがな)</span>
            </button>
            <button
              type="button"
              class="k-tab"
              [class.active]="scriptMode() === 'katakana'"
              (click)="scriptMode.set('katakana')">
              <span>Katakana (カタカナ)</span>
            </button>
          </div>

          <div class="group-filter-pills">
            <button
              type="button"
              class="filter-pill"
              [class.active]="groupFilter() === 'all'"
              (click)="groupFilter.set('all')">
              Tất cả ({{ kanaList().length }})
            </button>
            <button
              type="button"
              class="filter-pill"
              [class.active]="groupFilter() === 'gojuon'"
              (click)="groupFilter.set('gojuon')">
              Âm cơ bản (Gojūon)
            </button>
            <button
              type="button"
              class="filter-pill"
              [class.active]="groupFilter() === 'dakuon'"
              (click)="groupFilter.set('dakuon')">
              Âm đục (Dakuon)
            </button>
          </div>

          <button
            type="button"
            class="btn btn-quiz-kana"
            (click)="startKanaQuiz()">
            <app-pixel-icon name="icon_target" [size]="16"></app-pixel-icon>
            <span>Làm Quiz Kana (10 câu)</span>
          </button>
        </div>

        <!-- LƯỚI CHỮ CÁI KANA -->
        <div class="kana-grid">
          @for (k of filteredKana(); track k.id) {
            @let isMastered = jaService.masteredKana().includes(k.id);
            @let char = scriptMode() === 'hiragana' ? k.hiragana : k.katakana;

            <div
              class="kana-card"
              [class.is-mastered]="isMastered"
              (click)="speakChar(char)">
              <div class="card-top-action">
                <span class="row-tag">{{ k.rowName }}</span>
                <button
                  type="button"
                  class="btn-toggle-mastered"
                  [class.active]="isMastered"
                  [title]="isMastered ? 'Đã thuộc (Bấm để hủy)' : 'Đánh dấu đã thuộc'"
                  (click)="$event.stopPropagation(); toggleMastered(k.id)">
                  <app-pixel-icon [name]="isMastered ? 'icon_check' : 'icon_star_empty'" [size]="12"></app-pixel-icon>
                </button>
              </div>

              <div class="kana-char">{{ char }}</div>
              <div class="kana-romaji">{{ k.romaji }}</div>

              <div class="card-bottom-audio">
                <span class="audio-hint">
                  <app-pixel-icon name="icon_speaker" [size]="11"></app-pixel-icon>
                  <span>Phát âm</span>
                </span>
              </div>
            </div>
          }
        </div>
      } @else {
        <!-- BÀI THI QUIZ KANA 10 CÂU -->
        <div class="kana-quiz-container">
          <div class="quiz-nav-top">
            <button type="button" class="btn btn-secondary btn-sm" (click)="viewMode.set('board')">
              ‹ Quay lại bảng chữ cái
            </button>
            <div class="quiz-progress-text">
              Câu {{ currentQuizIndex() + 1 }} / {{ quizQuestions().length }}
            </div>
          </div>

          @if (quizFinished()) {
            <!-- KẾT QUẢ QUIZ KANA -->
            <div class="vintage-card quiz-result-card">
              <div class="result-trophy">
                <app-pixel-icon name="icon_trophy" [size]="40"></app-pixel-icon>
              </div>
              <h2 class="result-title font-serif">Hoàn Thành Luyện Tập Kana!</h2>
              <p class="result-score">
                Bạn trả lời đúng <strong>{{ correctCount() }} / {{ quizQuestions().length }} câu</strong>
              </p>

              <div class="reward-pill-row">
                <span class="reward-pill gold">
                  <app-pixel-icon name="icon_coin" [size]="14"></app-pixel-icon>
                  <span>+{{ rewardCoins() }} Xu</span>
                </span>
                <span class="reward-pill olive">
                  <app-pixel-icon name="icon_star" [size]="14"></app-pixel-icon>
                  <span>+{{ rewardXp() }} XP</span>
                </span>
              </div>

              <div class="result-actions">
                <button type="button" class="btn btn-primary" (click)="startKanaQuiz()">
                  <app-pixel-icon name="icon_retry" [size]="16"></app-pixel-icon>
                  <span>Luyện tập lại</span>
                </button>
                <button type="button" class="btn btn-secondary" (click)="viewMode.set('board')">
                  Về bảng chữ cái
                </button>
              </div>
            </div>
          } @else {
            @if (currentQuestion(); as q) {
              <!-- KHUNG CÂU HỎI QUIZ -->
              <div class="vintage-card question-box">
                <div class="q-eyebrow">
                  <app-pixel-icon name="icon_target" [size]="14"></app-pixel-icon>
                  <span>Luyện phản xạ bảng chữ cái</span>
                </div>

                <h3 class="q-prompt">{{ q.prompt }}</h3>

                <div class="q-audio-btn-row">
                  <button type="button" class="btn-audio-speak" (click)="speakChar(q.audioText)">
                    <app-pixel-icon name="icon_speaker" [size]="16"></app-pixel-icon>
                    <span>Nghe âm thanh</span>
                  </button>
                </div>

                <!-- 4 ĐÁP ÁN -->
                <div class="q-options-grid">
                  @for (opt of q.options; track opt; let idx = $index) {
                    @let isSelected = selectedOptionIdx() === idx;
                    @let isCorrect = idx === q.correctIndex;
                    @let isAnswered = answered();

                    <button
                      type="button"
                      class="q-opt-btn"
                      [class.opt-selected]="isSelected"
                      [class.opt-correct]="isAnswered && isCorrect"
                      [class.opt-wrong]="isAnswered && isSelected && !isCorrect"
                      [disabled]="isAnswered"
                      (click)="chooseAnswer(idx)">
                      <span class="opt-key">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                      <span class="opt-label">{{ opt }}</span>
                    </button>
                  }
                </div>

                <!-- FEEDBACK & NEXT -->
                @if (answered()) {
                  <div class="q-feedback-bar" [class.fb-correct]="selectedOptionIdx() === q.correctIndex">
                    <div class="fb-text">
                      <app-pixel-icon [name]="selectedOptionIdx() === q.correctIndex ? 'icon_check' : 'icon_cross'" [size]="14"></app-pixel-icon>
                      <span>{{ q.explanationVi }}</span>
                    </div>
                    <button type="button" class="btn btn-primary btn-next" (click)="nextQuizQuestion()">
                      <span>{{ currentQuizIndex() === quizQuestions().length - 1 ? 'Xem kết quả' : 'Câu tiếp theo ›' }}</span>
                    </button>
                  </div>
                }
              </div>
            }
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .kana-screen {
      max-width: 900px;
      margin: 0 auto;
      padding: 16px 20px 48px;
    }

    /* HEADER */
    .kana-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--navy);
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
    }
    .header-center {
      text-align: center;
      flex: 1;
    }
    .page-title {
      font-size: 24px;
      color: var(--navy);
      margin: 0;
    }
    .page-sub {
      font-size: 13px;
      color: var(--ink-muted);
      margin: 4px 0 0;
    }
    .stat-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: #EAE2D2;
      border: 1px solid var(--border);
      border-radius: 999px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--navy);
    }

    /* CONTROLS BAR */
    .kana-controls-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      background: #FFFDF9;
      border: 1.5px solid var(--border);
      border-radius: 14px;
      padding: 12px 16px;
    }
    .kana-tabs {
      display: flex;
      background: #EDE6D8;
      border-radius: 10px;
      padding: 3px;
      gap: 4px;
    }
    .k-tab {
      padding: 7px 14px;
      border: none;
      background: transparent;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
      cursor: pointer;
      transition: all 0.2s;
    }
    .k-tab.active {
      background: var(--navy);
      color: #FFFDF9;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }

    .group-filter-pills {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .filter-pill {
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 5px 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--navy);
      cursor: pointer;
    }
    .filter-pill.active {
      background: #78815D;
      color: #FFFDF9;
      border-color: #78815D;
    }

    .btn-quiz-kana {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #A65E65;
      color: #FFFDF9;
      border: none;
      padding: 8px 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(166, 94, 101, 0.2);
    }
    .btn-quiz-kana:hover {
      background: #8F4D53;
    }

    /* KANA GRID */
    .kana-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
      gap: 12px;
    }
    .kana-card {
      background: #FFFDF9;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 10px 10px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    .kana-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 3px 8px rgba(38, 56, 71, 0.08);
      border-color: #8C6B4F;
    }
    .kana-card.is-mastered {
      background: #F4F6F1;
      border-color: #78815D;
    }

    .card-top-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 4px;
    }
    .row-tag {
      font-size: 10px;
      font-weight: 700;
      color: var(--ink-muted);
      text-transform: uppercase;
    }
    .btn-toggle-mastered {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 2px;
      color: var(--ink-muted);
    }
    .btn-toggle-mastered.active {
      color: #78815D;
    }

    .kana-char {
      font-size: 34px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.2;
      margin: 2px 0;
      font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif;
    }
    .kana-romaji {
      font-size: 13px;
      font-weight: 700;
      color: #8C6B4F;
      letter-spacing: 0.5px;
    }
    .card-bottom-audio {
      margin-top: 6px;
    }
    .audio-hint {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 10px;
      font-weight: 600;
      color: var(--ink-muted);
    }

    /* QUIZ VIEW */
    .kana-quiz-container {
      max-width: 580px;
      margin: 0 auto;
    }
    .quiz-nav-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .quiz-progress-text {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
    }

    .question-box {
      background: #FFFDF9;
      border: 1.5px solid var(--border);
      border-radius: 16px;
      padding: 24px;
    }
    .q-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #78815D;
      margin-bottom: 12px;
    }
    .q-prompt {
      font-size: 18px;
      color: var(--navy);
      margin: 0 0 16px;
      line-height: 1.4;
    }
    .q-audio-btn-row {
      margin-bottom: 20px;
    }
    .btn-audio-speak {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #EAE2D2;
      border: 1px solid var(--border);
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
      cursor: pointer;
    }

    .q-options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 20px;
    }
    .q-opt-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #F8F4EB;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 12px 14px;
      cursor: pointer;
      text-align: left;
      font-size: 16px;
      font-weight: 700;
      color: var(--navy);
      transition: all 0.15s;
    }
    .q-opt-btn:hover:not(:disabled) {
      border-color: #8C6B4F;
      background: #FFFDF9;
    }
    .opt-key {
      font-size: 12px;
      color: var(--ink-muted);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 2px 6px;
    }
    .q-opt-btn.opt-correct {
      background: #E9ECE1;
      border-color: #78815D;
      color: #3D4728;
    }
    .q-opt-btn.opt-wrong {
      background: #F3E4E5;
      border-color: #A65E65;
      color: #6E2E35;
    }

    .q-feedback-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 12px;
      background: #F3E4E5;
      border: 1.5px solid #A65E65;
      flex-wrap: wrap;
    }
    .q-feedback-bar.fb-correct {
      background: #E9ECE1;
      border-color: #78815D;
    }
    .fb-text {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--navy);
      flex: 1;
    }

    /* RESULT CARD */
    .quiz-result-card {
      background: #FFFDF9;
      border: 1.5px solid var(--border);
      border-radius: 16px;
      padding: 32px 24px;
      text-align: center;
    }
    .result-trophy {
      margin-bottom: 12px;
    }
    .result-title {
      font-size: 22px;
      color: var(--navy);
      margin: 0 0 8px;
    }
    .result-score {
      font-size: 15px;
      color: var(--ink-muted);
      margin: 0 0 18px;
    }
    .reward-pill-row {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    .reward-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      border: 1px solid var(--border);
    }
    .reward-pill.gold { background: #FBF5E2; color: #6B4E0E; border-color: #C99B32; }
    .reward-pill.olive { background: #E9ECE1; color: #3D4728; border-color: #78815D; }
    .result-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
    }

    @media (max-width: 600px) {
      .kana-grid {
        grid-template-columns: repeat(4, 1fr);
      }
      .q-options-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class KanaBoardComponent {
  readonly jaService = inject(JapaneseLearningService);
  readonly state = inject(GameStateService);

  readonly scriptMode = signal<'hiragana' | 'katakana'>('hiragana');
  readonly groupFilter = signal<'all' | 'gojuon' | 'dakuon'>('all');
  readonly viewMode = signal<'board' | 'quiz'>('board');

  // Quiz state
  readonly quizQuestions = signal<JaQuizQuestion[]>([]);
  readonly currentQuizIndex = signal<number>(0);
  readonly selectedOptionIdx = signal<number | null>(null);
  readonly answered = signal<boolean>(false);
  readonly correctCount = signal<number>(0);
  readonly quizFinished = signal<boolean>(false);

  readonly rewardCoins = signal<number>(0);
  readonly rewardXp = signal<number>(0);

  readonly kanaList = computed(() => this.jaService.kanaCatalog());

  readonly filteredKana = computed(() => {
    const list = this.kanaList();
    const filter = this.groupFilter();
    if (filter === 'all') return list;
    return list.filter(k => k.group === filter);
  });

  readonly currentQuestion = computed(() => {
    const list = this.quizQuestions();
    const idx = this.currentQuizIndex();
    return list[idx] || null;
  });

  speakChar(char: string) {
    this.state.speak(char, 'ja-JP');
  }

  toggleMastered(kanaId: string) {
    const isNow = this.jaService.toggleKanaMastered(kanaId);
    this.state.showToast(isNow ? '✓ Đã thuộc chữ cái Kana!' : 'Đã bỏ đánh dấu chữ Kana.');
  }

  startKanaQuiz() {
    const qs = this.jaService.generateKanaQuizSession(this.scriptMode(), 10);
    this.quizQuestions.set(qs);
    this.currentQuizIndex.set(0);
    this.selectedOptionIdx.set(null);
    this.answered.set(false);
    this.correctCount.set(0);
    this.quizFinished.set(false);
    this.rewardCoins.set(0);
    this.rewardXp.set(0);
    this.viewMode.set('quiz');
  }

  chooseAnswer(idx: number) {
    if (this.answered()) return;
    this.selectedOptionIdx.set(idx);
    this.answered.set(true);

    const q = this.currentQuestion();
    if (q && idx === q.correctIndex) {
      this.correctCount.update(c => c + 1);
    }
  }

  nextQuizQuestion() {
    if (this.currentQuizIndex() < this.quizQuestions().length - 1) {
      this.currentQuizIndex.update(i => i + 1);
      this.selectedOptionIdx.set(null);
      this.answered.set(false);
    } else {
      // Kết thúc bài quiz -> Tính thưởng nông trại
      this.finishKanaQuiz();
    }
  }

  private finishKanaQuiz() {
    this.quizFinished.set(true);
    const correct = this.correctCount();
    const total = this.quizQuestions().length;
    const ratio = correct / total;

    // Thưởng theo kết quả
    let coins = 15;
    let xp = 10;
    if (ratio >= 0.9) {
      coins = 35;
      xp = 25;
    } else if (ratio >= 0.6) {
      coins = 25;
      xp = 18;
    }

    this.rewardCoins.set(coins);
    this.rewardXp.set(xp);

    this.state.addCoins(coins);
    this.state.addXp(xp);
    this.state.showToast(`🎉 Hoàn tất Quiz Kana: +${coins} Xu, +${xp} XP!`);
  }
}
