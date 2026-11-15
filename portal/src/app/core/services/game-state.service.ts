import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { FarmPlot, PlotStatus, UserInventory, PlannerBook, CartItem, ToastMessage, ShopItem } from '../models/game.models';
import { FarmApiService, LessonDto, VocabularyDto, FarmPlotDto, UserInventoryItemDto, QuizSubmitResultDto } from './farm-api.service';
import { CROP_CATALOG } from '../constants/crop-catalog.constant';
import { DEFAULT_VOCABULARIES } from '../constants/default-vocabularies.constant';
import { DEFAULT_LESSONS } from '../constants/default-lessons.constant';
import { UserWordStat, UserLessonProgress, TIER_REWARDS } from './quiz-engine.service';

export { DEFAULT_LESSONS } from '../constants/default-lessons.constant';

export interface CropLockInfo {
  isUnlocked: boolean;
  tier: number;
  tierName: string;
  requiredXp: number;
  requiredLevel: number;
  requiredLessonTitle?: string;
  missingReasons: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private readonly STORAGE_KEY = 'english_farm_v1';
  private readonly VOCAB_STORAGE_KEY = 'english_farm_vocabularies';
  private readonly WORD_STATS_KEY = 'english_farm_word_stats';
  private readonly LESSON_PROGRESS_KEY = 'english_farm_lesson_progress';
  private api = inject(FarmApiService);

  // Trạng thái kết nối Backend
  isApiConnected = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  // Quản lý đóng / mở thanh điều hướng (Sidebar Collapse/Expand)
  isMobileSidebarOpen = signal<boolean>(false);
  isDesktopSidebarCollapsed = signal<boolean>(false);

  toggleSidebar() {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      this.isMobileSidebarOpen.update(v => !v);
    } else {
      this.isDesktopSidebarCollapsed.update(v => !v);
    }
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen.set(false);
  }

  openMobileSidebar() {
    this.isMobileSidebarOpen.set(true);
  }

  // Player Stats
  xp = signal<number>(180);
  coins = signal<number>(120);
  level = signal<number>(2);

  // Cart
  cart = signal<CartItem[]>([]);
  cartCount = computed(() => this.cart().reduce((sum, item) => sum + item.qty, 0));
  cartTotal = computed(() => this.cart().reduce((sum, item) => sum + item.item.price * item.qty, 0));

  // Farm Plots (3x3 Flat Grid)
  plots = signal<FarmPlot[]>([
    { id: 1, index: 0, status: 'seeded', crop: 'carrot', isWatered: true, growthProgress: 10 },
    { id: 2, index: 1, status: 'growing', crop: 'carrot', isWatered: true, growthProgress: 35 },
    { id: 3, index: 2, status: 'growing', crop: 'carrot', isWatered: true, growthProgress: 75 },
    { id: 4, index: 3, status: 'ready', crop: 'carrot', isWatered: true, growthProgress: 100 },
    { id: 5, index: 4, status: 'ready', crop: 'carrot', isWatered: true, growthProgress: 100 },
    { id: 6, index: 5, status: 'empty', isWatered: false, growthProgress: 0 },
    { id: 7, index: 6, status: 'empty', isWatered: false, growthProgress: 0 },
    { id: 8, index: 7, status: 'empty', isWatered: false, growthProgress: 0 },
    { id: 9, index: 8, status: 'empty', isWatered: false, growthProgress: 0 }
  ]);

  // Inventory
  inventory = signal<UserInventory>({
    seeds: {
      carrot: 3,
      corn: 2,
      tomato: 2,
      sunflower: 3,
      rose: 3,
      tulip: 3,
      mango: 3,
      kiwi: 3,
      lemon: 3,
      apple: 3,
      cherry: 3
    },
    harvested: {
      carrot: 2,
      corn: 1,
      tomato: 0,
      sunflower: 0,
      rose: 0,
      tulip: 0,
      mango: 0,
      kiwi: 0,
      lemon: 0,
      apple: 0,
      cherry: 0
    },
    care: { water: 15, fertilizer: 5 },
    decor: { lamp: 0 }
  });

  // Lessons từ Backend / Fallback Offline
  lessons = signal<LessonDto[]>(DEFAULT_LESSONS);
  activeLessonId = signal<number>(1);
  activeVocabularies = signal<VocabularyDto[]>([]);

  // Dữ liệu từ vựng Offline & Tiến độ học từ vựng (Lưu vĩnh viễn trong localStorage)
  learnedWords = signal<string[]>([]);
  bookmarkedWords = signal<string[]>([]);
  vocabulariesByLesson = signal<Record<number, VocabularyDto[]>>(DEFAULT_VOCABULARIES);

  // Learning Planners
  books = signal<PlannerBook[]>([
    {
      id: 'b_office',
      title: 'Văn phòng (Office)',
      moduleType: 'Vocabulary',
      coverColor: '#78815D', // Olive
      learned: 8,
      total: 24,
      unlocked: true,
      note: 'TOEIC 450 - Nền tảng công sở'
    },
    {
      id: 'b_hr',
      title: 'Nhân sự (Human Resources)',
      moduleType: 'Grammar',
      coverColor: '#A65E65', // Rose
      learned: 0,
      total: 24,
      unlocked: true,
      unlockCondition: 'Mở sẵn',
      note: 'Tuyển dụng & Đãi ngộ'
    },
    {
      id: 'b_business',
      title: 'Kinh doanh (Business)',
      moduleType: 'Listening',
      coverColor: '#344B5E', // Navy
      learned: 0,
      total: 25,
      unlocked: true,
      unlockCondition: 'Mở sẵn',
      note: 'Đàm phán & Hợp đồng'
    }
  ]);

  // Toasts
  toasts = signal<ToastMessage[]>([]);

  // Selected tool on Farm
  selectedTool = signal<'plant' | 'water' | 'fertilize' | 'harvest'>('plant');
  selectedSeed = signal<string>('carrot');

  // Thống kê từng từ (UserWordStats: attempts, wrongCount, lastSeenAt) cho Smart Pool Sampling
  userWordStats = signal<Record<number, UserWordStat>>({});

  // Tiến độ sao bài học (UserLessonProgress: bestStarsClaimed 0..3, bestScorePercent)
  userLessonProgress = signal<Record<number, UserLessonProgress>>({});

  private isHydrated = false;

  constructor() {
    // 1. Tải dữ liệu lưu trữ từ localStorage (trình duyệt)
    this.loadFromStorage();
    this.isHydrated = true;

    // 2. Thử đồng bộ với Backend API nếu có server chạy
    this.initFromApi();

    // 3. Tự động lưu vào localStorage mỗi khi trạng thái thay đổi
    effect(() => {
      // Đọc các signal để kích hoạt reactive dependency
      this.xp();
      this.coins();
      this.level();
      this.plots();
      this.inventory();
      this.lessons();
      this.books();

      if (this.isHydrated) {
        this.saveToStorage();
      }
    });
  }

  showToast(text: string) {
    const id = Date.now();
    this.toasts.update(list => [...list, { id, text }]);
    setTimeout(() => {
      this.toasts.update(list => list.filter(t => t.id !== id));
    }, 3200);
  }

  // =========================================================================
  // BỘ NHỚ LÂU DÀI: LOCALSTORAGE & SAO LƯU / KHÔI PHỤC JSON
  // =========================================================================

  saveToStorage() {
    try {
      const data = {
        version: 1,
        savedAt: new Date().toISOString(),
        xp: this.xp(),
        coins: this.coins(),
        level: this.level(),
        plots: this.plots(),
        inventory: this.inventory(),
        lessons: this.lessons(),
        books: this.books(),
        activeLessonId: this.activeLessonId(),
        learnedWords: this.learnedWords(),
        bookmarkedWords: this.bookmarkedWords()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

      // Lưu trữ toàn bộ 1,300+ từ vựng vào localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.VOCAB_STORAGE_KEY, JSON.stringify(this.vocabulariesByLesson()));
        localStorage.setItem(this.WORD_STATS_KEY, JSON.stringify(this.userWordStats()));
        localStorage.setItem(this.LESSON_PROGRESS_KEY, JSON.stringify(this.userLessonProgress()));
      }
    } catch (e) {
      console.warn('Không thể lưu localStorage:', e);
    }
  }

  loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && typeof data === 'object') {
          if (typeof data.xp === 'number') this.xp.set(data.xp);
          if (typeof data.coins === 'number') this.coins.set(data.coins);
          if (typeof data.level === 'number') this.level.set(data.level);
          if (Array.isArray(data.plots) && data.plots.length > 0) this.plots.set(data.plots);
          if (data.inventory && typeof data.inventory === 'object') this.inventory.set(data.inventory);
          if (Array.isArray(data.lessons) && data.lessons.length >= DEFAULT_LESSONS.length) {
            this.lessons.set(data.lessons);
          } else {
            // Nâng cấp đầy đủ 52 bài học, bảo lưu trạng thái sao và mở khóa của người chơi
            const savedList: LessonDto[] = Array.isArray(data.lessons) ? data.lessons : [];
            const savedMap = new Map<number, LessonDto>(savedList.map(l => [l.id, l]));
            const merged = DEFAULT_LESSONS.map(l => {
              const saved = savedMap.get(l.id);
              return saved ? {
                ...l,
                isUnlocked: saved.isUnlocked || l.isUnlocked,
                bestStarsClaimed: saved.bestStarsClaimed || l.bestStarsClaimed
              } : l;
            });
            this.lessons.set(merged);
          }
          if (Array.isArray(data.books) && data.books.length > 0) this.books.set(data.books);
          if (typeof data.activeLessonId === 'number') this.activeLessonId.set(data.activeLessonId);
          if (Array.isArray(data.learnedWords)) this.learnedWords.set(data.learnedWords);
          if (Array.isArray(data.bookmarkedWords)) this.bookmarkedWords.set(data.bookmarkedWords);
        }
      }

      // Nạp UserWordStats & UserLessonProgress
      const rawWordStats = localStorage.getItem(this.WORD_STATS_KEY);
      if (rawWordStats) {
        try {
          const parsed = JSON.parse(rawWordStats);
          if (parsed && typeof parsed === 'object') this.userWordStats.set(parsed);
        } catch {}
      }

      const rawProgress = localStorage.getItem(this.LESSON_PROGRESS_KEY);
      if (rawProgress) {
        try {
          const parsed = JSON.parse(rawProgress);
          if (parsed && typeof parsed === 'object') {
            this.userLessonProgress.set(parsed);
            // Đồng bộ lại BestStarsClaimed vào lessons signal
            this.lessons.update(list => list.map(l => {
              const p = parsed[l.id];
              return p ? { ...l, bestStarsClaimed: p.bestStarsClaimed } : l;
            }));
          }
        } catch {}
      }

      // Nạp toàn bộ 52 bộ từ vựng từ localStorage (tự động hòa hợp nếu trước đó lưu thiếu)
      const rawVocabs = localStorage.getItem(this.VOCAB_STORAGE_KEY);
      if (rawVocabs) {
        try {
          const parsed = JSON.parse(rawVocabs);
          if (parsed && typeof parsed === 'object') {
            const savedKeys = Object.keys(parsed);
            const defaultKeys = Object.keys(DEFAULT_VOCABULARIES);
            if (savedKeys.length < defaultKeys.length) {
              const fullVocabs = { ...DEFAULT_VOCABULARIES, ...parsed };
              this.vocabulariesByLesson.set(fullVocabs);
              localStorage.setItem(this.VOCAB_STORAGE_KEY, JSON.stringify(fullVocabs));
            } else {
              this.vocabulariesByLesson.set(parsed);
            }
          }
        } catch {}
      } else {
        // Tự động lưu khởi tạo 52 bộ từ vựng vào localStorage để dùng hoàn toàn offline
        try {
          localStorage.setItem(this.VOCAB_STORAGE_KEY, JSON.stringify(DEFAULT_VOCABULARIES));
        } catch {}
      }
    } catch (e) {
      console.warn('Lỗi đọc localStorage:', e);
    }
  }

  exportBackupJson() {
    const data = {
      app: 'EnglishFarm',
      version: 1,
      exportedAt: new Date().toISOString(),
      xp: this.xp(),
      coins: this.coins(),
      level: this.level(),
      plots: this.plots(),
      inventory: this.inventory(),
      lessons: this.lessons(),
      books: this.books()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english-farm-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('💾 Đã tải file sao lưu english-farm-backup.json về máy!');
  }

  importBackupJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        throw new Error('Định dạng file không đúng');
      }
      if (typeof data.xp === 'number') this.xp.set(data.xp);
      if (typeof data.coins === 'number') this.coins.set(data.coins);
      if (typeof data.level === 'number') this.level.set(data.level);
      if (Array.isArray(data.plots)) this.plots.set(data.plots);
      if (data.inventory) this.inventory.set(data.inventory);
      if (Array.isArray(data.lessons)) this.lessons.set(data.lessons);
      if (Array.isArray(data.books)) this.books.set(data.books);

      this.saveToStorage();
      this.showToast('✅ Khôi phục dữ liệu nông trại thành công!');
      return true;
    } catch (e) {
      this.showToast('❌ File sao lưu không hợp lệ. Vui lòng kiểm tra lại!');
      return false;
    }
  }

  resetGameToDefault() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.xp.set(30);
    this.coins.set(125);
    this.level.set(1);
    this.plots.set([
      { id: 1, index: 0, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 2, index: 1, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 3, index: 2, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 4, index: 3, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 5, index: 4, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 6, index: 5, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 7, index: 6, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 8, index: 7, status: 'empty', isWatered: false, growthProgress: 0 },
      { id: 9, index: 8, status: 'empty', isWatered: false, growthProgress: 0 }
    ]);
    this.inventory.set({
      seeds: {
        carrot: 5, corn: 3, tomato: 0, sunflower: 0, rose: 0,
        tulip: 0, mango: 0, kiwi: 0, lemon: 0, apple: 0, cherry: 0
      },
      harvested: {
        carrot: 0, corn: 0, tomato: 0, sunflower: 0, rose: 0,
        tulip: 0, mango: 0, kiwi: 0, lemon: 0, apple: 0, cherry: 0
      },
      care: { water: 15, fertilizer: 3 },
      decor: { lamp: 0 }
    });
    this.lessons.set(DEFAULT_LESSONS);
    this.saveToStorage();
    this.showToast('🔄 Đã đặt lại trò chơi về trạng thái ban đầu!');
  }

  // =========================================================================
  // PHÂN CẤP HẠT GIỐNG & ĐIỀU KIỆN MỞ KHÓA
  // =========================================================================

  isCropUnlocked(cropId: string): boolean {
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    if (!crop) return true;
    // Cà rốt khởi đầu luôn mở sẵn
    if (crop.id === 'carrot' || crop.requiredXp === 0) return true;

    // 1. Kiểm tra điểm kinh nghiệm
    const hasXp = this.xp() >= crop.requiredXp;

    // 2. Kiểm tra chủ đề bài học tương ứng đã mở khóa
    let isTopicUnlocked = true;
    if (crop.requiredLessonId) {
      const lesson = this.lessons().find(l => l.id === crop.requiredLessonId);
      if (lesson) {
        isTopicUnlocked = lesson.isUnlocked;
      }
    }

    return hasXp && isTopicUnlocked;
  }

  getCropLockInfo(cropId: string): CropLockInfo {
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    if (!crop) {
      return {
        isUnlocked: true,
        tier: 1,
        tierName: 'Hạng I - Mầm non',
        requiredXp: 0,
        requiredLevel: 1,
        requiredLessonTitle: '',
        missingReasons: []
      };
    }

    const isUnlocked = this.isCropUnlocked(cropId);
    const missingReasons: string[] = [];

    if (this.xp() < crop.requiredXp) {
      missingReasons.push(`Cần ${crop.requiredXp} XP (còn thiếu ${crop.requiredXp - this.xp()} XP)`);
    }

    if (crop.requiredLessonId) {
      const lesson = this.lessons().find(l => l.id === crop.requiredLessonId);
      if (!lesson || !lesson.isUnlocked) {
        missingReasons.push(`Mở khóa chủ đề "${crop.requiredLessonTitle || 'Tương ứng'}"`);
      }
    }

    return {
      isUnlocked,
      tier: crop.tier,
      tierName: crop.tierNameVi,
      requiredXp: crop.requiredXp,
      requiredLevel: crop.requiredLevel,
      requiredLessonTitle: crop.requiredLessonTitle,
      missingReasons
    };
  }

  unlockLessonWithCrops(lessonId: number): boolean {
    const lesson = this.lessons().find(l => l.id === lessonId);
    if (!lesson) return false;
    if (lesson.isUnlocked) {
      this.showToast(`Chủ đề "${lesson.title}" đã được mở khóa trước đó!`);
      return false;
    }

    const cropKey = lesson.requiredCropId === 1 ? 'carrot' : lesson.requiredCropId === 2 ? 'corn' : 'tomato';
    const available = this.inventory().harvested[cropKey] || 0;
    const required = lesson.requiredCropQty || 2;

    if (available < required) {
      this.showToast(`Bạn cần ${required}x ${lesson.requiredCropName || 'Nông sản'} (hiện có: ${available}) để mở khóa chủ đề này!`);
      return false;
    }

    // Trừ nông sản
    this.inventory.update(inv => ({
      ...inv,
      harvested: {
        ...inv.harvested,
        [cropKey]: inv.harvested[cropKey] - required
      }
    }));

    // Cập nhật mở khóa bài học
    this.lessons.update(list => list.map(l => l.id === lessonId ? { ...l, isUnlocked: true } : l));
    this.showToast(`🎉 Mở khóa thành công chủ đề "${lesson.title}"! Giống cây tương ứng đã sẵn sàng.`);
    this.saveToStorage();
    return true;
  }

  /**
   * Đồng bộ toàn bộ dữ liệu từ Backend API
   */
  initFromApi() {
    this.isLoading.set(true);

    // 1. Tải Profile
    this.api.getProfile().subscribe({
      next: (profile) => {
        this.xp.set(profile.xp);
        this.coins.set(profile.coins);
        this.level.set(profile.level);
        this.isApiConnected.set(true);
      },
      error: () => {
        // Fallback offline mượt mà
        this.isApiConnected.set(false);
      }
    });

    // 2. Tải Kho đồ
    this.api.getInventory().subscribe({
      next: (items: UserInventoryItemDto[]) => {
        const newInv: UserInventory = {
          seeds: {
            carrot: 0, corn: 0, tomato: 0,
            sunflower: 0, rose: 0, tulip: 0,
            mango: 0, kiwi: 0, lemon: 0, apple: 0, cherry: 0
          },
          harvested: {
            carrot: 0, corn: 0, tomato: 0,
            sunflower: 0, rose: 0, tulip: 0,
            mango: 0, kiwi: 0, lemon: 0, apple: 0, cherry: 0
          },
          care: { water: 0, fertilizer: 0 },
          decor: {}
        };

        for (const item of items) {
          const type = (item.itemType || '').toLowerCase();
          const code = (item.itemCode || '').toLowerCase();
          if (type === 'seed' || type === '1') {
            newInv.seeds[code] = item.quantity;
          } else if (type === 'harvested' || type === 'harvestedcrop' || type === '4') {
            newInv.harvested[code] = item.quantity;
          } else if (type === 'care' || type === 'water' || type === 'fertilizer' || type === '2' || type === '3') {
            if (code === 'water') newInv.care.water = item.quantity;
            if (code === 'fertilizer') newInv.care.fertilizer = item.quantity;
          }
        }
        this.inventory.set(newInv);
      },
      error: () => {}
    });

    // 3. Tải Ô đất Nông trại
    this.api.getPlots().subscribe({
      next: (plotDtos: FarmPlotDto[]) => {
        if (plotDtos && plotDtos.length > 0) {
          const mappedPlots: FarmPlot[] = plotDtos.map(p => {
            const rawStatus = (p.status || 'empty').toLowerCase() as PlotStatus;
            return {
              id: p.id,
              index: p.plotIndex,
              status: rawStatus,
              crop: p.cropCode ? p.cropCode.toLowerCase() : undefined,
              isWatered: p.isWatered,
              growthProgress: p.growthProgress,
              plantedAt: p.plantedAt ? new Date(p.plantedAt) : undefined
            };
          });
          this.plots.set(mappedPlots);
        }
      },
      error: () => {}
    });

    // 4. Tải Danh sách Bài học (50+ chủ đề TOEIC)
    this.api.getLessons('en').subscribe({
      next: (lessonList: LessonDto[]) => {
        if (lessonList && lessonList.length > 0) {
          this.lessons.set(lessonList);
          
          // Chuyển 3 bài học đầu thành 3 Planner Book trên Home Dashboard
          const top3 = lessonList.slice(0, 3);
          const colors = ['#78815D', '#A65E65', '#344B5E'];
          const modules = ['Vocabulary', 'Grammar', 'Listening'];

          const mappedBooks: PlannerBook[] = top3.map((l, idx) => ({
            id: `b_${l.id}`,
            title: l.title,
            moduleType: modules[idx % 3],
            coverColor: colors[idx % 3],
            learned: idx === 0 ? 5 : 0,
            total: 20,
            unlocked: l.isUnlocked,
            unlockCondition: l.requiredCropName ? `Cần ${l.requiredCropQty} ${l.requiredCropName}` : 'Mở sẵn',
            note: `${l.levelTag} - Bài #${l.orderIndex}`
          }));

          this.books.set(mappedBooks);
          this.activeLessonId.set(lessonList[0].id);
          this.loadVocabulariesForLesson(lessonList[0].id);
          this.showToast('🌾 Đã đồng bộ 52 bài học từ Database Backend!');
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  loadVocabulariesForLesson(lessonId: number) {
    this.activeLessonId.set(lessonId);

    // 1. Nạp ngay từ danh mục từ vựng trong localStorage (Hoạt động offline hoàn hảo trên GitHub Pages)
    const localList = this.vocabulariesByLesson()[lessonId];
    if (localList && localList.length > 0) {
      this.activeVocabularies.set(localList);
    }

    // 2. Thử cập nhật từ Backend nếu có API
    this.api.getVocabularies(lessonId).subscribe({
      next: (vocabs) => {
        if (vocabs && vocabs.length > 0) {
          this.activeVocabularies.set(vocabs);
          this.vocabulariesByLesson.update(map => ({
            ...map,
            [lessonId]: vocabs
          }));
          this.saveToStorage();
        }
      },
      error: () => {}
    });
  }

  markWordLearned(word: string) {
    if (!this.learnedWords().includes(word)) {
      this.learnedWords.update(list => [...list, word]);
      // NGUYÊN TẮC: Học Flashcard / Đã học nhận 0 XP và 0 Coins (chỉ lưu tiến độ thuộc từ)
      this.showToast(`✓ Đã thuộc từ "${word}" (Học Flashcard)`);
    } else {
      this.showToast(`Bạn đã thuộc từ "${word}" từ trước!`);
    }
    this.saveToStorage();
  }

  /**
   * Thuật toán 4: Chấm điểm bài Quiz (First-try 3-Star Rating & Delta Reward Economy)
   * Chống cày thưởng lặp lại (Anti-Exploit Idempotency):
   * Chỉ thưởng phần chênh lệch (Delta) khi người học đạt kỷ lục sao cao hơn.
   * Cập nhật UserWordStats để phục vụ Smart Pool Sampling cho các phiên sau.
   */
  recordQuizCompletion(lessonId: number, firstTryResults: Record<number, boolean>): QuizSubmitResultDto {
    const entries = Object.entries(firstTryResults);
    const totalQuestions = Math.max(10, entries.length);
    const firstTryCorrectCount = entries.filter(([_, isOk]) => isOk).length;

    // Phân hạng sao theo tỷ lệ đúng lần thử đầu tiên
    let newStars = 1;
    if (firstTryCorrectCount >= 10) {
      newStars = 3; // 10/10 (100%): 3 Sao
    } else if (firstTryCorrectCount >= 8) {
      newStars = 2; // 8-9/10 (80-90%): 2 Sao
    } else {
      newStars = 1; // < 8/10: 1 Sao (Người học đã sửa hết lỗi để hoàn thành)
    }

    const currentProgress = this.userLessonProgress()[lessonId];
    const oldStars = currentProgress?.bestStarsClaimed || 0;
    const isNewRecord = newStars > oldStars;

    let deltaSeeds = 0;
    let deltaWater = 0;
    let deltaFertilizer = 0;
    let deltaCoins = 0;
    let deltaXp = 0;
    let message = '';

    if (isNewRecord) {
      const oldR = TIER_REWARDS[oldStars] || TIER_REWARDS[0];
      const newR = TIER_REWARDS[newStars];

      deltaSeeds = newR.seeds - oldR.seeds;
      deltaWater = newR.water - oldR.water;
      deltaFertilizer = newR.fertilizer - oldR.fertilizer;
      deltaCoins = newR.coins - oldR.coins;
      deltaXp = newR.xp - oldR.xp;

      message = `Xuất sắc! Bạn đạt kỷ lục mới ${newStars}★ và nhận thưởng chênh lệch Nông trại!`;

      // Cập nhật UserLessonProgress
      this.userLessonProgress.update(map => ({
        ...map,
        [lessonId]: {
          userId: 1,
          lessonId,
          bestScorePercent: Math.round((firstTryCorrectCount / totalQuestions) * 100),
          bestStarsClaimed: newStars,
          firstPassedAt: currentProgress?.firstPassedAt || new Date().toISOString()
        }
      }));

      // Cập nhật BestStarsClaimed vào Lesson tương ứng
      this.lessons.update(list => list.map(l => {
        if (l.id === lessonId) {
          return { ...l, bestStarsClaimed: newStars, isUnlocked: true };
        }
        return l;
      }));
    } else {
      // Replaying a lesson with equal or fewer stars: KHÔNG nhân đôi phần thưởng
      message = `Bạn đã hoàn thành phiên ôn tập ${newStars}★! Giữ vững thành tích cũ ${oldStars}★.`;
    }

    // Tra cứu mã cây trồng
    const lesson = this.lessons().find(l => l.id === lessonId);
    const cropCode = (lesson?.requiredCropName || 'carrot').toLowerCase();
    const seedKey = cropCode.includes('ngô') || cropCode.includes('corn') ? 'corn'
      : cropCode.includes('chua') || cropCode.includes('tomato') ? 'tomato'
      : cropCode.includes('hướng dương') ? 'sunflower'
      : cropCode.includes('hồng') ? 'rose'
      : cropCode.includes('tulip') ? 'tulip'
      : cropCode.includes('xoài') ? 'mango'
      : cropCode.includes('kiwi') ? 'kiwi'
      : cropCode.includes('chanh') ? 'lemon'
      : cropCode.includes('táo') ? 'apple'
      : cropCode.includes('cherry') ? 'cherry'
      : 'carrot';

    // Cập nhật tiền tệ và kinh nghiệm (Quiz-Only XP & Coins)
    if (deltaCoins > 0) this.coins.update(c => c + deltaCoins);
    if (deltaXp > 0) this.xp.update(x => x + deltaXp);

    // Cập nhật vật phẩm Nông trại
    if (deltaSeeds > 0 || deltaWater > 0 || deltaFertilizer > 0) {
      this.inventory.update(inv => {
        const next = { ...inv };
        if (deltaSeeds > 0) {
          next.seeds = { ...next.seeds, [seedKey]: (next.seeds[seedKey] || 0) + deltaSeeds };
        }
        if (deltaWater > 0 || deltaFertilizer > 0) {
          next.care = {
            water: (next.care.water || 0) + deltaWater,
            fertilizer: (next.care.fertilizer || 0) + deltaFertilizer
          };
        }
        return next;
      });
    }

    // Cập nhật UserWordStats cho toàn bộ các từ trong phiên
    const nowIso = new Date().toISOString();
    this.userWordStats.update(stats => {
      const nextStats = { ...stats };
      for (const [vocabIdStr, isOk] of entries) {
        const vocabId = Number(vocabIdStr);
        const prev = nextStats[vocabId] || {
          userId: 1,
          vocabId,
          attempts: 0,
          wrongCount: 0,
          lastSeenAt: nowIso
        };
        nextStats[vocabId] = {
          ...prev,
          attempts: prev.attempts + 1,
          wrongCount: isOk ? prev.wrongCount : prev.wrongCount + 1,
          lastSeenAt: nowIso
        };
      }
      return nextStats;
    });

    this.saveToStorage();

    return {
      lessonId,
      stars: newStars,
      bestStarsClaimed: Math.max(oldStars, newStars),
      isNewRecord,
      totalQuestions,
      firstTryCorrectCount,
      correctAnswers: firstTryCorrectCount,
      scorePercent: Math.round((firstTryCorrectCount / totalQuestions) * 100),
      isPassed: true,
      rewardGranted: isNewRecord,
      rewardSeeds: deltaSeeds,
      rewardWater: deltaWater,
      rewardFertilizer: deltaFertilizer,
      rewardCoins: deltaCoins,
      rewardXp: deltaXp,
      cropName: lesson?.requiredCropName || 'Cà rốt',
      message
    };
  }

  toggleBookmark(word: string) {
    if (this.bookmarkedWords().includes(word)) {
      this.bookmarkedWords.update(list => list.filter(w => w !== word));
      this.showToast(`Đã bỏ đánh dấu "${word}"`);
    } else {
      this.bookmarkedWords.update(list => [...list, word]);
      this.showToast(`🔖 Đã lưu "${word}" vào sổ tay ghi nhớ!`);
    }
    this.saveToStorage();
  }

  refreshProfile() {
    this.initFromApi();
  }

  // Farm Actions
  plantSeed(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    if (status !== 'empty') {
      this.showToast('Ô đất không trống để gieo hạt!');
      return;
    }
    const seed = this.selectedSeed();
    if (!this.isCropUnlocked(seed)) {
      const lockInfo = this.getCropLockInfo(seed);
      this.showToast(`🔒 Hạt giống này đang bị khóa! ${lockInfo.missingReasons.join(' & ')}`);
      return;
    }
    const currentQty = this.inventory().seeds[seed] || 0;
    if (currentQty <= 0) {
      this.showToast(`Bạn đã hết hạt giống ${seed}! Hãy ghé Cửa hàng.`);
      return;
    }

    // Trừ hạt giống cục bộ
    this.inventory.update(inv => ({
      ...inv,
      seeds: { ...inv.seeds, [seed]: currentQty - 1 }
    }));

    // Cập nhật ô đất cục bộ
    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      status: 'seeded',
      crop: seed,
      isWatered: false,
      growthProgress: 0,
      plantedAt: new Date()
    } : p));

    this.showToast(`🌱 Đã gieo hạt ${seed} vào ô đất #${plotIndex + 1}!`);

    // Gửi lên Backend API nếu đang online
    if (this.isApiConnected()) {
      this.api.plantCrop(plotIndex, seed).subscribe({
        error: (err) => console.warn('Lỗi ghi nhận gieo hạt lên backend:', err)
      });
    }
  }

  waterPlot(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    if (status !== 'seeded' && status !== 'growing') {
      this.showToast('Ô đất này không có cây cần tưới!');
      return;
    }
    if (plot.growthProgress >= 100) {
      this.showToast('Cây đã chín rồi, hãy thu hoạch!');
      return;
    }
    if (this.inventory().care.water <= 0) {
      this.showToast('Bạn đã hết nước tưới! Mua thêm tại Cửa hàng.');
      return;
    }

    // Trừ nước cục bộ
    this.inventory.update(inv => ({
      ...inv,
      care: { ...inv.care, water: Math.max(0, inv.care.water - 1) }
    }));

    // Tăng trưởng
    this.plots.update(list => list.map((p, idx) => {
      if (idx !== plotIndex) return p;
      const newProgress = Math.min(100, p.growthProgress + 50);
      return {
        ...p,
        isWatered: true,
        status: newProgress >= 100 ? 'ready' : 'growing',
        growthProgress: newProgress
      };
    }));

    this.showToast(`💧 Đã tưới nước cho ô #${plotIndex + 1}! Cây lớn nhanh hơn.`);

    if (this.isApiConnected()) {
      this.api.waterPlot(plotIndex).subscribe({
        next: () => this.refreshProfile(),
        error: (err) => console.warn('Lỗi ghi nhận tưới nước lên backend:', err)
      });
    }
  }

  harvestPlot(plotIndex: number) {
    const plot = this.plots()[plotIndex];
    const status = (plot.status || '').toLowerCase();
    if (status !== 'ready' || !plot.crop) {
      this.showToast('Cây chưa chín để thu hoạch!');
      return;
    }

    const cropKey = plot.crop;
    const cropConfig = CROP_CATALOG.find(c => c.id === cropKey);
    const gainedCoins = cropConfig ? Math.round(cropConfig.price * 1.5) : 15;
    const gainedXp = cropConfig ? cropConfig.price * 2 : 20;

    // Tăng XP, Coins
    this.xp.update(x => x + gainedXp);
    this.coins.update(c => c + gainedCoins);

    // Cộng nông sản
    this.inventory.update(inv => ({
      ...inv,
      harvested: {
        ...inv.harvested,
        [cropKey]: (inv.harvested[cropKey] || 0) + 1
      }
    }));

    // Reset ô đất
    this.plots.update(list => list.map((p, idx) => idx === plotIndex ? {
      ...p,
      status: 'empty',
      crop: undefined,
      isWatered: false,
      growthProgress: 0
    } : p));

    this.showToast(`✨ Thu hoạch ${cropConfig?.nameVi || 'nông sản'} thành công! +${gainedXp} XP, +${gainedCoins} Xu 🪙`);

    if (this.isApiConnected()) {
      this.api.harvestPlot(plotIndex).subscribe({
        next: () => this.refreshProfile(),
        error: (err) => console.warn('Lỗi ghi nhận thu hoạch lên backend:', err)
      });
    }
  }

  // Cart & Shop
  addToCart(item: ShopItem) {
    if (item.cat === 'seeds' && item.cropKey && !this.isCropUnlocked(item.cropKey)) {
      const lockInfo = this.getCropLockInfo(item.cropKey);
      this.showToast(`🔒 Hạt giống "${item.name}" đang bị khóa! ${lockInfo.missingReasons.join(' & ')}`);
      return;
    }

    this.cart.update(list => {
      const existing = list.find(c => c.item.id === item.id);
      if (existing) {
        return list.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...list, { item, qty: 1 }];
    });
    this.showToast(`Đã thêm "${item.name}" vào giỏ hàng`);
  }

  checkoutCart() {
    const total = this.cartTotal();
    if (this.coins() < total) {
      this.showToast(`Không đủ Xu! Cần ${total} Xu, bạn có ${this.coins()} Xu.`);
      return false;
    }

    this.coins.update(c => c - total);

    // Bơm đồ vào kho
    this.cart().forEach(({ item, qty }) => {
      if (item.cat === 'seeds' && item.cropKey) {
        this.inventory.update(inv => ({
          ...inv,
          seeds: { ...inv.seeds, [item.cropKey!]: (inv.seeds[item.cropKey!] || 0) + qty }
        }));
      } else if (item.id === 'c_water') {
        this.inventory.update(inv => ({
          ...inv,
          care: { ...inv.care, water: inv.care.water + (qty * 3) }
        }));
      } else if (item.id === 'c_fert') {
        this.inventory.update(inv => ({
          ...inv,
          care: { ...inv.care, fertilizer: inv.care.fertilizer + qty }
        }));
      }
    });

    this.cart.set([]);
    this.showToast(`🎉 Thanh toán thành công! Trừ ${total} Xu.`);
    return true;
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
    this.showToast(`🔊 Phát âm: "${text}"`);
  }
}
