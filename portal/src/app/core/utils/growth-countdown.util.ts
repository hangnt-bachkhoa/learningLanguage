/**
 * ENGLISH FARM – REAL-TIME CROP GROWTH & CARE ALGORITHM
 * Thuật toán tính toán độ chín & đếm ngược thời gian thực (Rule 4 & Anti-Tampering)
 */

export interface PlotCountdownResult {
  isReady: boolean;
  progress: number; // 0..100
  label: string; // "mm:ss" hoặc "Thu hoạch!"
  remainingSeconds: number;
  status: 'empty' | 'seeded' | 'growing' | 'ready' | 'locked';
}

/**
 * Tính toán trạng thái sinh trưởng và đếm ngược theo mốc UTC đồng bộ với server
 *
 * @param plantedAtUtc Mốc thời gian gieo hạt UTC (ISO string)
 * @param harvestableAtUtc Mốc thời gian chín sẵn sàng thu hoạch UTC (ISO string)
 * @param growthMinutes Thời gian sinh trưởng của cây (phút)
 * @param clockOffsetMs Độ lệch đồng hồ giữa server và client (chống chỉnh giờ thiết bị)
 */
export function computePlotCountdown(
  plantedAtUtc: string | null | undefined,
  harvestableAtUtc: string | null | undefined,
  growthMinutes: number,
  clockOffsetMs: number = 0
): PlotCountdownResult {
  if (!harvestableAtUtc) {
    return {
      isReady: false,
      progress: 0,
      label: '',
      remainingSeconds: 0,
      status: 'empty'
    };
  }

  const nowMs = Date.now() + clockOffsetMs;
  const harvestMs = new Date(harvestableAtUtc).getTime();
  const totalSec = Math.max(1, (growthMinutes || 5) * 60);
  const remainingSec = Math.max(0, Math.ceil((harvestMs - nowMs) / 1000));

  if (remainingSec === 0) {
    return {
      isReady: true,
      progress: 100,
      label: 'Thu hoạch!',
      remainingSeconds: 0,
      status: 'ready'
    };
  }

  // Tiến độ từ 0% đến 99% (chỉ 100% khi remainingSec === 0)
  const progress = Math.min(99, Math.max(0, Math.floor(((totalSec - remainingSec) / totalSec) * 100)));
  const mm = String(Math.floor(remainingSec / 60)).padStart(2, '0');
  const ss = String(remainingSec % 60).padStart(2, '0');
  const status = progress < 30 ? 'seeded' : 'growing';

  return {
    isReady: false,
    progress,
    label: `${mm}:${ss}`,
    remainingSeconds: remainingSec,
    status
  };
}
