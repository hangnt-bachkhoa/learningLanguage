export interface CropCatalog {
  id: string;
  nameVi: string;
  seedNameVi: string;
  shopId: string;
  price: number; // Giá mua hạt
  sellPrice: number; // Giá bán nông sản tại Chợ (~1.6x - 1.8x seedPrice)
  duration: string;
  growthMinutes: number; // Thời gian sinh trưởng tính bằng phút (Rule 2)
  usage: string;
  desc: string;
  initialSeeds: number;
  initialHarvested: number;
  matureSvg: string;
  emblemSvg: string;
  // Phân cấp hạt giống & Điều kiện mở khóa 4 tầng
  tier: 1 | 2 | 3 | 4; // 1: Mầm non, 2: Hoa trái, 3: Làm vườn, 4: Thượng hạng
  tierNameVi: string;
  minLevel: number; // Điều kiện Level thay cho XP
  requiredLevel: number;
  requiredXp?: number;
  requiredLessonId?: number;
  requiredLessonCode?: string;
  requiredLessonTitle?: string;
}

export type PlotStatus = 'locked' | 'empty' | 'seeded' | 'growing' | 'ready';

export interface FarmPlot {
  id: number;
  index: number;
  status: PlotStatus;
  crop?: string;
  isWatered: boolean;
  isFertilized?: boolean;
  growthProgress: number; // 0..100
  plantedAt?: Date | string;
  plantedAtUtc?: string; // Mốc thời gian gieo hạt theo chuẩn UTC ISO (Rule 1)
  growthStartedAtUtc?: string; // Mốc thời gian bắt đầu tính giờ khi đã đủ Nước & Phân bón
  harvestableAtUtc?: string; // Mốc thời gian chín sẵn sàng thu hoạch (Rule 1 & 3)
}

export interface UserInventory {
  seeds: Record<string, number>;
  harvested: Record<string, number>;
  care: {
    water: number;
    fertilizer: number;
    speedFertilizer?: number;
  };
  decor: Record<string, number>;
}

export interface PlannerBook {
  id: string;
  title: string;
  moduleType: string;
  coverColor: string;
  learned: number;
  total: number;
  unlocked: boolean;
  unlockCondition?: string;
  note?: string;
}

export interface VocabularyWord {
  id: number;
  lessonId: number;
  word: string;
  phonetic?: string;
  ipaUs?: string;
  wordType: string;
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
  spriteKey: string;
  learned: boolean;
}

export interface QuizQuestion {
  id: number;
  lessonId: number;
  prompt: string;
  spriteKey: string;
  options: string[];
  correctIndex: number;
}

export interface ShopItem {
  id: string;
  cat: 'seeds' | 'care' | 'decor' | 'bundle';
  name: string;
  price: number;
  sprite: string;
  duration: string;
  usage: string;
  desc: string;
  cropKey?: string;
  tier?: number;
  tierNameVi?: string;
  requiredLevel?: number;
  requiredXp?: number;
  requiredLessonId?: number;
  requiredLessonTitle?: string;
}

export interface CartItem {
  item: ShopItem;
  qty: number;
}

export interface ReviewSchedule {
  lessonId: number;
  title: string;
  date: string;
  firstDone: boolean;
  day1Done: boolean;
  day3Done: boolean;
  day7Done: boolean;
  day14Done: boolean;
}

export interface ToastMessage {
  id: number;
  text: string;
}

export type ReviewStage = 0 | 1 | 2 | 3 | 4; // 0: First, 1: D1, 2: D3, 3: D7, 4: D14 (Mastered)

export interface UserVocabReview {
  vocabId: number;
  word?: string;
  topicId: string;
  learnedDate: string;      // YYYY-MM-DD (UTC+7) — groups words into daily cohort rows
  stage: ReviewStage;       // starts at 0 when marked "Đã học"
  nextReviewDate: string;   // YYYY-MM-DD (UTC+7)
  lastReviewedDate: string; // YYYY-MM-DD (UTC+7)
  d1Done: boolean;
  d3Done: boolean;
  d7Done: boolean;
  d14Done: boolean;
}

export interface DailyCohortRow {
  index: number;
  learnedDate: string;
  count: number;
  words: UserVocabReview[];
  firstDone: boolean;
  day1Status: 'done' | 'due' | 'upcoming';
  day1DueCount?: number;
  day1NextDate?: string;
  day3Status: 'done' | 'due' | 'upcoming';
  day3DueCount?: number;
  day3NextDate?: string;
  day7Status: 'done' | 'due' | 'upcoming';
  day7DueCount?: number;
  day7NextDate?: string;
  day14Status: 'done' | 'due' | 'upcoming';
  day14DueCount?: number;
  day14NextDate?: string;
}

export type QuestEventType =
  | 'VOCAB_LEARNED'
  | 'GRAMMAR_STUDIED'
  | 'REVIEW_COMPLETED'
  | 'QUIZ_PASSED_2STAR'
  | 'FARM_CARE_ACTION'
  | 'CROP_HARVESTED';

export type QuestStatus = 'IN_PROGRESS' | 'COMPLETED_UNCLAIMED' | 'CLAIMED';

export interface DailyQuestItem {
  id: string;
  slot: 1 | 2 | 3;
  titleVi: string;
  eventType: QuestEventType;
  currentCount: number;
  targetCount: number;
  status: QuestStatus;
  routeTarget: string;
  rewards: {
    water?: number;
    baseFertilizer?: number;
    randomTierSeed?: number;
  };
}

export interface DailyQuestState {
  dateVn: string;
  quests: DailyQuestItem[];
  chestClaimed: boolean;
  loggedEventRefs: string[];
  currentStreak: number;
  lastStreakDateVn: string | null;
}

