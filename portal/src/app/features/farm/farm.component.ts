import { Component, inject, signal, computed, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { GameStateService, getPlotUnlockRequirement, PlotUnlockRequirement } from '../../core/services/game-state.service';
import { FARM_ASSETS } from '../../core/constants/farm-assets.constant';
import { CROP_CATALOG } from '../../core/constants/crop-catalog.constant';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';
import { FarmPlot } from '../../core/models/game.models';
import { computePlotCountdown, PlotCountdownResult } from '../../core/utils/growth-countdown.util';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';

@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [CommonModule, RouterLink, SafeHtmlPipe, PixelIconComponent],
  template: `
    <div class="farm-screen">
      <!-- Header với 2 Tab điều hướng: Vườn của tôi | Cây trồng -->
      <div class="screen-header">
        <h2 class="serif-title">Nông trại</h2>
        <div class="farm-tabs">
          <button class="farm-tab" [class.active]="activeTab() === 'garden'" (click)="activeTab.set('garden')">
            Vườn của tôi
          </button>
          <button class="farm-tab" [class.active]="activeTab() === 'catalog'" (click)="activeTab.set('catalog')">
            Cây trồng
          </button>
        </div>

        <!-- Thanh công cụ Lưu trữ / Sao lưu / Khôi phục dữ liệu Web App -->
        <div class="storage-bar">
          <span class="storage-label">Dữ liệu máy:</span>
          <button class="storage-btn" (click)="state.exportBackupJson()" title="Tải file english-farm-backup.json về máy">
            Xuất sao lưu
          </button>
          <label class="storage-btn storage-upload-btn" title="Chọn file .json đã sao lưu trước đó">
            Nạp sao lưu
            <input type="file" accept=".json" (change)="onFileImport($event)" style="display:none;" />
          </label>
          <button class="storage-btn storage-reset" (click)="confirmReset()" title="Xóa dữ liệu để chơi lại từ đầu" style="display:inline-flex; align-items:center; gap:4px;">
            <app-pixel-icon name="icon_retry" [size]="12"></app-pixel-icon>
            <span>Đặt lại</span>
          </button>
        </div>
      </div>

      <!-- TAB 1: VƯỜN CỦA TÔI -->
      @if (activeTab() === 'garden') {
        <!-- Khung nông trại chính (Lưới đất 2D phẳng 3x3) -->
        <div class="vintage-card farm-container">
          <div class="farm-grid-3x3">
            @for (plot of state.plots(); track plot.id; let idx = $index) {
              @let isSelected = selectedPlotIndex() === idx;
              @let status = (plot.status || '').toLowerCase();
              @let cd = getPlotCountdown(plot);
              @let baseSvg = getPlotBaseAsset(plot);

              <div
                class="soil-slot plot-tile"
                [class.selected]="isSelected"
                [class.slot-empty]="status === 'empty'"
                [class.slot-seeded]="status === 'seeded'"
                [class.slot-growing]="status === 'growing'"
                [class.locked]="status === 'locked'"
                [class.ready]="status === 'ready'"
                (click)="handlePlotClick(idx)">
                
                <!-- 1. Nền đất SVG 16x16 Pixel Art (plot_empty, plot_wet, plot_seeded, plot_locked) -->
                <img
                  [src]="baseSvg"
                  class="plot-base-tile pixel-sprite"
                  alt="Plot Tile"
                  width="96"
                  height="96"
                />

                <!-- 2. Overlay Layer: Sprout (3 giai đoạn), Care badges, hoặc Mature Crop -->
                @if (status === 'growing') {
                  <div class="sprout-overlay">
                    <img
                      [src]="getGrowthStageAsset(cd.progress)"
                      class="stage-sprout-sprite pixel-sprite"
                      alt="Giai đoạn sinh trưởng"
                      width="56"
                      height="56"
                    />
                  </div>
                } @else if (status === 'seeded') {
                  @if (plot.isWatered && !plot.isFertilized) {
                    <span class="care-badge care-watered" title="Đã tưới nước - Cần bón phân lót">
                      <app-pixel-icon name="icon_dew_drop" [size]="14"></app-pixel-icon>
                    </span>
                  } @else if (!plot.isWatered && plot.isFertilized) {
                    <span class="care-badge care-fertilized" title="Đã bón phân lót - Cần tưới nước">
                      <app-pixel-icon name="icon_leaf_badge" [size]="14"></app-pixel-icon>
                    </span>
                  }
                } @else if (status === 'ready' && plot.crop) {
                  <div class="mature-overlay">
                    <img
                      [src]="'assets/farm-assets/crops/' + plot.crop + '.png'"
                      class="pixel-sprite crop-ready-sprite"
                      [alt]="getCropName(plot.crop)"
                      width="48"
                      height="48"
                    />
                  </div>
                  <span class="ready-sparkle">
                    <app-pixel-icon name="icon_sparkle" [size]="16"></app-pixel-icon>
                  </span>
                }

                <!-- 3. Nhãn phân biệt tên & icon cây trồng rõ ràng cho từng loại -->
                @if (plot.crop && (status === 'seeded' || status === 'growing' || status === 'ready')) {
                  <div class="crop-badge-tag" [class.ready-badge]="status === 'ready'">
                    <span class="tag-icon">
                      <img [src]="'assets/farm-assets/crops/' + plot.crop + '.png'" class="plot-tag-thumb pixel-sprite" [alt]="getCropName(plot.crop)" />
                    </span>
                    <span class="tag-name">{{ getCropName(plot.crop) }}</span>
                  </div>
                }

                <!-- 4. Thanh tiến độ sinh trưởng mỏng -->
                @if (plot.crop && (status === 'seeded' || status === 'growing')) {
                  <div class="growth-bar-wrap" title="Tiến độ lớn: {{ cd.progress }}%">
                    <div class="growth-bar-fill" [style.width.%]="cd.progress"></div>
                  </div>
                }

                <!-- 5. Bottom Status Pill (Khóa: 50 Xu, Trống: Trống, Cần chăm sóc: Cần Nước & Phân, Đang lớn: mm:ss, Chín: Thu hoạch!) -->
                <div class="bottom-status-pill" [class.status-locked]="status === 'locked'" [class.status-ready]="status === 'ready'" [class.status-empty]="status === 'empty'" [class.status-seeded]="status === 'seeded'">
                  @if (status === 'locked') {
                    <span>{{ getPlotLockedPillText(idx) }}</span>
                  } @else if (status === 'empty') {
                    <span>Trống</span>
                  } @else if (status === 'ready') {
                    <span>Thu hoạch!</span>
                  } @else if (status === 'seeded') {
                    <span>{{ getSeededPillText(plot) }}</span>
                  } @else {
                    <span>{{ cd.label }}</span>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- KHUNG TRẠNG THÁI Ô ĐẤT (PLOT INSPECTOR CARD) -->
        @if (selectedPlot(); as plot) {
          @let status = selectedPlotStatus();
          @let cd = selectedPlotCountdown();

          <div class="vintage-card plot-inspector-card" [ngClass]="'state-' + status">
            <!-- Hàng Header: Icon trạng thái + Tiêu đề + Vị trí ô -->
            <div class="inspector-header">
              <div class="inspector-icon-wrap">
                @if (status === 'empty') {
                  <img src="assets/sprites/plots/plot_empty.svg" class="inspector-sprite pixel-sprite" alt="Đất trống" width="40" height="40" />
                } @else if (status === 'seeded') {
                  <img src="assets/sprites/plots/plot_seeded.svg" class="inspector-sprite pixel-sprite" alt="Hạt mới gieo" width="40" height="40" />
                } @else if (status === 'growing') {
                  <img [src]="getGrowthStageAsset(cd.progress)" class="inspector-sprite pixel-sprite" alt="Đang sinh trưởng" width="40" height="40" />
                } @else if (status === 'ready') {
                  <img [src]="'assets/farm-assets/crops/' + plot.crop + '.png'" class="inspector-sprite pixel-sprite" [alt]="getCropName(plot.crop)" width="40" height="40" />
                } @else if (status === 'locked') {
                  <img src="assets/sprites/plots/plot_locked.svg" class="inspector-sprite pixel-sprite" alt="Ô bị khóa" width="40" height="40" />
                }
              </div>

              <div class="inspector-title-col">
                <div class="inspector-top-badge">
                  <span class="plot-number-pill">Ô #{{ selectedPlotIndex() + 1 }}</span>
                  @if (status === 'empty') {
                    <span class="inspector-meta-status meta-empty">Đất trống</span>
                  } @else if (status === 'seeded') {
                    <span class="inspector-meta-status meta-seeded">Chờ chăm sóc</span>
                  } @else if (status === 'growing') {
                    <span class="inspector-meta-status meta-growing">{{ cd.label }} ({{ cd.progress }}%)</span>
                  } @else if (status === 'ready') {
                    <span class="inspector-meta-status meta-ready">Đã chín vàng!</span>
                  } @else if (status === 'locked') {
                    <span class="inspector-meta-status meta-locked">Chưa khai hoang</span>
                  }
                </div>

                <h3 class="inspector-crop-name">
                  @if (status === 'empty') {
                    Sẵn sàng gieo hạt
                  } @else if (status === 'locked') {
                    Ô đất đang khóa
                  } @else {
                    {{ getCropName(plot.crop) }}
                  }
                </h3>
                
                <p class="inspector-hint">
                  @if (status === 'empty') {
                    Chọn một túi hạt giống bên dưới để gieo xuống ô đất này.
                  } @else if (status === 'seeded') {
                    Chờ kích hoạt thời gian sinh trưởng (cần cả Nước & Phân bón).
                  } @else if (status === 'growing') {
                    Cây đang sinh trưởng tươi tốt. Có thể dùng Phân bón tăng tốc để rút ngắn thời gian.
                  } @else if (status === 'ready') {
                    Vụ mùa đã hoàn thành! Thu hoạch ngay để nhận Xu và điểm kinh nghiệm XP.
                  } @else if (status === 'locked') {
                    Yêu cầu: {{ getPlotUnlockRequirementText(selectedPlotIndex()) }}.
                  }
                </p>
              </div>
            </div>

            <!-- BODY TƯƠNG TÁC THEO TỪNG TRẠNG THÁI -->

            <!-- 1. EMPTY: SEED PACKET PICKER -->
            @if (status === 'empty') {
              <div class="inspector-body-empty">
                @if (ownedSeedPackets().length > 0) {
                  <div class="seed-picker-label-row">
                    <span class="picker-lead-title">Túi hạt giống trong kho:</span>
                    <span class="picker-total-badge">{{ totalSeedCount() }} túi hạt</span>
                  </div>

                  <div class="owned-seeds-grid">
                    @for (seed of ownedSeedPackets(); track seed.cropId) {
                      @let isSelectedSeed = state.selectedSeed() === seed.cropId;
                      <button
                        type="button"
                        class="seed-chip-btn"
                        [class.selected]="isSelectedSeed"
                        (click)="state.selectedSeed.set(seed.cropId)">
                        <div class="kraft-seed-packet">
                          <div class="packet-top-fold"></div>
                          <div class="packet-window">
                            <img [src]="'assets/farm-assets/crops/' + seed.cropId + '.png'" class="seed-pixel-thumb pixel-art" [alt]="seed.nameVi" />
                          </div>
                        </div>
                        <div class="seed-chip-info">
                          <span class="seed-chip-name">{{ seed.nameVi }}</span>
                          <span class="seed-chip-qty">×{{ seed.quantity }}</span>
                        </div>
                      </button>
                    }
                  </div>

                  <div class="inspector-action-row">
                    <button
                      type="button"
                      class="btn btn-primary plant-cta-btn"
                      (click)="plantSelectedSeedOnCurrentPlot()">
                      <app-pixel-icon name="icon_sprout_action" [size]="16"></app-pixel-icon>
                      <span>Gieo hạt {{ getSelectedSeedName() }} (Còn {{ getSelectedSeedQty() }})</span>
                    </button>
                  </div>
                } @else {
                  <div class="empty-seeds-box">
                    <p class="empty-seeds-msg">Hết hạt giống — Ghé Cửa hàng để bổ sung thêm túi hạt!</p>
                    <a routerLink="/shop" class="btn btn-secondary shop-link-btn">
                      <app-pixel-icon name="icon_cart" [size]="14"></app-pixel-icon>
                      <span>Ghé Cửa hàng</span>
                    </a>
                  </div>
                }
              </div>
            }

            <!-- 2. SEEDED: CARE STATUS PILLS & CARE CTAS -->
            @if (status === 'seeded') {
              <div class="inspector-body-seeded">
                <div class="care-pills-row">
                  <span class="care-status-pill" [class.done]="plot.isWatered" [class.needed]="!plot.isWatered">
                    {{ plot.isWatered ? '✓ Đã tưới nước' : '○ Cần tưới nước' }}
                  </span>
                  <span class="care-status-pill" [class.done]="plot.isFertilized" [class.needed]="!plot.isFertilized">
                    {{ plot.isFertilized ? '✓ Đã bón lót' : '○ Cần bón lót' }}
                  </span>
                </div>

                <div class="inspector-action-row">
                  @if (!plot.isWatered) {
                    <button
                      type="button"
                      class="btn btn-primary care-cta-btn water-btn"
                      [disabled]="state.inventory().care.water <= 0"
                      (click)="waterSelectedPlot()">
                      <app-pixel-icon name="icon_dew_drop" [size]="15"></app-pixel-icon>
                      <span>Tưới nước ngay (Còn {{ state.inventory().care.water }})</span>
                    </button>
                  } @else if (!plot.isFertilized) {
                    <button
                      type="button"
                      class="btn btn-primary care-cta-btn fertilize-btn"
                      [disabled]="state.inventory().care.fertilizer <= 0"
                      (click)="fertilizeSelectedPlot()">
                      <app-pixel-icon name="icon_leaf_badge" [size]="15"></app-pixel-icon>
                      <span>Bón lót ngay (Còn {{ state.inventory().care.fertilizer }})</span>
                    </button>
                  }
                </div>
              </div>
            }

            <!-- 3. GROWING: PROGRESS BAR & SPEED CTA -->
            @if (status === 'growing') {
              <div class="inspector-body-growing">
                <div class="growth-track-row">
                  <div class="growth-bar-shell">
                    <div class="growth-bar-fill-live" [style.width.%]="cd.progress"></div>
                  </div>
                  <span class="growth-percent-text">{{ cd.progress }}%</span>
                </div>

                <div class="inspector-action-row">
                  <button
                    type="button"
                    class="btn btn-speed-cta"
                    [disabled]="(state.inventory().care.speedFertilizer || 0) === 0"
                    (click)="speedFertilizeSelectedPlot()">
                    <app-pixel-icon name="icon_sparkle" [size]="15"></app-pixel-icon>
                    <span>Dùng Tăng tốc (-5') (Còn {{ state.inventory().care.speedFertilizer || 0 }})</span>
                  </button>
                </div>
                @if ((state.inventory().care.speedFertilizer || 0) === 0) {
                  <p class="speed-hint-note">Hết Phân bón tăng tốc. Nhận thêm từ Quiz 2★+ hoặc Cửa hàng.</p>
                }
              </div>
            }

            <!-- 4. READY: HIGH-CONTRAST HARVEST CTA -->
            @if (status === 'ready') {
              <div class="inspector-body-ready">
                <div class="inspector-action-row">
                  <button
                    type="button"
                    class="btn harvest-cta-primary-btn"
                    (click)="harvestSelectedPlot()">
                    <app-pixel-icon name="icon_check" [size]="16"></app-pixel-icon>
                    <span>Thu hoạch ngay (+{{ getCropHarvestCoins(plot.crop) }} Xu, +{{ getCropHarvestXp(plot.crop) }} XP)</span>
                  </button>
                </div>
              </div>
            }

            <!-- 5. LOCKED: UNLOCK BUTTON -->
            @if (status === 'locked') {
              <div class="inspector-body-locked">
                <div class="inspector-action-row">
                  <button
                    type="button"
                    class="btn btn-primary unlock-cta-btn"
                    (click)="openUnlockModal(selectedPlotIndex())">
                    <app-pixel-icon name="icon_padlock" [size]="16"></app-pixel-icon>
                    <span>Mở khóa ô đất</span>
                  </button>
                </div>
              </div>
            }
          </div>
        }

        <!-- 5 NÚT THAO TÁC NÔNG TRẠI (ACTION DOCK) -->
        <div class="action-dock">
          <button
            type="button"
            class="action-card"
            [class.active]="state.selectedTool() === 'plant'"
            (click)="onDockAction('plant')">
            <div class="action-icon" [innerHTML]="assets.seedBag | safeHtml"></div>
            <span class="action-label">Gieo hạt</span>
            <span class="action-count">({{ totalSeedCount() }})</span>
          </button>

          <button
            type="button"
            class="action-card"
            [class.active]="state.selectedTool() === 'water'"
            (click)="onDockAction('water')">
            <div class="action-icon" [innerHTML]="assets.wateringCan | safeHtml"></div>
            <span class="action-label">Tưới</span>
            <span class="action-count">({{ state.inventory().care.water }})</span>
          </button>

          <button
            type="button"
            class="action-card"
            [class.active]="state.selectedTool() === 'fertilize'"
            (click)="onDockAction('fertilize')">
            <div class="action-icon" [innerHTML]="assets.fertilizerSack | safeHtml"></div>
            <span class="action-label">Bón lót</span>
            <span class="action-count">({{ state.inventory().care.fertilizer }})</span>
          </button>

          <button
            type="button"
            class="action-card"
            [class.active]="state.selectedTool() === 'speed_fertilizer'"
            (click)="onDockAction('speed_fertilizer')">
            <div class="action-icon" [innerHTML]="assets.speedFertilizer | safeHtml"></div>
            <span class="action-label">Tăng tốc</span>
            <span class="action-count">({{ state.inventory().care.speedFertilizer || 0 }})</span>
          </button>

          <button
            type="button"
            class="action-card"
            [class.active]="state.selectedTool() === 'harvest'"
            (click)="onDockAction('harvest')">
            <div class="action-icon" [innerHTML]="assets.harvestBasket | safeHtml"></div>
            <span class="action-label">Thu hoạch</span>
            <span class="action-count">({{ readyPlotsCount() }})</span>
          </button>
        </div>
      } @else {
        <!-- TAB 2: DANH MỤC CÂY TRỒNG (CROP CATALOG) -->
        <div class="catalog-list">
          @for (crop of catalogList; track crop.id) {
            @let isUnlocked = state.isCropUnlocked(crop.id);
            @let lockInfo = state.getCropLockInfo(crop.id);

            <div class="vintage-card crop-catalog-card" [class.crop-locked-card]="!isUnlocked">
              <div class="catalog-icon" [innerHTML]="crop.icon | safeHtml"></div>
              <div class="catalog-body">
                <div class="catalog-header">
                  <div class="title-tier-group">
                    <h4 class="catalog-name">{{ crop.nameVi }}</h4>
                    <span class="tier-badge tier-{{ lockInfo.tier }}">{{ lockInfo.tierName }}</span>
                  </div>
                  <span class="catalog-badge">{{ crop.growthTime }}</span>
                </div>
                <p class="catalog-desc">{{ crop.desc }}</p>

                <!-- Trạng thái mở khóa & Yêu cầu -->
                <div class="catalog-lock-status">
                  @if (isUnlocked) {
                    <span class="lock-status-pill unlocked" style="display:inline-flex; align-items:center; gap:4px;">
                      <app-pixel-icon name="icon_check" [size]="12"></app-pixel-icon>
                      <span>Đã mở khóa</span>
                    </span>
                  } @else {
                    <span class="lock-status-pill locked">
                      <app-pixel-icon name="icon_padlock" [size]="14"></app-pixel-icon> Cần Lv.{{ lockInfo.requiredLevel }}
                      @if (lockInfo.requiredLessonTitle) {
                        & Mở bài "{{ lockInfo.requiredLessonTitle }}"
                      }
                    </span>
                  }
                </div>

                <div class="catalog-meta">
                  <span class="meta-tag gold"><app-pixel-icon name="icon_coin" [size]="14"></app-pixel-icon> Bán: +{{ crop.coins }} Xu</span>
                  <span class="meta-tag olive"><app-pixel-icon name="icon_star" [size]="13"></app-pixel-icon> Thưởng: +{{ crop.xp }} XP</span>
                  <span class="meta-tag">Kho: {{ state.inventory().seeds[crop.id] || 0 }} túi hạt</span>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- MODAL MỞ KHÓA Ô ĐẤT #5 - #9 (RULE 5) -->
      @if (selectedLockedPlotIndex() !== null) {
        @let req = getPlotReq();
        <div class="unlock-plot-backdrop" (click)="selectedLockedPlotIndex.set(null)"></div>
        <div class="vintage-card unlock-plot-modal">
          <div class="modal-header">
            <h3 class="modal-title"><app-pixel-icon name="icon_padlock" [size]="18"></app-pixel-icon> Mở Khóa Ô Đất #{{ (selectedLockedPlotIndex() || 0) + 1 }}</h3>
            <button class="modal-close-btn" (click)="selectedLockedPlotIndex.set(null)">
              <app-pixel-icon name="icon_cross" [size]="14"></app-pixel-icon>
            </button>
          </div>
          <p class="modal-desc">Chọn 1 trong 2 phương thức để mở rộng diện tích canh tác:</p>

          <div class="unlock-options-stack">
            <!-- Cách 1: Bằng Xu -->
            <div class="unlock-option-card">
              <div class="option-info">
                <span class="option-badge coin-badge">Cách 1: Tiền tệ</span>
                <h4 class="option-name"><app-pixel-icon name="icon_coin" [size]="16"></app-pixel-icon> {{ req?.coinPrice }} Xu</h4>
                <p class="option-hint">Hiện có: {{ state.coins() }} Xu</p>
              </div>
              <button
                class="btn btn-primary btn-sm"
                [disabled]="state.coins() < (req?.coinPrice || 0)"
                (click)="unlockWithCoins()">
                Mở bằng Xu
              </button>
            </div>

            <!-- Cách 2: Bằng Level + Nông sản -->
            <div class="unlock-option-card">
              <div class="option-info">
                <span class="option-badge farm-badge">Cách 2: Nông nghiệp</span>
                <h4 class="option-name">
                  Lv.{{ req?.minLevel }}
                  @for (c of req?.requiredCrops; track c.cropId) {
                    + {{ c.qty }}x {{ c.cropNameVi }}
                  }
                </h4>
                <p class="option-hint">
                  Level: Lv.{{ state.level() }}/{{ req?.minLevel }}
                  @for (c of req?.requiredCrops; track c.cropId) {
                    · {{ c.cropNameVi }}: {{ state.inventory().harvested[c.cropId] || 0 }}/{{ c.qty }}
                  }
                </p>
              </div>
              <button
                class="btn btn-secondary btn-sm"
                [disabled]="!canUnlockPlotWithCrops(req)"
                (click)="unlockWithCrops()">
                Mở bằng Nông sản
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .farm-screen {
      max-width: 520px;
      margin: 0 auto;
      padding-bottom: 30px;
    }
    .screen-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .serif-title {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      color: var(--navy);
    }
    .farm-tabs {
      display: flex;
      background: #E8DFC8;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px;
      width: 100%;
      max-width: 280px;
    }
    .farm-tab {
      flex: 1;
      padding: 7px 14px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 999px;
      color: var(--ink-muted);
      cursor: pointer;
      transition: all 0.15s;
    }
    .farm-tab.active {
      background: var(--navy);
      color: #FFFDF9;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    }
    /* Storage bar sao lưu & khôi phục */
    .storage-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #F4EFE6;
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 3px 10px;
      font-size: 11px;
    }
    .storage-label {
      font-weight: 700;
      color: var(--navy);
      font-size: 11px;
    }
    .storage-btn {
      background: #FFFDF8;
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      padding: 3px 9px;
      font-size: 11px;
      font-weight: 600;
      color: var(--ink);
      cursor: pointer;
      transition: all 0.12s;
    }
    .storage-btn:hover {
      background: #EFE4D2;
      border-color: var(--olive);
    }
    .storage-upload-btn {
      display: inline-flex;
      align-items: center;
    }
    .storage-reset {
      color: #9C2738;
      border-color: #E2B6BC;
      background: #FFF5F6;
    }
    .storage-reset:hover {
      background: #FCE6E8;
    }
    /* Pixel Sprite Rendering */
    .pixel-sprite {
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
      user-select: none;
      pointer-events: none;
    }

    /* Khung đất nông trại Top-Down 3x3 */
    .farm-container {
      background: #E8DFC8;
      border: 2px solid #D9C8B5;
      border-radius: 18px;
      padding: 16px;
      box-shadow: 0 8px 24px rgba(38, 56, 71, 0.08);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 16px;
      max-width: 420px;
      width: 100%;
      box-sizing: border-box;
    }
    .farm-grid-3x3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      width: 100%;
      box-sizing: border-box;
    }
    .soil-slot, .plot-tile {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 12px;
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-sizing: border-box;
      background: transparent;
      box-shadow: 0 3px 8px rgba(74, 50, 29, 0.2);
      transition: transform 0.12s ease, box-shadow 0.12s ease;
    }
    .soil-slot:hover, .plot-tile:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 12px rgba(74, 50, 29, 0.3);
    }
    .soil-slot.selected, .plot-tile.selected {
      box-shadow: 0 0 0 2.5px #E8D7A8, 0 0 0 4.5px #263847 !important;
      z-index: 6;
      transform: translateY(-2px);
    }
    .soil-slot.locked, .plot-tile.locked {
      cursor: pointer;
    }
    .soil-slot.ready, .plot-tile.ready {
      animation: gentleReadyGlow 1.8s infinite alternate ease-in-out;
    }
    @keyframes gentleReadyGlow {
      from { box-shadow: 0 3px 8px rgba(74, 50, 29, 0.2); }
      to { box-shadow: 0 0 14px rgba(228, 180, 60, 0.85); }
    }
    .plot-base-tile {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      border-radius: 10px;
      z-index: 1;
    }
    .sprout-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 58%;
      height: 58%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      pointer-events: none;
    }
    .sprout-overlay svg, .stage-sprout-sprite {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .care-badge {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
      z-index: 3;
      pointer-events: none;
      filter: drop-shadow(0 1px 3px rgba(0,0,0,0.35));
    }
    .moisture-badge {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      z-index: 2;
      pointer-events: none;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
    }
    .mature-overlay {
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 58%;
      height: 58%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      pointer-events: none;
    }
    .crop-ready-sprite {
      width: 100%;
      height: 100%;
      max-width: 48px;
      max-height: 48px;
      object-fit: contain;
    }
    .ready-sparkle {
      position: absolute;
      top: 4px;
      right: 4px;
      font-size: 13px;
      z-index: 4;
      animation: spinSparkle 2s infinite linear;
    }
    @keyframes spinSparkle {
      0% { transform: scale(0.9) rotate(0deg); }
      50% { transform: scale(1.2) rotate(180deg); }
      100% { transform: scale(0.9) rotate(360deg); }
    }
    /* ================= PLOT INSPECTOR CARD ================= */
    .plot-inspector-card {
      padding: 14px 16px;
      margin-bottom: 14px;
      border-radius: 14px;
      background: #FFFDF9;
      border: 1.5px solid var(--border);
      box-shadow: 0 3px 10px rgba(38, 56, 71, 0.05);
      transition: all 0.2s ease;
    }
    .plot-inspector-card.state-ready {
      border-color: #78815D;
      background: #FAF8F2;
    }
    .plot-inspector-card.state-seeded {
      border-color: #D9C8B5;
    }
    .plot-inspector-card.state-growing {
      border-color: #89A37A;
    }
    .plot-inspector-card.state-locked {
      background: #F8F5EE;
      opacity: 0.95;
    }

    .inspector-header {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 10px;
    }
    .inspector-icon-wrap {
      width: 46px;
      height: 46px;
      background: #F3ECE0;
      border: 1.5px solid #D9C8B5;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .inspector-sprite {
      max-width: 36px;
      max-height: 36px;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .inspector-title-col {
      flex: 1;
      min-width: 0;
    }
    .inspector-top-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 3px;
    }
    .plot-number-pill {
      font-size: 11px;
      font-weight: 700;
      color: var(--navy);
      background: #EAE2D2;
      padding: 2px 7px;
      border-radius: 999px;
    }
    .inspector-meta-status {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 999px;
    }
    .meta-empty { background: #EFE9DB; color: #695E54; }
    .meta-seeded { background: #FFF1D6; color: #8A5B15; }
    .meta-growing { background: #E4F0DC; color: #376127; }
    .meta-ready { background: #D9EBD5; color: #2E5C25; }
    .meta-locked { background: #EAE5DB; color: #73695D; }

    .inspector-crop-name {
      font-family: var(--font-serif);
      font-size: 16.5px;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 3px;
      line-height: 1.2;
    }
    .inspector-hint {
      font-size: 12px;
      color: var(--ink-muted);
      margin: 0;
      line-height: 1.35;
    }

    /* Seed Picker inside Inspector */
    .seed-picker-label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .picker-lead-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--navy);
    }
    .picker-total-badge {
      font-size: 11px;
      font-weight: 600;
      color: var(--olive);
      background: #EFF5EB;
      padding: 2px 8px;
      border-radius: 999px;
    }
    .owned-seeds-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
      gap: 6px;
      margin-bottom: 10px;
      max-height: 170px;
      overflow-y: auto;
      padding-right: 2px;
    }
    .seed-chip-btn {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 8px;
      background: #FFFDF9;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      text-align: left;
      transition: all 0.15s ease;
    }
    .seed-chip-btn:hover {
      background: #F9F5EC;
      border-color: #B5A593;
    }
    .seed-chip-btn.selected {
      background: #FBF2F3;
      border-color: var(--rose);
      box-shadow: 0 0 0 1.5px var(--rose);
    }
    .seed-chip-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .seed-chip-name {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--navy);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .seed-chip-qty {
      font-size: 11px;
      color: var(--ink-muted);
      font-variant-numeric: tabular-nums;
    }

    /* Kraft Seed Packet Pixel Art */
    .kraft-seed-packet {
      position: relative;
      width: 26px;
      height: 30px;
      background: #C49A71;
      border: 1.5px solid #3B2D24;
      border-radius: 3px;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      flex-shrink: 0;
    }
    .packet-top-fold {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: #B5885C;
      border-bottom: 1px dashed #8C6339;
    }
    .packet-window {
      width: 16px;
      height: 16px;
      background: #FFFDF8;
      border: 1px solid #A8815B;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 3px;
    }
    .seed-pixel-thumb {
      width: 13px;
      height: 13px;
      display: block;
      image-rendering: pixelated;
      object-fit: contain;
    }

    /* Seeded care pills */
    .care-pills-row {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .care-status-pill {
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .care-status-pill.done {
      background: #E8F3E5;
      color: #2F631E;
      border: 1px solid #C4E3B5;
    }
    .care-status-pill.needed {
      background: #FFF3DB;
      color: #8F570B;
      border: 1px solid #F5D398;
    }

    /* Growing progress live */
    .growth-track-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .growth-bar-shell {
      flex: 1;
      height: 10px;
      background: #EAE2D2;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid #D9C8B5;
    }
    .growth-bar-fill-live {
      height: 100%;
      background: linear-gradient(90deg, #78815D, #8FA368);
      border-radius: 999px;
      transition: width 0.3s ease;
    }
    .growth-percent-text {
      font-size: 12px;
      font-weight: 700;
      color: var(--navy);
      min-width: 38px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .speed-hint-note {
      font-size: 11px;
      color: var(--ink-muted);
      margin: 6px 0 0;
      font-style: italic;
    }

    /* Action Buttons in Inspector */
    .inspector-action-row {
      display: flex;
      gap: 8px;
    }
    .inspector-action-row .btn {
      width: 100%;
      padding: 10px 14px;
      font-size: 13.5px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
    }

    /* High-contrast Thu hoạch ngay button */
    .harvest-cta-primary-btn {
      background: #78815D !important;
      color: #FFFDF9 !important;
      border: 1.5px solid #57613E !important;
      box-shadow: 0 3px 8px rgba(120, 129, 93, 0.4) !important;
    }
    .harvest-cta-primary-btn:hover {
      background: #68714E !important;
      transform: translateY(-1px);
    }
    .harvest-cta-primary-btn:active {
      transform: translateY(1px);
    }

    .plant-cta-btn {
      background: var(--rose) !important;
      color: #FFFDF9 !important;
      border: 1.5px solid #8C4E54 !important;
      box-shadow: 0 2px 6px rgba(166, 94, 101, 0.35) !important;
    }
    .plant-cta-btn:hover {
      background: #964E55 !important;
    }

    .care-cta-btn {
      background: #263847 !important;
      color: #FFFDF9 !important;
      border: 1.5px solid #182531 !important;
      box-shadow: 0 2px 6px rgba(38, 56, 71, 0.3) !important;
    }
    .care-cta-btn:hover:not([disabled]) {
      background: #334A5E !important;
    }
    .care-cta-btn[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .btn-speed-cta {
      background: #F3ECE0 !important;
      color: var(--navy) !important;
      border: 1.5px solid #C9B8A2 !important;
    }
    .btn-speed-cta:hover:not([disabled]) {
      background: #EAE0D0 !important;
    }
    .btn-speed-cta[disabled] {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .unlock-cta-btn {
      background: #8A6D3B !important;
      color: #FFFDF9 !important;
      border: 1.5px solid #634C24 !important;
    }
    .unlock-cta-btn:hover {
      background: #785E32 !important;
    }

    .empty-seeds-box {
      text-align: center;
      padding: 10px;
      background: #FAF6EF;
      border-radius: 8px;
      border: 1px dashed var(--border);
    }
    .empty-seeds-msg {
      font-size: 12.5px;
      color: var(--ink-muted);
      margin: 0 0 8px;
    }
    .shop-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      font-size: 12.5px;
      font-weight: 700;
      text-decoration: none;
      background: #FFFDF9;
      color: var(--navy);
      border: 1px solid var(--border-strong);
      border-radius: 6px;
    }
    /* 5 Thao tác canh tác */
    .action-dock {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 6px;
      margin-bottom: 14px;
    }
    .action-card {
      background: #FCF9F2;
      border: 1px solid var(--border-strong);
      border-radius: 12px;
      padding: 10px 4px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      cursor: pointer;
      transition: all 0.15s;
    }
    .action-card:hover {
      background: #F3ECE0;
      transform: translateY(-1px);
    }
    .action-card.active {
      background: #F3E4E5;
      border-color: var(--rose);
      box-shadow: 0 0 0 2px var(--rose);
    }
    .action-icon {
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
    }
    .action-icon img, .action-icon svg {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .action-icon .kraft-seed-packet {
      max-height: 100%;
      flex-shrink: 0;
    }
    .action-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--navy);
    }
    .action-count {
      font-size: 10.5px;
      color: var(--ink-muted);
      font-weight: 600;
    }
    /* Nhãn phân biệt cây trồng */
    .crop-badge-tag {
      position: absolute;
      top: 4px;
      left: 4px;
      z-index: 4;
      background: rgba(255, 253, 248, 0.94);
      border: 1px solid var(--border-strong, #8C6F56);
      border-radius: 999px;
      padding: 1px 5px;
      display: flex;
      align-items: center;
      gap: 3px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.12);
      pointer-events: none;
      max-width: 85%;
    }
    .crop-badge-tag.ready-badge {
      background: #FFF5D6;
      border-color: #E5A912;
    }
    .tag-icon {
      width: 13px;
      height: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .plot-tag-thumb {
      width: 12px;
      height: 12px;
      object-fit: contain;
    }
    .tag-name {
      font-size: 9px;
      font-weight: 700;
      color: var(--navy, #263847);
      letter-spacing: -0.2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Thanh tiến độ sinh trưởng mỏng */
    .growth-bar-wrap {
      position: absolute;
      bottom: 23px;
      left: 8px;
      right: 8px;
      height: 4px;
      background: rgba(45, 28, 14, 0.55);
      border-radius: 999px;
      overflow: hidden;
      z-index: 4;
      border: 0.5px solid rgba(255, 255, 255, 0.4);
    }
    .growth-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #6FA848, #A3E062);
      border-radius: 999px;
      transition: width 0.35s ease;
    }

    /* Bottom Status Pill */
    .bottom-status-pill {
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(248, 244, 235, 0.94);
      border: 1px solid var(--border-strong, #8C6F56);
      border-radius: 999px;
      padding: 1.5px 7px;
      font-size: 10px;
      font-weight: 700;
      color: var(--navy, #263847);
      white-space: nowrap;
      pointer-events: none;
      z-index: 5;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      font-family: monospace;
      letter-spacing: -0.2px;
      line-height: 1.2;
    }
    .bottom-status-pill.status-ready {
      background: #78815D;
      color: #FFFDF9;
      border-color: #555E3E;
      font-family: var(--font-sans, inherit);
      font-weight: 800;
      animation: pulseHarvest 1.4s infinite alternate ease-in-out;
    }
    .bottom-status-pill.status-empty {
      background: rgba(255, 253, 249, 0.9);
      color: #8C7862;
      border-color: #CBB9A3;
      font-family: var(--font-sans, inherit);
    }
    .bottom-status-pill.status-seeded {
      background: #F3EBD9;
      color: #8C5B28;
      border-color: #BA966E;
      font-family: var(--font-sans, inherit);
      font-size: 9px;
      font-weight: 700;
    }
    .bottom-status-pill.status-locked {
      background: #5C5346;
      color: #E8D7A8;
      border-color: #3B2D24;
      font-family: var(--font-sans, inherit);
      font-weight: 800;
    }
    @keyframes pulseHarvest {
      from { transform: translateX(-50%) scale(0.96); }
      to { transform: translateX(-50%) scale(1.05); }
    }
    /* Thanh chọn hạt giống */
    .seed-picker-strip {
      background: #F4EFE5;
      border: 1px solid var(--border-strong);
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .picker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }
    .picker-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy);
    }
    .picker-sub {
      font-size: 11px;
      color: var(--ink-muted);
    }
    .seed-options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
      gap: 8px;
    }
    .seed-card-btn {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 9px;
      background: #FFFDF9;
      border: 1.5px solid var(--border-strong);
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.15s;
      text-align: left;
    }
    .seed-card-btn:hover {
      background: #FFF7EB;
      border-color: var(--olive);
      transform: translateY(-1px);
    }
    .seed-card-btn.active {
      background: #EFF5E9;
      border-color: #557A46;
      box-shadow: 0 0 0 2px rgba(85, 122, 70, 0.35);
    }
    .seed-card-btn.empty-seed {
      opacity: 0.55;
      background: #F3ECE2;
    }
    .seed-icon {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .seed-picker-thumb {
      width: 20px;
      height: 20px;
      object-fit: contain;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
    }
    .seed-lock-glyph {
      font-size: 13px;
      line-height: 1;
    }
    .seed-meta {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
      overflow: hidden;
    }
    .seed-name {
      font-size: 11px;
      font-weight: 700;
      color: var(--navy);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .seed-qty {
      font-size: 10px;
      color: var(--olive);
      font-weight: 600;
    }
    .seed-qty.zero {
      color: #A65E65;
    }
    .seed-card-btn.seed-locked {
      background: #F2ECE1;
      border: 1px dashed #C8B8A0;
      opacity: 0.72;
    }
    .seed-card-btn.seed-locked:hover {
      background: #EFE4D2;
      border-color: #A88F6D;
    }
    .seed-lock-tag {
      font-size: 9.5px;
      font-weight: 700;
      color: #9C2738;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    /* Tab Danh mục cây trồng (Catalog) */
    .catalog-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .crop-catalog-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 16px;
    }
    .crop-catalog-card.crop-locked-card {
      background: #FAF6ED;
      border: 1px dashed #CBBBA2;
      opacity: 0.88;
    }
    .title-tier-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tier-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 1.5px 7px;
      border-radius: 999px;
      background: #E4D8C3;
      color: var(--navy);
      letter-spacing: 0.2px;
    }
    .tier-badge.tier-1 {
      background: #E6F0DC;
      color: #3E6328;
    }
    .tier-badge.tier-2 {
      background: #FFF0D6;
      color: #8C5913;
    }
    .tier-badge.tier-3 {
      background: #FBE6EA;
      color: #9C2738;
    }
    .tier-badge.tier-4 {
      background: #EAE6FB;
      color: #4C3299;
    }
    .catalog-lock-status {
      margin-bottom: 8px;
    }
    .lock-status-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      display: inline-block;
    }
    .lock-status-pill.unlocked {
      background: #EDF7E8;
      color: #2F631E;
      border: 1px solid #C4E3B5;
    }
    .lock-status-pill.locked {
      background: #FBECEC;
      color: #8F2232;
      border: 1px solid #ECC4C8;
    }
    .catalog-icon {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .catalog-body {
      flex: 1;
    }
    .catalog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .catalog-name {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy);
    }
    .catalog-badge {
      font-size: 11px;
      font-weight: 600;
      color: var(--ink-muted);
      background: #EAE2D2;
      padding: 2px 8px;
      border-radius: 999px;
    }
    .catalog-desc {
      font-size: 12px;
      color: var(--ink-muted);
      margin-bottom: 8px;
    }
    .catalog-meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .meta-tag {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 4px;
      background: #EAE2D2;
      color: var(--navy);
    }
    .meta-tag.gold {
      background: #FFF4D9;
      color: #7A5B17;
    }
    .meta-tag.olive {
      background: var(--olive-soft);
      color: #4C5435;
    }

    /* ================= RESPONSIVE MOBILE (< 480px) ================= */
    @media (max-width: 480px) {
      .farm-screen {
        padding-left: 2px;
        padding-right: 2px;
        max-width: 100%;
      }
      .screen-header {
        gap: 8px;
        margin-bottom: 12px;
      }
      .serif-title {
        font-size: 20px;
      }
      .farm-tabs {
        max-width: 100%;
      }
      .storage-bar {
        flex-wrap: wrap;
        justify-content: center;
        border-radius: 12px;
        padding: 6px 8px;
        gap: 4px;
      }
      .storage-btn {
        padding: 3px 7px;
        font-size: 10px;
      }
      .farm-container {
        padding: 8px;
        border-radius: 14px;
        margin-bottom: 12px;
        max-width: 390px;
        width: 100%;
      }
      .farm-grid-3x3 {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
        gap: 6px;
        width: 100%;
        max-width: 390px;
      }
      .soil-slot, .plot-tile {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
      }
      .sprout-overlay, .mature-overlay {
        width: 58%;
        height: 58%;
      }
      .crop-badge-tag {
        top: 2px;
        left: 2px;
        padding: 0.5px 3.5px;
      }
      .tag-name {
        font-size: 8px;
      }
      .growth-bar-wrap {
        bottom: 17px;
        left: 5px;
        right: 5px;
        height: 3px;
      }
      .bottom-status-pill {
        font-size: 8.5px;
        padding: 1px 5px;
        bottom: 3px;
      }
      .empty-plus {
        font-size: 16px;
      }
      .empty-label {
        font-size: 8px;
      }
      .action-dock {
        gap: 4px;
        margin-bottom: 12px;
      }
      .action-card {
        padding: 5px 1px 4px;
        border-radius: 8px;
      }
      .action-icon {
        height: 32px;
        margin-bottom: 2px;
      }
      .action-label {
        font-size: 10px;
        white-space: nowrap;
      }
      .action-count {
        font-size: 9px;
      }
      .plot-inspector-card {
        padding: 12px;
        margin-bottom: 12px;
      }
      .owned-seeds-grid {
        grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
        gap: 5px;
      }
      .seed-chip-btn {
        padding: 5px 6px;
        gap: 6px;
      }
      .inspector-action-row .btn {
        padding: 9px 12px;
        font-size: 12.5px;
      }
      .crop-catalog-card {
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
        gap: 10px;
      }
      .catalog-icon {
        width: 48px;
        height: 48px;
      }
    }

    /* Modal Mở Khóa Ô Đất #5 - #9 (Rule 5) */
    .unlock-plot-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(20, 32, 44, 0.55);
      backdrop-filter: blur(3px);
      z-index: 210;
    }
    .unlock-plot-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 440px;
      z-index: 220;
      padding: 22px 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .modal-title {
      font-family: var(--font-serif);
      font-size: 19px;
      font-weight: 700;
      color: var(--navy);
      margin: 0;
    }
    .modal-close-btn {
      font-size: 16px;
      font-weight: 700;
      color: var(--ink-muted);
      cursor: pointer;
      border: none;
      background: none;
    }
    .modal-desc {
      font-size: 12.5px;
      color: var(--ink-muted);
      margin-bottom: 14px;
    }
    .unlock-options-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .unlock-option-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      background: #FAF6EF;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
    }
    .option-info {
      flex: 1;
    }
    .option-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      margin-bottom: 3px;
    }
    .coin-badge {
      background: #FFF3D6;
      color: #7A5B0B;
    }
    .farm-badge {
      background: #E8EFE3;
      color: #385E2B;
    }
    .option-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 2px;
    }
    .option-hint {
      font-size: 11px;
      color: var(--ink-muted);
      margin: 0;
    }
  `]
})
export class FarmComponent implements OnInit {
  state = inject(GameStateService);
  assets = FARM_ASSETS;
  soilBackground = FARM_ASSETS.tilledSoil;
  private destroyRef = inject(DestroyRef);

  activeTab = signal<'garden' | 'catalog'>('garden');
  selectedLockedPlotIndex = signal<number | null>(null);
  selectedPlotIndex = signal<number>(0);

  // 1. Strict Seed-Only Counter (không cộng nhầm inventory.harvested)
  readonly totalSeedCount = computed(() =>
    Object.values(this.state.inventory().seeds).reduce((sum, qty) => sum + (qty ?? 0), 0)
  );

  // 2. Owned Seed Packets (chỉ lấy hạt giống có quantity > 0)
  readonly ownedSeedPackets = computed(() => {
    const seeds = this.state.inventory().seeds;
    return CROP_CATALOG
      .filter(c => (seeds[c.id] ?? 0) > 0)
      .map(c => ({
        cropId: c.id,
        nameVi: c.nameVi,
        seedNameVi: c.seedNameVi || `Hạt giống ${c.nameVi}`,
        quantity: seeds[c.id] ?? 0,
        duration: c.duration,
        growthMinutes: c.growthMinutes || 5
      }));
  });

  // 3. Selected Plot & Reactive State
  readonly selectedPlot = computed<FarmPlot | null>(() => {
    const plots = this.state.plots();
    const idx = this.selectedPlotIndex();
    return plots[idx] ?? plots[0] ?? null;
  });

  readonly selectedPlotStatus = computed<'empty' | 'seeded' | 'growing' | 'ready' | 'locked'>(() => {
    return ((this.selectedPlot()?.status || 'empty').toLowerCase()) as any;
  });

  readonly selectedPlotCountdown = computed<PlotCountdownResult>(() => {
    const plot = this.selectedPlot();
    if (!plot) return { status: 'empty', progress: 0, remainingSeconds: 0, label: 'Trống', isReady: false };
    return this.getPlotCountdown(plot);
  });

  getPlotBaseAsset(plot: FarmPlot): string {
    const status = (plot.status || '').toLowerCase();
    if (status === 'locked') {
      return 'assets/sprites/plots/plot_locked.svg';
    }
    if (status === 'empty') {
      return 'assets/sprites/plots/plot_empty.svg';
    }
    if (status === 'seeded') {
      return plot.isWatered ? 'assets/sprites/plots/plot_wet.svg' : 'assets/sprites/plots/plot_seeded.svg';
    }
    if (status === 'growing') {
      return plot.isWatered ? 'assets/sprites/plots/plot_wet.svg' : 'assets/sprites/plots/plot_empty.svg';
    }
    if (status === 'ready') {
      return plot.isWatered ? 'assets/sprites/plots/plot_wet.svg' : 'assets/sprites/plots/plot_empty.svg';
    }
    return 'assets/sprites/plots/plot_empty.svg';
  }

  getPlotLockedPillText(plotIndex: number): string {
    const req = getPlotUnlockRequirement(plotIndex);
    return req?.coinPrice ? `${req.coinPrice} Xu` : 'Khóa';
  }

  getPlotUnlockRequirementText(plotIndex: number): string {
    const req = getPlotUnlockRequirement(plotIndex);
    if (!req) return '50 Xu';
    const parts: string[] = [];
    if (req.coinPrice) parts.push(`${req.coinPrice} Xu`);
    if (req.minLevel) parts.push(`Cấp độ ${req.minLevel}`);
    if (req.requiredCrops && req.requiredCrops.length > 0) {
      const cropReqs = req.requiredCrops.map(c => `${c.qty}x ${c.cropNameVi}`).join(', ');
      parts.push(cropReqs);
    }
    return parts.join(' hoặc ') || '50 Xu';
  }

  ngOnInit() {
    // Khởi tạo và đồng bộ trạng thái sinh trưởng ban đầu
    this.state.recalculatePlotStates();

    // Tự động chọn ô cần chú ý nhất (Chín > Cần tưới/bón > Đang lớn > Trống)
    const plots = this.state.plots();
    const readyIdx = plots.findIndex(p => (p.status || '').toLowerCase() === 'ready');
    if (readyIdx !== -1) {
      this.selectedPlotIndex.set(readyIdx);
    } else {
      const seededIdx = plots.findIndex(p => (p.status || '').toLowerCase() === 'seeded');
      if (seededIdx !== -1) {
        this.selectedPlotIndex.set(seededIdx);
      } else {
        const growingIdx = plots.findIndex(p => (p.status || '').toLowerCase() === 'growing');
        if (growingIdx !== -1) {
          this.selectedPlotIndex.set(growingIdx);
        } else {
          this.selectedPlotIndex.set(0);
        }
      }
    }

    // Đảm bảo selectedSeed đang trỏ vào hạt có sẵn
    this.ensureValidSelectedSeed();

    // Vòng lặp đếm ngược 1 giây thời gian thực (Rule 4 & 5)
    // Tự động dọn dẹp khi Component destroy qua takeUntilDestroyed
    interval(1000).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.state.recalculatePlotStates();
    });
  }

  private ensureValidSelectedSeed() {
    const seeds = this.state.inventory().seeds;
    const current = this.state.selectedSeed();
    if ((seeds[current] ?? 0) <= 0) {
      const firstOwned = this.ownedSeedPackets()[0];
      if (firstOwned) {
        this.state.selectedSeed.set(firstOwned.cropId);
      }
    }
  }

  getPlotCountdown(plot: FarmPlot): PlotCountdownResult {
    const cropConfig = CROP_CATALOG.find(c => c.id === plot.crop);
    const growthMinutes = cropConfig?.growthMinutes || 5;
    return computePlotCountdown(
      plot.plantedAtUtc,
      plot.harvestableAtUtc,
      growthMinutes,
      this.state.serverClockOffsetMs()
    );
  }

  seedOptions = CROP_CATALOG.map(c => ({
    id: c.id,
    name: c.nameVi,
    icon: c.id
  }));

  catalogList = CROP_CATALOG.map(c => ({
    id: c.id,
    nameVi: c.nameVi,
    growthTime: c.duration,
    coins: c.price * 2,
    xp: c.requiredXp || 20,
    desc: c.desc,
    icon: c.matureSvg
  }));

  getGrowthStageAsset(progress: number): string {
    if (progress <= 33) return 'assets/sprites/stages/stage_1_sprout_tiny.svg';
    if (progress <= 66) return 'assets/sprites/stages/stage_2_sprout_leafy.svg';
    return 'assets/sprites/stages/stage_3_budding.svg';
  }

  getSeededPillText(plot: FarmPlot): string {
    if (!plot.isWatered && !plot.isFertilized) return 'Cần Nước & Phân';
    if (!plot.isWatered) return 'Cần Nước tưới';
    if (!plot.isFertilized) return 'Cần Phân bón';
    return 'Đang nảy mầm';
  }

  getCropName(cropKey?: string): string {
    if (!cropKey) return 'Cây trồng';
    const key = cropKey.toLowerCase();
    const cat = CROP_CATALOG.find(c => c.id === key);
    if (cat) return cat.nameVi;
    const legacyNames: Record<string, string> = {
      sunflower: 'Bí ngô',
      tulip: 'Lúa mì',
      rose: 'Việt quất',
      kiwi: 'Dưa hấu'
    };
    return legacyNames[key] || cropKey;
  }

  getCropHarvestCoins(cropKey?: string): number {
    if (!cropKey) return 15;
    const cat = CROP_CATALOG.find(c => c.id === cropKey.toLowerCase());
    return cat ? Math.round(cat.price * 1.5) : 15;
  }

  getCropHarvestXp(cropKey?: string): number {
    if (!cropKey) return 20;
    const cat = CROP_CATALOG.find(c => c.id === cropKey.toLowerCase());
    return cat ? cat.price * 2 : 20;
  }

  getSelectedSeedName(): string {
    const id = this.state.selectedSeed();
    const cat = CROP_CATALOG.find(c => c.id === id);
    return cat?.nameVi || id;
  }

  getSelectedSeedQty(): number {
    const id = this.state.selectedSeed();
    return this.state.inventory().seeds[id] || 0;
  }

  readyPlotsCount(): number {
    return this.state.plots().filter(p => (p.status || '').toLowerCase() === 'ready').length;
  }

  // Click vào ô trong lưới 3x3: Cập nhật selectedPlotIndex & PlotInspectorCard
  handlePlotClick(index: number) {
    const isAlreadySelected = this.selectedPlotIndex() === index;
    this.selectedPlotIndex.set(index);
    const plot = this.state.plots()[index];
    if (!plot) return;
    const status = (plot.status || '').toLowerCase();

    if (status === 'locked') {
      this.selectedLockedPlotIndex.set(index);
      return;
    }

    // Nếu bấm lại vào ô chín đã chọn -> tiện tay thu hoạch luôn
    if (isAlreadySelected && status === 'ready') {
      this.harvestSelectedPlot();
    }
  }

  // 4. Đồng bộ 2 chiều với Action Dock (Tự động nhảy đến ô phù hợp)
  onDockAction(action: 'plant' | 'water' | 'fertilize' | 'speed_fertilizer' | 'harvest') {
    this.state.selectedTool.set(action);
    const plots = this.state.plots();
    const currentIdx = this.selectedPlotIndex();
    const currentPlot = plots[currentIdx];
    const currentStatus = (currentPlot?.status || '').toLowerCase();

    // THAO TÁC 1: GIEO HẠT
    if (action === 'plant') {
      if (currentStatus === 'empty') {
        this.plantSelectedSeedOnCurrentPlot();
      } else {
        const emptyIdx = plots.findIndex(p => (p.status || '').toLowerCase() === 'empty');
        if (emptyIdx === -1) {
          this.state.showToast('Tất cả ô đất đang được trồng!');
          return;
        }
        this.selectedPlotIndex.set(emptyIdx);
        this.plantSelectedSeedOnCurrentPlot();
      }
      return;
    }

    // THAO TÁC 2: TƯỚI NƯỚC
    if (action === 'water') {
      if (currentStatus === 'seeded' && !currentPlot.isWatered) {
        this.waterSelectedPlot();
      } else {
        const needWaterIdx = plots.findIndex(p => (p.status || '').toLowerCase() === 'seeded' && !p.isWatered);
        if (needWaterIdx !== -1) {
          this.selectedPlotIndex.set(needWaterIdx);
          this.state.waterPlot(needWaterIdx);
        } else {
          this.state.showToast('Không có ô đất nào đang cần tưới nước!');
        }
      }
      return;
    }

    // THAO TÁC 3: BÓN LÓT
    if (action === 'fertilize') {
      if (currentStatus === 'seeded' && !currentPlot.isFertilized) {
        this.fertilizeSelectedPlot();
      } else {
        const needFertIdx = plots.findIndex(p => (p.status || '').toLowerCase() === 'seeded' && !p.isFertilized);
        if (needFertIdx !== -1) {
          this.selectedPlotIndex.set(needFertIdx);
          this.state.fertilizePlot(needFertIdx);
        } else {
          this.state.showToast('Không có ô đất nào đang cần bón lót!');
        }
      }
      return;
    }

    // THAO TÁC 4: TĂNG TỐC
    if (action === 'speed_fertilizer') {
      if (currentStatus === 'growing') {
        this.speedFertilizeSelectedPlot();
      } else {
        const growingIdx = plots.findIndex(p => (p.status || '').toLowerCase() === 'growing');
        if (growingIdx !== -1) {
          this.selectedPlotIndex.set(growingIdx);
          this.state.speedFertilizePlot(growingIdx);
        } else {
          this.state.showToast('Không có cây nào đang trong giai đoạn sinh trưởng!');
        }
      }
      return;
    }

    // THAO TÁC 5: THU HOẠCH
    if (action === 'harvest') {
      if (currentStatus === 'ready') {
        this.harvestSelectedPlot();
      } else {
        const readyIdx = plots.findIndex(p => (p.status || '').toLowerCase() === 'ready');
        if (readyIdx !== -1) {
          this.selectedPlotIndex.set(readyIdx);
          this.state.harvestPlot(readyIdx);
        } else {
          this.state.showToast('Chưa có cây nào chín để thu hoạch!');
        }
      }
      return;
    }
  }

  plantSelectedSeedOnCurrentPlot() {
    const idx = this.selectedPlotIndex();
    const plot = this.state.plots()[idx];
    if (!plot) return;
    const status = (plot.status || '').toLowerCase();
    if (status !== 'empty') {
      this.state.showToast('Ô đất không trống để gieo hạt!');
      return;
    }

    this.ensureValidSelectedSeed();
    const seed = this.state.selectedSeed();
    const currentQty = this.state.inventory().seeds[seed] || 0;
    if (currentQty <= 0) {
      this.state.showToast('Bạn đã hết hạt giống! Hãy ghé Cửa hàng.');
      return;
    }

    this.state.selectedTool.set('plant');
    this.state.plantSeed(idx);
    this.ensureValidSelectedSeed();
  }

  waterSelectedPlot() {
    const idx = this.selectedPlotIndex();
    this.state.selectedTool.set('water');
    this.state.waterPlot(idx);
  }

  fertilizeSelectedPlot() {
    const idx = this.selectedPlotIndex();
    this.state.selectedTool.set('fertilize');
    this.state.fertilizePlot(idx);
  }

  speedFertilizeSelectedPlot() {
    const idx = this.selectedPlotIndex();
    this.state.selectedTool.set('speed_fertilizer');
    this.state.speedFertilizePlot(idx);
  }

  harvestSelectedPlot() {
    const idx = this.selectedPlotIndex();
    this.state.selectedTool.set('harvest');
    this.state.harvestPlot(idx);

    // Sau khi thu hoạch xong, nếu còn ô chín khác -> tự động trỏ đến ô chín tiếp theo
    const nextReadyIdx = this.state.plots().findIndex(p => (p.status || '').toLowerCase() === 'ready');
    if (nextReadyIdx !== -1) {
      this.selectedPlotIndex.set(nextReadyIdx);
    }
  }

  openUnlockModal(idx: number) {
    this.selectedLockedPlotIndex.set(idx);
  }

  getPlotReq(): PlotUnlockRequirement | null {
    const idx = this.selectedLockedPlotIndex();
    if (idx === null) return null;
    return getPlotUnlockRequirement(idx);
  }

  canUnlockPlotWithCrops(req: PlotUnlockRequirement | null): boolean {
    if (!req) return false;
    if (this.state.level() < req.minLevel) return false;
    return req.requiredCrops.every(c => (this.state.inventory().harvested[c.cropId] || 0) >= c.qty);
  }

  unlockWithCoins() {
    const idx = this.selectedLockedPlotIndex();
    if (idx === null) return;
    if (this.state.unlockPlotWithCoins(idx)) {
      this.selectedLockedPlotIndex.set(null);
    }
  }

  unlockWithCrops() {
    const idx = this.selectedLockedPlotIndex();
    if (idx === null) return;
    if (this.state.unlockPlotWithCrops(idx)) {
      this.selectedLockedPlotIndex.set(null);
    }
  }

  onFileImport(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        this.state.importBackupJson(content);
      }
      input.value = '';
    };
    reader.readAsText(file);
  }

  confirmReset() {
    if (confirm('Bạn có chắc chắn muốn đặt lại nông trại và điểm kinh nghiệm về ban đầu không?')) {
      this.state.resetGameToDefault();
    }
  }
}
