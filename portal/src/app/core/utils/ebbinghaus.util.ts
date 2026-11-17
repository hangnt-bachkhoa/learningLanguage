import { UserVocabReview, ReviewStage, DailyCohortRow } from '../models/game.models';

/**
 * Returns today's date formatted as YYYY-MM-DD in Vietnam Timezone (UTC+7).
 */
export function getTodayVnDate(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(date);
  } catch {
    // Fallback if timezone not supported
    const utc7 = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const y = utc7.getUTCFullYear();
    const m = String(utc7.getUTCMonth() + 1).padStart(2, '0');
    const d = String(utc7.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

/**
 * Adds N days to a YYYY-MM-DD date string and returns YYYY-MM-DD.
 */
export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days, 12, 0, 0));
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats YYYY-MM-DD into DD/MM/YYYY.
 */
export function formatVnDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 10) return dateStr;
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

/**
 * Formats YYYY-MM-DD into MM/DD or DD/MM for compact badges.
 */
export function formatShortVnDate(dateStr: string): string {
  if (!dateStr || dateStr.length < 10) return dateStr;
  const [, m, d] = dateStr.split('-');
  return `${d}/${m}`;
}

/**
 * Core Spaced Repetition engine for Language Farm.
 * If passed on first try:
 *   Stage 0 -> 1 (D1), nextReviewDate = +2 days (for Day 3)
 *   Stage 1 -> 2 (D3), nextReviewDate = +4 days (for Day 7)
 *   Stage 2 -> 3 (D7), nextReviewDate = +7 days (for Day 14)
 *   Stage 3 -> 4 (D14 Mastered), nextReviewDate = 9999-12-31
 * If failed first try:
 *   Stage unchanged, reschedule nextReviewDate = +1 day (retry tomorrow)
 *
 * Awards +1 Water and +1 Base Fertilizer (up to 5 times/day).
 */
export function processReviewQuizCompletion(
  reviewedWords: UserVocabReview[],
  firstTryResults: Map<number, boolean>,
  todayVn: string,
  dailyReviewRewardsClaimed: number
) {
  const stageOffsets: Record<number, number> = { 0: 2, 1: 4, 2: 7 }; // days to next milestone

  const updatedReviews = reviewedWords.map(item => {
    const passedFirstTry = firstTryResults.get(item.vocabId) === true;
    if (!passedFirstTry) {
      return {
        ...item,
        lastReviewedDate: todayVn,
        nextReviewDate: addDays(todayVn, 1) // retry tomorrow
      };
    }

    const nextStage = Math.min(4, item.stage + 1) as ReviewStage;
    return {
      ...item,
      stage: nextStage,
      lastReviewedDate: todayVn,
      nextReviewDate: nextStage === 4 ? '9999-12-31' : addDays(todayVn, stageOffsets[item.stage] ?? 1),
      d1Done: item.d1Done || nextStage >= 1,
      d3Done: item.d3Done || nextStage >= 2,
      d7Done: item.d7Done || nextStage >= 3,
      d14Done: item.d14Done || nextStage >= 4
    };
  });

  const canClaimCareReward = dailyReviewRewardsClaimed < 5;
  return {
    updatedReviews,
    waterGained: canClaimCareReward ? 1 : 0,
    baseFertilizerGained: canClaimCareReward ? 1 : 0,
    nextDailyReviewRewardsClaimed: canClaimCareReward ? dailyReviewRewardsClaimed + 1 : dailyReviewRewardsClaimed
  };
}

/**
 * Transforms flat UserVocabReview map into grouped daily cohort rows for Ebbinghaus table.
 */
export function buildDailyCohorts(
  reviews: Record<number, UserVocabReview>,
  todayVn: string
): DailyCohortRow[] {
  const allReviews = Object.values(reviews);
  if (allReviews.length === 0) return [];

  // Group by learnedDate
  const groups: Record<string, UserVocabReview[]> = {};
  for (const r of allReviews) {
    const date = r.learnedDate || todayVn;
    if (!groups[date]) groups[date] = [];
    groups[date].push(r);
  }

  // Sort dates descending (newest first)
  const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return sortedDates.map((date, idx) => {
    const words = groups[date];
    const count = words.length;

    // First learning milestone: all words marked learned have stage >= 0
    const firstDone = true;

    // Helper to compute stage status for this cohort
    // targetStage 1: Day 1 (after stage 0)
    // targetStage 2: Day 3 (after stage 1)
    // targetStage 3: Day 7 (after stage 2)
    // targetStage 4: Day 14 (after stage 3)
    const computeStageStatus = (targetStage: ReviewStage, doneFlagKey: 'd1Done' | 'd3Done' | 'd7Done' | 'd14Done') => {
      const allPassed = words.every(w => w[doneFlagKey] || w.stage >= targetStage);
      if (allPassed) {
        return { status: 'done' as const };
      }

      // Check if any word is ready to be reviewed for this targetStage
      // Words that are currently at stage === targetStage - 1
      const atStageWords = words.filter(w => w.stage === targetStage - 1);
      const dueWords = atStageWords.filter(w => w.nextReviewDate <= todayVn);

      if (dueWords.length > 0) {
        return {
          status: 'due' as const,
          dueCount: dueWords.length
        };
      }

      // Upcoming words
      if (atStageWords.length > 0) {
        // Find nearest nextReviewDate
        const dates = atStageWords.map(w => w.nextReviewDate).sort();
        return {
          status: 'upcoming' as const,
          nextDate: dates[0]
        };
      }

      // Words haven't reached previous stages yet
      return { status: 'upcoming' as const };
    };

    const d1 = computeStageStatus(1, 'd1Done');
    const d3 = computeStageStatus(2, 'd3Done');
    const d7 = computeStageStatus(3, 'd7Done');
    const d14 = computeStageStatus(4, 'd14Done');

    return {
      index: idx + 1,
      learnedDate: date,
      count,
      words,
      firstDone,
      day1Status: d1.status,
      day1DueCount: d1.dueCount,
      day1NextDate: d1.nextDate,
      day3Status: d3.status,
      day3DueCount: d3.dueCount,
      day3NextDate: d3.nextDate,
      day7Status: d7.status,
      day7DueCount: d7.dueCount,
      day7NextDate: d7.nextDate,
      day14Status: d14.status,
      day14DueCount: d14.dueCount,
      day14NextDate: d14.nextDate
    };
  });
}
