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
 * @param isWatered Trạng thái đã tưới nước hay chưa
 * @param isFertilized Trạng thái đã bón phân cơ bản hay chưa
 */
export function computePlotCountdown(
  plantedAtUtc: string | null | undefined,
  harvestableAtUtc: string | null | undefined,
  growthMinutes: number,
  clockOffsetMs: number = 0,
  isWatered: boolean = false,
  isFertilized: boolean = false
): PlotCountdownResult {
  // 1. Nếu chưa có mốc chín (harvestableAtUtc == null): Đang chờ điều kiện chăm sóc bắt buộc (Care-Gated Growth)
  if (!harvestableAtUtc) {
    if (!plantedAtUtc) {
      return {
        isReady: false,
        progress: 0,
        label: 'Trống',
        remainingSeconds: 0,
        status: 'empty'
      };
    }

    let careLabel = 'Cần Nước & Phân';
    if (isWatered && !isFertilized) {
      careLabel = 'Cần Phân bón';
    } else if (!isWatered && isFertilized) {
      careLabel = 'Cần Nước tưới';
    } else if (isWatered && isFertilized) {
      careLabel = 'Đang nảy mầm...';
    }

    return {
      isReady: false,
      progress: 0,
      label: careLabel,
      remainingSeconds: 0,
      status: 'seeded'
    };
  }

  // 2. Đã kích hoạt tính giờ sinh trưởng (status = 'growing' hoặc 'ready')
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

  // Tiến độ từ 1% đến 99%
  const progress = Math.min(99, Math.max(1, Math.floor(((totalSec - remainingSec) / totalSec) * 100)));
  const mm = String(Math.floor(remainingSec / 60)).padStart(2, '0');
  const ss = String(remainingSec % 60).padStart(2, '0');

  return {
    isReady: false,
    progress,
    label: `${mm}:${ss}`,
    remainingSeconds: remainingSec,
    status: 'growing'
  };
}
