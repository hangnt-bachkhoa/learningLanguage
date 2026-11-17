import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { GameStateService } from '../../core/services/game-state.service';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import { PosTagBadgeComponent } from '../../shared/components/pos-tag-badge/pos-tag-badge.component';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-vocab',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe, PosTagBadgeComponent, PixelIconComponent],
  template: `
    <div class="vocab-screen">
      <!-- Header điều hướng: < Danh sách bài học | Tiêu đề chủ đề | < 1/24 > -->
      <div class="vocab-nav-bar">
        <a routerLink="/lessons" class="back-link" title="Quay lại danh sách bài học">
          <span class="chevron">‹</span>
          <span class="nav-title">Bài học</span>
        </a>

        <!-- Tiêu đề chủ đề bài học đang chọn -->
        <div class="current-lesson-pill" title="Chủ đề đang học">
          <span class="lesson-leaf"><app-pixel-icon name="icon_leaf_badge" [size]="14"></app-pixel-icon></span>
          <span class="lesson-name">{{ currentLessonTitle() }}</span>
        </div>

        <div class="pager-capsule">
          <button class="pager-arrow" [disabled]="currentIndex() === 0" (click)="prevWord()">‹</button>
          <span class="pager-text">{{ currentIndex() + 1 }}/{{ displayWords.length }}</span>
          <button class="pager-arrow" [disabled]="currentIndex() === displayWords.length - 1" (click)="nextWord()">›</button>
        </div>
      </div>

      <!-- Thẻ từ vựng Naturalist chính (Screen 3 Mockup) -->
      <div class="vintage-card flashcard-container">
        <!-- Hàng đầu: Tiêu đề từ vựng + Icon loa + Tranh hoa vẽ Botanical bên phải -->
        <div class="word-hero-row">
          <div class="word-hero-left">
            <div class="word-status-tag-row">
              <h1 class="word-text">{{ currentWord.word }}</h1>
              @if (state.learnedWords().includes(currentWord.word)) {
                <span class="word-learned-badge">Đã thuộc</span>
              }
            </div>
            <div class="ipa-audio-row">
              <span class="ipa-string">{{ currentWord.ipa }}</span>
              <button class="speaker-pill" (click)="state.speak(currentWord.word)" title="Nghe phát âm">
                <app-pixel-icon name="icon_speaker" [size]="14"></app-pixel-icon>
              </button>
            </div>
            <!-- Thẻ loại từ thân thiện cho người mới bắt đầu -->
            <div class="pos-badge-hero-row" style="margin-top: 8px;">
              <app-pos-tag [type]="currentWord.type" mode="full" [showQuestionHint]="true"></app-pos-tag>
            </div>
          </div>
          <div class="botanical-art-box" [innerHTML]="assets.botanicalFlower | safeHtml"></div>
        </div>

        <!-- Bảng thông tin chi tiết: Loại từ, Nghĩa, Ví dụ, Ghi chú -->
        <div class="vocab-details-table">
          <div class="table-row">
            <div class="col-label">Loại từ</div>
            <div class="col-value">
              <app-pos-tag [type]="currentWord.type" mode="full" [showQuestionHint]="true"></app-pos-tag>
            </div>
          </div>

          <div class="table-row">
            <div class="col-label">Nghĩa</div>
            <div class="col-value font-highlight">{{ currentWord.meaning }}</div>
          </div>

          <div class="table-row">
            <div class="col-label">Ví dụ</div>
            <div class="col-value">
              <ul class="example-bullets">
                @for (ex of currentWord.examples; track ex.en) {
                  <li>
                    <div class="ex-en" [innerHTML]="ex.en"></div>
                    @if (ex.vi) {
                      <div class="ex-vi">{{ ex.vi }}</div>
                    }
                  </li>
                }
              </ul>
            </div>
          </div>

          <div class="table-row">
            <div class="col-label">Ghi chú</div>
            <div class="col-value note-box">
              <div class="synonym-line">≈ {{ currentWord.synonyms }}</div>
              <div class="antonym-line">≠ {{ currentWord.antonyms }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2 Nút thao tác dưới chân: Đánh dấu & Đã học (Lưu trực tiếp vào localStorage) -->
      <div class="vocab-footer-actions">
        <button
          class="btn btn-secondary bookmark-btn"
          [class.bookmarked]="state.bookmarkedWords().includes(currentWord.word)"
          (click)="toggleBookmark()">
          <span class="bookmark-icon">
            <app-pixel-icon [name]="state.bookmarkedWords().includes(currentWord.word) ? 'icon_star' : 'icon_star_empty'" [size]="14"></app-pixel-icon>
          </span>
          <span>{{ state.bookmarkedWords().includes(currentWord.word) ? 'Đã đánh dấu' : 'Đánh dấu' }}</span>
        </button>

        <button
          class="btn btn-primary learned-btn"
          [class.already-learned]="state.learnedWords().includes(currentWord.word)"
          (click)="markLearned()">
          <app-pixel-icon name="icon_check" [size]="14"></app-pixel-icon>
          <span>{{ currentIndex() === displayWords.length - 1 ? 'Đã học (Xong)' : 'Đã học · Từ tiếp ›' }}</span>
        </button>
      </div>

      <!-- Banner luyện tập kiểm tra chủ đề này -->
      <div class="quiz-cta-banner">
        <a [routerLink]="['/quiz']" [queryParams]="{ lessonId: state.activeLessonId() }" class="quiz-cta-link">
          <span class="cta-left">
            <span class="cta-icon"><app-pixel-icon name="icon_target" [size]="18"></app-pixel-icon></span>
            <span class="cta-text">
              <strong>Kiểm tra từ vựng chủ đề này</strong>
              <small>Làm bài Quiz nhận thưởng Hạt giống, Nước &amp; Xu</small>
            </span>
          </span>
          <span class="cta-arrow">Bắt đầu ›</span>
        </a>
      </div>

      <!-- Danh sách từ trong chủ đề (Vocabulary List View với app-pos-tag compact) -->
      <div class="vintage-card vocab-list-card">
        <div class="list-card-header">
          <span class="list-title">Danh sách từ trong bài ({{ displayWords.length }} từ)</span>
          <span class="learned-count-pill">{{ learnedInLessonCount() }}/{{ displayWords.length }} Đã thuộc</span>
        </div>
        <div class="vocab-table-wrap">
          <table class="vocab-table">
            <tbody>
              @for (w of displayWords; track w.word; let idx = $index) {
                <tr class="vocab-row" [class.active-row]="idx === currentIndex()" (click)="selectWordIndex(idx)">
                  <td class="col-idx">#{{ idx + 1 }}</td>
                  <td class="col-word">
                    <strong class="row-word">{{ w.word }}</strong>
                    <span class="row-ipa">{{ w.ipa }}</span>
                  </td>
                  <td class="col-pos">
                    <app-pos-tag [type]="w.type" mode="compact"></app-pos-tag>
                  </td>
                  <td class="col-meaning">{{ w.meaning }}</td>
                  <td class="col-status">
                    @if (state.learnedWords().includes(w.word)) {
                      <span class="badge-done" title="Đã thuộc"><app-pixel-icon name="icon_check" [size]="12"></app-pixel-icon></span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vocab-screen {
      max-width: 520px;
      margin: 0 auto;
      padding-bottom: 24px;
    }
    .vocab-nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      gap: 8px;
    }
    .back-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--navy);
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      white-space: nowrap;
    }
    .chevron {
      font-size: 22px;
      line-height: 1;
    }
    .current-lesson-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #EAE2D2;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px 12px;
      max-width: 220px;
      overflow: hidden;
    }
    .lesson-leaf {
      font-size: 13px;
    }
    .lesson-name {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--navy);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pager-capsule {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #EAE2D2;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 2px 10px;
      white-space: nowrap;
    }
    .pager-arrow {
      font-size: 18px;
      line-height: 1;
      font-weight: 700;
      color: var(--navy);
      padding: 0 4px;
      cursor: pointer;
      background: none;
      border: none;
    }
    .pager-arrow:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .pager-text {
      font-size: 12px;
      font-weight: 700;
      color: var(--navy);
    }
    /* Thẻ từ vựng vintage */
    .flashcard-container {
      padding: 22px 20px;
      border-radius: 16px;
      margin-bottom: 18px;
    }
    .word-hero-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
    }
    .word-text {
      font-family: var(--font-serif);
      font-size: 34px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.1;
      margin-bottom: 4px;
    }
    .ipa-audio-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ipa-string {
      font-family: var(--font-serif);
      font-size: 16px;
      color: var(--ink-muted);
    }
    .speaker-pill {
      font-size: 15px;
      padding: 2px 6px;
      border-radius: 4px;
      cursor: pointer;
      background: #EAE2D2;
      border: 1px solid var(--border);
    }
    .botanical-art-box {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* Bảng chi tiết từ vựng */
    .vocab-details-table {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .table-row {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 12px;
      font-size: 14px;
      line-height: 1.5;
    }
    .col-label {
      color: var(--ink-muted);
      font-weight: 600;
    }
    .col-value {
      color: var(--ink);
    }
    .font-highlight {
      font-weight: 700;
      color: var(--rose);
      font-size: 15px;
    }
    .example-bullets {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ex-en {
      font-family: var(--font-serif);
      font-size: 14.5px;
      color: var(--ink);
    }
    .ex-vi {
      font-size: 13px;
      color: var(--ink-muted);
      margin-top: 1px;
    }
    .note-box {
      background: #F4EFE6;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .synonym-line {
      color: var(--olive);
      font-weight: 600;
    }
    .antonym-line {
      color: var(--rose);
      font-weight: 600;
    }
    /* Nút chân trang */
    .vocab-footer-actions {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 12px;
    }
    .word-status-tag-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .word-learned-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2.5px 8px;
      border-radius: 999px;
      background: #EDF7E8;
      color: #2F631E;
      border: 1px solid #C4E3B5;
    }
    .bookmark-btn {
      background: #EAE2D2;
      border: 1px solid var(--border-strong);
      padding: 12px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .bookmark-btn.bookmarked {
      background: #FFF4D9;
      border-color: #ECD8A5;
      color: #7A5B17;
      font-weight: 700;
    }
    .learned-btn {
      background: var(--rose);
      color: #FFF;
      border: none;
      padding: 12px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .learned-btn.already-learned {
      background: #557A46;
    }
    .quiz-cta-banner {
      margin-top: 14px;
    }
    .quiz-cta-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #EAE2D2;
      border: 1.5px dashed var(--border-strong);
      border-radius: 14px;
      padding: 12px 16px;
      text-decoration: none;
      transition: all 0.2s;
    }
    .quiz-cta-link:hover {
      background: #E2D7C3;
      border-color: var(--navy);
    }
    .cta-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .cta-icon {
      font-size: 24px;
    }
    .cta-text {
      display: flex;
      flex-direction: column;
    }
    .cta-text strong {
      font-size: 14px;
      color: var(--navy);
    }
    .cta-text small {
      font-size: 12px;
      color: var(--ink-muted);
    }
    .cta-arrow {
      font-size: 13px;
      font-weight: 700;
      color: var(--rose);
      white-space: nowrap;
    }

    /* ================= RESPONSIVE MOBILE (< 480px) ================= */
    /* VOCAB LIST CARD */
    .vocab-list-card {
      margin-top: 18px;
      padding: 14px 16px;
      border: 1px solid var(--border, #D9C8B5);
      border-radius: var(--radius-md, 12px);
      background: #FFFDF9;
    }
    .list-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #EFE6D9;
    }
    .list-title {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: 14.5px;
      color: var(--navy, #263847);
    }
    .learned-count-pill {
      font-size: 11px;
      font-weight: 600;
      color: #78815D;
      background: #EAE6DB;
      padding: 2px 8px;
      border-radius: 999px;
    }
    .vocab-table-wrap {
      overflow-x: auto;
    }
    .vocab-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .vocab-row {
      cursor: pointer;
      border-bottom: 1px solid #F0E8DC;
      transition: background 0.12s ease;
    }
    .vocab-row:hover {
      background: #F9F5EC;
    }
    .vocab-row.active-row {
      background: #F3ECE0;
      border-left: 3px solid #78815D;
    }
    .vocab-row td {
      padding: 8px 6px;
      vertical-align: middle;
    }
    .col-idx {
      width: 28px;
      color: #9C8E80;
      font-size: 11px;
      font-weight: 600;
    }
    .col-word {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 90px;
    }
    .row-word {
      color: var(--navy, #263847);
      font-size: 13.5px;
    }
    .row-ipa {
      font-size: 11px;
      color: var(--ink-muted);
    }
    .col-pos {
      min-width: 110px;
    }
    .col-meaning {
      color: #384553;
      font-size: 12.5px;
    }
    .col-status {
      width: 24px;
      text-align: right;
    }
    .badge-done {
      color: #557A3C;
      font-weight: 700;
      font-size: 14px;
    }

    @media (max-width: 480px) {
      .vocab-screen {
        padding-bottom: 20px;
      }
      .vocab-nav-bar {
        gap: 6px;
        margin-bottom: 10px;
      }
      .back-link {
        font-size: 13px;
      }
      .current-lesson-pill {
        padding: 2px 8px;
        max-width: 140px;
      }
      .lesson-name {
        font-size: 11px;
      }
      .pager-capsule {
        padding: 2px 6px;
        gap: 4px;
      }
      .pager-text {
        font-size: 11px;
      }
      .flashcard-container {
        padding: 16px 14px;
        border-radius: 14px;
        margin-bottom: 14px;
      }
      .word-text {
        font-size: 26px;
      }
      .ipa-string {
        font-size: 14px;
      }
      .botanical-art-box {
        width: 36px;
        height: 36px;
      }
      .table-row {
        grid-template-columns: 60px 1fr;
        gap: 8px;
        font-size: 13px;
      }
      .bookmark-btn, .learned-btn {
        padding: 10px;
        font-size: 13.5px;
      }
      .quiz-cta-link {
        padding: 10px 12px;
      }
      .cta-icon {
        font-size: 20px;
      }
      .cta-text strong {
        font-size: 12.5px;
      }
      .cta-text small {
        font-size: 11px;
      }
    }
  `]
})
export class VocabComponent implements OnInit {
  state = inject(GameStateService);
  route = inject(ActivatedRoute);
  assets = FARM_ASSETS;

  currentIndex = signal<number>(0);

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const lessonIdStr = params.get('lessonId');
      if (lessonIdStr) {
        const id = parseInt(lessonIdStr, 10);
        if (!isNaN(id)) {
          this.currentIndex.set(0);
          this.state.loadVocabulariesForLesson(id);
        }
      } else if (this.state.activeLessonId()) {
        this.state.loadVocabulariesForLesson(this.state.activeLessonId());
      }
    });
  }

  currentLessonTitle = computed(() => {
    const activeId = this.state.activeLessonId();
    const found = this.state.lessons().find(l => l.id === activeId);
    return found ? found.title : 'Từ vựng bài học';
  });

  fallbackWords = [
    {
      word: 'delightful',
      ipa: "/dɪ'laɪt.fəl/",
      type: 'adjective (tính từ)',
      meaning: 'đáng yêu, thú vị, dễ chịu',
      examples: [
        {
          en: 'It was a <strong>delightful</strong> surprise.',
          vi: 'Đó là một bất ngờ thú vị.'
        },
        {
          en: 'The garden looks <strong>delightful</strong> in spring.',
          vi: 'Khu vườn trông thật dễ chịu vào mùa xuân.'
        }
      ],
      synonyms: 'pleasant, lovely',
      antonyms: 'boring, unpleasant'
    },
    {
      word: 'harvest',
      ipa: "/'hɑːr.vɪst/",
      type: 'noun / verb (danh từ / động từ)',
      meaning: 'mùa thu hoạch, gặt hái nông sản',
      examples: [
        {
          en: 'Farmers are busy with the autumn <strong>harvest</strong>.',
          vi: 'Nông dân đang bận rộn với mùa gặt mùa thu.'
        }
      ],
      synonyms: 'gather, crop, yield',
      antonyms: 'plant, sow'
    }
  ];

  get displayWords() {
    const apiVocabs = this.state.activeVocabularies();
    if (apiVocabs && apiVocabs.length > 0) {
      return apiVocabs.map(v => ({
        word: v.word,
        ipa: v.phonetic || v.ipaUs || '',
        type: v.wordType || 'noun',
        meaning: v.meaningVi,
        examples: [
          {
            en: v.exampleEn || `Example for <strong>${v.word}</strong>`,
            vi: v.exampleVi || ''
          }
        ],
        synonyms: 'TOEIC Vocabulary',
        antonyms: '-'
      }));
    }
    return this.fallbackWords;
  }

  get currentWord() {
    const list = this.displayWords;
    const idx = Math.min(this.currentIndex(), Math.max(0, list.length - 1));
    return list[idx] || this.fallbackWords[0];
  }

  nextWord() {
    if (this.currentIndex() < this.displayWords.length - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  prevWord() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }

  learnedInLessonCount = computed(() => {
    const words = this.displayWords;
    const learned = this.state.learnedWords();
    return words.filter(w => learned.includes(w.word)).length;
  });

  selectWordIndex(idx: number) {
    if (idx >= 0 && idx < this.displayWords.length) {
      this.currentIndex.set(idx);
    }
  }

  toggleBookmark() {
    this.state.toggleBookmark(this.currentWord.word);
  }

  markLearned() {
    this.state.markWordLearned(this.currentWord.word, false);
    if (this.currentIndex() < this.displayWords.length - 1) {
      this.nextWord();
    } else {
      this.state.showToast('🎉 Bạn đã xem hết từ vựng! Hãy bấm "Luyện tập" để làm bài kiểm tra và nhận thưởng.');
    }
  }
}
