import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DailyQuestService } from '../../core/services/daily-quest.service';
import { DailyQuestItem } from '../../core/models/game.models';

@Component({
  selector: 'app-daily-quests-widget',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="vintage-card quests-card">
      <!-- Card Header -->
      <div class="quests-header">
        <div class="header-left">
          <span class="header-title">Nhiệm vụ hôm nay</span>
          <span class="streak-pill" title="Chuỗi ngày học liên tục">
            <span class="fire-icon">🔥</span>
            <span>Streak {{ questService.currentStreak() }} ngày</span>
          </span>
        </div>
        <div class="header-right">
          <span class="countdown-label">Làm mới sau:</span>
          <span class="countdown-badge">{{ questService.countdownToMidnight() }}</span>
        </div>
      </div>

      <!-- 3/3 Daily Chest Progress Bar -->
      <div class="chest-box" [class.chest-ready]="questService.isChestAvailable()">
        <div class="chest-info">
          <div class="chest-left">
            <span class="chest-title">Rương Hoàn Thành Ngày</span>
            <span class="chest-sub">Hoàn thành 3/3 nhiệm vụ để mở rương (+25 Xu, +1 Streak 🔥, cơ hội nhận Phân bón tăng tốc)</span>
          </div>
          <div class="chest-action">
            @if (questService.chestClaimed()) {
              <div class="chest-claimed-badge">
                <span>✓ Đã mở rương</span>
              </div>
            } @else if (questService.isChestAvailable()) {
              <button class="btn-claim-chest" (click)="questService.claimDailyChest()">
                🎁 Mở thưởng 3/3
              </button>
            } @else {
              <div class="chest-locked-pill">
                <span>🎁 {{ questService.completedCount() }}/3</span>
              </div>
            }
          </div>
        </div>

        <div class="chest-progress-track">
          <div
            class="chest-progress-fill"
            [style.width.%]="(questService.completedCount() / 3) * 100"
          ></div>
        </div>
      </div>

      <!-- Quest Rows -->
      <div class="quest-list">
        @for (q of sortedQuests(); track q.id) {
          <div
            class="quest-row"
            [class.row-in-progress]="q.status === 'IN_PROGRESS'"
            [class.row-completed]="q.status === 'COMPLETED_UNCLAIMED'"
            [class.row-claimed]="q.status === 'CLAIMED'"
          >
            <!-- Slot marker & details -->
            <div class="quest-content">
              <div class="quest-top">
                <span class="quest-slot-badge">#{{ q.slot }}</span>
                <span class="quest-title" [class.strike]="q.status === 'CLAIMED'">{{ q.titleVi }}</span>
              </div>

              <!-- Compact Progress Bar for IN_PROGRESS -->
              <div class="quest-mid">
                <div class="progress-bar-wrapper">
                  <div class="progress-bar-track">
                    <div
                      class="progress-bar-fill"
                      [style.width.%]="getProgressPercent(q)"
                    ></div>
                  </div>
                  <span class="progress-text">{{ q.currentCount }}/{{ q.targetCount }}</span>
                </div>

                <!-- Reward Pills -->
                <div class="reward-pills">
                  @if (q.rewards.water) {
                    <span class="reward-pill pill-water" title="Nước tưới kích hoạt cây">
                      💧 ×{{ q.rewards.water }}
                    </span>
                  }
                  @if (q.rewards.baseFertilizer) {
                    <span class="reward-pill pill-fert" title="Phân bón cơ bản kích hoạt cây">
                      🌾 ×{{ q.rewards.baseFertilizer }}
                    </span>
                  }
                  @if (q.rewards.randomTierSeed) {
                    <span class="reward-pill pill-seed" title="Túi hạt giống">
                      🌱 ×{{ q.rewards.randomTierSeed }} Hạt giống
                    </span>
                  }
                </div>
              </div>
            </div>

            <!-- Action Button -->
            <div class="quest-action">
              @if (q.status === 'IN_PROGRESS') {
                <a [routerLink]="q.routeTarget" class="btn-action btn-go">
                  Đi làm ›
                </a>
              } @else if (q.status === 'COMPLETED_UNCLAIMED') {
                <button class="btn-action btn-claim" (click)="questService.claimQuestReward(q.id)">
                  Nhận thưởng
                </button>
              } @else {
                <span class="badge-claimed">
                  ✓ Đã nhận
                </span>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .quests-card {
      background: #FFFDF9;
      border: 1px solid #D9C8B5;
      border-radius: 12px;
      padding: 16px;
      margin-top: 18px;
      box-shadow: 0 4px 12px rgba(38, 56, 71, 0.04);
    }

    .quests-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid #EFE6D9;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-title {
      font-family: var(--font-heading, serif);
      font-size: 1.15rem;
      font-weight: 700;
      color: #263847;
    }

    .streak-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #FFF5EE;
      border: 1px solid #E4B89A;
      color: #B25A38;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 999px;
    }

    .fire-icon {
      font-size: 0.85rem;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: #78815D;
    }

    .countdown-label {
      opacity: 0.85;
    }

    .countdown-badge {
      font-family: monospace;
      font-weight: 700;
      background: #F4EFE6;
      border: 1px solid #D9C8B5;
      padding: 2px 6px;
      border-radius: 4px;
      color: #263847;
    }

    /* Chest Box */
    .chest-box {
      background: #F8F4EB;
      border: 1px solid #D9C8B5;
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 14px;
      transition: all 0.2s ease;
    }

    .chest-box.chest-ready {
      background: #FAF3DF;
      border-color: #D9B76A;
      box-shadow: 0 0 10px rgba(217, 183, 106, 0.25);
    }

    .chest-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }

    .chest-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .chest-title {
      font-family: var(--font-heading, serif);
      font-weight: 700;
      font-size: 0.95rem;
      color: #263847;
    }

    .chest-sub {
      font-size: 0.75rem;
      color: #6C7A89;
      line-height: 1.3;
    }

    .btn-claim-chest {
      background: #E8D7A8;
      border: 1px solid #BF9B30;
      color: #4A3B10;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
      animation: pulse 1.8s infinite;
      box-shadow: 0 2px 6px rgba(191, 155, 48, 0.25);
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
    }

    .chest-claimed-badge {
      font-size: 0.8rem;
      color: #78815D;
      font-weight: 600;
      background: #EAE6DB;
      padding: 4px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }

    .chest-locked-pill {
      font-size: 0.8rem;
      color: #8C8275;
      font-weight: 600;
      background: #EAE3D5;
      padding: 4px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }

    .chest-progress-track {
      width: 100%;
      height: 8px;
      background: #E2D7C7;
      border-radius: 999px;
      overflow: hidden;
    }

    .chest-progress-fill {
      height: 100%;
      background: #78815D;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    /* Quest Rows */
    .quest-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .quest-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #D9C8B5;
      background: #F8F4EB;
      transition: all 0.2s ease;
    }

    .quest-row.row-completed {
      background: #D7ECD9;
      border-color: #9EC4A2;
    }

    .quest-row.row-claimed {
      background: #F8F4EB;
      opacity: 0.72;
      border-style: dashed;
    }

    .quest-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    .quest-top {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .quest-slot-badge {
      font-size: 0.7rem;
      font-weight: 700;
      color: #8C8275;
      background: #EAE3D5;
      padding: 1px 5px;
      border-radius: 4px;
    }

    .quest-title {
      font-size: 0.88rem;
      font-weight: 600;
      color: #263847;
      word-break: break-word;
    }

    .quest-title.strike {
      text-decoration: line-through;
      color: #7D8893;
    }

    .quest-mid {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .progress-bar-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 110px;
    }

    .progress-bar-track {
      width: 70px;
      height: 6px;
      background: #E2D7C7;
      border-radius: 999px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      background: #78815D;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.75rem;
      font-weight: 600;
      color: #5C6773;
    }

    .reward-pills {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }

    .reward-pill {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 1px 6px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: #FFFDF9;
      border: 1px solid #D9C8B5;
      color: #263847;
    }

    .pill-water {
      background: #EBF3F8;
      border-color: #B8D5E5;
      color: #2B577A;
    }

    .pill-fert {
      background: #F3EFE6;
      border-color: #D2C4A8;
      color: #5A4E38;
    }

    .pill-seed {
      background: #EEF4EA;
      border-color: #B5D2A8;
      color: #385E2A;
    }

    /* Actions */
    .quest-action {
      flex-shrink: 0;
    }

    .btn-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      border: none;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .btn-go {
      background: #FFFDF9;
      color: #78815D;
      border: 1px solid #78815D;
    }

    .btn-go:hover {
      background: #78815D;
      color: #FFFDF9;
    }

    .btn-claim {
      background: #A65E65;
      color: #FFFDF9;
      border: 1px solid #8E4B52;
      box-shadow: 0 2px 4px rgba(166, 94, 101, 0.2);
    }

    .btn-claim:hover {
      background: #8E4B52;
    }

    .badge-claimed {
      font-size: 0.8rem;
      font-weight: 600;
      color: #78815D;
      padding: 4px 8px;
    }

    @media (max-width: 480px) {
      .quests-card {
        padding: 12px;
      }
      .quest-row {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      .quest-action {
        align-self: flex-end;
      }
      .btn-action {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class DailyQuestsWidgetComponent {
  questService = inject(DailyQuestService);

  /**
   * Sort: IN_PROGRESS & COMPLETED_UNCLAIMED first, CLAIMED at bottom.
   */
  sortedQuests(): DailyQuestItem[] {
    const list = [...this.questService.quests()];
    return list.sort((a, b) => {
      if (a.status === 'CLAIMED' && b.status !== 'CLAIMED') return 1;
      if (a.status !== 'CLAIMED' && b.status === 'CLAIMED') return -1;
      if (a.status === 'COMPLETED_UNCLAIMED' && b.status === 'IN_PROGRESS') return -1;
      if (a.status === 'IN_PROGRESS' && b.status === 'COMPLETED_UNCLAIMED') return 1;
      return a.slot - b.slot;
    });
  }

  getProgressPercent(q: DailyQuestItem): number {
    if (q.targetCount <= 0) return 100;
    return Math.min(100, Math.round((q.currentCount / q.targetCount) * 100));
  }
}
