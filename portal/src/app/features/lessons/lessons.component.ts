import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameStateService } from '../../core/services/game-state.service';
import { LessonDto } from '../../core/services/farm-api.service';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="lessons-screen">
      <!-- Header điều hướng -->
      <div class="lessons-header">
        <a routerLink="/" class="back-link">
          <span class="chevron">‹</span>
          <span class="nav-title">Trang chủ</span>
        </a>

        <div class="header-center">
          <h1 class="page-title">Thư viện bài học</h1>
          <p class="page-subtitle">50+ Chủ đề từ vựng TOEIC thông dụng · Tích lũy nông sản để mở khóa</p>
        </div>

        <div class="header-stats">
          <span class="stat-badge">
            <span class="badge-icon">📖</span>
            <span>{{ unlockedCount() }}/{{ allLessons().length }} Đã mở</span>
          </span>
        </div>
      </div>

      <!-- Thanh lọc & tìm kiếm -->
      <div class="filter-bar">
        <div class="level-pills">
          @for (tab of levelTabs; track tab.key) {
            <button
              class="pill-btn"
              [class.active]="selectedTab() === tab.key"
              (click)="selectedTab.set(tab.key)">
              {{ tab.label }}
            </button>
          }
        </div>

        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Tìm kiếm chủ đề (Office, HR, Finance...)"
            class="search-input"
          />
          @if (searchQuery) {
            <button class="clear-btn" (click)="searchQuery = ''">×</button>
          }
        </div>
      </div>

      <!-- Danh sách bài học dạng Grid Thẻ Vintage -->
      <div class="lessons-grid">
        @for (lesson of filteredLessons(); track lesson.id) {
          <div
            class="vintage-card lesson-card"
            [class.locked-card]="!lesson.isUnlocked"
            [class.unlocked-card]="lesson.isUnlocked">
            
            <!-- Hàng đầu thẻ: Số thứ tự + Badge Level -->
            <div class="card-top-row">
              <span class="order-number">#{{ formatOrder(lesson.orderIndex) }}</span>
              <span class="level-tag" [ngClass]="getLevelClass(lesson.levelTag)">
                {{ lesson.levelTag }}
              </span>
            </div>

            <!-- Tiêu đề chủ đề -->
            <div class="topic-title-box">
              <h3 class="topic-title">{{ lesson.title }}</h3>
            </div>

            <!-- Thông tin điều kiện mở khóa / Trạng thái -->
            <div class="unlock-info-row">
              @if (lesson.isUnlocked) {
                <div class="status-badge status-unlocked">
                  <span class="check-icon">✓</span>
                  <span>Đã mở khóa</span>
                </div>
                @if ((lesson.bestStarsClaimed || 0) > 0) {
                  <div class="stars-badge" title="Kỷ lục kiểm tra: {{ lesson.bestStarsClaimed }} Sao">
                    @for (s of [1, 2, 3]; track s) {
                      <span class="star-icon" [class.earned]="s <= (lesson.bestStarsClaimed || 0)">★</span>
                    }
                  </div>
                }
              } @else {
                <div class="status-badge status-locked">
                  <span class="lock-icon">🔒</span>
                  <span>Cần {{ lesson.requiredCropQty }}x {{ lesson.requiredCropName || 'Nông sản' }}</span>
                </div>
              }
            </div>

            <!-- Nút hành động: Học từ vựng & Kiểm tra -->
            <div class="card-footer-action">
              @if (lesson.isUnlocked) {
                <div class="dual-actions-row">
                  <button class="btn btn-learn" (click)="goToLesson(lesson)" title="Lật thẻ học từ vựng">
                    <span>📖 Học từ</span>
                  </button>
                  <button class="btn btn-quiz" (click)="goToQuiz(lesson)" title="Làm bài kiểm tra nhận thưởng">
                    <span>✍️ Kiểm tra</span>
                  </button>
                </div>
              } @else {
                @let cropKey = lesson.requiredCropId === 1 ? 'carrot' : lesson.requiredCropId === 2 ? 'corn' : 'tomato';
                @let currentHarvested = state.inventory().harvested[cropKey] || 0;
                @let canUnlock = currentHarvested >= (lesson.requiredCropQty || 2);

                @if (canUnlock) {
                  <button class="btn btn-unlock-now" (click)="state.unlockLessonWithCrops(lesson.id)">
                    <span>🔓 Mở khóa ngay (-{{ lesson.requiredCropQty }} {{ lesson.requiredCropName || 'Nông sản' }})</span>
                  </button>
                } @else {
                  <div class="crop-hint">
                    <span>Thu hoạch {{ lesson.requiredCropName || 'Nông sản' }} để mở (Có: {{ currentHarvested }}/{{ lesson.requiredCropQty }})</span>
                  </div>
                }
              }
            </div>
          </div>
        } @empty {
          <div class="empty-state">
            <span class="empty-icon">🍃</span>
            <p>Không tìm thấy chủ đề phù hợp với "{{ searchQuery }}".</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .lessons-screen {
      max-width: 900px;
      margin: 0 auto;
      padding-bottom: 40px;
    }

    .lessons-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-top: 4px;
    }

    .back-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--navy);
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
    }

    .chevron {
      font-size: 22px;
      line-height: 1;
    }

    .header-center {
      text-align: center;
    }

    .page-title {
      font-family: var(--font-serif);
      font-size: 26px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.1;
      margin: 0;
    }

    .page-subtitle {
      font-size: 13px;
      color: var(--ink-muted);
      margin: 4px 0 0;
    }

    .header-stats {
      display: flex;
      align-items: center;
    }

    .stat-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #EAE2D2;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 5px 12px;
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
    }

    /* Thanh lọc & tìm kiếm */
    .filter-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .level-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .pill-btn {
      background: #EAE2D2;
      border: 1px solid var(--border);
      color: var(--navy);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .pill-btn.active {
      background: var(--navy);
      color: #F8F4EB;
      border-color: var(--navy);
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #FDFBF7;
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      padding: 6px 14px;
      min-width: 260px;
    }

    .search-input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 13px;
      color: var(--ink);
      width: 100%;
    }

    .clear-btn {
      background: none;
      border: none;
      color: var(--ink-muted);
      cursor: pointer;
      font-size: 16px;
      padding: 0 4px;
    }

    /* Grid các bài học */
    .lessons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 16px;
    }

    .lesson-card {
      padding: 16px;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 160px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .lesson-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(44, 53, 64, 0.08);
    }

    .locked-card {
      opacity: 0.82;
      background: #EFE9DC;
      border-color: #D6CCB8;
    }

    .card-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .order-number {
      font-family: var(--font-serif);
      font-size: 14px;
      font-weight: 700;
      color: var(--ink-muted);
    }

    .level-tag {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .tag-starter {
      background: #DCE5D1;
      color: #4A5D3E;
    }

    .tag-inter {
      background: #F3E4D4;
      color: #8C5528;
    }

    .tag-master {
      background: #D9E4EC;
      color: #24415C;
    }

    .topic-title-box {
      margin-bottom: 12px;
    }

    .topic-title {
      font-family: var(--font-serif);
      font-size: 17px;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.25;
      margin: 0;
    }

    .unlock-info-row {
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stars-badge {
      display: inline-flex;
      gap: 2px;
      font-size: 13px;
    }

    .star-icon {
      color: #DDD3C3;
      transition: color 0.2s;
    }

    .star-icon.earned {
      color: #F5A623;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      padding: 2px 6px;
    }

    .status-unlocked {
      color: #3F6236;
      background: rgba(110, 148, 98, 0.15);
    }

    .status-locked {
      color: #7A5726;
      background: rgba(200, 150, 70, 0.15);
    }

    .card-footer-action {
      margin-top: auto;
    }

    .dual-actions-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .btn-learn {
      width: 100%;
      background: var(--rose);
      color: #FFF;
      border: none;
      padding: 9px 8px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-learn:hover {
      background: #8F4C53;
    }

    .btn-quiz {
      width: 100%;
      background: var(--navy);
      color: #F8F4EB;
      border: none;
      padding: 9px 8px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-quiz:hover {
      background: #1B2936;
    }

    .btn-unlock-now {
      width: 100%;
      background: #557A46;
      color: #FFFDF8;
      border: 1px solid #3F5E32;
      padding: 9px 8px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 12.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(85, 122, 70, 0.25);
      transition: background 0.15s, transform 0.1s;
    }

    .btn-unlock-now:hover {
      background: #466738;
      transform: translateY(-1px);
    }

    .crop-hint {
      font-size: 11.5px;
      color: var(--ink-muted);
      text-align: center;
      font-style: italic;
      padding: 4px 0;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: var(--ink-muted);
    }

    .empty-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 8px;
    }

    /* ================= RESPONSIVE MOBILE (< 600px) ================= */
    @media (max-width: 600px) {
      .lessons-screen {
        padding-bottom: 24px;
      }
      .lessons-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      .header-stats {
        align-self: flex-start;
      }
      .page-title {
        font-size: 20px;
      }
      .filter-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
        margin-bottom: 16px;
      }
      .search-box {
        min-width: 100%;
        width: 100%;
      }
      .level-pills {
        overflow-x: auto;
        padding-bottom: 4px;
        flex-wrap: nowrap;
      }
      .pill-btn {
        flex-shrink: 0;
        padding: 5px 12px;
        font-size: 12px;
      }
      .lessons-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .lesson-card {
        padding: 14px;
      }
    }
  `]
})
export class LessonsComponent {
  state = inject(GameStateService);
  router = inject(Router);

  searchQuery = '';
  selectedTab = signal<string>('all');

  levelTabs = [
    { key: 'all', label: 'Tất cả' },
    { key: 'TOEIC 450', label: 'TOEIC 450' },
    { key: 'TOEIC 650', label: 'TOEIC 650' },
    { key: 'TOEIC 800', label: 'TOEIC 800' }
  ];

  allLessons = computed(() => {
    const list = this.state.lessons();
    if (list && list.length > 0) {
      return list;
    }
    // Fallback data nếu offline
    return [
      { id: 1, title: 'Fruits & Vegetables', languageCode: 'en', levelTag: 'Pre-A1', orderIndex: 1, isUnlocked: true, requiredCropId: null, requiredCropQty: 0, requiredCropName: null },
      { id: 4, title: 'Văn phòng (Office)', languageCode: 'en', levelTag: 'TOEIC 450', orderIndex: 3, isUnlocked: true, requiredCropId: null, requiredCropQty: 0, requiredCropName: null },
      { id: 5, title: 'Nhân sự (Human Resources)', languageCode: 'en', levelTag: 'TOEIC 450', orderIndex: 4, isUnlocked: true, requiredCropId: null, requiredCropQty: 0, requiredCropName: null },
      { id: 6, title: 'Kinh doanh (Business)', languageCode: 'en', levelTag: 'TOEIC 450', orderIndex: 5, isUnlocked: true, requiredCropId: null, requiredCropQty: 0, requiredCropName: null },
      { id: 7, title: 'Tài chính (Finance)', languageCode: 'en', levelTag: 'TOEIC 450', orderIndex: 6, isUnlocked: true, requiredCropId: null, requiredCropQty: 0, requiredCropName: null },
      { id: 8, title: 'Marketing & Quảng cáo', languageCode: 'en', levelTag: 'TOEIC 450', orderIndex: 7, isUnlocked: false, requiredCropId: 1, requiredCropQty: 2, requiredCropName: 'Cà rốt' }
    ] as LessonDto[];
  });

  unlockedCount = computed(() => {
    return this.allLessons().filter(l => l.isUnlocked).length;
  });

  filteredLessons = computed(() => {
    const tab = this.selectedTab();
    const query = this.searchQuery.toLowerCase().trim();

    return this.allLessons().filter(l => {
      const matchTab = tab === 'all' || l.levelTag === tab;
      const matchQuery = !query || l.title.toLowerCase().includes(query) || l.levelTag.toLowerCase().includes(query);
      return matchTab && matchQuery;
    });
  });

  formatOrder(idx: number): string {
    return idx < 10 ? `0${idx}` : `${idx}`;
  }

  getLevelClass(level: string): string {
    if (level.includes('450') || level.includes('Pre-A1')) return 'tag-starter';
    if (level.includes('650')) return 'tag-inter';
    return 'tag-master';
  }

  goToLesson(lesson: LessonDto) {
    this.state.loadVocabulariesForLesson(lesson.id);
    this.router.navigate(['/vocab'], { queryParams: { lessonId: lesson.id } });
  }

  goToQuiz(lesson: LessonDto) {
    this.router.navigate(['/quiz'], { queryParams: { lessonId: lesson.id } });
  }
}
