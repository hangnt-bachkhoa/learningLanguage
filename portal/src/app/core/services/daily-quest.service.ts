import { Injectable, inject, signal, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { QuestEventType, QuestStatus, DailyQuestItem, DailyQuestState } from '../models/game.models';
import { GameStateService } from './game-state.service';
import { GrammarService } from './grammar.service';
import { getTodayVnDate, addDays } from '../utils/ebbinghaus.util';
import { CROP_CATALOG } from '../constants/crop-catalog.constant';
import { DEFAULT_VOCABULARIES } from '../constants/default-vocabularies.constant';

export type { QuestEventType, QuestStatus, DailyQuestItem, DailyQuestState };


/**
 * Calculates ms remaining until 00:00:00 UTC+7 next day.
 */
export function msToNextMidnightUtc7(): number {
  const now = new Date();
  const utc7OffsetMs = 7 * 60 * 60 * 1000;
  const nowUtc7 = new Date(now.getTime() + utc7OffsetMs);

  const nextMidnightUtc7 = new Date(Date.UTC(
    nowUtc7.getUTCFullYear(),
    nowUtc7.getUTCMonth(),
    nowUtc7.getUTCDate() + 1,
    0, 0, 0, 0
  ));

  return Math.max(0, nextMidnightUtc7.getTime() - nowUtc7.getTime());
}

export function formatHms(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

@Injectable({
  providedIn: 'root'
})
export class DailyQuestService {
  private readonly STORAGE_KEY = 'english_farm_daily_quests_v2';
  private gameState = inject(GameStateService);
  private grammar = inject(GrammarService);
  private destroyRef = inject(DestroyRef);

  questState = signal<DailyQuestState>({
    dateVn: '',
    quests: [],
    chestClaimed: false,
    loggedEventRefs: [],
    currentStreak: 1,
    lastStreakDateVn: null
  });

  countdownToMidnight = signal<string>('00:00:00');

  // Computed signals
  quests = computed(() => this.questState().quests);
  chestClaimed = computed(() => this.questState().chestClaimed);
  currentStreak = computed(() => this.questState().currentStreak);

  completedCount = computed(() => {
    return this.quests().filter(q => q.status === 'COMPLETED_UNCLAIMED' || q.status === 'CLAIMED').length;
  });

  isChestAvailable = computed(() => {
    return this.completedCount() === 3 && !this.chestClaimed();
  });

  constructor() {
    this.loadFromStorage();
    this.checkAndInitDailyQuests();

    // Lắng nghe bus sự kiện từ GameStateService (Decoupled Event-Driven)
    this.gameState.questEvent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.recordEvent(evt.type, evt.refId);
      });

    // Cập nhật đồng hồ đếm ngược 1 giây thời gian thực đến nửa đêm UTC+7
    this.updateCountdown();
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateCountdown();
        // Kiểm tra xem đã qua nửa đêm UTC+7 chưa
        const today = getTodayVnDate();
        if (this.questState().dateVn !== today) {
          this.checkAndInitDailyQuests();
        }
      });
  }

  private updateCountdown() {
    const ms = msToNextMidnightUtc7();
    this.countdownToMidnight.set(formatHms(ms));
  }

  /**
   * Lazy initialization của 3 nhiệm vụ ngày theo ngữ cảnh người chơi tại 00:00 UTC+7
   */
  checkAndInitDailyQuests() {
    const today = getTodayVnDate();
    const current = this.questState();

    if (current.dateVn === today && current.quests.length === 3) {
      return;
    }

    // Tính toán lại Streak nếu bước sang ngày mới
    let streak = current.currentStreak || 1;
    if (current.lastStreakDateVn) {
      const yesterday = addDays(today, -1);
      if (current.lastStreakDateVn !== yesterday && current.lastStreakDateVn !== today) {
        // Đã đứt chuỗi
        streak = 0;
      }
    }

    // Sinh 3 Nhiệm vụ theo Ngữ cảnh người chơi (Rule 2)
    const slot1 = this.generateSlot1Quest();
    const slot2 = this.generateSlot2Quest();
    const slot3 = this.generateSlot3Quest();

    const newState: DailyQuestState = {
      dateVn: today,
      quests: [slot1, slot2, slot3],
      chestClaimed: false,
      loggedEventRefs: [],
      currentStreak: streak,
      lastStreakDateVn: current.lastStreakDateVn
    };

    this.questState.set(newState);
    this.saveToStorage();
  }

  /**
   * Slot 1: Input (Học mới)
   * - Nếu còn từ chưa học trong các bài đã mở -> "Đánh dấu Đã học 10 từ vựng mới"
   * - Ngược lại -> "Hoàn thành lý thuyết 1 chuyên đề Ngữ pháp"
   * Thưởng: +2 Nước + +2 Phân bón cơ bản (Strictly 0 XP & 0 Coins)
   */
  private generateSlot1Quest(): DailyQuestItem {
    const lessons = this.gameState.lessons();
    const unlockedLessons = lessons.filter(l => l.isUnlocked);
    const learnedWords = this.gameState.learnedWords();

    let hasUnlearnedInUnlocked = false;
    for (const l of unlockedLessons) {
      const vocabs = DEFAULT_VOCABULARIES[l.id] || [];
      if (vocabs.some(v => !learnedWords.includes(v.word))) {
        hasUnlearnedInUnlocked = true;
        break;
      }
    }

    if (hasUnlearnedInUnlocked) {
      return {
        id: 'quest_slot_1',
        slot: 1,
        titleVi: 'Đánh dấu Đã học 10 từ vựng mới',
        eventType: 'VOCAB_LEARNED',
        currentCount: 0,
        targetCount: 10,
        status: 'IN_PROGRESS',
        routeTarget: '/lessons',
        rewards: { water: 2, baseFertilizer: 2 }
      };
    }

    return {
      id: 'quest_slot_1',
      slot: 1,
      titleVi: 'Hoàn thành lý thuyết 1 chuyên đề Ngữ pháp',
      eventType: 'GRAMMAR_STUDIED',
      currentCount: 0,
      targetCount: 1,
      status: 'IN_PROGRESS',
      routeTarget: '/grammar',
      rewards: { water: 2, baseFertilizer: 2 }
    };
  }

  /**
   * Slot 2: Verification (Kiểm tra / Ôn tập)
   * - Nếu dueTodayCount >= 5 trong Review Planner -> "Hoàn thành 1 phiên Ôn tập từ đến hạn"
   * - Ngược lại -> "Đạt từ 2★ trở lên trong 1 bài Quiz"
   * Thưởng: +1 Nước + +1 Phân bón
   */
  private generateSlot2Quest(): DailyQuestItem {
    const dueCount = this.gameState.dueTodayCount();

    if (dueCount >= 5) {
      return {
        id: 'quest_slot_2',
        slot: 2,
        titleVi: 'Hoàn thành 1 phiên Ôn tập từ đến hạn',
        eventType: 'REVIEW_COMPLETED',
        currentCount: 0,
        targetCount: 1,
        status: 'IN_PROGRESS',
        routeTarget: '/review',
        rewards: { water: 1, baseFertilizer: 1 }
      };
    }

    return {
      id: 'quest_slot_2',
      slot: 2,
      titleVi: 'Đạt từ 2★ trở lên trong 1 bài Quiz',
      eventType: 'QUIZ_PASSED_2STAR',
      currentCount: 0,
      targetCount: 1,
      status: 'IN_PROGRESS',
      routeTarget: '/quiz',
      rewards: { water: 1, baseFertilizer: 1 }
    };
  }

  /**
   * Slot 3: Farm Loop (Nông trại)
   * - Nếu có bất kỳ ô đất nào Chín hoặc Đang lớn -> "Thu hoạch 2 nông sản bất kỳ"
   * - Ngược lại -> "Thực hiện 3 thao tác chăm sóc nông trại (Gieo / Tưới / Bón)"
   * Thưởng: +1 Túi hạt giống mở khóa ngẫu nhiên
   */
  private generateSlot3Quest(): DailyQuestItem {
    const plots = this.gameState.plots();
    const hasGrowingOrReady = plots.some(p => p.status === 'ready' || p.status === 'growing');

    if (hasGrowingOrReady) {
      return {
        id: 'quest_slot_3',
        slot: 3,
        titleVi: 'Thu hoạch 2 nông sản bất kỳ',
        eventType: 'CROP_HARVESTED',
        currentCount: 0,
        targetCount: 2,
        status: 'IN_PROGRESS',
        routeTarget: '/farm',
        rewards: { randomTierSeed: 1 }
      };
    }

    return {
      id: 'quest_slot_3',
      slot: 3,
      titleVi: 'Thực hiện 3 thao tác chăm sóc nông trại (Gieo / Tưới / Bón)',
      eventType: 'FARM_CARE_ACTION',
      currentCount: 0,
      targetCount: 3,
      status: 'IN_PROGRESS',
      routeTarget: '/farm',
      rewards: { randomTierSeed: 1 }
    };
  }

  /**
   * Ghi nhận sự kiện hệ thống (Rule 1 & Rule 3: Idempotency & Anti-Spam Guard)
   */
  recordEvent(eventType: QuestEventType, uniqueRefId?: string) {
    this.checkAndInitDailyQuests();
    const state = this.questState();

    if (uniqueRefId) {
      const key = `${eventType}:${uniqueRefId}`;
      if (state.loggedEventRefs.includes(key)) return;
      state.loggedEventRefs = [...state.loggedEventRefs, key];
    }

    let hasChange = false;
    const updatedQuests = state.quests.map(q => {
      if (q.eventType !== eventType || q.status !== 'IN_PROGRESS') return q;
      const nextCount = Math.min(q.targetCount, q.currentCount + 1);
      const nextStatus: QuestStatus = nextCount >= q.targetCount ? 'COMPLETED_UNCLAIMED' : 'IN_PROGRESS';
      hasChange = true;
      return { ...q, currentCount: nextCount, status: nextStatus };
    });

    if (hasChange || uniqueRefId) {
      this.questState.set({ ...state, quests: updatedQuests });
      this.saveToStorage();

      // Thông báo khi hoàn thành nhiệm vụ
      const justCompleted = updatedQuests.find(q => q.eventType === eventType && q.status === 'COMPLETED_UNCLAIMED');
      if (justCompleted && justCompleted.currentCount === justCompleted.targetCount) {
        this.gameState.showToast(`🎉 Nhiệm vụ hoàn thành: "${justCompleted.titleVi}"! Hãy nhận thưởng.`);
      }
    }
  }

  /**
   * Nhận phần thưởng của từng nhiệm vụ
   */
  claimQuestReward(questId: string) {
    const state = this.questState();
    const quest = state.quests.find(q => q.id === questId);
    if (!quest || quest.status !== 'COMPLETED_UNCLAIMED') return;

    // Cấp phát phần thưởng
    if (quest.rewards.water) {
      this.gameState.inventory.update(inv => ({
        ...inv,
        care: { ...inv.care, water: inv.care.water + (quest.rewards.water || 0) }
      }));
    }
    if (quest.rewards.baseFertilizer) {
      this.gameState.inventory.update(inv => ({
        ...inv,
        care: { ...inv.care, fertilizer: inv.care.fertilizer + (quest.rewards.baseFertilizer || 0) }
      }));
    }
    if (quest.rewards.randomTierSeed) {
      const unlocked = this.gameState.getUnlockedSeedIds();
      const seedKey = unlocked.length > 0 ? unlocked[Math.floor(Math.random() * unlocked.length)] : 'carrot';
      this.gameState.inventory.update(inv => ({
        ...inv,
        seeds: { ...inv.seeds, [seedKey]: (inv.seeds[seedKey] || 0) + 1 }
      }));
    }

    // Cập nhật trạng thái Streak (Rule 4) nếu là nhiệm vụ học tập/kiểm tra (Slot 1 hoặc Slot 2)
    const today = getTodayVnDate();
    let nextStreak = state.currentStreak;
    let nextStreakDate = state.lastStreakDateVn;

    if (quest.slot === 1 || quest.slot === 2) {
      if (state.lastStreakDateVn !== today) {
        const yesterday = addDays(today, -1);
        if (state.lastStreakDateVn === yesterday) {
          nextStreak += 1;
        } else {
          nextStreak = 1;
        }
        nextStreakDate = today;
      }
    }

    const updatedQuests = state.quests.map(q => q.id === questId ? { ...q, status: 'CLAIMED' as QuestStatus } : q);

    this.questState.set({
      ...state,
      quests: updatedQuests,
      currentStreak: nextStreak,
      lastStreakDateVn: nextStreakDate
    });

    this.saveToStorage();
    this.gameState.showToast(`✨ Đã nhận thưởng nhiệm vụ "${quest.titleVi}"!`);
  }

  /**
   * Mở Rương Hoàn Thành 3/3 Daily Grand Chest
   */
  claimDailyChest() {
    if (!this.isChestAvailable()) return;

    const state = this.questState();
    const today = getTodayVnDate();

    // Cập nhật Streak theo Rule 4
    let nextStreak = state.currentStreak;
    if (state.lastStreakDateVn !== today) {
      const yesterday = addDays(today, -1);
      if (state.lastStreakDateVn === yesterday) {
        nextStreak += 1;
      } else {
        nextStreak = 1;
      }
    }

    // +25 Coins
    this.gameState.coins.update(c => c + 25);

    // 20% tỷ lệ rơi Phân bón tăng tốc
    const gotSpeedFert = Math.random() < 0.20;
    if (gotSpeedFert) {
      this.gameState.inventory.update(inv => ({
        ...inv,
        care: {
          ...inv.care,
          speedFertilizer: (inv.care.speedFertilizer || 0) + 1
        }
      }));
    }

    this.questState.set({
      ...state,
      chestClaimed: true,
      currentStreak: nextStreak,
      lastStreakDateVn: today
    });

    this.saveToStorage();

    const bonusMsg = gotSpeedFert ? ' và ⚡ 1 Phân bón tăng tốc!' : '!';
    this.gameState.showToast(`🎁 Đã mở Rương Hoàn Thành 3/3: +25 Xu, +1 Ngày Streak 🔥${bonusMsg}`);
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.questState()));
    } catch (e) {
      console.warn('Lỗi lưu Daily Quests:', e);
    }
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          this.questState.set(parsed);
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc Daily Quests:', e);
    }
  }
}
