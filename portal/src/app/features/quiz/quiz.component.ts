import { Component, inject, signal, computed, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { GameStateService } from '../../core/services/game-state.service';
import { JapaneseLearningService } from '../../core/services/japanese-learning.service';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import { FarmApiService, QuizQuestionDto, QuizSubmitResultDto, QuizSessionDto } from '../../core/services/farm-api.service';
import { getDefaultQuizSession } from '../../core/constants/default-quiz-questions.constant';
import { QuizEngineService, calculate15QReward, SESSION_SIZE } from '../../core/services/quiz-engine.service';
import { DEFAULT_VOCABULARIES } from '../../core/constants/default-vocabularies.constant';
import { CROP_CATALOG } from '../../core/constants/crop-catalog.constant';
import { PosTagBadgeComponent } from '../../shared/components/pos-tag-badge/pos-tag-badge.component';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';
import { StrokeOrderService, extractPointsFromSvgPath } from '../../core/services/stroke-order.service';

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
            <app-pixel-icon name="icon_retry" [size]="24"></app-pixel-icon>
            <p>Đang chuẩn bị 15 câu hỏi có trọng số thông minh...</p>
          </div>
        } @else if (queue().length === 0 && !isSubmitting()) {
          <div class="vintage-card state-card">
            <app-pixel-icon name="icon_sprout_action" [size]="32"></app-pixel-icon>
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
                  @if (q.questionFormat === 'WRITING') {
                    <span style="display:inline-flex; align-items:center; gap:5px;"><app-pixel-icon name="icon_tools" [size]="14"></app-pixel-icon> Luyện viết chữ</span>
                  } @else if (q.questionType === 'context') {
                    <span style="display:inline-flex; align-items:center; gap:5px;"><app-pixel-icon name="icon_scroll" [size]="14"></app-pixel-icon> Ngữ cảnh TOEIC</span>
                  } @else if (q.questionType === 'listening') {
                    <span style="display:inline-flex; align-items:center; gap:5px;"><app-pixel-icon name="icon_speaker" [size]="14"></app-pixel-icon> Nghe &amp; Chọn từ</span>
                  } @else if (isViToEn(q)) {
                    <span style="display:inline-flex; align-items:center; gap:5px;"><app-pixel-icon name="icon_target" [size]="14"></app-pixel-icon> Chọn từ tiếng Anh</span>
                  } @else {
                    <span style="display:inline-flex; align-items:center; gap:5px;"><app-pixel-icon name="icon_book_open" [size]="14"></app-pixel-icon> Nghĩa của từ</span>
                  }
                </div>

                @if (q.questionFormat === 'WRITING') {
                  <!-- DẠNG TẬP VIẾT CHỮ THEO MẪU KANJIVG (Ô CHỮ ĐIỀN 米) -->
                  <div class="writing-quiz-block">
                    <div class="writing-prompt-row">
                      <div class="writing-prompt-meta">
                        <span class="writing-prompt-badge">
                          <app-pixel-icon name="icon_scroll" [size]="12"></app-pixel-icon>
                          <span>Tập viết theo trí nhớ (米字格)</span>
                        </span>
                        <h2 class="writing-prompt-title">{{ q.prompt }}</h2>
                      </div>
                      <button
                        type="button"
                        class="speaker-mini-btn"
                        (click)="speakJapanese(q.targetChar || q.word || '')"
                        title="Nghe phát âm chuẩn">
                        <app-pixel-icon name="icon_speaker" [size]="15"></app-pixel-icon>
                      </button>
                    </div>

                    <!-- Ô CHỮ ĐIỀN (米字格) CHO QUIZ -->
                    <div class="quiz-pad-stage" [class.shake]="writingShake()">
                      <svg class="rice-grid-svg" viewBox="0 0 109 109">
                        <rect x="1" y="1" width="107" height="107" fill="none" stroke="#D9C8B5" stroke-width="1.5" />
                        <line x1="54.5" y1="1" x2="54.5" y2="108" stroke="#D9C8B5" stroke-width="1" stroke-dasharray="3,3" />
                        <line x1="1" y1="54.5" x2="108" y2="54.5" stroke="#D9C8B5" stroke-width="1" stroke-dasharray="3,3" />
                        <line x1="1" y1="1" x2="108" y2="108" stroke="#E8D7A8" stroke-width="0.8" stroke-dasharray="2.5,3.5" opacity="0.65" />
                        <line x1="1" y1="108" x2="108" y2="1" stroke="#E8D7A8" stroke-width="0.8" stroke-dasharray="2.5,3.5" opacity="0.65" />

                        <!-- NÉT MỜ GỢI Ý (MẶC ĐỊNH ẨN; HIỆN KHI BẤM GỢI Ý HOẶC SAI 2 LẦN) -->
                        @if (writingShowGhost()) {
                          <g class="ghost-strokes-group" fill="none" stroke="#263847" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.28">
                            @for (d of writingStrokes(); track $index) {
                              <path [attr.d]="d" />
                            }
                          </g>
                        }

                        <!-- NÉT ĐÃ VIẾT ĐÚNG (MỰC NAVY) -->
                        <g class="locked-strokes-group" fill="none" stroke="#263847" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round">
                          @for (d of writingLockedPaths(); track $index) {
                            <path [attr.d]="d" />
                          }
                        </g>

                        <!-- CHẤM ĐỎ BẮT ĐẦU NÉT -->
                        @if (!writingCompleted() && writingStartPoint(); as pt) {
                          <circle
                            class="pulsing-start-dot"
                            [attr.cx]="pt[0]"
                            [attr.cy]="pt[1]"
                            r="3.5"
                            fill="#A65E65"
                            stroke="#FFFDF9"
                            stroke-width="1.5"
                          />
                        }
                      </svg>

                      <!-- CANVAS VIẾT -->
                      <canvas
                        #quizCanvas
                        class="quiz-ink-canvas"
                        (pointerdown)="onWritingPointerDown($event)"
                        (pointermove)="onWritingPointerMove($event)"
                        (pointerup)="onWritingPointerUp($event)"
                        (pointercancel)="onWritingPointerCancel($event)">
                      </canvas>

                      @if (writingCompleted()) {
                        <div class="completion-stamp-badge">
                          <app-pixel-icon name="icon_check" [size]="16"></app-pixel-icon>
                          <span>✓ Viết chính xác!</span>
                        </div>
                      }
                    </div>

                    <!-- THANH ĐIỀU KHIỂN & HỖ TRỢ NÉT VIẾT -->
                    <div class="writing-controls-strip">
                      <div class="stroke-progress-pill">
                        Nét <strong>{{ writingCurrentStrokeIndex() }}</strong> / {{ writingStrokes().length }}
                      </div>

                      <div class="writing-btn-actions">
                        <button
                          type="button"
                          class="btn-quiz-writing-action"
                          [disabled]="writingShowGhost() || writingCompleted()"
                          (click)="revealWritingHint()"
                          title="Mở nét mờ gợi ý (sẽ mất điểm giọt sương và ôn lại cuối phiên)">
                          <app-pixel-icon name="icon_lightbulb" [size]="13"></app-pixel-icon>
                          <span>Xem gợi ý</span>
                        </button>

                        <button
                          type="button"
                          class="btn-quiz-writing-action"
                          [disabled]="writingCompleted()"
                          (click)="resetWritingPad()"
                          title="Xóa viết lại từ nét đầu">
                          <app-pixel-icon name="icon_retry" [size]="13"></app-pixel-icon>
                          <span>Viết lại</span>
                        </button>
                      </div>
                    </div>

                    <!-- THÔNG BÁO LỖI / HƯỚNG DẪN KHI VIẾT -->
                    @if (writingErrorMsg()) {
                      <div class="writing-status-alert" [class.alert-hint]="writingShowGhost()">
                        <app-pixel-icon [name]="writingShowGhost() ? 'icon_lightbulb' : 'icon_cross'" [size]="13"></app-pixel-icon>
                        <span>{{ writingErrorMsg() }}</span>
                      </div>
                    }
                  </div>
                } @else {
                  <!-- NỘI DUNG CÂU HỎI TRẮC NGHIỆM MCQ -->
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
                          <app-pixel-icon name="icon_speaker" [size]="18"></app-pixel-icon>
                          <span class="speaker-label">Nghe phát âm</span>
                        </button>
                      </div>
                      <h3 class="listening-prompt">{{ q.prompt }}</h3>
                    } @else if (isViToEn(q)) {
                      <!-- Dạng 4: VI_TO_EN - Chọn từ tiếng Anh từ nghĩa tiếng Việt -->
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
                            <app-pixel-icon name="icon_speaker" [size]="14"></app-pixel-icon>
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
                }

                <!-- NÚT HÀNH ĐỘNG DƯỚI CÙNG & KHỐI THÔNG BÁO FEEDBACK (THAY THẾ VỊ TRÍ NÚT TIẾP TỤC) -->
                <div class="check-action-bar">
                  @if (q.questionFormat === 'WRITING' && feedbackState() === 'none') {
                    <div class="writing-guide-status">
                      <app-pixel-icon name="icon_pin" [size]="13"></app-pixel-icon>
                      <span>Vẽ từng nét theo chuẩn KanjiVG. Bắt đầu từ chấm đỏ.</span>
                    </div>
                  } @else if (feedbackState() === 'none') {
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
                              <span class="status-icon"><app-pixel-icon name="icon_check" [size]="14"></app-pixel-icon></span>
                              <span class="status-title">Chính xác!</span>
                            </div>
                            @if (currentWordType(); as wt) {
                              <app-pos-tag [type]="wt" mode="full" [showQuestionHint]="true"></app-pos-tag>
                            }
                          </div>

                          @if (currentVocabFeedback(); as vInfo) {
                            @if (vInfo.word || vInfo.meaningVi) {
                              <div class="feedback-vocab-strip strip-correct">
                                <div class="vocab-term-group">
                                  <strong class="vocab-word">{{ vInfo.word }}</strong>
                                  @if (vInfo.phonetic) {
                                    <span class="vocab-phonetic">{{ vInfo.phonetic }}</span>
                                  }
                                  @if (vInfo.word) {
                                    <button type="button" class="btn-audio-mini" (click)="state.speak(vInfo.word)" title="Nghe phát âm">
                                      <app-pixel-icon name="icon_speaker" [size]="12"></app-pixel-icon>
                                    </button>
                                  }
                                </div>
                                @if (vInfo.meaningVi) {
                                  <div class="vocab-meaning-badge badge-correct">
                                    <span class="meaning-label">Nghĩa:</span>
                                    <span class="meaning-text">{{ vInfo.meaningVi }}</span>
                                  </div>
                                }
                              </div>
                            }
                          }

                          @if (feedbackDetail()?.explanation; as exp) {
                            <p class="feedback-sub">{{ exp }}</p>
                          }
                        } @else {
                          <div class="feedback-header wrong-header">
                            <div class="header-left-title">
                              <span class="status-icon"><app-pixel-icon name="icon_cross" [size]="14"></app-pixel-icon></span>
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

                          @if (currentVocabFeedback(); as vInfo) {
                            @if (vInfo.word || vInfo.meaningVi) {
                              <div class="feedback-vocab-strip strip-wrong">
                                <div class="vocab-term-group">
                                  <strong class="vocab-word">{{ vInfo.word }}</strong>
                                  @if (vInfo.phonetic) {
                                    <span class="vocab-phonetic">{{ vInfo.phonetic }}</span>
                                  }
                                  @if (vInfo.word) {
                                    <button type="button" class="btn-audio-mini" (click)="state.speak(vInfo.word)" title="Nghe phát âm">
                                      <app-pixel-icon name="icon_speaker" [size]="12"></app-pixel-icon>
                                    </button>
                                  }
                                </div>
                                @if (vInfo.meaningVi) {
                                  <div class="vocab-meaning-badge badge-wrong">
                                    <span class="meaning-label">Nghĩa:</span>
                                    <span class="meaning-text">{{ vInfo.meaningVi }}</span>
                                  </div>
                                }
                              </div>
                            }
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
                  <span class="notice-icon"><app-pixel-icon name="icon_star" [size]="14"></app-pixel-icon></span>
                  <span>Đã nhận tối đa (Kỷ lục cũ: {{ result()?.bestStarsClaimed }}★) · Không lặp lại Xu & XP khi ôn tập</span>
                </div>
              }
            </div>

            <!-- 2. RƠI PHẦN THƯỞNG NÔNG TRẠI (HYBRID DROP: 5% PHÂN BÓN & 1% HẠT GIỐNG) -->
            <div class="reward-section drop-section">
              <div class="reward-heading">Phần thưởng Nông trại may mắn</div>
              @if ((result()?.rewardFertilizer || 0) > 0 || result()?.bonusSeedName) {
                <div class="lucky-drop-banner">
                  <span class="lucky-badge" style="display:inline-flex; align-items:center; gap:6px;">
                    <app-pixel-icon name="icon_sprout_action" [size]="14"></app-pixel-icon>
                    <span>RƠI PHẦN THƯỞNG MAY MẮN!</span>
                  </span>
                </div>
                <div class="rewards-grid">
                  @if (result()?.bonusSeedName; as seedName) {
                    <div class="reward-item-box drop-highlight">
                      <div class="reward-svg" [innerHTML]="getBonusSeedPacketSvg(result()?.bonusSeedId, seedName) | safeHtml"></div>
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
              <div class="pity-bar">
                <span class="pity-pill">Lượt may mắn: <strong>{{ result()?.dailyBonusRollsUsed ?? state.userRewardState().dailyBonusRollsUsed }}/10</strong></span>
                <span class="pity-pill">Bảo hiểm Hạt: <strong>{{ pitySeed() }}/18</strong></span>
                <span class="pity-pill">Bảo hiểm Phân bón: <strong>{{ pityFert() }}/15</strong></span>
              </div>
            </div>

            <!-- CÁC NÚT ĐIỀU HƯỚNG TIẾP THEO -->
            <div class="result-actions">
              <a routerLink="/farm" class="vf-btn vf-btn-primary">
                <app-pixel-icon name="icon_sprout_action" [size]="18" />
                <span>Về Nông trại gieo hạt &amp; tưới cây</span>
              </a>

              <div class="result-secondary-row">
                <button type="button" class="vf-btn vf-btn-secondary" (click)="retryQuiz()">
                  <app-pixel-icon name="icon_retry" [size]="18" />
                  <span>Luyện tập lại bài này</span>
                </button>

                <a routerLink="/lessons" class="vf-btn vf-btn-tertiary">
                  <app-pixel-icon name="icon_books_stack" [size]="18" />
                  <span>Danh sách chủ đề khác</span>
                </a>
              </div>
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

    /* VOCABULARY WORD & MEANING STRIP IN FEEDBACK TRAY */
    .feedback-vocab-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      padding: 7px 11px;
      border-radius: 9px;
      margin: 2px 0;
    }

    .strip-correct {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid #BFDBB6;
    }

    .strip-wrong {
      background: rgba(255, 255, 255, 0.75);
      border: 1px solid #F2CAD0;
    }

    .vocab-term-group {
      display: inline-flex;
      align-items: baseline;
      gap: 7px;
      flex-wrap: wrap;
    }

    .vocab-word {
      font-family: var(--font-serif);
      font-size: 16.5px;
      font-weight: 800;
      color: var(--navy);
      letter-spacing: -0.2px;
    }

    .vocab-phonetic {
      font-size: 12px;
      color: #6B7B88;
      font-family: monospace;
    }

    .btn-audio-mini {
      background: transparent;
      border: none;
      padding: 1px 4px;
      font-size: 13px;
      cursor: pointer;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      transition: background 0.15s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.06);
      }
    }

    .vocab-meaning-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 9px;
      border-radius: 6px;
      font-size: 12.5px;
    }

    .badge-correct {
      background: #EAF3E7;
      border: 1px solid #A3C79B;
      color: #2F5419;

      .meaning-label {
        font-size: 11px;
        color: #556B4D;
        font-weight: 600;
      }
      .meaning-text {
        font-weight: 800;
      }
    }

    .badge-wrong {
      background: #FDF2F3;
      border: 1px solid #E8BAC0;
      color: #8C2C35;

      .meaning-label {
        font-size: 11px;
        color: #8A4F55;
        font-weight: 600;
      }
      .meaning-text {
        font-weight: 800;
      }
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

    .pity-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 14px 0 20px;
      flex-wrap: wrap;
    }

    .pity-pill {
      font-size: 12px;
      color: #7D7565;
      background: #F4EFE6;
      border: 1px solid #D9C8B5;
      padding: 4px 10px;
      border-radius: 999px;

      strong {
        color: var(--navy, #263847);
      }
    }

    .result-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .result-secondary-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .vf-btn {
      width: 100%;
      min-height: 46px;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13.5px;
      font-weight: 600;
      text-decoration: none !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      cursor: pointer;
      box-sizing: border-box;
      transition: transform 0.12s ease, background 0.15s ease;

      &:hover {
        text-decoration: none !important;
      }

      &:active { transform: scale(0.985); }
    }

    .vf-btn-primary {
      background: #A65E65;
      color: #FFFDF9 !important;
      border: 1.5px solid #8F4D53;
      &:hover { background: #8F4D53; }
    }

    .vf-btn-secondary {
      background: #F4EFE3;
      color: #263847 !important;
      border: 1.5px solid #C2AD95;
      &:hover { background: #EAE2D2; }
    }

    .vf-btn-tertiary {
      background: #FFFDF9;
      color: #4A5435 !important;
      border: 1.5px solid #BAC4A4;
      &:hover { background: #E9ECE1; }
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

    /* ================= IN-QUIZ WRITING PAD (米字格) ================= */
    .writing-quiz-block {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 8px;
    }
    .writing-prompt-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      text-align: left;
    }
    .writing-prompt-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .writing-prompt-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 700;
      color: var(--rose, #A65E65);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .writing-prompt-title {
      font-family: var(--font-serif);
      font-size: 17px;
      font-weight: 700;
      color: var(--navy);
      margin: 0;
      line-height: 1.35;
    }
    .quiz-pad-stage {
      position: relative;
      width: min(76vw, 250px);
      aspect-ratio: 1 / 1;
      margin: 6px auto;
      background: #FFFDF9;
      border: 2px solid var(--border-strong, #D9C8B5);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
      user-select: none;
      -webkit-user-select: none;
      &.shake {
        animation: horizontalShake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }
    }
    .rice-grid-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .quiz-ink-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      cursor: crosshair;
    }
    .pulsing-start-dot {
      animation: pulseDot 1.2s ease-in-out infinite;
    }
    @keyframes pulseDot {
      0%, 100% { r: 3.2px; opacity: 0.9; }
      50% { r: 5.2px; opacity: 1; }
    }
    @keyframes horizontalShake {
      10%, 90% { transform: translate3d(-2px, 0, 0); }
      20%, 80% { transform: translate3d(3px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }
    .completion-stamp-badge {
      position: absolute;
      bottom: 8px;
      right: 8px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 12px;
      background: #78815D;
      color: #FFFDF9;
      font-size: 11.5px;
      font-weight: 700;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      pointer-events: none;
    }
    .writing-controls-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 6px;
      gap: 8px;
    }
    .stroke-progress-pill {
      font-size: 12.5px;
      color: var(--navy);
      font-weight: 600;
      strong {
        color: var(--rose);
        font-weight: 700;
      }
    }
    .writing-btn-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn-quiz-writing-action {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      background: var(--bg-card, #FFFDF9);
      border: 1.5px solid var(--border-strong, #D9C8B5);
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--navy);
      cursor: pointer;
      transition: all 0.15s ease;
      &:hover:not(:disabled) {
        background: #EDE5D6;
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    .writing-status-alert {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: #FDF2F3;
      border: 1px solid #E2AAB0;
      color: var(--rose);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.35;
      &.alert-hint {
        background: #F4F7EE;
        border-color: #B5C97B;
        color: #385E2B;
      }
    }
    .writing-guide-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px;
      background: rgba(232, 215, 168, 0.35);
      border: 1px dashed var(--border-strong);
      border-radius: 10px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--navy);
    }
  `]
})
export class QuizComponent implements OnInit, AfterViewChecked {
  state = inject(GameStateService);
  jaService = inject(JapaneseLearningService);
  quizEngine = inject(QuizEngineService);
  strokeService = inject(StrokeOrderService);
  assets = FARM_ASSETS;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private farmApi = inject(FarmApiService);

  @ViewChild('quizCanvas') quizCanvasRef?: ElementRef<HTMLCanvasElement>;

  // Trạng thái bài kiểm tra
  lessonId = signal<number>(1);
  jaTopicCode = signal<string>('ja_n5_01');
  isJa = computed(() => this.state.activeLang() === 'ja');
  lessonTitle = signal<string>('Kiểm tra từ vựng');
  sessionId = signal<string | null>(null);
  bestStarsClaimed = signal<number>(0);
  requiredCropName = signal<string>('Cà rốt');

  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  isFinished = signal<boolean>(false);

  // HÀNG ĐỢI LẶP CÂU SAI & TIẾN ĐỘ (15 CÂU)
  queue = signal<QuizQuestionDto[]>([]);
  totalInitial = signal<number>(SESSION_SIZE);
  masteredIds = signal<Set<number>>(new Set());

  // Lưu kết quả của riêng LẦN GẶP ĐẦU TIÊN: questionId -> isCorrect
  firstTryResults = new Map<number, boolean>();
  totalTriesCount = signal<number>(0);

  // Lựa chọn & Phản hồi đáy
  selectedOptionIdx = signal<number | null>(null);
  feedbackState = signal<'none' | 'correct' | 'wrong'>('none');
  feedbackDetail = signal<{ prompt: string; correctText: string; explanation?: string } | null>(null);

  // Trạng thái Luyện viết chữ KanjiVG (Ô chữ điền 米)
  writingCurrentStrokeIndex = signal<number>(0);
  writingLockedPaths = signal<string[]>([]);
  writingShowGhost = signal<boolean>(false);
  writingCompleted = signal<boolean>(false);
  writingShake = signal<boolean>(false);
  writingErrorMsg = signal<string | null>(null);
  writingFailsCount = signal<number>(0);

  private isWritingPointerDown = false;
  private currentWritingRawPoints: [number, number][] = [];
  private canvasSetupDone = false;

  // Ký tự tập viết hiện tại & các nét SVG tương ứng
  writingTargetChar = computed(() => {
    const q = this.currentQuestion();
    if (!q) return 'あ';
    return q.targetChar || (q.word ? q.word.trim().charAt(0) : 'あ');
  });

  writingStrokes = computed(() => {
    const ch = this.writingTargetChar();
    return this.strokeService.getStrokes(ch) || [];
  });

  writingStartPoint = computed<[number, number] | null>(() => {
    const strokes = this.writingStrokes();
    const idx = this.writingCurrentStrokeIndex();
    if (idx >= strokes.length) return null;
    const pts = extractPointsFromSvgPath(strokes[idx], 16);
    return pts.length > 0 ? pts[0] : null;
  });

  // Kết quả cuối cùng
  result = signal<QuizSubmitResultDto | null>(null);

  // CÂU HỎI ĐẦU HÀNG ĐỢI HIỆN TẠI
  currentQuestion = computed(() => this.queue()[0] || null);
  currentWordType = computed(() => this.getWordType(this.currentQuestion()?.word));

  // TỪ VỰNG & NGHĨA CHO KHỐI THÔNG BÁO (FEEDBACK TRAY)
  currentVocabFeedback = computed(() => {
    const q = this.currentQuestion();
    if (!q) return null;
    const word = q.word || '';
    const found = word ? this.state.findVocab(word)?.vocab : null;

    let meaningVi = found?.meaningVi || q.meaningVi || '';
    if (!meaningVi && q.correctOptionIndex !== undefined) {
      if (q.format === 'EN_TO_VI' || q.questionType === 'meaning') {
        meaningVi = q.options[q.correctOptionIndex] || '';
      }
    }

    return {
      word: word || found?.word || '',
      phonetic: q.phonetic || found?.phonetic || '',
      meaningVi: meaningVi,
      exampleEn: q.exampleEn || found?.exampleEn || '',
      exampleVi: q.exampleVi || found?.exampleVi || ''
    };
  });

  // Bảo hiểm Hạt & Phân bón
  pitySeed = computed(() => this.result()?.pitySeedMisses ?? this.state.userRewardState().pitySeedMisses);
  pityFert = computed(() => this.result()?.pityFertilizerMisses ?? this.state.userRewardState().pityFertilizerMisses);

  // TIẾN ĐỘ ĐƠN ĐIỆU (MONOTONIC): Chỉ tăng khi 1 câu gốc được trả lời đúng
  progressPercent = computed(() => {
    const total = this.totalInitial() || SESSION_SIZE;
    return Math.min(100, Math.round((this.masteredIds().size / total) * 100));
  });

  // TÍNH TOÁN 6 GIỌT SƯƠNG:
  // Giọt sương chỉ bị mất khi làm SAI ở LẦN ĐẦU TIÊN
  firstTryWrongCount = computed(() => {
    let wrongs = 0;
    this.firstTryResults.forEach(isCorrect => {
      if (!isCorrect) wrongs++;
    });
    return wrongs;
  });

  dewDropsRemaining = computed(() => {
    return Math.max(0, 6 - this.firstTryWrongCount());
  });

  dewDropsState = computed(() => {
    const remaining = this.dewDropsRemaining();
    return [remaining >= 1, remaining >= 2, remaining >= 3, remaining >= 4, remaining >= 5, remaining >= 6];
  });

  dewDropsTooltip = computed(() => {
    const d = this.dewDropsRemaining();
    if (d >= 5) return '6 Giọt sương: Hạng 3 Sao ★★★ (≥93%)';
    if (d >= 3) return `${d} Giọt sương: Hạng 2 Sao ★★ (≥80%)`;
    return `${d} Giọt sương: Hạng 1 Sao ★ (<80%)`;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const topicCode = params['topicCode'];
      if (topicCode || this.state.activeLang() === 'ja') {
        const code = topicCode || this.jaService.activeTopicCode() || 'ja_n5_01';
        this.jaTopicCode.set(code);
        this.loadJapaneseQuizSession(code);
        return;
      }
      const lid = params['lessonId'] ? Number(params['lessonId']) : 1;
      this.lessonId.set(lid);
      this.loadQuizSession(lid);
    });
  }

  ngAfterViewChecked(): void {
    if (this.currentQuestion()?.questionFormat === 'WRITING' && !this.canvasSetupDone && this.quizCanvasRef) {
      this.setupCanvasResolution();
      this.canvasSetupDone = true;
    }
  }

  loadJapaneseQuizSession(topicCode: string) {
    this.isLoading.set(true);
    this.isFinished.set(false);
    this.queue.set([]);
    this.firstTryResults.clear();
    this.masteredIds.set(new Set());
    this.totalTriesCount.set(0);
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');
    this.canvasSetupDone = false;

    const topic = this.jaService.topics().find(t => t.code === topicCode) || this.jaService.topics()[0];
    this.lessonTitle.set(topic.titleVi);
    const prog = this.jaService.topicProgress()[topicCode];
    this.bestStarsClaimed.set(prog?.bestStarsClaimed || 0);
    this.sessionId.set(`local_ja_quiz_${topicCode}_${Date.now()}`);

    const jaQs = this.jaService.generateN5QuizSession(topicCode, SESSION_SIZE);
    const mapped: QuizQuestionDto[] = jaQs.map(q => ({
      id: q.vocabId,
      lessonId: 1000,
      prompt: q.prompt,
      word: q.scriptPrimary || q.audioText,
      phonetic: q.readingSub ? `/${q.readingSub}/` : null,
      questionType: q.questionFormat === 'WRITING' ? 'writing' : 'meaning',
      format: q.questionFormat === 'WRITING' ? 'WRITING' : 'EN_TO_VI',
      questionFormat: q.questionFormat || 'MCQ',
      targetChar: q.targetChar,
      reading: q.reading || q.readingSub,
      meaningVi: q.meaningVi,
      exampleVi: q.explanationVi,
      options: q.options || [],
      correctOptionIndex: q.correctIndex,
      vocabFeedback: {
        word: q.scriptPrimary || q.audioText,
        phonetic: q.readingSub ? `【${q.readingSub}】` : undefined,
        meaningVi: q.meaningVi || '',
        wordType: q.wordType || 'noun'
      }
    }));

    this.queue.set(mapped);
    this.totalInitial.set(mapped.length > 0 ? mapped.length : SESSION_SIZE);
    this.isLoading.set(false);
    this.initWritingStateForQuestion(mapped[0] || null);
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
    this.canvasSetupDone = false;

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
          const savedProgress = this.state.userLessonProgress()[lessonId];
          const bestStars = Math.max(savedProgress?.bestStarsClaimed || 0, session.bestStarsClaimed || 0);
          this.bestStarsClaimed.set(bestStars);

          const list = session.questions;
          this.queue.set([...list]);
          this.totalInitial.set(list.length > 0 ? list.length : SESSION_SIZE);
          this.isLoading.set(false);
        } else {
          this.loadDefaultQuestions(lessonId);
        }
      },
      error: () => {
        this.loadDefaultQuestions(lessonId);
      }
    });
  }

  private loadDefaultQuestions(lessonId: number) {
    // Thuật toán 1 & 2: Smart Pool Sampling + Multi-Format Generator + 3-Tier Distractors (15 câu)
    const rawList = this.state.vocabulariesByLesson()[lessonId];
    const vocabs = (rawList && rawList.length > 0)
      ? rawList
      : (DEFAULT_VOCABULARIES[lessonId]?.length ? DEFAULT_VOCABULARIES[lessonId] : (DEFAULT_VOCABULARIES[1] || []));
    let generated = this.quizEngine.generateSessionQuestions(lessonId, vocabs, this.state.userWordStats());

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
        questionFormat: 'MCQ',
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
    this.totalInitial.set(questions.length > 0 ? questions.length : SESSION_SIZE);
    this.isLoading.set(false);
  }

  // ===================== CANVAS & POINTER EVENTS CHO BẢNG VIẾT =====================
  speakJapanese(charOrWord: string): void {
    if (!charOrWord) return;
    this.strokeService.playPronunciation(charOrWord);
  }

  private initWritingStateForQuestion(q: QuizQuestionDto | null): void {
    this.writingCurrentStrokeIndex.set(0);
    this.writingLockedPaths.set([]);
    this.writingShowGhost.set(false);
    this.writingCompleted.set(false);
    this.writingShake.set(false);
    this.writingErrorMsg.set(null);
    this.writingFailsCount.set(0);
    this.canvasSetupDone = false;
    this.clearQuizCanvas();
  }

  private clearQuizCanvas(): void {
    if (!this.quizCanvasRef?.nativeElement) return;
    const cvs = this.quizCanvasRef.nativeElement;
    const ctx = cvs.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
    }
  }

  private setupCanvasResolution(): void {
    if (!this.quizCanvasRef?.nativeElement) return;
    const canvas = this.quizCanvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#263847';
      ctx.lineWidth = 4.5;
    }
  }

  onWritingPointerDown(e: PointerEvent): void {
    if (this.writingCompleted() || this.writingStrokes().length === 0) return;
    const canvas = this.quizCanvasRef?.nativeElement;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);
    this.isWritingPointerDown = true;
    this.currentWritingRawPoints = [];

    const rect = canvas.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 109;
    const ny = ((e.clientY - rect.top) / rect.height) * 109;
    this.currentWritingRawPoints.push([nx, ny]);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  }

  onWritingPointerMove(e: PointerEvent): void {
    if (!this.isWritingPointerDown || this.writingCompleted()) return;
    const canvas = this.quizCanvasRef?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 109;
    const ny = ((e.clientY - rect.top) / rect.height) * 109;
    this.currentWritingRawPoints.push([nx, ny]);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  }

  onWritingPointerUp(e: PointerEvent): void {
    if (!this.isWritingPointerDown) return;
    this.isWritingPointerDown = false;
    const canvas = this.quizCanvasRef?.nativeElement;
    if (canvas) {
      try { canvas.releasePointerCapture(e.pointerId); } catch {}
    }

    const strokes = this.writingStrokes();
    const idx = this.writingCurrentStrokeIndex();
    const q = this.currentQuestion();
    if (!q || idx >= strokes.length) return;

    const targetStrokePath = strokes[idx];
    const grade = this.strokeService.gradeStroke(this.currentWritingRawPoints, targetStrokePath);

    if (grade.pass) {
      // Đúng nét: Khóa nét mực xanh navy vào danh sách và tăng index nét
      this.writingLockedPaths.update(p => [...p, targetStrokePath]);
      this.clearQuizCanvas();
      this.writingErrorMsg.set(null);
      const nextIdx = idx + 1;
      this.writingCurrentStrokeIndex.set(nextIdx);

      // Nếu đã hoàn thành tất cả các nét của chữ
      if (nextIdx >= strokes.length) {
        this.writingCompleted.set(true);

        const cleanlyOnFirstTry = this.writingFailsCount() < 2 && !this.writingShowGhost();
        if (!this.firstTryResults.has(q.id)) {
          this.firstTryResults.set(q.id, cleanlyOnFirstTry);
        }

        this.feedbackState.set('correct');
        this.feedbackDetail.set({
          prompt: q.prompt,
          correctText: q.targetChar || q.word || '',
          explanation: cleanlyOnFirstTry ? '✓ Viết chính xác!' : 'Đã hoàn tất nét viết!'
        });

        this.speakJapanese(this.writingTargetChar());
      }
    } else {
      // Sai nét: Rung nhẹ ô chữ điền, tăng biến đếm lỗi
      this.clearQuizCanvas();
      this.writingShake.set(true);
      setTimeout(() => this.writingShake.set(false), 450);

      this.writingFailsCount.update(c => c + 1);

      // Nếu sai 2 lần: Đánh dấu mất điểm giọt sương lần đầu & bật nét mờ để hướng dẫn
      if (this.writingFailsCount() >= 2) {
        if (!this.firstTryResults.has(q.id)) {
          this.firstTryResults.set(q.id, false);
        }
        this.writingShowGhost.set(true);
        this.writingErrorMsg.set('Đã mở nét mờ gợi ý. Hãy viết theo để hoàn tất câu này.');
      } else {
        this.writingErrorMsg.set(grade.reason || 'Nét chưa đúng, hãy thử lại từ chấm đỏ!');
      }
    }
  }

  onWritingPointerCancel(e: PointerEvent): void {
    this.isWritingPointerDown = false;
    this.clearQuizCanvas();
  }

  revealWritingHint(): void {
    const q = this.currentQuestion();
    if (q && !this.firstTryResults.has(q.id)) {
      this.firstTryResults.set(q.id, false);
    }
    this.writingShowGhost.set(true);
    this.writingErrorMsg.set('Đã mở nét mờ gợi ý để bạn tập vẽ theo.');
  }

  resetWritingPad(): void {
    this.writingCurrentStrokeIndex.set(0);
    this.writingLockedPaths.set([]);
    this.writingCompleted.set(false);
    this.writingErrorMsg.set(null);
    this.clearQuizCanvas();
  }

  // ===================== ĐIỀU HƯỚNG & NỘP BÀI THI =====================
  isViToEn(q: QuizQuestionDto | null | undefined): boolean {
    if (!q) return false;
    if (q.questionType === 'context' || q.questionType === 'listening' || q.questionFormat === 'WRITING') return false;
    if (q.format === 'VI_TO_EN' || q.questionType === 'vi_to_en') return true;
    if (q.prompt && (
      q.prompt.includes('Chọn từ tiếng Anh') ||
      q.prompt.includes('Từ nào sau đây là') ||
      q.prompt.includes('từ tiếng Anh có nghĩa') ||
      q.prompt.toLowerCase().includes('tiếng anh')
    )) {
      return true;
    }
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

  getWordType(word?: string | null): string | null {
    if (!word) return null;
    const info = this.state.findVocab(word);
    return info?.vocab?.wordType || null;
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

    // GHI NHẬN KẾT QUẢ CHO LẦN ĐẦU TIÊN GẶP CÂU NÀY
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

    const currentQueue = [...this.queue()];

    if (q.questionFormat === 'WRITING') {
      const isCleanPass = this.firstTryResults.get(q.id) === true;
      if (isCleanPass || q.isRetry) {
        // Đã hoàn thành câu viết: thêm vào tập đã thuộc (masteredIds), loại khỏi hàng đợi
        this.masteredIds.update(set => {
          const next = new Set(set);
          next.add(q.id);
          return next;
        });
        currentQueue.shift();
      } else {
        // Viết có trợ giúp nét mờ/sai >= 2 lần: đẩy xuống cuối hàng đợi để viết lại
        const retryItem = currentQueue.shift();
        if (retryItem) {
          currentQueue.push({ ...retryItem, isRetry: true });
        }
      }
    } else {
      const isCorrect = this.feedbackState() === 'correct';
      if (isCorrect) {
        this.masteredIds.update(set => {
          const next = new Set(set);
          next.add(q.id);
          return next;
        });
        currentQueue.shift();
      } else {
        const wrongItem = currentQueue.shift();
        if (wrongItem) {
          currentQueue.push({ ...wrongItem, isRetry: true });
        }
      }
    }

    this.queue.set(currentQueue);
    this.selectedOptionIdx.set(null);
    this.feedbackState.set('none');
    this.feedbackDetail.set(null);

    // Chuẩn bị trạng thái cho câu tiếp theo
    if (currentQueue.length > 0) {
      this.initWritingStateForQuestion(currentQueue[0]);
    } else {
      this.submitFinalQuiz();
    }
  }

  submitFinalQuiz() {
    this.isSubmitting.set(true);

    if (this.state.activeLang() === 'ja') {
      const correctCount = [...this.firstTryResults.values()].filter(Boolean).length;
      const total = this.totalInitial() || SESSION_SIZE;
      const percent = Math.round((correctCount / total) * 100);

      // Tính thưởng 15 câu: 15–30–45 XP, 30–50–75 Xu, 8%/5% Phân bón tăng tốc, 1% Hạt giống
      const rewardRes = calculate15QReward(
        correctCount,
        total,
        this.bestStarsClaimed(),
        this.state.getUnlockedSeedIds(),
        this.state.userRewardState(),
        new Date().toISOString().slice(0, 10)
      );

      this.state.userRewardState.set(rewardRes.updatedRewardState);

      // Thưởng phân bón tăng tốc và hạt giống nếu trúng
      if (rewardRes.speedFertilizerGained > 0) {
        this.state.inventory.update(inv => ({
          ...inv,
          care: {
            ...inv.care,
            speedFertilizer: (inv.care.speedFertilizer || 0) + rewardRes.speedFertilizerGained
          }
        }));
      }
      if (rewardRes.seedGainedId) {
        this.state.inventory.update(inv => ({
          ...inv,
          seeds: {
            ...inv.seeds,
            [rewardRes.seedGainedId!]: (inv.seeds[rewardRes.seedGainedId!] || 0) + 1
          }
        }));
      }

      const stars = rewardRes.newStars as 1 | 2 | 3;
      const jaRes = this.jaService.completeTopicQuiz(this.jaTopicCode(), stars);

      this.firstTryResults.forEach((val, vocabId) => {
        this.jaService.recordQuizAttempt(vocabId, val);
      });

      const submitResult: QuizSubmitResultDto = {
        lessonId: 1000,
        scorePercent: percent,
        stars,
        correctAnswers: correctCount,
        isPassed: stars >= 1,
        rewardGranted: jaRes.coinsAwarded > 0 || jaRes.xpAwarded > 0 || rewardRes.speedFertilizerGained > 0 || !!rewardRes.seedGainedId,
        rewardCoins: jaRes.coinsAwarded,
        rewardXp: jaRes.xpAwarded,
        rewardFertilizer: rewardRes.speedFertilizerGained,
        bonusSeedName: rewardRes.seedGainedId || undefined,
        isNewRecord: jaRes.isNewRecord,
        firstTryCorrectCount: correctCount,
        totalQuestions: total,
        message: stars === 3
          ? 'Xuất sắc! Bạn đạt hạng 3 Sao bài thi Tiếng Nhật (≥93%)!'
          : (stars === 2 ? 'Khá tốt! Đạt hạng 2 Sao bài thi Tiếng Nhật (≥80%)!' : 'Hoàn thành bài kiểm tra Tiếng Nhật!'),
        bestStarsClaimed: Math.max(this.bestStarsClaimed(), stars),
        pitySeedMisses: rewardRes.updatedRewardState.pitySeedMisses,
        pityFertilizerMisses: rewardRes.updatedRewardState.pityFertilizerMisses,
        dailyBonusRollsUsed: rewardRes.updatedRewardState.dailyBonusRollsUsed
      };

      this.result.set(submitResult);
      this.isSubmitting.set(false);
      this.isFinished.set(true);
      return;
    }

    const firstTryMap: Record<number, boolean> = {};
    this.firstTryResults.forEach((val, key) => {
      const vocabId = key > 10000 ? (key % 100) : key;
      firstTryMap[vocabId] = val;
    });

    const localResult = this.state.recordQuizCompletion(this.lessonId(), firstTryMap);

    const payload = {
      lessonId: this.lessonId(),
      sessionId: this.sessionId() || undefined,
      firstTryResults: firstTryMap,
      totalTries: this.totalTriesCount()
    };

    this.farmApi.submitQuizSession(payload).subscribe({
      next: (res) => {
        const mergedRes: QuizSubmitResultDto = {
          ...res,
          bestStarsClaimed: Math.max(res.bestStarsClaimed || 0, localResult.bestStarsClaimed || 0),
          stars: Math.max(res.stars || 0, localResult.stars || 0)
        };
        this.result.set(mergedRes);
        this.isSubmitting.set(false);
        this.isFinished.set(true);
        this.state.refreshProfile();
      },
      error: () => {
        this.result.set(localResult);
        this.isSubmitting.set(false);
        this.isFinished.set(true);
      }
    });
  }

  retakeQuiz() {
    if (this.state.activeLang() === 'ja') {
      this.loadJapaneseQuizSession(this.jaTopicCode());
      return;
    }
    this.loadQuizSession(this.lessonId());
  }

  retryQuiz() {
    this.retakeQuiz();
  }

  getBonusSeedPacketSvg(seedId?: string | null, seedName?: string | null): string {
    let cropId = (seedId || '').toLowerCase().trim();
    if (!cropId && seedName) {
      const clean = seedName.replace(/^hạt\s*(giống)?\s*/i, '').trim().toLowerCase();
      const found = CROP_CATALOG.find(c =>
        c.nameVi.toLowerCase() === clean ||
        clean.includes(c.nameVi.toLowerCase()) ||
        c.seedNameVi.toLowerCase().includes(clean) ||
        c.id.toLowerCase() === clean
      );
      if (found) cropId = found.id;
    }
    if (!cropId) cropId = 'cucumber';

    // Aliases
    if (cropId === 'sunflower') cropId = 'pumpkin';
    if (cropId === 'rose') cropId = 'blueberry';
    if (cropId === 'tulip') cropId = 'wheat';
    if (cropId === 'kiwi') cropId = 'watermelon';
    if (cropId === 'grape') cropId = 'grapes';

    return `<div class="kraft-seed-packet pixel-art" style="position: relative; width: 28px; height: 30px; background: #C49A71; border: 1.5px solid #3B2D24; border-radius: 3px; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.12); margin: 0 auto;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 5px; background: #B5885C; border-bottom: 1px dashed #8C6339;"></div>
      <div style="width: 18px; height: 18px; background: #FFFDF8; border: 1px solid #A8815B; border-radius: 2px; display: flex; align-items: center; justify-content: center; margin-top: 3px;">
        <img src="assets/farm-assets/crops/${cropId}.png" class="pixel-art" width="14" height="14" style="display: block; image-rendering: pixelated; object-fit: contain;" alt="${cropId}" />
      </div>
    </div>`;
  }
}
