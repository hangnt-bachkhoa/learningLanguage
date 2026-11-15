import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GrammarService } from '../../core/services/grammar.service';
import { GrammarTopic } from '../../core/constants/default-grammar-topics.constant';
import { GameStateService } from '../../core/services/game-state.service';

@Component({
  selector: 'app-grammar-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="grammar-detail-page">
      <!-- HEADER / QUAY LẠI -->
      <div class="detail-nav-row">
        <a routerLink="/grammar" class="back-link">
          <span class="chevron">‹</span>
          <span>Sổ tay Ngữ pháp</span>
        </a>
        <div class="header-level-badges">
          @if (topic(); as t) {
            <span class="level-pill" [attr.data-level]="t.level">{{ t.level }}</span>
            <span class="toeic-pill">TOEIC {{ t.toeicTarget }}</span>
          }
        </div>
      </div>

      @if (!topic()) {
        <div class="vintage-card not-found-card">
          <span class="icon">🍃</span>
          <h2>Không tìm thấy chuyên đề ngữ pháp</h2>
          <p>Mã chuyên đề không tồn tại trong hệ thống.</p>
          <a routerLink="/grammar" class="btn btn-secondary">Về danh mục chuyên đề</a>
        </div>
      } @else {
        <!-- SỔ TAY GHI CHÚ PHONG CÁCH NOTEBOOK (2D FLAT NATURALIST VINTAGE) -->
        <main class="notebook-sheet">
          <header class="sheet-header">
            <div class="sheet-order-tag">Chuyên đề #{{ topic()?.orderIndex }}</div>
            <h1 class="sheet-title-en">{{ topic()?.titleEn }}</h1>
            <h2 class="sheet-title-vi">{{ topic()?.titleVi }}</h2>
            <p class="sheet-summary">{{ topic()?.summary }}</p>

            <div class="sheet-status-row">
              @if (topic()?.isStudied) {
                <span class="studied-pill">✓ Đã đánh dấu học</span>
              } @else {
                <span class="unstudied-pill">Chưa đánh dấu học</span>
              }
              <div class="stars-indicator" title="Thành tích bài kiểm tra">
                <span>Kỷ lục: </span>
                <span class="star" [class.filled]="(topic()?.bestStars || 0) >= 1">★</span>
                <span class="star" [class.filled]="(topic()?.bestStars || 0) >= 2">★</span>
                <span class="star" [class.filled]="(topic()?.bestStars || 0) >= 3">★</span>
              </div>
            </div>
          </header>

          <!-- KHỐI 1: CÔNG THỨC CỐT LÕI -->
          <section class="notebook-section rules-section">
            <div class="section-title-row">
              <span class="section-icon">📐</span>
              <h3 class="section-heading">Công thức cốt lõi & Quy tắc</h3>
            </div>
            <div class="rules-list">
              @for (rule of topic()?.rules; track rule; let idx = $index) {
                <div class="rule-item-box">
                  <span class="rule-bullet">{{ idx + 1 }}</span>
                  <div class="rule-content">{{ rule }}</div>
                </div>
              }
            </div>
          </section>

          <!-- KHỐI 2: BẪY TOEIC HAY GẶP -->
          <section class="notebook-section traps-section">
            <div class="section-title-row">
              <span class="section-icon">⚠️</span>
              <h3 class="section-heading trap-heading">Bẫy TOEIC Part 5 thường gặp</h3>
            </div>
            <div class="traps-list">
              @for (trap of topic()?.traps; track trap) {
                <div class="trap-item-box">
                  <span class="trap-bullet">✕</span>
                  <div class="trap-content">{{ trap }}</div>
                </div>
              }
            </div>
          </section>

          <!-- KHỐI 3: VÍ DỤ MINH HỌA SONG NGỮ -->
          <section class="notebook-section examples-section">
            <div class="section-title-row">
              <span class="section-icon">💡</span>
              <h3 class="section-heading">Ví dụ minh họa song ngữ</h3>
            </div>
            <div class="examples-grid">
              @for (ex of topic()?.examples; track ex.en) {
                <div class="example-card">
                  <div class="ex-en-row">
                    <button class="speaker-pill" (click)="state.speak(ex.en)" title="Nghe phát âm">🔊</button>
                    <p class="ex-en">"{{ ex.en }}"</p>
                  </div>
                  <p class="ex-vi">{{ ex.vi }}</p>
                </div>
              }
            </div>
          </section>

          <!-- THANH HÀNH ĐỘNG DƯỚI CÙNG -->
          <footer class="notebook-action-footer">
            <button
              type="button"
              class="btn btn-outline mark-studied-btn"
              [disabled]="topic()?.isStudied"
              (click)="markAsStudied()">
              @if (topic()?.isStudied) {
                ✓ Đã hoàn tất lý thuyết (0 XP)
              } @else {
                Đánh dấu Đã học (0 XP)
              }
            </button>

            <a [routerLink]="['/grammar', topic()?.code, 'quiz']" class="btn btn-primary start-quiz-btn">
              Làm bài kiểm tra ({{ topic()?.questions?.length }} câu) →
            </a>
          </footer>
        </main>
      }
    </div>
  `,
  styles: [`
    .grammar-detail-page {
      max-width: 760px;
      margin: 0 auto;
      padding: 10px 16px 48px;
    }

    .detail-nav-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--navy);
      text-decoration: none;
      font-weight: 700;
      font-size: 14.5px;
    }

    .chevron {
      font-size: 24px;
      line-height: 1;
    }

    .header-level-badges {
      display: flex;
      gap: 6px;
    }

    .level-pill {
      font-size: 11.5px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 999px;
      background: #EAE2D2;
      color: var(--navy);
    }
    .level-pill[data-level="Pre-A1"] { background: #E8EFE8; color: #3E633E; }
    .level-pill[data-level="A2"] { background: #E4EFF3; color: #2B576C; }
    .level-pill[data-level="B1-B2"] { background: #F6EDE2; color: #8C571D; }
    .level-pill[data-level="B2-C1"] { background: #F5E6E6; color: #8A373E; }

    .toeic-pill {
      font-size: 11.5px;
      font-weight: 600;
      padding: 3px 9px;
      border-radius: 999px;
      background: #FAF6EF;
      color: var(--ink-muted);
      border: 1px solid #DDD3C3;
    }

    /* NOTEBOOK SHEET */
    .notebook-sheet {
      background: #FAF6EF;
      border: 1.5px solid #DDD3C3;
      border-radius: 20px;
      padding: 32px 28px;
      box-shadow: 0 6px 20px rgba(38, 56, 71, 0.04);
      position: relative;
    }

    .sheet-header {
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1.5px dashed #DDD3C3;
    }

    .sheet-order-tag {
      font-family: monospace;
      font-weight: 800;
      font-size: 12px;
      color: #78815D;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
    }

    .sheet-title-en {
      font-family: var(--font-serif);
      font-size: 28px;
      font-weight: 800;
      color: var(--navy);
      margin: 0 0 4px;
      letter-spacing: -0.5px;
    }

    .sheet-title-vi {
      font-size: 17px;
      font-weight: 600;
      color: #78815D;
      margin: 0 0 10px;
    }

    .sheet-summary {
      font-size: 14.5px;
      color: var(--ink-muted);
      line-height: 1.5;
      margin: 0 0 16px;
    }

    .sheet-status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .studied-pill {
      font-size: 12px;
      font-weight: 700;
      color: #385E38;
      background: #E4EFE4;
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid #C4D7BE;
    }

    .unstudied-pill {
      font-size: 12px;
      color: var(--ink-muted);
      background: #F0ECE4;
      padding: 3px 10px;
      border-radius: 999px;
    }

    .stars-indicator {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 13px;
      color: var(--ink-muted);
    }

    .star {
      font-size: 16px;
      color: #DDD3C3;
    }

    .star.filled {
      color: #E2A03F;
    }

    /* SECTIONS */
    .notebook-section {
      margin-bottom: 24px;
    }

    .section-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .section-icon {
      font-size: 18px;
    }

    .section-heading {
      font-family: var(--font-serif);
      font-size: 17px;
      font-weight: 800;
      color: var(--navy);
      margin: 0;
    }

    .trap-heading {
      color: #8C3E44;
    }

    /* KHỐI CÔNG THỨC */
    .rules-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .rule-item-box {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      background: #F4EFE6;
      border: 1px solid #E2D7C7;
      border-radius: 12px;
      padding: 12px 14px;
    }

    .rule-bullet {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: #78815D;
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .rule-content {
      font-size: 14px;
      color: var(--navy);
      line-height: 1.45;
      font-family: var(--font-sans);
    }

    /* KHỐI BẪY */
    .traps-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .trap-item-box {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      background: #FBECEB;
      border: 1px solid #E6C5C5;
      border-radius: 12px;
      padding: 12px 14px;
    }

    .trap-bullet {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: #A65E65;
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .trap-content {
      font-size: 14px;
      color: #5C272B;
      line-height: 1.45;
    }

    /* KHỐI VÍ DỤ */
    .examples-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .example-card {
      background: #F7F3EB;
      border: 1px solid #DDD3C3;
      border-radius: 12px;
      padding: 12px 16px;
    }

    .ex-en-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 4px;
    }

    .speaker-pill {
      background: #EAE2D2;
      border: 1px solid #D9C8B5;
      border-radius: 999px;
      font-size: 12px;
      padding: 2px 6px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .speaker-pill:hover {
      background: #DDD3C3;
    }

    .ex-en {
      font-size: 14.5px;
      font-weight: 600;
      color: var(--navy);
      margin: 0;
      line-height: 1.4;
    }

    .ex-vi {
      font-size: 13.5px;
      color: #5B6554;
      margin: 0;
      padding-left: 32px;
      font-style: italic;
    }

    /* FOOTER HÀNH ĐỘNG */
    .notebook-action-footer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1.5px dashed #DDD3C3;
    }

    .mark-studied-btn, .start-quiz-btn {
      padding: 13px 14px;
      font-size: 14.5px;
      font-weight: 700;
      border-radius: 12px;
      text-align: center;
      text-decoration: none;
    }

    .not-found-card {
      text-align: center;
      padding: 40px;
      border-radius: 16px;
    }

    @media (max-width: 600px) {
      .notebook-sheet {
        padding: 20px 16px;
        border-radius: 16px;
      }
      .sheet-title-en {
        font-size: 22px;
      }
      .notebook-action-footer {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class GrammarDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  grammarService = inject(GrammarService);
  state = inject(GameStateService);

  topic = signal<GrammarTopic | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const code = params.get('code') || '';
      const found = this.grammarService.getTopicByCode(code);
      this.topic.set(found || null);
    });
  }

  markAsStudied(): void {
    const t = this.topic();
    if (!t) return;
    this.grammarService.markAsStudied(t.code);
    const updated = this.grammarService.getTopicByCode(t.code);
    this.topic.set(updated || null);
  }
}
