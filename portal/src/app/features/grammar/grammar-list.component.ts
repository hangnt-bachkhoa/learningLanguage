import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GrammarService } from '../../core/services/grammar.service';
import { GrammarTopic } from '../../core/constants/default-grammar-topics.constant';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

interface LevelGroup {
  level: string;
  badgeLabel: string;
  heading: string;
  items: GrammarTopic[];
}

@Component({
  selector: 'app-grammar-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PixelIconComponent],
  template: `
    <div class="grammar-catalog-page">
      <!-- HERO SUMMARY BANNER -->
      <section class="hero-banner">
        <div class="hero-text-wrap">
          <div class="hero-eyebrow" style="display:inline-flex; align-items:center; gap:6px;">
            <app-pixel-icon name="icon_books_stack" [size]="15"></app-pixel-icon>
            <span>Sổ tay Ngữ pháp TOEIC</span>
          </div>
          <h1 class="hero-title">13 Chuyên Đề Trọng Điểm</h1>
          <p class="hero-sub">Học công thức &amp; bẫy Part 5 theo nhóm cấp độ, sau đó làm Quiz để nhận XP và Xu.</p>
        </div>

        <div class="hero-progress-wrap">
          <div class="hero-progress-header">
            <span>{{ studiedCount() }}/13 đã học</span>
            <span style="display:inline-flex; align-items:center; gap:4px;">
              <span>{{ totalStarsClaimed() }}/39</span>
              <app-pixel-icon name="icon_star" [size]="13"></app-pixel-icon>
            </span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" [style.width.%]="progressPercent()"></div>
          </div>
          <button type="button" class="btn btn-primary btn-sm btn-random" (click)="startRandomQuiz()" style="display:inline-flex; align-items:center; gap:6px;">
            <app-pixel-icon name="icon_bolt" [size]="14"></app-pixel-icon>
            <span>Ôn tập ngẫu nhiên</span>
          </button>
        </div>
      </section>

      <!-- CONTROLS ROW (FILTER & SEARCH) -->
      <div class="controls-row">
        <nav class="filter-scroll" aria-label="Lọc cấp độ ngữ pháp">
          @for (lvl of levels; track lvl.key) {
            <button
              type="button"
              class="filter-chip"
              [class.active]="selectedLevel() === lvl.key"
              (click)="selectedLevel.set(lvl.key)">
              {{ lvl.label }} ({{ getCountForLevel(lvl.key) }})
            </button>
          }
        </nav>

        <div class="search-box">
          <span class="search-icon"><app-pixel-icon name="icon_search" [size]="14"></app-pixel-icon></span>
          <input
            type="text"
            placeholder="Tìm chuyên đề ngữ pháp..."
            [ngModel]="searchQuery()"
            (ngModelChange)="searchQuery.set($event)"
            aria-label="Tìm kiếm chuyên đề" />
        </div>
      </div>

      <!-- DANH SÁCH CHUYÊN ĐỀ THEO NHÓM CẤP ĐỘ (Fix orphan card #13) -->
      @if (grammarService.isLoading()) {
        <div class="loading-card">
          <app-pixel-icon name="icon_retry" [size]="24"></app-pixel-icon>
          <p>Đang tải sổ tay ngữ pháp TOEIC...</p>
        </div>
      } @else if (levelGroups().length === 0) {
        <div class="empty-card">
          <app-pixel-icon name="icon_sprout_action" [size]="32"></app-pixel-icon>
          <p>Không tìm thấy chuyên đề phù hợp với từ khóa "{{ searchQuery() }}".</p>
          <button type="button" class="btn btn-secondary btn-sm" (click)="searchQuery.set(''); selectedLevel.set('ALL')">
            Xóa bộ lọc
          </button>
        </div>
      } @else {
        @for (group of levelGroups(); track group.level) {
          <section class="level-section">
            <header class="level-header">
              <span class="level-badge">{{ group.badgeLabel }}</span>
              <h2 class="level-heading">{{ group.heading }}</h2>
              <div class="level-line"></div>
            </header>

            <div class="topics-grid">
              @for (topic of group.items; track topic.code) {
                <article class="topic-card" [class.studied-card]="topic.isStudied">
                  <div class="topic-main">
                    <div class="topic-top">
                      <span class="topic-num">#{{ topic.orderIndex < 10 ? '0' + topic.orderIndex : topic.orderIndex }}</span>
                      <div class="topic-tags">
                        <span class="tag-pill">{{ topic.level }}</span>
                        <span class="tag-pill">TOEIC {{ topic.toeicTarget }}</span>
                      </div>
                    </div>

                    <h3 class="topic-title-en">{{ topic.titleEn }}</h3>
                    <h4 class="topic-title-vi">{{ topic.titleVi }}</h4>
                    <p class="topic-summary">{{ topic.summary }}</p>
                  </div>

                  <footer class="topic-footer">
                    <div class="topic-meta-left">
                      <div class="stars-row" title="Sao đạt được qua bài kiểm tra">
                        <span class="star">
                          <app-pixel-icon [name]="(topic.bestStars || 0) >= 1 ? 'icon_star' : 'icon_star_empty'" [size]="13"></app-pixel-icon>
                        </span>
                        <span class="star">
                          <app-pixel-icon [name]="(topic.bestStars || 0) >= 2 ? 'icon_star' : 'icon_star_empty'" [size]="13"></app-pixel-icon>
                        </span>
                        <span class="star">
                          <app-pixel-icon [name]="(topic.bestStars || 0) >= 3 ? 'icon_star' : 'icon_star_empty'" [size]="13"></app-pixel-icon>
                        </span>
                      </div>
                      <span class="status-tag" [class.studied]="topic.isStudied">
                        @if (topic.isStudied) {
                          <app-pixel-icon name="icon_check" [size]="11"></app-pixel-icon>
                        }
                        <span>{{ topic.isStudied ? 'Đã học' : 'Chưa học' }}</span>
                      </span>
                    </div>

                    <div class="topic-actions">
                      <a [routerLink]="['/grammar', topic.code]" class="btn btn-secondary btn-sm action-btn">
                        Lý thuyết
                      </a>
                      <a [routerLink]="['/grammar', topic.code, 'quiz']" class="btn btn-primary btn-sm action-btn">
                        Làm Quiz
                      </a>
                    </div>
                  </footer>
                </article>
              }
            </div>
          </section>
        }
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .grammar-catalog-page {
      max-width: 980px;
      margin: 0 auto;
      padding: 14px 16px 56px;
    }

    /* HERO SUMMARY BANNER */
    .hero-banner {
      background: var(--bg-card, #FFFDF9);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: var(--radius-lg, 16px);
      padding: 20px 22px;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      box-shadow: 0 3px 12px rgba(38, 56, 71, 0.03);
    }

    .hero-text-wrap {
      flex: 1;
      min-width: 240px;
    }

    .hero-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--olive, #78815D);
      margin-bottom: 4px;
    }

    .hero-title {
      font-family: var(--font-serif, 'Newsreader', Georgia, serif);
      font-size: 26px;
      font-weight: 700;
      color: var(--navy, #263847);
      line-height: 1.2;
      margin: 0;
    }

    .hero-sub {
      font-size: 13px;
      color: var(--ink-muted, #6D665C);
      margin-top: 4px;
      line-height: 1.45;
    }

    .hero-progress-wrap {
      min-width: 250px;
      background: var(--bg-paper, #F8F4EB);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: var(--radius-md, 12px);
      padding: 12px 14px;
    }

    .hero-progress-header {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 700;
      color: var(--navy, #263847);
    }

    .progress-track {
      width: 100%;
      height: 7px;
      background: #EFE8D8;
      border-radius: 999px;
      overflow: hidden;
      margin: 7px 0 10px;
    }

    .progress-fill {
      height: 100%;
      background: var(--olive, #78815D);
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .btn-random {
      width: 100%;
      font-weight: 700;
    }

    /* CONTROLS ROW (FILTER & SEARCH) */
    .controls-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .filter-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
      -ms-overflow-style: none;
      max-width: 100%;
      -webkit-overflow-scrolling: touch;
    }

    .filter-scroll::-webkit-scrollbar {
      display: none;
    }

    .filter-chip {
      flex-shrink: 0;
      padding: 6px 14px;
      border-radius: 999px;
      background: var(--bg-card, #FFFDF9);
      border: 1px solid var(--border, #D9C8B5);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ink-muted, #6D665C);
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .filter-chip:hover {
      border-color: var(--border-strong, #C2AD95);
      color: var(--navy, #263847);
    }

    .filter-chip.active {
      background: var(--navy, #263847);
      border-color: var(--navy, #263847);
      color: #FFFDF9;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-card, #FFFDF9);
      border: 1px solid var(--border-strong, #C2AD95);
      border-radius: 999px;
      padding: 6px 14px;
      min-width: 240px;
    }

    .search-icon {
      font-size: 13px;
      color: var(--ink-muted, #6D665C);
    }

    .search-box input {
      border: none;
      outline: none;
      background: transparent;
      font-size: 13px;
      color: var(--ink, #2C2A25);
      width: 100%;
    }

    /* LEVEL GROUP SECTION */
    .level-section {
      margin-bottom: 24px;
    }

    .level-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }

    .level-badge {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--olive-tint, #E9ECE1);
      color: #4A5435;
      border: 1px solid #C5CEB0;
      white-space: nowrap;
    }

    .level-heading {
      font-family: var(--font-serif, 'Newsreader', Georgia, serif);
      font-size: 17px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0;
      white-space: nowrap;
    }

    .level-line {
      flex: 1;
      height: 1px;
      background: var(--border, #D9C8B5);
    }

    /* TOPIC GRID: 2 COLUMNS DESKTOP, 1 COLUMN MOBILE */
    .topics-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .topic-card {
      background: var(--bg-card, #FFFDF9);
      border: 1px solid var(--border, #D9C8B5);
      border-radius: var(--radius-md, 12px);
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      transition: border-color 0.15s, transform 0.15s;
    }

    .topic-card:hover {
      border-color: var(--border-strong, #C2AD95);
      transform: translateY(-1px);
    }

    .topic-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .topic-num {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--ink-muted, #6D665C);
    }

    .topic-tags {
      display: flex;
      gap: 5px;
    }

    .tag-pill {
      font-size: 10.5px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--bg-paper, #F8F4EB);
      border: 1px solid var(--border, #D9C8B5);
      color: var(--ink-muted, #6D665C);
    }

    .topic-title-en {
      font-family: var(--font-serif, 'Newsreader', Georgia, serif);
      font-size: 17.5px;
      font-weight: 700;
      color: var(--navy, #263847);
      line-height: 1.25;
      margin: 4px 0 0;
    }

    .topic-title-vi {
      font-size: 13px;
      font-weight: 600;
      color: var(--olive, #78815D);
      margin: 2px 0 0;
    }

    .topic-summary {
      font-size: 12.5px;
      color: var(--ink-muted, #6D665C);
      margin: 6px 0 0;
      line-height: 1.45;
    }

    .topic-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding-top: 10px;
      border-top: 1px dashed var(--border, #D9C8B5);
      flex-wrap: wrap;
    }

    .topic-meta-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stars-row {
      display: flex;
      gap: 2px;
      font-size: 13px;
    }

    .star {
      color: #D8CFC0;
    }

    .star.filled {
      color: #E2A03F;
    }

    .status-tag {
      font-size: 11px;
      font-weight: 600;
      color: var(--ink-muted, #6D665C);
      background: var(--bg-paper, #F8F4EB);
      padding: 1px 7px;
      border-radius: 999px;
      border: 1px solid var(--border, #D9C8B5);
    }

    .status-tag.studied {
      background: var(--olive-tint, #E9ECE1);
      color: #3B4A2B;
      border-color: #C3CAAE;
    }

    .topic-actions {
      display: flex;
      gap: 6px;
    }

    .action-btn {
      text-decoration: none;
      white-space: nowrap;
    }

    .loading-card, .empty-card {
      text-align: center;
      padding: 36px 20px;
      background: var(--bg-card, #FFFDF9);
      border: 1px dashed var(--border, #D9C8B5);
      border-radius: var(--radius-md, 12px);
      color: var(--ink-muted, #6D665C);
      margin-top: 12px;
    }

    .pulse-icon, .empty-icon {
      font-size: 28px;
      display: block;
      margin-bottom: 8px;
    }

    /* RESPONSIVE DESIGN (MOBILE-FIRST) */
    @media (max-width: 767px) {
      .grammar-catalog-page {
        padding: 4px 2px 64px;
      }
      .topic-card {
        padding: 14px 12px;
      }
      .action-btn {
        padding: 5px 9px;
        font-size: 12px;
      }
      .hero-banner {
        padding: 16px;
      }
      .hero-title {
        font-size: 21px;
      }
      .hero-progress-wrap {
        width: 100%;
        min-width: 0;
      }
      .search-box {
        width: 100%;
        min-width: 0;
      }
      .topics-grid {
        grid-template-columns: 1fr;
      }
      .level-heading {
        font-size: 15px;
        white-space: normal;
      }
    }
  `]
})
export class GrammarListComponent {
  grammarService = inject(GrammarService);
  private router = inject(Router);

  selectedLevel = signal<string>('ALL');
  searchQuery = signal<string>('');

  readonly levels = [
    { key: 'ALL', label: 'Tất cả' },
    { key: 'Pre-A1', label: 'Pre-A1 (0-350)' },
    { key: 'A2', label: 'A2 (350-550)' },
    { key: 'B1-B2', label: 'B1-B2 (550-750)' },
    { key: 'B2-C1', label: 'B2-C1 (750-990+)' }
  ];

  private readonly levelMetas: Record<string, { label: string; heading: string }> = {
    'Pre-A1': { label: 'Pre-A1 · 0-350', heading: 'Pre-A1 (0 - 350 TOEIC) · Nền tảng cốt lõi' },
    'A2': { label: 'A2 · 350-550', heading: 'A2 (350 - 550 TOEIC) · Sơ cấp vững vàng' },
    'B1-B2': { label: 'B1-B2 · 550-750', heading: 'B1 - B2 (550 - 750 TOEIC) · Trung cấp bứt phá' },
    'B2-C1': { label: 'B2-C1 · 750-990+', heading: 'B2 - C1 (750 - 990+ TOEIC) · Cao cấp tinh hoa' }
  };

  studiedCount = computed(() => {
    return this.grammarService.topics().filter(t => t.isStudied).length;
  });

  totalStarsClaimed = computed(() => {
    return this.grammarService.topics().reduce((sum, t) => sum + (t.bestStars || 0), 0);
  });

  progressPercent = computed(() => {
    const total = 13;
    return Math.round((this.studiedCount() / total) * 100);
  });

  levelGroups = computed<LevelGroup[]>(() => {
    const topics = this.grammarService.topics();
    const selLevel = this.selectedLevel();
    const query = this.searchQuery().trim().toLowerCase();

    // Lọc theo cấp độ & từ khóa tìm kiếm
    const filtered = topics.filter(t => {
      const matchLevel = selLevel === 'ALL' || t.level === selLevel;
      const matchQuery =
        !query ||
        t.titleEn.toLowerCase().includes(query) ||
        t.titleVi.toLowerCase().includes(query) ||
        t.summary.toLowerCase().includes(query);
      return matchLevel && matchQuery;
    });

    const groups: LevelGroup[] = [];
    const orderedLevels = ['Pre-A1', 'A2', 'B1-B2', 'B2-C1'];

    for (const lvl of orderedLevels) {
      const itemsInLvl = filtered.filter(t => t.level === lvl);
      if (itemsInLvl.length > 0) {
        const meta = this.levelMetas[lvl] || { label: lvl, heading: `Cấp độ ${lvl}` };
        groups.push({
          level: lvl,
          badgeLabel: meta.label,
          heading: meta.heading,
          items: itemsInLvl
        });
      }
    }

    return groups;
  });

  getCountForLevel(key: string): number {
    const list = this.grammarService.topics();
    if (key === 'ALL') return list.length;
    return list.filter(t => t.level === key).length;
  }

  startRandomQuiz(): void {
    const topics = this.grammarService.topics();
    if (!topics.length) return;
    const randomIndex = Math.floor(Math.random() * topics.length);
    const target = topics[randomIndex];
    this.router.navigate(['/grammar', target.code, 'quiz']);
  }
}
