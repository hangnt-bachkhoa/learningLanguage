import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { GameStateService } from '../../core/services/game-state.service';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import { FarmApiService, QuizQuestionDto, QuizSubmitResultDto, QuizSessionDto } from '../../core/services/farm-api.service';
import { getDefaultQuizSession } from '../../core/constants/default-quiz-questions.constant';
import { QuizEngineService } from '../../core/services/quiz-engine.service';
import { DEFAULT_VOCABULARIES } from '../../core/constants/default-vocabularies.constant';
import { PosTagBadgeComponent } from '../../shared/components/pos-tag-badge/pos-tag-badge.component';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe, PosTagBadgeComponent, PixelIconComponent],
  template: `
    <div class="quiz-screen">
      <!-- ======================================================== -->
      <!-- CHẾ ĐỘ 1: ĐANG THỰC HIỆN BÀI THI QUIZ THEO PHONG CÁCH DUOLINGO -->
      <!-- ======================================================== -->
      @if (!isFinished()) {
        <!-- HEADER: TIẾN ĐỘ ĐƠN ĐIỆU + 5 GIỌT SƯƠNG XẾP HẠNG SAO -->
        <header class="quiz-header">
          <a [routerLink]="['/lessons']" class="back-link" title="Rời bài kiểm tra">
            <span class="chevron">‹</span>
            <span class="header-title">{{ lessonTitle() }}</span>
          </a>

          <!-- THANH TIẾN ĐỘ ĐƠN ĐIỆU (MONOTONIC PROGRESS BAR) -->
          <div class="progress-container">
            <div class="progress-bar-rail">
              <div class="progress-bar-fill" [style.width.%]="progressPercent()"></div>
            </div>
            <span class="progress-count">{{ masteredIds().size }}/{{ totalInitial() }}</span>
          </div>

          <!-- 5 GIỌT SƯƠNG: CHỈ BÁO XẾP HẠNG 3 SAO -->
          <div class="dew-drops-row" [title]="dewDropsTooltip()">
            @for (drop of dewDropsState(); track $index) {
              <span class="dew-drop" [class.dew-active]="drop" [class.dew-lost]="!drop">
                <app-pixel-icon [name]="drop ? 'icon_dew_drop' : 'icon_dew_drop_empty'" [size]="18"></app-pixel-icon>
              </span>
            }
          </div>
        </header>

        @if (isLoading()) {
          <div class="vintage-card state-card">
            <span class="pulse-icon">⏳</span>
            <p>Đang chuẩn bị 10 câu hỏi có trọng số thông minh...</p>
          </div>
        } @else if (queue().length === 0 && !isSubmitting()) {
          <div class="vintage-card state-card">
            <span class="empty-icon">🍃</span>
            <p>Chủ đề này chưa có câu hỏi kiểm tra.</p>
            <a routerLink="/lessons" class="btn btn-secondary">Về danh sách bài học</a>
          </div>
        } @else {
          @if (currentQuestion(); as q) {
            <!-- THẺ CÂU HỎI PHẲNG (2D FLAT NATURALIST) -->
            <main class="question-container">
              <div class="vintage-card question-card">
                <!-- HUY HIỆU DẠNG CÂU HỎI -->
                <div class="question-type-badge">
                  @if (q.questionType === 'context') {
                    <span>📝 Ngữ cảnh TOEIC</span>
                  } @else if (q.questionType === 'listening') {
                    <span>🎧 Nghe & Chọn từ</span>
                  } @else if (isViToEn(q)) {
                    <span>🇻🇳 ➔ 🇬🇧 Chọn từ tiếng Anh</span>
                  } @else {
                    <span>📖 Nghĩa của từ</span>
                  }
                </div>

                <!-- NỘI DUNG CÂU HỎI THEO TỪNG DẠNG -->
                <div class="prompt-box">
                  @if (q.questionType === 'context') {
                    <h2 class="context-prompt">{{ q.prompt }}</h2>
                    @if (q.exampleVi) {
                      <p class="context-vi">"{{ q.exampleVi }}"</p>
                    }
                  } @else if (q.questionType === 'listening') {
                    <!-- Dạng 3: LISTENING - Ẩn hoàn toàn chữ và phiên âm, chỉ để lại nút nghe âm thanh -->
                    <div class="listening-action-box">
                      <button class="speaker-large-btn" (click)="state.speak(q.word || '')" title="Bấm để nghe phát âm">
                        <span class="speaker-icon">🔊</span>
                        <span class="speaker-label">Nghe phát âm</span>
                      </button>
                    </div>
                    <h3 class="listening-prompt">{{ q.prompt }}</h3>
                  } @else if (isViToEn(q)) {
                    <!-- Dạng 4: VI_TO_EN - Chọn từ tiếng Anh từ nghĩa tiếng Việt -->
                    <!-- TUYỆT ĐỐI KHÔNG HIỂN THỊ TỪ TIẾNG ANH VÀ PHIÊN ÂM VÌ ĐÓ LÀ ĐÁP ÁN! -->
                    <div class="word-lead-box vi-lead-box">
                      <p class="vi-prompt-sub">Chọn từ tiếng Anh có nghĩa là:</p>
                      <h2 class="quiz-word vi-meaning-target">"{{ extractMeaning(q) }}"</h2>
                    </div>
                  } @else {
                    <!-- Dạng 1: EN_TO_VI - Nghĩa tiếng Việt của từ tiếng Anh -->
                    <div class="word-lead-box">
                      <h2 class="quiz-word">{{ q.word }}</h2>
                      <div class="word-meta-row">
                        @if (q.phonetic) {
                          <span class="word-phonetic">{{ cleanPhonetic(q.phonetic) }}</span>
                        }
                        <button class="speaker-mini-btn" (click)="state.speak(q.word || '')" title="Nghe âm thanh">
                          🔊
                        </button>
                      </div>
                    </div>
                    <p class="prompt-text">{{ q.prompt }}</p>
                  }
                </div>

                <!-- DANH SÁCH 4 ĐÁP ÁN TRẮC NGHIỆM PHẲNG -->
                <div class="options-grid">
                  @for (opt of q.options; track opt; let idx = $index) {
                    <button
                      type="button"
                      class="option-flat-btn"
                      [class.selected]="selectedOptionIdx() === idx && feedbackState() === 'none'"
                      [class.correct]="feedbackState() !== 'none' && idx === q.correctOptionIndex"
                      [class.wrong]="feedbackState() === 'wrong' && selectedOptionIdx() === idx"
                      [disabled]="feedbackState() !== 'none'"
                      (click)="selectOption(idx)">
                      <span class="option-idx">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                      <span class="option-content">{{ opt }}</span>
                    </button>
                  }
                </div>

                <!-- NÚT HÀNH ĐỘNG DƯỚI CÙNG & KHỐI THÔNG BÁO FEEDBACK (THAY THẾ VỊ TRÍ NÚT TIẾP TỤC) -->
                <div class="check-action-bar">
                  @if (feedbackState() === 'none') {
                    <button
                      class="btn btn-primary check-btn"
                      [disabled]="selectedOptionIdx() === null"
                      (click)="checkAnswer()">
                      Kiểm tra đáp án
                    </button>
                  } @else {
                    <div
                      class="feedback-tray"
                      [class.sheet-correct]="feedbackState() === 'correct'"
                      [class.sheet-wrong]="feedbackState() === 'wrong'">
                      
                      <div class="feedback-info">
                        @if (feedbackState() === 'correct') {
                          <div class="feedback-header correct-header">
                            <div class="header-left-title">
                              <span class="status-icon">✓</span>
                              <span class="status-title">Chính xác!</span>
                            </div>
                            @if (currentWordType(); as wt) {
                              <app-pos-tag [type]="wt" mode="full" [showQuestionHint]="true"></app-pos-tag>
                            }
                          </div>
                          @if (feedbackDetail()?.explanation; as exp) {
                            <p class="feedback-sub">{{ exp }}</p>
                          }
                        } @else {
                          <div class="feedback-header wrong-header">
                            <div class="header-left-title">
                              <span class="status-icon">✕</span>
                              <span class="status-title">Chưa chính xác</span>
                            </div>
                            @if (currentWordType(); as wt) {
                              <app-pos-tag [type]="wt" mode="full" [showQuestionHint]="true"></app-pos-tag>
                            }
                          </div>
                          @if (feedbackDetail()?.correctText; as ct) {
                            <div class="correct-answer-reveal">
                              <span class="reveal-label">Đáp án đúng:</span>
                              <strong class="reveal-text">{{ ct }}</strong>
                            </div>
                          }
                          @if (feedbackDetail()?.explanation; as exp) {
                            <p class="feedback-sub">{{ exp }}</p>
                          }
                        }
                      </div>

                      <button
                        class="btn feedback-action-btn"
                        [class.btn-success]="feedbackState() === 'correct'"
                        [class.btn-danger]="feedbackState() === 'wrong'"
                        (click)="continueQueue()">
                        @if (feedbackState() === 'correct') {
                          {{ queue().length === 1 ? 'Hoàn thành bài thi ›' : 'Tiếp tục ›' }}
                        } @else {
                          Đã hiểu ›
                        }
                      </button>
                    </div>
                  }
                </div>
              </div>
            </main>
          }
        }
      } @else {
        <!-- ======================================================== -->
        <!-- CHẾ ĐỘ 2: MÀN HÌNH TỔNG KẾT & NHẬN THƯỞNG DELTA REWARD   -->
        <!-- ======================================================== -->
        <main class="results-screen">
          <div class="vintage-card results-card">
            <!-- VÒNG NGUYỆT QUẾ VÀ HUY HIỆU SAO -->
            <div class="laurel-wreath"><app-pixel-icon name="icon_leaf_badge" [size]="28"></app-pixel-icon></div>
            
            <div class="stars-display-row">
              <span class="star-item" [class.active-star]="(result()?.stars || 1) >= 1">
                <app-pixel-icon [name]="(result()?.stars || 1) >= 1 ? 'icon_star' : 'icon_star_empty'" [size]="28"></app-pixel-icon>
              </span>
              <span class="star-item star-mid" [class.active-star]="(result()?.stars || 1) >= 2">
                <app-pixel-icon [name]="(result()?.stars || 1) >= 2 ? 'icon_star' : 'icon_star_empty'" [size]="34"></app-pixel-icon>
              </span>
              <span class="star-item" [class.active-star]="(result()?.stars || 1) >= 3">
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
              {{ result()?.message || 'Bạn đã hoàn tất sửa sai toàn bộ câu hỏi của chủ đề này!' }}
            </p>

            <!-- KỶ LỤC MỚI BADGE -->
            @if (result()?.isNewRecord) {
              <div class="new-record-pill" style="display:inline-flex; align-items:center; gap:6px;">
                <app-pixel-icon name="icon_trophy" [size]="16"></app-pixel-icon>
                <span>KỶ LỤC MỚI VỀ SAO</span>
              </div>
            }

            <!-- BẢNG ĐIỂM CHI TIẾT -->
            <div class="stats-summary-card">
              <div class="summary-col">
                <span class="col-value">{{ result()?.firstTryCorrectCount || 0 }}/{{ totalInitial() }}</span>
                <span class="col-label">Đúng lần đầu</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-col">
                <span class="col-value" style="display:inline-flex; align-items:center; gap:4px;">
                  <span>{{ dewDropsRemaining() }}</span>
                  <app-pixel-icon name="icon_dew_drop" [size]="14"></app-pixel-icon>
                </span>
                <span class="col-label">Giọt sương còn</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-col">
                <span class="col-value">{{ result()?.scorePercent || 100 }}%</span>
                <span class="col-label">Độ chuẩn xác</span>
              </div>
            </div>

            <!-- 1. TIỀN TỆ & KINH NGHIỆM (QUIZ-ONLY XP & COINS THEO 3-STAR DELTA) -->
            <div class="reward-section">
              <div class="reward-heading">Tiền tệ & Kinh nghiệm (Quiz Delta)</div>
              @if ((result()?.rewardXp || 0) > 0 || (result()?.rewardCoins || 0) > 0) {
                <div class="rewards-grid">
                  @if ((result()?.rewardCoins || 0) > 0) {
                    <div class="reward-item-box">
                      <span class="reward-emoji"><app-pixel-icon name="icon_coin" [size]="20"></app-pixel-icon></span>
                      <span class="reward-title">Xu vàng</span>
                      <span class="reward-qty">+{{ result()?.rewardCoins }}</span>
                    </div>
                  }
                  @if ((result()?.rewardXp || 0) > 0) {
                    <div class="reward-item-box">
                      <span class="reward-emoji"><app-pixel-icon name="icon_sparkle" [size]="20"></app-pixel-icon></span>
                      <span class="reward-title">Điểm XP</span>
                      <span class="reward-qty">+{{ result()?.rewardXp }}</span>
                    </div>
                  }
                </div>
              } @else {
                <div class="max-reward-notice">
                  <span class="notice-icon">🎖️</span>
                  <span>Đã nhận tối đa (Kỷ lục cũ: {{ result()?.bestStarsClaimed }}★) · Không lặp lại Xu & XP khi ôn tập</span>
                </div>
              }
            </div>

            <!-- 2. RƠI PHẦN THƯỞNG NÔNG TRẠI (HYBRID DROP: 5% PHÂN BÓN & 1% HẠT GIỐNG) -->
            <div class="reward-section drop-section">
              <div class="reward-heading">Phần thưởng Nông trại may mắn</div>
              @if ((result()?.rewardFertilizer || 0) > 0 || result()?.bonusSeedName) {
                <div class="lucky-drop-banner">
                  <span class="lucky-badge">🌿 RƠI PHẦN THƯỞNG MAY MẮN!</span>
                </div>
                <div class="rewards-grid">
                  @if (result()?.bonusSeedName; as seedName) {
                    <div class="reward-item-box drop-highlight">
                      <div class="reward-svg" [innerHTML]="assets.seedBag | safeHtml"></div>
                      <span class="reward-title">Hạt {{ seedName }}</span>
                      <span class="reward-qty">+1</span>
                    </div>
                  }
                  @if ((result()?.rewardFertilizer || 0) > 0) {
                    <div class="reward-item-box drop-highlight">
                      <div class="reward-svg" [innerHTML]="assets.fertilizerSack | safeHtml"></div>
                      <span class="reward-title">Phân bón vi sinh</span>
                      <span class="reward-qty">+{{ result()?.rewardFertilizer }}</span>
                    </div>
                  }
                </div>
              } @else {
                <p class="drop-empty-hint">
                  Chưa kích hoạt rơi vật phẩm may mắn trong lượt thi này.
                </p>
              }

              <!-- THÔNG SỐ PITY COUNTER & DAILY ROLL CAP CHỐNG XUI & CHỐNG CÀY -->
              <div class="drop-pity-footer">
                <span>🎲 Lượt may mắn hôm nay: <strong>{{ result()?.dailyBonusRollsUsed ?? state.userRewardState().dailyBonusRollsUsed }}/10</strong></span>
                <span>·</span>
                <span>Bảo hiểm Hạt: <strong>{{ result()?.pitySeedMisses ?? state.userRewardState().pitySeedMisses }}/26</strong></span>
                <span>·</span>
                <span>Bảo hiểm Phân bón: <strong>{{ result()?.pityFertilizerMisses ?? state.userRewardState().pityFertilizerMisses }}/20</strong></span>
              </div>
            </div>

            <!-- CÁC NÚT ĐIỀU HƯỚNG TIẾP THEO -->
            <div class="actions-stack">
              <a routerLink="/farm" class="btn btn-primary go-farm-btn">
                🌱 Về Nông trại gieo hạt & tưới cây
              </a>
              <button class="btn btn-secondary retake-btn" (click)="retakeQuiz()">
                🔄 Luyện tập lại bài này
              </button>
              <a routerLink="/lessons" class="btn btn-outline back-lessons-btn">
                📚 Danh sách các chủ đề khác
              </a>
            </div>
          </div>
        </main>
      }
    </div>
  `,
  styles: [`
    .quiz-screen {
      max-width: 580px;
      margin: 0 auto;
      padding: 8px 16px 40px;
      position: relative;
    }

    /* ================= HEADER ================= */
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

    /* THANH TIẾN ĐỘ ĐƠN ĐIỆU */
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
      background: #4E6B4E;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .progress-count {
      font-size: 12px;
      font-weight: 700;
      color: var(--ink-muted);
      white-space: nowrap;
    }

    /* 5 GIỌT SƯƠNG */
    .dew-drops-row {
      display: flex;
      gap: 3px;
      padding: 4px 8px;
      background: #FAF6EF;
      border: 1px solid #E2D7C7;
      border-radius: 999px;
      align-items: center;
    }

    .dew-drop {
      font-size: 13px;
      transition: all 0.25s ease;
    }

    .dew-drop.dew-lost {
      opacity: 0.25;
      filter: grayscale(100%);
    }

    /* ================= MAIN QUESTION ================= */
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
      margin-bottom: 16px;
    }

    .prompt-box {
      margin-bottom: 22px;
    }

    .word-lead-box {
      margin-bottom: 8px;
    }

    /* Dạng VI_TO_EN: Làm nổi bật nghĩa tiếng Việt cần tìm từ tiếng Anh */
    .vi-lead-box {
      margin: 4px auto 14px;
      padding: 12px 18px;
      background: rgba(120, 129, 93, 0.09);
      border: 1px dashed var(--border-strong);
      border-radius: var(--radius-md);
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      max-width: 100%;
    }

    .vi-prompt-sub {
      font-size: 14px;
      color: var(--ink-muted);
      margin: 0 0 6px;
      font-weight: 500;
    }

    .vi-meaning-target {
      font-family: var(--font-serif);
      font-size: 26px;
      font-weight: 800;
      color: var(--navy);
      margin: 0;
      letter-spacing: -0.3px;
    }

    .quiz-word {
      font-family: var(--font-serif);
      font-size: 32px;
      font-weight: 800;
      color: var(--navy);
      margin: 0 0 4px;
      letter-spacing: -0.5px;
    }

    .word-meta-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .word-phonetic {
      font-size: 15px;
      color: var(--ink-muted);
      font-family: monospace;
    }

    .speaker-mini-btn {
      background: #F0EAE1;
      border: 1px solid #D8CFBF;
      border-radius: 999px;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.15s;
    }

    .speaker-mini-btn:hover {
      background: #E5DCCE;
    }

    .prompt-text {
      font-size: 16px;
      font-weight: 600;
      color: var(--navy);
      margin-top: 8px;
    }

    /* Dạng ngữ cảnh */
    .context-prompt {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.5;
      color: var(--navy);
      white-space: pre-line;
      margin: 0 0 8px;
    }

    .context-vi {
      font-size: 14px;
      color: var(--ink-muted);
      font-style: italic;
      margin: 0;
    }

    /* Dạng nghe */
    .listening-action-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }

    .speaker-large-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #4E6B4E;
      color: #FFF;
      border: none;
      border-radius: 999px;
      padding: 12px 24px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.15s, background 0.15s;
    }

    .speaker-large-btn:hover {
      background: #3F573F;
      transform: scale(1.02);
    }

    .speaker-icon {
      font-size: 18px;
    }

    .phonetic-pill {
      font-family: monospace;
      font-size: 15px;
      color: var(--ink-muted);
    }

    .listening-prompt {
      font-size: 16px;
      font-weight: 600;
      color: var(--navy);
      margin: 0;
    }

    /* ================= OPTIONS GRID ================= */
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
      padding: 14px 16px;
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
      border-color: #4E6B4E;
      background: #F4F7F2;
    }

    .option-flat-btn.selected {
      border-color: #4E6B4E;
      background: #EAEFE6;
      font-weight: 700;
      box-shadow: 0 0 0 1px #4E6B4E;
    }

    .option-flat-btn.correct {
      border-color: #5B8254;
      background: #E7F3E6;
      font-weight: 700;
      box-shadow: 0 0 0 1.5px #5B8254;
    }

    .option-flat-btn.correct .option-idx {
      background: #5B8254;
      color: #FFF;
    }

    .option-flat-btn.wrong {
      border-color: #C05850;
      background: #FCEBEA;
      font-weight: 700;
      box-shadow: 0 0 0 1.5px #C05850;
    }

    .option-flat-btn.wrong .option-idx {
      background: #C05850;
      color: #FFF;
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
      background: #4E6B4E;
      color: #FFF;
    }

    .option-content {
      flex: 1;
      line-height: 1.4;
    }

    /* NÚT KIỂM TRA & KHỐI THÔNG BÁO DƯỚI CÙNG */
    .check-action-bar {
      margin-top: 10px;
    }

    .check-btn {
      width: 100%;
      padding: 13px;
      font-size: 15.5px;
      font-weight: 700;
      border-radius: 12px;
    }

    /* ================= KHỐI THÔNG BÁO FEEDBACK DƯỚI CÙNG ================= */
    .feedback-tray {
      width: 100%;
      padding: 14px 16px;
      border-radius: 14px;
      box-shadow: 0 2px 8px rgba(44, 53, 64, 0.06);
      animation: fadeIn 0.2s ease-out;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(4px);
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

    .feedback-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .feedback-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .header-left-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 700;
    }

    .correct-header .header-left-title {
      color: #3B5B3B;
    }

    .wrong-header .header-left-title {
      color: #8C3E44;
    }

    .status-icon {
      font-size: 18px;
      line-height: 1;
    }

    .correct-answer-reveal {
      font-size: 13.5px;
      color: #4A3E39;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 8px;
      padding: 4px 10px;
      margin-top: 2px;
    }

    .reveal-label {
      font-weight: 600;
      color: #6E2E35;
    }

    .reveal-text {
      font-weight: 800;
      color: #8C3E44;
    }

    .feedback-sub {
      font-size: 13.5px;
      line-height: 1.45;
      color: var(--ink-muted);
      margin: 2px 0 0;
    }

    .feedback-action-btn {
      width: 100%;
      padding: 13px;
      font-size: 15.5px;
      font-weight: 700;
      border-radius: 12px;
      white-space: nowrap;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
      transition: all 0.15s ease;
    }

    .feedback-action-btn:active {
      transform: translateY(1px);
    }

    .btn-success {
      background: #78815D;
      color: #FFF;
    }

    .btn-success:hover {
      background: #636A4B;
    }

    .btn-danger {
      background: #A65E65;
      color: #FFF;
    }

    .btn-danger:hover {
      background: #8F4E55;
    }

    /* ================= RESULTS SCREEN ================= */
    .results-screen {
      padding-top: 10px;
    }

    .results-card {
      padding: 32px 24px;
      border-radius: 20px;
      text-align: center;
      border: 1.5px solid #DDD3C3;
      background: #FAF6EF;
    }

    .laurel-wreath {
      font-size: 38px;
      margin-bottom: 6px;
    }

    .stars-display-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .star-item {
      font-size: 32px;
      opacity: 0.25;
      filter: grayscale(100%);
      transition: all 0.3s ease;
    }

    .star-item.active-star {
      opacity: 1;
      filter: none;
      transform: scale(1.1);
    }

    .star-mid {
      margin-bottom: 6px;
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

    /* PHẦN THƯỞNG NÔNG TRẠI DELTA */
    .reward-section {
      margin-bottom: 26px;
    }

    .reward-heading {
      font-size: 14px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .rewards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: 10px;
    }

    .reward-item-box {
      background: #FAF6EF;
      border: 1px solid #DDD3C3;
      border-radius: 12px;
      padding: 12px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .reward-svg {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .reward-svg img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      image-rendering: pixelated;
    }

    .reward-emoji {
      font-size: 24px;
      line-height: 32px;
    }

    .reward-title {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--navy);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 85px;
    }

    .reward-qty {
      font-weight: 800;
      font-size: 13px;
      color: #4E6B4E;
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
    }

    .max-reward-notice .notice-icon {
      font-size: 18px;
    }

    .drop-section {
      border-top: 1px dashed #D9C8B5;
      padding-top: 18px;
    }

    .lucky-drop-banner {
      display: flex;
      justify-content: center;
      margin-bottom: 12px;
    }

    .lucky-badge {
      background: #78815D;
      color: #FFF;
      font-size: 11.5px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 999px;
      letter-spacing: 0.4px;
    }

    .drop-highlight {
      background: #EAF3E7;
      border-color: #A3C79B;
    }

    .drop-empty-hint {
      font-size: 13px;
      color: var(--ink-muted);
      margin: 4px 0 10px;
      text-align: center;
      font-style: italic;
    }

    .drop-pity-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      font-size: 11.5px;
      color: #7D7565;
      margin-top: 12px;
      flex-wrap: wrap;
    }

    /* ACTIONS STACK */
    .actions-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .go-farm-btn {
      padding: 13px;
      font-size: 15px;
      font-weight: 700;
      border-radius: 12px;
    }

    .retake-btn, .back-lessons-btn {
      padding: 12px;
      font-size: 14.5px;
      font-weight: 600;
      border-radius: 12px;
    }

    .state-card {
      text-align: center;
      padding: 40px 20px;
    }

    .pulse-icon, .empty-icon {
      font-size: 34px;
      display: block;
      margin-bottom: 10px;
    }

    /* ================= RESPONSIVE MOBILE (< 600px) ================= */
    @media (max-width: 600px) {
      .quiz-screen {
        padding: 4px 6px 24px;
      }
      .quiz-header {
        gap: 6px;
        margin-bottom: 12px;
      }
      .back-link {
        max-width: 90px;
        font-size: 12.5px;
      }
      .header-title {
        display: none;
      }
      .dew-drops-row {
        padding: 3px 5px;
        gap: 1.5px;
      }
      .dew-drop {
        font-size: 11px;
      }
      .question-card {
        padding: 16px 12px;
        border-radius: 14px;
      }
      .quiz-word {
        font-size: 22px;
      }
      .context-prompt {
        font-size: 15px;
      }
      .speaker-large-btn {
        padding: 9px 18px;
        font-size: 13.5px;
      }
      .option-flat-btn {
        padding: 11px 10px;
        font-size: 13.5px;
        gap: 8px;
        border-radius: 10px;
      }
      .feedback-tray {
        padding: 12px 14px;
        gap: 10px;
        border-radius: 12px;
      }
      .feedback-header {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 6px;
      }
      .header-left-title {
        font-size: 15px;
      }
      .feedback-sub {
        font-size: 12.5px;
      }
      .correct-answer-reveal {
        font-size: 12.5px;
        padding: 3px 8px;
      }
      .feedback-action-btn {
        padding: 11px;
        font-size: 14.5px;
        border-radius: 10px;
      }
      .results-card {
        padding: 20px 14px;
        border-radius: 16px;
      }
      .result-title {
        font-size: 19px;
      }
      .rewards-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
      }
    }
  `]
})
export class QuizComponent implements OnInit {
  state = inject(GameStateService);
  quizEngine = inject(QuizEngineService);
  assets = FARM_ASSETS;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private farmApi = inject(FarmApiService);

  // Trạng thái bài kiểm tra
  lessonId = signal<number>(1);
  lessonTitle = signal<string>('Kiểm tra từ vựng');
  sessionId = signal<string | null>(null);
  bestStarsClaimed = signal<number>(0);
  requiredCropName = signal<string>('Cà rốt');

  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  isFinished = signal<boolean>(false);

  // HÀNG ĐỢI LẶP CÂU SAI & TIẾN ĐỘ
  queue = signal<QuizQuestionDto[]>([]);
  totalInitial = signal<number>(10);
  masteredIds = signal<Set<number>>(new Set());

  // Lưu kết quả của riêng LẦN GẶP ĐẦU TIÊN: questionId -> isCorrect
  firstTryResults = new Map<number, boolean>();
  totalTriesCount = signal<number>(0);

  // Lựa chọn & Phản hồi đáy
  selectedOptionIdx = signal<number | null>(null);
  feedbackState = signal<'none' | 'correct' | 'wrong'>('none');
  feedbackDetail = signal<{ prompt: string; correctText: string; explanation?: string } | null>(null);

  // Kết quả cuối cùng
  result = signal<QuizSubmitResultDto | null>(null);

  // CÂU HỎI ĐẦU HÀNG ĐỢI HIỆN TẠI
  currentQuestion = computed(() => this.queue()[0] || null);
  currentWordType = computed(() => this.getWordType(this.currentQuestion()?.word));

  // TIẾN ĐỘ ĐƠN ĐIỆU (MONOTONIC): Chỉ tăng khi 1 câu gốc được trả lời đúng
  progressPercent = computed(() => {
    const total = this.totalInitial() || 10;
    return Math.min(100, Math.round((this.masteredIds().size / total) * 100));
  });

  // TÍNH TOÁN 5 GIỌT SƯƠNG:
  // Giọt sương chỉ bị mất khi làm SAI ở LẦN ĐẦU TIÊN
  firstTryWrongCount = computed(() => {
    let wrongs = 0;
    this.firstTryResults.forEach(isCorrect => {
      if (!isCorrect) wrongs++;
    });
    return wrongs;
  });

  dewDropsRemaining = computed(() => {
    return Math.max(0, 5 - this.firstTryWrongCount());
  });

  dewDropsState = computed(() => {
    const remaining = this.dewDropsRemaining();
    return [remaining >= 1, remaining >= 2, remaining >= 3, remaining >= 4, remaining >= 5];
  });

  dewDropsTooltip = computed(() => {
    const d = this.dewDropsRemaining();
    if (d === 5) return '5 Giọt sương: Hạng 3 Sao ★★★ (Hoàn hảo)';
    if (d >= 3) return `${d} Giọt sương: Hạng 2 Sao ★★ (Khá tốt)`;
    return `${d} Giọt sương: Hạng 1 Sao ★ (Cần nỗ lực sửa sai)`;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const lid = params['lessonId'] ? Number(params['lessonId']) : 1;
      this.lessonId.set(lid);
      this.loadQuizSession(lid);
    });
  }

  loadQuizSession(lessonId: number) {
    this.isLoading.set(true);
    this.isFinished.set(false);
    this.queue.set([]);
    this.firstTryResults.clear();
    this.masteredIds.set(new Set());
    this.totalTriesCount.set(0);
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');

    // Chế độ Offline / Client-Side (GitHub Pages tĩnh): Tải câu hỏi từ Smart Engine ngay lập tức
    if (!this.state.isApiConnected()) {
      this.loadDefaultQuestions(lessonId);
      return;
    }

    this.farmApi.getQuizSession(lessonId).subscribe({
      next: (session: QuizSessionDto) => {
        if (session && session.questions && session.questions.length > 0) {
          this.sessionId.set(session.sessionId);
          this.lessonTitle.set(session.lessonTitle);
          this.requiredCropName.set(session.requiredCropName || 'Nông sản');
          this.bestStarsClaimed.set(session.bestStarsClaimed || 0);

          const list = session.questions;
          this.queue.set([...list]);
          this.totalInitial.set(list.length > 0 ? list.length : 10);
          this.isLoading.set(false);
        } else {
          this.loadDefaultQuestions(lessonId);
        }
      },
      error: () => {
        // Fallback gọi getQuizQuestions nếu quiz-session chưa khởi tạo xong
        this.farmApi.getQuizQuestions(lessonId).subscribe({
          next: (questions) => {
            if (questions && questions.length > 0) {
              this.queue.set([...questions]);
              this.totalInitial.set(questions.length > 0 ? questions.length : 10);
              this.isLoading.set(false);
            } else {
              this.loadDefaultQuestions(lessonId);
            }
          },
          error: () => {
            // Khi chạy tĩnh trên GitHub Pages không có backend API, tự động nạp bộ câu hỏi offline
            this.loadDefaultQuestions(lessonId);
          }
        });
      }
    });
  }

  private loadDefaultQuestions(lessonId: number) {
    // Thuật toán 1 & 2: Smart Pool Sampling + Multi-Format Generator + 3-Tier Distractors
    const rawList = this.state.vocabulariesByLesson()[lessonId];
    const vocabs = (rawList && rawList.length > 0)
      ? rawList
      : (DEFAULT_VOCABULARIES[lessonId]?.length ? DEFAULT_VOCABULARIES[lessonId] : (DEFAULT_VOCABULARIES[1] || []));
    let generated = this.quizEngine.generateSessionQuestions(lessonId, vocabs, this.state.userWordStats());

    // Bảo hiểm an toàn tuyệt đối: Nếu sinh rỗng, dùng dữ liệu mặc định từ default-quiz-questions
    let questions: QuizQuestionDto[];
    if (generated && generated.length > 0) {
      questions = generated.map(g => ({
        id: g.id,
        lessonId: g.lessonId,
        prompt: g.prompt,
        word: g.word,
        phonetic: g.phonetic,
        spriteKey: g.spriteKey,
        questionType: g.format === 'CONTEXT_CLOZE' ? 'context' : (g.format === 'LISTENING' ? 'listening' : (g.format === 'VI_TO_EN' ? 'vi_to_en' : 'meaning')),
        format: g.format,
        exampleEn: g.exampleEn,
        exampleVi: g.exampleVi,
        options: g.options,
        correctOptionIndex: g.correctIndex
      }));
    } else {
      const fallbackSession = getDefaultQuizSession(lessonId);
      questions = fallbackSession.questions;
    }

    const lesson = this.state.lessons().find(l => l.id === lessonId);
    const title = lesson?.title || `Chủ đề ${lessonId}`;
    const requiredCrop = lesson?.requiredCropName || 'Cà rốt';
    const stars = this.state.userLessonProgress()[lessonId]?.bestStarsClaimed || lesson?.bestStarsClaimed || 0;

    this.sessionId.set(`local_quiz_${lessonId}_${Date.now()}`);
    this.lessonTitle.set(title);
    this.requiredCropName.set(requiredCrop);
    this.bestStarsClaimed.set(stars);

    this.queue.set([...questions]);
    this.totalInitial.set(questions.length > 0 ? questions.length : 10);
    this.isLoading.set(false);
  }

  isViToEn(q: QuizQuestionDto | null | undefined): boolean {
    if (!q) return false;
    if (q.questionType === 'context' || q.questionType === 'listening') return false;
    if (q.format === 'VI_TO_EN' || q.questionType === 'vi_to_en') return true;
    if (q.prompt && (
      q.prompt.includes('Chọn từ tiếng Anh') ||
      q.prompt.includes('Từ nào sau đây là') ||
      q.prompt.includes('từ tiếng Anh có nghĩa') ||
      q.prompt.toLowerCase().includes('tiếng anh')
    )) {
      return true;
    }
    // Nếu các đáp án A, B, C, D chứa từ tiếng Anh chính (q.word) -> chắc chắn là câu hỏi chọn từ tiếng Anh
    const targetWord = q.word ? q.word.trim().toLowerCase() : '';
    if (targetWord && q.options && q.options.some(opt => opt.trim().toLowerCase() === targetWord)) {
      return true;
    }
    return false;
  }

  extractMeaning(q: QuizQuestionDto | null | undefined): string {
    if (!q || !q.prompt) return '';
    const match = q.prompt.match(/["“]([^"”]+)["”]/);
    if (match && match[1]) {
      return match[1].replace(/["“”]/g, '').trim();
    }
    const cleaned = q.prompt.replace(/^Chọn từ tiếng Anh có nghĩa là:?\s*/i, '')
                           .replace(/^Từ nào sau đây là:?\s*/i, '')
                           .replace(/["“”:?]/g, '')
                           .trim();
    return cleaned || q.prompt;
  }

  cleanPhonetic(p?: string | null): string {
    if (!p) return '';
    const trimmed = p.replace(/^\/+|\/+$/g, '').trim();
    return trimmed ? `/${trimmed}/` : '';
  }

  getWordType(word?: string | null): string {
    if (!word) return 'noun';
    const info = this.state.findVocab(word);
    return info?.vocab?.wordType || 'noun';
  }

  selectOption(idx: number) {
    if (this.feedbackState() !== 'none') return;
    this.selectedOptionIdx.set(idx);
  }

  checkAnswer() {
    const q = this.currentQuestion();
    const selected = this.selectedOptionIdx();
    if (!q || selected === null) return;

    this.totalTriesCount.update(c => c + 1);
    const correctIdx = q.correctOptionIndex ?? 0;
    const isCorrect = selected === correctIdx;
    const correctText = q.options[correctIdx] || '';

    // Thuật toán 3: GHI NHẬN KẾT QUẢ CHO LẦN ĐẦU TIÊN GẶP CÂU NÀY
    if (!this.firstTryResults.has(q.id)) {
      this.firstTryResults.set(q.id, isCorrect);
    }

    if (isCorrect) {
      this.feedbackState.set('correct');
      this.feedbackDetail.set({
        prompt: q.prompt,
        correctText: correctText,
        explanation: q.exampleEn ? `Ví dụ: "${q.exampleEn}"` : (q.exampleVi ? `Dịch: "${q.exampleVi}"` : undefined)
      });
      // Phát âm từ nếu có
      if (q.word) {
        this.state.speak(q.word);
      }
    } else {
      this.feedbackState.set('wrong');
      this.feedbackDetail.set({
        prompt: q.prompt,
        correctText: correctText,
        explanation: q.exampleVi ? `Dịch: "${q.exampleVi}"` : (q.exampleEn ? `Ví dụ: "${q.exampleEn}"` : undefined)
      });
    }
  }

  continueQueue() {
    const q = this.currentQuestion();
    if (!q) return;

    const isCorrect = this.feedbackState() === 'correct';
    const currentQueue = [...this.queue()];

    if (isCorrect) {
      // Đã trả lời đúng: thêm vào tập đã thuộc (masteredIds), loại khỏi hàng đợi
      this.masteredIds.update(set => {
        const next = new Set(set);
        next.add(q.id);
        return next;
      });
      currentQueue.shift(); // Bỏ câu đầu hàng đợi
    } else {
      // Thuật toán 3: Error Recycling Loop - Trả lời sai: bỏ khỏi đầu hàng đợi và ĐẨY XUỐNG CUỐI HÀNG ĐỢI
      const wrongItem = currentQueue.shift();
      if (wrongItem) {
        currentQueue.push({ ...wrongItem });
      }
    }

    this.queue.set(currentQueue);
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');
    this.feedbackDetail.set(null);

    // NẾU HÀNG ĐỢI ĐÃ TRỐNG (ĐÃ GIẢI QUYẾT HẾT CÁC CÂU) -> NỘP BÀI THI
    if (currentQueue.length === 0) {
      this.submitFinalQuiz();
    }
  }

  submitFinalQuiz() {
    this.isSubmitting.set(true);

    const firstTryMap: Record<number, boolean> = {};
    this.firstTryResults.forEach((val, key) => {
      // Chuẩn hóa ID từ vựng
      const vocabId = key > 10000 ? (key % 100) : key;
      firstTryMap[vocabId] = val;
    });

    // Thuật toán 4: Chấm điểm an toàn & Tính thưởng chênh lệch Delta Reward trong LocalStorage
    const localResult = this.state.recordQuizCompletion(this.lessonId(), firstTryMap);

    const payload = {
      lessonId: this.lessonId(),
      sessionId: this.sessionId() || undefined,
      firstTryResults: firstTryMap,
      totalTries: this.totalTriesCount()
    };

    // Nếu có Backend API, đồng thời gửi lên server để đồng bộ
    this.farmApi.submitQuizSession(payload).subscribe({
      next: (res) => {
        this.result.set(res);
        this.isSubmitting.set(false);
        this.isFinished.set(true);
        this.state.refreshProfile();
      },
      error: () => {
        // Hoạt động offline hoàn hảo trên GitHub Pages không cần backend
        this.result.set(localResult);
        this.isSubmitting.set(false);
        this.isFinished.set(true);
      }
    });
  }

  retakeQuiz() {
    this.loadQuizSession(this.lessonId());
  }
}
