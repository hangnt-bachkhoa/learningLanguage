import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GrammarService } from '../../core/services/grammar.service';
import { GrammarTopic } from '../../core/constants/default-grammar-topics.constant';
import { GameStateService } from '../../core/services/game-state.service';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-grammar-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, PixelIconComponent],
  template: `
    <div class="grammar-detail-page">
      @if (!topic()) {
        <div class="empty-detail-card">
          <span class="icon"><app-pixel-icon name="icon_sprout_action" [size]="32"></app-pixel-icon></span>
          <h2>Không tìm thấy chuyên đề ngữ pháp</h2>
          <p>Mã chuyên đề không tồn tại trong hệ thống.</p>
          <a routerLink="/grammar" class="btn btn-secondary btn-sm">Về sổ tay Ngữ pháp</a>
        </div>
      } @else {
        <article class="detail-card">
          <!-- TOP META HEADER -->
          <div class="detail-top-nav">
            <a routerLink="/grammar" class="btn btn-secondary btn-sm back-btn">
              ‹ Sổ tay Ngữ pháp
            </a>
            <div class="top-meta-badges">
              <span class="tag-pill">{{ topic()?.level }}</span>
              <span class="tag-pill">TOEIC {{ topic()?.toeicTarget }}</span>
            </div>
          </div>

          <div class="topic-meta-header">
            <div class="order-num-row" style="margin-bottom: 6px;">
              <span class="order-num">Chuyên đề #{{ (topic()?.orderIndex || 0) < 10 ? '0' + topic()?.orderIndex : topic()?.orderIndex }}</span>
            </div>
            <h1 class="topic-title-en">{{ topic()?.titleEn }}</h1>
            <h2 class="topic-title-vi">{{ topic()?.titleVi }}</h2>
            <p class="topic-summary">{{ topic()?.summary }}</p>

            <div class="status-stars-bar">
              <span class="status-pill" [class.studied]="topic()?.isStudied">
                @if (topic()?.isStudied) {
                  <app-pixel-icon name="icon_check" [size]="12"></app-pixel-icon>
                }
                <span>{{ topic()?.isStudied ? 'Đã đánh dấu học' : 'Chưa đánh dấu học' }}</span>
              </span>
              <div class="record-stars" title="Kỷ lục sao làm bài kiểm tra">
                <span class="record-label">Kỷ lục: </span>
                <span class="star">
                  <app-pixel-icon [name]="(topic()?.bestStars || 0) >= 1 ? 'icon_star' : 'icon_star_empty'" [size]="13"></app-pixel-icon>
                </span>
                <span class="star">
                  <app-pixel-icon [name]="(topic()?.bestStars || 0) >= 2 ? 'icon_star' : 'icon_star_empty'" [size]="13"></app-pixel-icon>
                </span>
                <span class="star">
                  <app-pixel-icon [name]="(topic()?.bestStars || 0) >= 3 ? 'icon_star' : 'icon_star_empty'" [size]="13"></app-pixel-icon>
                </span>
              </div>
            </div>
          </div>

          <!-- MOBILE CONTENT TABS (<= 767px only) -->
          <nav class="detail-tabs" aria-label="Chuyển tab nội dung">
            <button
              type="button"
              class="filter-chip"
              [class.active]="detailTab() === 'theory'"
              (click)="detailTab.set('theory')">
              <span style="display:inline-flex; align-items:center; gap:5px;">
                <app-pixel-icon name="icon_ruler" [size]="14"></app-pixel-icon>
                <span>Công thức &amp; Bẫy</span>
              </span>
            </button>
            <button
              type="button"
              class="filter-chip"
              [class.active]="detailTab() === 'examples'"
              (click)="detailTab.set('examples')">
              <span style="display:inline-flex; align-items:center; gap:5px;">
                <app-pixel-icon name="icon_lightbulb" [size]="14"></app-pixel-icon>
                <span>Ví dụ song ngữ</span>
              </span>
            </button>
          </nav>

          <!-- KHỐI 1 & 2: CÔNG THỨC VÀ BẪY TOEIC -->
          <div class="tab-pane theory-pane" [class.tab-hidden]="detailTab() !== 'theory'">
            <!-- CÔNG THỨC CỐT LÕI -->
            <section class="content-section">
              <h3 class="section-title">
                <span style="display:inline-flex; align-items:center; gap:6px;">
                  <app-pixel-icon name="icon_ruler" [size]="16"></app-pixel-icon>
                  <span>Công thức cốt lõi &amp; Quy tắc</span>
                </span>
              </h3>
              <div class="rules-list">
                @for (rule of topic()?.rules; track rule; let idx = $index) {
                  <div class="rule-item">
                    <span class="rule-badge">{{ idx + 1 }}</span>
                    <div class="rule-text">{{ rule }}</div>
                  </div>
                }
              </div>
            </section>

            <!-- BẪY TOEIC PART 5 -->
            <section class="content-section">
              <h3 class="section-title trap-title">
                <span style="display:inline-flex; align-items:center; gap:6px;">
                  <app-pixel-icon name="icon_warning" [size]="16"></app-pixel-icon>
                  <span>Bẫy TOEIC Part 5 thường gặp</span>
                </span>
              </h3>
              <div class="traps-list">
                @for (trap of topic()?.traps; track trap) {
                  <div class="trap-item">
                    <span class="trap-icon">
                      <app-pixel-icon name="icon_cross" [size]="12"></app-pixel-icon>
                    </span>
                    <div class="trap-text">{{ trap }}</div>
                  </div>
                }
              </div>
            </section>
          </div>

          <!-- KHỐI 3: VÍ DỤ MINH HỌA SONG NGỮ -->
          <div class="tab-pane examples-pane" [class.tab-hidden]="detailTab() !== 'examples'">
            <section class="content-section">
              <h3 class="section-title">
                <span style="display:inline-flex; align-items:center; gap:6px;">
                  <app-pixel-icon name="icon_lightbulb" [size]="16"></app-pixel-icon>
                  <span>Ví dụ minh họa song ngữ</span>
                </span>
              </h3>
              <div class="examples-list">
                @for (ex of topic()?.examples; track ex.en) {
                  <div class="example-item">
                    <div class="example-body">
                      <div class="example-en">"{{ ex.en }}"</div>
                      <div class="example-vi">{{ ex.vi }}</div>
                    </div>
                    <button
                      type="button"
                      class="speak-btn"
                      (click)="state.speak(ex.en)"
                      title="Bấm để nghe phát âm tiếng Anh">
                      <app-pixel-icon name="icon_speaker" [size]="14"></app-pixel-icon>
                    </button>
                  </div>
                }
              </div>
            </section>
          </div>

          <!-- STICKY ACTION BAR DƯỚI CÙNG -->
          <footer class="detail-action-bar">
            <button
              type="button"
              class="btn btn-secondary action-btn-study"
              [disabled]="topic()?.isStudied"
              (click)="markAsStudied()">
              <span style="display:inline-flex; align-items:center; gap:6px;">
                @if (topic()?.isStudied) {
                  <app-pixel-icon name="icon_check" [size]="14"></app-pixel-icon>
                }
                <span>{{ topic()?.isStudied ? 'Đã hoàn tất' : 'Đã học (0 XP)' }}</span>
              </span>
            </button>

            <a
              [routerLink]="['/grammar', topic()?.code, 'quiz']"
              class="btn btn-primary action-btn-quiz">
              Làm Quiz ({{ topic()?.questions?.length }} câu) →
            </a>
          </footer>
        </article>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .grammar-detail-page {
      max-width: 800px;
      margin: 0 auto;
      padding: 14px 16px 56px;
    }

    .detail-card {
      background: var(--bg-card, #FFFDF9);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: var(--radius-lg, 16px);
      padding: 24px;
      box-shadow: 0 4px 16px rgba(38, 56, 71, 0.03);
    }

    .detail-top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .back-btn {
      text-decoration: none;
      font-weight: 600;
    }

    .top-meta-badges {
      display: flex;
      gap: 6px;
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

    .topic-meta-header {
      border-bottom: 1px dashed var(--border, #D9C8B5);
      padding-bottom: 14px;
      margin-bottom: 18px;
    }

    .order-num {
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.8px;
      color: var(--ink-muted, #6D665C);
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .topic-title-en {
      font-family: var(--font-serif, 'Newsreader', Georgia, serif);
      font-size: 26px;
      font-weight: 700;
      color: var(--navy, #263847);
      line-height: 1.25;
      margin: 0 0 2px;
    }

    .topic-title-vi {
      font-size: 15px;
      font-weight: 600;
      color: var(--olive, #78815D);
      margin: 0 0 8px;
    }

    .topic-summary {
      font-size: 13.5px;
      color: var(--ink-muted, #6D665C);
      line-height: 1.5;
      margin: 0 0 14px;
    }

    .status-stars-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .status-pill {
      font-size: 11.5px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 999px;
      background: var(--bg-paper, #F8F4EB);
      border: 1px solid var(--border, #D9C8B5);
      color: var(--ink-muted, #6D665C);
    }

    .status-pill.studied {
      background: var(--olive-tint, #E9ECE1);
      border-color: #C3CAAE;
      color: #3B4A2B;
    }

    .record-stars {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 13px;
      color: var(--ink-muted, #6D665C);
    }

    .star {
      color: #D8CFC0;
      font-size: 14px;
    }

    .star.filled {
      color: #E2A03F;
    }

    /* MOBILE TABS (Hidden on desktop) */
    .detail-tabs {
      display: none;
      gap: 8px;
      margin: 14px 0 16px;
      border-bottom: 1px solid var(--border, #D9C8B5);
      padding-bottom: 10px;
    }

    .filter-chip {
      padding: 6px 14px;
      border-radius: 999px;
      background: var(--bg-card, #FFFDF9);
      border: 1px solid var(--border, #D9C8B5);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ink-muted, #6D665C);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .filter-chip.active {
      background: var(--navy, #263847);
      border-color: var(--navy, #263847);
      color: #FFFDF9;
    }

    /* SECTIONS */
    .content-section {
      margin-bottom: 20px;
    }

    .section-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0 0 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .section-title.trap-title {
      color: var(--rose, #A65E65);
    }

    /* RULES */
    .rules-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .rule-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: var(--bg-paper, #F8F4EB);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: 10px;
      padding: 11px 13px;
    }

    .rule-badge {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: var(--olive, #78815D);
      color: #FFFDF9;
      font-size: 11.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .rule-text {
      font-size: 13.5px;
      color: var(--ink, #2C2A25);
      line-height: 1.5;
    }

    /* TRAPS */
    .traps-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .trap-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: var(--rose-soft, #FBE8E6);
      border: 1px solid #E5B9B5;
      border-left: 3.5px solid var(--rose, #A65E65);
      border-radius: 10px;
      padding: 11px 13px;
      font-size: 13px;
      color: #5C282D;
      line-height: 1.45;
    }

    .trap-icon {
      font-weight: 700;
      color: var(--rose, #A65E65);
      margin-top: 1px;
    }

    /* EXAMPLES */
    .examples-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .example-item {
      background: #FFFDF9;
      border: 1px solid var(--border, #D9C8B5);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .example-body {
      flex: 1;
    }

    .example-en {
      font-family: var(--font-serif, 'Newsreader', Georgia, serif);
      font-size: 15.5px;
      font-weight: 600;
      color: var(--navy, #263847);
      line-height: 1.35;
    }

    .example-vi {
      font-size: 12.5px;
      color: var(--ink-muted, #6D665C);
      margin-top: 4px;
      line-height: 1.4;
    }

    .speak-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--bg-paper, #F8F4EB);
      border: 1px solid var(--border-strong, #C2AD95);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .speak-btn:hover {
      background: #EFE8D8;
    }

    /* DETAIL ACTION BAR */
    .detail-action-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 24px;
      padding-top: 18px;
      border-top: 1px solid var(--border, #D9C8B5);
      width: 100%;
      box-sizing: border-box;
    }

    .action-btn-study, .action-btn-quiz {
      flex: 1;
      min-width: 0;
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .empty-detail-card {
      text-align: center;
      padding: 48px 20px;
      background: var(--bg-card, #FFFDF9);
      border: 1.5px dashed var(--border, #D9C8B5);
      border-radius: var(--radius-lg, 16px);
      color: var(--ink-muted, #6D665C);
    }

    .empty-detail-card .icon {
      font-size: 32px;
      display: block;
      margin-bottom: 10px;
    }

    /* RESPONSIVE DESIGN (<= 767px) */
    @media (max-width: 767px) {
      .grammar-detail-page {
        padding: 4px 2px 72px;
      }

      .detail-card {
        padding: 14px 10px;
        box-sizing: border-box;
        overflow-x: hidden;
      }

      .topic-title-en {
        font-size: 22px;
      }

      .detail-tabs {
        display: flex;
      }

      .tab-pane.tab-hidden {
        display: none !important;
      }

      .detail-action-bar {
        position: sticky;
        bottom: 10px;
        background: rgba(255, 253, 249, 0.96);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid var(--border-strong, #C2AD95);
        border-radius: 12px;
        padding: 8px;
        box-shadow: 0 6px 20px rgba(38, 56, 71, 0.12);
        z-index: 20;
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }

      .action-btn-study, .action-btn-quiz {
        flex: 1 1 140px;
        min-width: 0;
        font-size: 12.5px;
        padding: 9px 8px;
        min-height: 42px;
        white-space: normal;
        line-height: 1.25;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
    }
  `]
})
export class GrammarDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private grammarService = inject(GrammarService);
  state = inject(GameStateService);

  topic = signal<GrammarTopic | null>(null);
  detailTab = signal<'theory' | 'examples'>('theory');

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const code = params.get('code');
      if (code) {
        const found = this.grammarService.getTopicByCode(code);
        if (found) {
          this.topic.set(found);
        }
      }
    });
  }

  markAsStudied(): void {
    const t = this.topic();
    if (!t) return;
    this.grammarService.markAsStudied(t.code);
    const updated = this.grammarService.getTopicByCode(t.code);
    if (updated) {
      this.topic.set({ ...updated, isStudied: true });
    }
    this.state.emitQuestEvent('GRAMMAR_STUDIED', t.code);
  }
}
