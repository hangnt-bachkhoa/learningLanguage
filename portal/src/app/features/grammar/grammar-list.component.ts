import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GrammarService } from '../../core/services/grammar.service';
import { GrammarTopic } from '../../core/constants/default-grammar-topics.constant';

@Component({
  selector: 'app-grammar-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="grammar-catalog-page">
      <!-- HEADER CHUYÊN ĐỀ -->
      <header class="catalog-header">
        <div class="header-pre-title">
          <span class="sprout-icon">📜</span>
          <span>Sổ tay Ngữ pháp TOEIC</span>
        </div>
        <h1 class="catalog-title">13 Chuyên Đề Trọng Điểm</h1>
        <p class="catalog-subtitle">
          Tổng hợp công thức cốt lõi, bẫy đề thi Part 5 và bài tập thực chiến có giải thích chi tiết.
        </p>

        <!-- BẢNG TỔNG KẾT NHANH -->
        <div class="quick-stats-bar">
          <div class="stat-pill">
            <span class="stat-num">{{ studiedCount() }}/{{ grammarService.topics().length }}</span>
            <span class="stat-label">Chuyên đề đã học</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-pill">
            <span class="stat-num">{{ totalStarsClaimed() }}/39 ⭐</span>
            <span class="stat-label">Tổng sao đạt được</span>
          </div>
        </div>
      </header>

      <!-- BỘ LỌC CẤP ĐỘ TOEIC -->
      <nav class="level-tabs-nav" aria-label="Lọc cấp độ">
        @for (lvl of levels; track lvl.key) {
          <button
            type="button"
            class="level-tab-btn"
            [class.active]="selectedLevel() === lvl.key"
            (click)="selectedLevel.set(lvl.key)">
            <span class="tab-label">{{ lvl.label }}</span>
            <span class="tab-badge">{{ getCountForLevel(lvl.key) }}</span>
          </button>
        }
      </nav>

      <!-- DANH SÁCH CÁC THẺ CHUYÊN ĐỀ NGỮ PHÁP -->
      @if (grammarService.isLoading()) {
        <div class="vintage-loading-card">
          <span class="pulse-icon">⏳</span>
          <p>Đang tải danh sách chuyên đề ngữ pháp...</p>
        </div>
      } @else {
        <div class="topics-grid">
          @for (topic of filteredTopics(); track topic.code) {
            <article class="vintage-topic-card" [class.studied-card]="topic.isStudied">
              <div class="card-top-row">
                <span class="order-pill">#{{ topic.orderIndex < 10 ? '0' + topic.orderIndex : topic.orderIndex }}</span>
                <div class="badge-cluster">
                  <span class="level-pill" [attr.data-level]="topic.level">{{ topic.level }}</span>
                  <span class="toeic-pill">TOEIC {{ topic.toeicTarget }}</span>
                </div>
              </div>

              <div class="card-headings">
                <h2 class="topic-title-en">{{ topic.titleEn }}</h2>
                <h3 class="topic-title-vi">{{ topic.titleVi }}</h3>
              </div>

              <p class="topic-summary">{{ topic.summary }}</p>

              <!-- THANH CHỈ BÁO TIẾN ĐỘ -->
              <div class="card-progress-footer">
                <div class="status-tags">
                  @if (topic.isStudied) {
                    <span class="studied-tag">✓ Đã học</span>
                  } @else {
                    <span class="unstudied-tag">Chưa học</span>
                  }
                  <span class="q-count-tag">{{ topic.questions.length }} câu hỏi</span>
                </div>

                <!-- 3 SAO ĐẠT ĐƯỢC -->
                <div class="stars-row" title="Sao đạt được qua bài kiểm tra">
                  <span class="star" [class.filled]="(topic.bestStars || 0) >= 1">★</span>
                  <span class="star" [class.filled]="(topic.bestStars || 0) >= 2">★</span>
                  <span class="star" [class.filled]="(topic.bestStars || 0) >= 3">★</span>
                </div>
              </div>

              <!-- HÀNH ĐỘNG -->
              <div class="card-action-row">
                <a [routerLink]="['/grammar', topic.code]" class="btn btn-outline btn-study">
                  Lý thuyết ›
                </a>
                <a [routerLink]="['/grammar', topic.code, 'quiz']" class="btn btn-primary btn-quiz">
                  Làm Quiz ✍️
                </a>
              </div>
            </article>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .grammar-catalog-page {
      max-width: 960px;
      margin: 0 auto;
      padding: 12px 16px 48px;
    }

    /* HEADER */
    .catalog-header {
      text-align: center;
      margin-bottom: 24px;
      padding: 24px 20px 20px;
      background: #FAF6EF;
      border: 1.5px solid #DDD3C3;
      border-radius: 18px;
      box-shadow: 0 4px 16px rgba(38, 56, 71, 0.03);
    }

    .header-pre-title {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 700;
      color: #78815D;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 6px;
    }

    .catalog-title {
      font-family: var(--font-serif);
      font-size: 30px;
      font-weight: 800;
      color: var(--navy);
      margin: 0 0 8px;
      letter-spacing: -0.5px;
    }

    .catalog-subtitle {
      font-size: 14.5px;
      color: var(--ink-muted);
      margin: 0 0 16px;
      max-width: 620px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.5;
    }

    .quick-stats-bar {
      display: inline-flex;
      align-items: center;
      gap: 16px;
      background: #F2EADB;
      border: 1px solid #D9C8B5;
      padding: 6px 18px;
      border-radius: 999px;
    }

    .stat-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
    }

    .stat-num {
      font-weight: 800;
      color: var(--navy);
      font-family: var(--font-serif);
      font-size: 15px;
    }

    .stat-label {
      color: var(--ink-muted);
      font-size: 12px;
    }

    .stat-divider {
      width: 1px;
      height: 16px;
      background: #D9C8B5;
    }

    /* BỘ LỌC CẤP ĐỘ */
    .level-tabs-nav {
      display: flex;
      gap: 8px;
      margin-bottom: 22px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }

    .level-tabs-nav::-webkit-scrollbar {
      display: none;
    }

    .level-tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #FAF6EF;
      border: 1.5px solid #DDD3C3;
      border-radius: 999px;
      font-family: var(--font-sans);
      font-size: 13.5px;
      font-weight: 700;
      color: var(--navy);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .level-tab-btn:hover {
      border-color: #78815D;
      background: #F4EFE6;
    }

    .level-tab-btn.active {
      background: #78815D;
      border-color: #78815D;
      color: #FFF;
    }

    .tab-badge {
      font-size: 11px;
      padding: 1px 6px;
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.08);
    }

    .level-tab-btn.active .tab-badge {
      background: rgba(255, 255, 255, 0.25);
      color: #FFF;
    }

    /* LƯỚI THẺ CHUYÊN ĐỀ */
    .topics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 18px;
    }

    .vintage-topic-card {
      background: #FAF6EF;
      border: 1.5px solid #DDD3C3;
      border-radius: 16px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 3px 10px rgba(38, 56, 71, 0.03);
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }

    .vintage-topic-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(38, 56, 71, 0.06);
      border-color: #C8BAA6;
    }

    .vintage-topic-card.studied-card {
      border-left: 4px solid #78815D;
    }

    .card-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .order-pill {
      font-family: monospace;
      font-weight: 800;
      font-size: 13px;
      color: #8C5E58;
      background: #F2E4DF;
      padding: 2px 8px;
      border-radius: 6px;
    }

    .badge-cluster {
      display: flex;
      gap: 5px;
    }

    .level-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;
      background: #EAE2D2;
      color: var(--navy);
    }

    .level-pill[data-level="Pre-A1"] { background: #E8EFE8; color: #3E633E; }
    .level-pill[data-level="A2"] { background: #E4EFF3; color: #2B576C; }
    .level-pill[data-level="B1-B2"] { background: #F6EDE2; color: #8C571D; }
    .level-pill[data-level="B2-C1"] { background: #F5E6E6; color: #8A373E; }

    .toeic-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 999px;
      background: #F0EAE1;
      color: var(--ink-muted);
      border: 1px solid #E2D7C7;
    }

    .card-headings {
      margin-bottom: 8px;
    }

    .topic-title-en {
      font-family: var(--font-serif);
      font-size: 17.5px;
      font-weight: 800;
      color: var(--navy);
      margin: 0 0 2px;
      line-height: 1.3;
    }

    .topic-title-vi {
      font-size: 13.5px;
      font-weight: 600;
      color: #78815D;
      margin: 0;
      line-height: 1.3;
    }

    .topic-summary {
      font-size: 13px;
      color: var(--ink-muted);
      line-height: 1.45;
      margin: 0 0 14px;
      flex: 1;
    }

    .card-progress-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px dashed #E2D7C7;
      margin-bottom: 12px;
    }

    .status-tags {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .studied-tag {
      font-size: 11px;
      font-weight: 700;
      color: #385E38;
      background: #E4EFE4;
      padding: 1px 7px;
      border-radius: 999px;
    }

    .unstudied-tag {
      font-size: 11px;
      color: var(--ink-muted);
      background: #F0ECE4;
      padding: 1px 7px;
      border-radius: 999px;
    }

    .q-count-tag {
      font-size: 11px;
      color: var(--ink-muted);
    }

    .stars-row {
      display: flex;
      gap: 2px;
    }

    .star {
      font-size: 15px;
      color: #DDD3C3;
      transition: color 0.2s;
    }

    .star.filled {
      color: #E2A03F;
    }

    .card-action-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .btn-study, .btn-quiz {
      padding: 9px 8px;
      font-size: 13px;
      font-weight: 700;
      text-align: center;
      border-radius: 10px;
      text-decoration: none;
    }

    .vintage-loading-card {
      text-align: center;
      padding: 40px;
      background: #FAF6EF;
      border: 1.5px dashed #DDD3C3;
      border-radius: 16px;
      color: var(--ink-muted);
    }

    .pulse-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 10px;
    }

    @media (max-width: 600px) {
      .grammar-catalog-page {
        padding: 8px 10px 36px;
      }
      .catalog-title {
        font-size: 24px;
      }
      .topics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class GrammarListComponent {
  grammarService = inject(GrammarService);

  selectedLevel = signal<string>('all');

  levels = [
    { key: 'all', label: 'Tất cả' },
    { key: 'Pre-A1', label: 'Pre-A1 (0-350)' },
    { key: 'A2', label: 'A2 (350-550)' },
    { key: 'B1-B2', label: 'B1-B2 (550-750)' },
    { key: 'B2-C1', label: 'B2-C1 (750-990+)' }
  ];

  filteredTopics = computed(() => {
    const list = this.grammarService.topics();
    const lvl = this.selectedLevel();
    if (lvl === 'all') return list;
    return list.filter(t => t.level === lvl);
  });

  studiedCount = computed(() => {
    return this.grammarService.topics().filter(t => t.isStudied).length;
  });

  totalStarsClaimed = computed(() => {
    return this.grammarService.topics().reduce((sum, t) => sum + (t.bestStars || 0), 0);
  });

  getCountForLevel(key: string): number {
    const list = this.grammarService.topics();
    if (key === 'all') return list.length;
    return list.filter(t => t.level === key).length;
  }
}
