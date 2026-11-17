import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../core/services/game-state.service';
import { GrammarService } from '../../core/services/grammar.service';
import { DailyQuestService } from '../../core/services/daily-quest.service';
import { DEFAULT_VOCABULARIES } from '../../core/constants/default-vocabularies.constant';
import { CROP_CATALOG } from '../../core/constants/crop-catalog.constant';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  imports: [CommonModule, PixelIconComponent],
  template: `
    <div class="progress-dashboard-container">
      <!-- 2-COLUMN VINTAGE ANALYTICS GRID -->
      <div class="analytics-grid">

        <!-- ======================================================== -->
        <!-- CARD 1: MEMORY FUNNEL CARD (PHỄU GHI NHỚ TỪ VỰNG)       -->
        <!-- ======================================================== -->
        <div class="vintage-card analytics-card funnel-card">
          <div class="card-title-bar">
            <span class="card-icon"><app-pixel-icon name="icon_memory_brain" [size]="20"></app-pixel-icon></span>
            <div class="card-title-text">
              <h3 class="card-title">Phễu Ghi Nhớ Từ Vựng</h3>
              <p class="card-sub">Chu kỳ củng cố trí nhớ dài hạn Ebbinghaus</p>
            </div>
          </div>

          <!-- Horizontal Stacked Progress Bar -->
          <div class="stacked-bar-container">
            <div class="stacked-bar-rail" title="Phân bổ từ vựng theo trạng thái nhớ">
              <div
                class="bar-slice slice-unlearned"
                [style.width.%]="funnelStats().unlearnedPercent"
                title="Chưa học: {{ funnelStats().unlearned }} từ"></div>
              <div
                class="bar-slice slice-in-review"
                [style.width.%]="funnelStats().inReviewPercent"
                title="Đang ôn tập: {{ funnelStats().inReview }} từ"></div>
              <div
                class="bar-slice slice-due"
                [style.width.%]="funnelStats().duePercent"
                title="Đến hạn hôm nay: {{ funnelStats().dueToday }} từ"></div>
              <div
                class="bar-slice slice-mastered"
                [style.width.%]="funnelStats().masteredPercent"
                title="Đã thuộc lòng: {{ funnelStats().mastered }} từ"></div>
            </div>
          </div>

          <!-- 4 Metric Cards -->
          <div class="funnel-metrics-grid">
            <div class="metric-card metric-unlearned">
              <span class="metric-value">{{ funnelStats().unlearned }}</span>
              <span class="metric-label">⚪ Chưa học</span>
            </div>
            <div class="metric-card metric-review">
              <span class="metric-value">{{ funnelStats().inReview }}</span>
              <span class="metric-label">🟡 Đang ôn (0-3)</span>
            </div>
            <div class="metric-card metric-due">
              <span class="metric-value">{{ funnelStats().dueToday }}</span>
              <span class="metric-label">🔴 Đến hạn hôm nay</span>
            </div>
            <div class="metric-card metric-mastered">
              <span class="metric-value">{{ funnelStats().mastered }}</span>
              <span class="metric-label">🟢 Thuộc lòng (D14)</span>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- CARD 2: CURRICULUM MASTERY CARD (TIẾN ĐỘ HỌC THUẬT)      -->
        <!-- ======================================================== -->
        <div class="vintage-card analytics-card curriculum-card">
          <div class="card-title-bar">
            <span class="card-icon"><img src="assets/icons/icon_vocabulary.svg" width="20" height="20" class="pixel-art" /></span>
            <div class="card-title-text">
              <h3 class="card-title">Tiến Độ Học Thuật</h3>
              <p class="card-sub">52 Chủ đề TOEIC & 13 Chuyên đề Ngữ pháp</p>
            </div>
          </div>

          <!-- Nhóm 1: Từ vựng TOEIC -->
          <div class="mastery-item">
            <div class="mastery-header">
              <span class="mastery-name" style="display:inline-flex; align-items:center; gap:6px;">
                <img src="assets/icons/icon_vocabulary.svg" width="16" height="16" class="pixel-art" />
                <span>Từ vựng TOEIC (450–900)</span>
              </span>
              <span class="mastery-stat">{{ academicStats().unlockedTopics }}/52 chủ đề</span>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-fill vocab-fill" [style.width.%]="academicStats().topicPercent"></div>
            </div>
            <div class="stars-subline">
              <span style="display:inline-flex; align-items:center; gap:4px;">
                <app-pixel-icon name="icon_star" [size]="14"></app-pixel-icon>
                <span>Điểm sao tích lũy:</span>
              </span>
              <strong class="star-count">{{ academicStats().vocabStars }}/156 ★</strong>
            </div>
          </div>

          <!-- Nhóm 2: Ngữ pháp cốt lõi -->
          <div class="mastery-item">
            <div class="mastery-header">
              <span class="mastery-name" style="display:inline-flex; align-items:center; gap:6px;">
                <img src="assets/icons/icon_grammar.svg" width="16" height="16" class="pixel-art" />
                <span>Ngữ pháp trọng điểm</span>
              </span>
              <span class="mastery-stat">{{ academicStats().studiedGrammar }}/13 chuyên đề</span>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-fill grammar-fill" [style.width.%]="academicStats().grammarPercent"></div>
            </div>
            <div class="stars-subline">
              <span style="display:inline-flex; align-items:center; gap:4px;">
                <app-pixel-icon name="icon_star" [size]="14"></app-pixel-icon>
                <span>Điểm sao ngữ pháp:</span>
              </span>
              <strong class="star-count">{{ academicStats().grammarStars }}/39 ★</strong>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- CARD 3: STUDY STREAK & DAILY TASKS (CHUỖI HỌC & NHIỆM VỤ)-->
        <!-- ======================================================== -->
        <div class="vintage-card analytics-card tasks-card">
          <div class="card-title-bar">
            <span class="card-icon"><app-pixel-icon name="icon_flame" [size]="20"></app-pixel-icon></span>
            <div class="card-title-text">
              <h3 class="card-title">Chuỗi Học & Nhiệm Vụ Hôm Nay</h3>
              <p class="card-sub">Giữ vững thói quen mỗi ngày để nhận quà</p>
            </div>
          </div>

          <!-- Streak Badge -->
          <div class="streak-banner">
            <span class="flame-emoji"><app-pixel-icon name="icon_flame" [size]="22"></app-pixel-icon></span>
            <div>
              <div class="streak-title">Chuỗi học tập: <strong>{{ dailyQuest.currentStreak() }} ngày liên tiếp</strong></div>
              <div class="streak-hint">Làm mới sau: {{ dailyQuest.countdownToMidnight() }} · Mở rương 3/3 khi hoàn thành đủ!</div>
            </div>
          </div>

          <!-- 3 Nhiệm vụ hôm nay -->
          <div class="daily-tasks-list">
            @for (task of dailyQuest.quests(); track task.id) {
              <div class="task-row" [class.task-done]="task.status === 'COMPLETED_UNCLAIMED' || task.status === 'CLAIMED'">
                <span class="task-checkbox">{{ task.status === 'CLAIMED' ? '✓' : (task.status === 'COMPLETED_UNCLAIMED' ? '★' : '○') }}</span>
                <span class="task-name">{{ task.titleVi }}</span>
                <span class="task-progress">{{ task.currentCount }}/{{ task.targetCount }}</span>
              </div>
            }
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- CARD 4: FARM & COLLECTION (NÔNG TRẠI & BỘ SƯU TẬP)       -->
        <!-- ======================================================== -->
        <div class="vintage-card analytics-card farm-card">
          <div class="card-title-bar">
            <span class="card-icon"><app-pixel-icon name="icon_wheat_sheaf" [size]="20"></app-pixel-icon></span>
            <div class="card-title-text">
              <h3 class="card-title">Thống Kê Nông Trại</h3>
              <p class="card-sub">Cấp bậc, Giống cây & Nông sản thu hoạch</p>
            </div>
          </div>

          <!-- Cấp độ & Thanh XP -->
          <div class="level-box">
            <div class="level-text-row">
              <span class="level-badge">Cấp {{ state.level() }}</span>
              <span class="xp-count">{{ state.currentXp() }} / {{ state.xpRequired() }} XP</span>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-fill xp-fill" [style.width.%]="levelPercent()"></div>
            </div>
          </div>

          <!-- Giống cây mở khóa -->
          <div class="unlocked-seeds-row">
            <span style="display:inline-flex; align-items:center; gap:4px;">
              <app-pixel-icon name="icon_leaf_badge" [size]="14"></app-pixel-icon>
              <span>Giống hạt giống đã mở:</span>
            </span>
            <strong>{{ state.getUnlockedSeedIds().length }} / 18 giống cây</strong>
          </div>

          <!-- Nông sản theo 4 Hạng -->
          <div class="harvest-tiers-grid">
            <div class="tier-pill tier-1">
              <span class="tier-label">Hạng I - Mầm non</span>
              <span class="tier-qty">{{ harvestStats().tier1 }} trái</span>
            </div>
            <div class="tier-pill tier-2">
              <span class="tier-label">Hạng II - Hoa trái</span>
              <span class="tier-qty">{{ harvestStats().tier2 }} quả</span>
            </div>
            <div class="tier-pill tier-3">
              <span class="tier-label">Hạng III - Làm vườn</span>
              <span class="tier-qty">{{ harvestStats().tier3 }} quả</span>
            </div>
            <div class="tier-pill tier-4">
              <span class="tier-label">Hạng IV - Thượng hạng</span>
              <span class="tier-qty">{{ harvestStats().tier4 }} quả</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .progress-dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* 2-COLUMN VINTAGE ANALYTICS GRID */
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .analytics-card {
      padding: 18px 20px;
      border-radius: 16px;
      background: #FFFDF9;
      border: 1.5px solid var(--border, #D9C8B5);
      box-shadow: 0 4px 12px rgba(38, 56, 71, 0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-title-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }
    .card-icon {
      font-size: 24px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }
    .card-title-text {
      flex: 1;
    }
    .card-title {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 16.5px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin: 0 0 2px;
    }
    .card-sub {
      font-size: 11.5px;
      color: var(--ink-muted, #5A6D7C);
      margin: 0;
    }

    /* CARD 1: MEMORY FUNNEL */
    .stacked-bar-container {
      margin-bottom: 14px;
    }
    .stacked-bar-rail {
      width: 100%;
      height: 14px;
      border-radius: 999px;
      background: #EDE6D8;
      overflow: hidden;
      display: flex;
      border: 1px solid #D9C8B5;
    }
    .bar-slice {
      height: 100%;
      transition: width 0.35s ease;
    }
    .slice-unlearned {
      background: #CBB9A3;
    }
    .slice-in-review {
      background: #E8A838;
    }
    .slice-due {
      background: var(--rose, #A65E65);
    }
    .slice-mastered {
      background: var(--olive, #78815D);
    }

    .funnel-metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .metric-card {
      padding: 10px 12px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .metric-unlearned {
      background: #F4EFE6;
      border: 1px solid #E2D7C5;
    }
    .metric-review {
      background: #FFF8E8;
      border: 1px solid #F3DBA5;
    }
    .metric-due {
      background: #FBEFEF;
      border: 1px solid #EAC8C8;
    }
    .metric-mastered {
      background: #F2F5EB;
      border: 1px solid #D1DEC2;
    }
    .metric-value {
      font-family: var(--font-serif, Georgia, serif);
      font-size: 18px;
      font-weight: 700;
      color: var(--navy, #263847);
    }
    .metric-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--ink-muted, #5A6D7C);
    }

    /* CARD 2: CURRICULUM MASTERY */
    .mastery-item {
      margin-bottom: 12px;
    }
    .mastery-item:last-child {
      margin-bottom: 0;
    }
    .mastery-header {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--navy, #263847);
      margin-bottom: 5px;
    }
    .progress-bar-wrap {
      width: 100%;
      height: 8px;
      background: #EDE6D8;
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 4px;
      border: 0.5px solid #D9C8B5;
    }
    .progress-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.35s ease;
    }
    .vocab-fill {
      background: linear-gradient(90deg, #A65E65, #CF8088);
    }
    .grammar-fill {
      background: linear-gradient(90deg, #78815D, #9FB380);
    }
    .xp-fill {
      background: linear-gradient(90deg, #D4A31C, #F4CC59);
    }
    .stars-subline {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--ink-muted, #5A6D7C);
    }
    .star-count {
      color: #9E6B08;
      font-weight: 700;
    }

    /* CARD 3: STREAK & DAILY TASKS */
    .streak-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #FFF6EC;
      border: 1px solid #F5D3AC;
      border-radius: 12px;
      padding: 10px 12px;
      margin-bottom: 12px;
    }
    .flame-emoji {
      font-size: 24px;
    }
    .streak-title {
      font-size: 12.5px;
      color: var(--navy, #263847);
    }
    .streak-title strong {
      color: #C05810;
    }
    .streak-hint {
      font-size: 10.5px;
      color: var(--ink-muted, #5A6D7C);
    }

    .daily-tasks-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .task-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      background: #FAF6EF;
      border: 1px solid #E8DEC8;
      border-radius: 8px;
      font-size: 12px;
    }
    .task-row.task-done {
      background: #F3F7EC;
      border-color: #D3E0C4;
    }
    .task-checkbox {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      font-weight: 800;
      font-size: 11px;
      color: var(--olive, #78815D);
    }
    .task-row.task-done .task-checkbox {
      background: var(--olive, #78815D);
      color: #FFF;
    }
    .task-name {
      flex: 1;
      font-weight: 600;
      color: var(--navy, #263847);
    }
    .task-progress {
      font-weight: 700;
      color: var(--ink-muted, #5A6D7C);
      font-family: monospace;
    }

    /* CARD 4: FARM & COLLECTION */
    .level-box {
      margin-bottom: 12px;
    }
    .level-text-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12.5px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .level-badge {
      background: #263847;
      color: #FFFDF9;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 11.5px;
    }
    .xp-count {
      color: #8C6A1E;
      font-family: monospace;
    }

    .unlocked-seeds-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: var(--navy, #263847);
      background: #FAF6EF;
      padding: 8px 10px;
      border-radius: 8px;
      margin-bottom: 10px;
      border: 1px solid #E8DEC8;
    }

    .harvest-tiers-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
    }
    .tier-pill {
      padding: 6px 8px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 10.5px;
    }
    .tier-1 {
      background: #F3EBD9;
      border: 1px solid #DECBB1;
      color: #6E4921;
    }
    .tier-2 {
      background: #FCE8CA;
      border: 1px solid #ECCFA4;
      color: #8C5311;
    }
    .tier-3 {
      background: #E8F0DC;
      border: 1px solid #CBDAB6;
      color: #4C652D;
    }
    .tier-4 {
      background: #F4E4E6;
      border: 1px solid #E1BFC3;
      color: #79373D;
    }
    .tier-label {
      font-weight: 600;
    }
    .tier-qty {
      font-weight: 800;
      font-size: 12px;
    }

    @media (max-width: 640px) {
      .analytics-grid {
        grid-template-columns: 1fr;
      }
      .funnel-metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class ProgressDashboardComponent {
  state = inject(GameStateService);
  grammar = inject(GrammarService);
  dailyQuest = inject(DailyQuestService);
  assets = FARM_ASSETS;

  // 1. Phễu ghi nhớ từ vựng
  funnelStats = computed(() => {
    // Total vocabulary across 52 topics
    const totalVocab = Object.values(DEFAULT_VOCABULARIES).reduce((sum, list) => sum + list.length, 0);
    const learnedCount = this.state.totalLearnedCount();
    const unlearned = Math.max(0, totalVocab - learnedCount);
    const inReview = this.state.inReviewCount();
    const dueToday = this.state.dueTodayCount();
    const mastered = this.state.masteredCount();

    const denom = Math.max(1, totalVocab);
    return {
      totalVocab,
      unlearned,
      inReview,
      dueToday,
      mastered,
      unlearnedPercent: Math.round((unlearned / denom) * 100),
      inReviewPercent: Math.round((inReview / denom) * 100),
      duePercent: Math.round((dueToday / denom) * 100),
      masteredPercent: Math.round((mastered / denom) * 100)
    };
  });

  // 2. Tiến độ học thuật (52 Từ vựng & 13 Ngữ pháp)
  academicStats = computed(() => {
    const lessons = this.state.lessons();
    const unlockedTopics = lessons.filter(l => l.isUnlocked).length;
    const vocabStars = lessons.reduce((sum, l) => sum + (l.bestStarsClaimed || 0), 0);
    const topicPercent = Math.min(100, Math.round((unlockedTopics / 52) * 100));

    const gTopics = this.grammar.topics();
    const studiedGrammar = gTopics.filter(t => t.isStudied).length;
    const grammarStars = gTopics.reduce((sum, t) => sum + (t.bestStars || 0), 0);
    const grammarPercent = Math.min(100, Math.round((studiedGrammar / 13) * 100));

    return {
      unlockedTopics,
      vocabStars,
      topicPercent,
      studiedGrammar,
      grammarStars,
      grammarPercent
    };
  });

  // 3. Level %
  levelPercent = computed(() => {
    const req = this.state.xpRequired();
    if (req <= 0) return 0;
    return Math.min(100, Math.round((this.state.currentXp() / req) * 100));
  });

  // 4. Nông sản thu hoạch theo 4 Hạng
  harvestStats = computed(() => {
    const harvested = this.state.inventory().harvested;
    const tier1Crops = ['carrot', 'cucumber', 'radish', 'potato', 'corn'];
    const tier2Crops = ['tomato', 'strawberry', 'orange', 'pumpkin', 'wheat'];
    const tier3Crops = ['lemon', 'blueberry', 'peach', 'banana', 'watermelon'];
    const tier4Crops = ['grapes', 'apple', 'cherry'];

    const sumTier = (crops: string[]) => crops.reduce((acc, c) => acc + (harvested[c] || 0), 0);

    return {
      tier1: sumTier(tier1Crops),
      tier2: sumTier(tier2Crops),
      tier3: sumTier(tier3Crops),
      tier4: sumTier(tier4Crops)
    };
  });
}
