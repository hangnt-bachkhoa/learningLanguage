import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../core/services/game-state.service';
import { CROP_CATALOG, SPRITES } from '../../core/constants/crop-catalog.constant';
import { ShopItem } from '../../core/models/game.models';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <div class="shop-page">
      <div class="card-header">
        <div>
          <h2 class="serif-title" style="font-size:22px;">Cửa Hàng Nông Trại (General Store)</h2>
          <span style="font-size:12px;color:var(--ink-muted);">Dùng Xu 🪙 tích lũy từ việc học và thu hoạch để mua vật phẩm</span>
        </div>
        <div class="category-tabs">
          <button class="cat-tab" [class.active]="selectedCat() === 'all'" (click)="selectedCat.set('all')">Tất cả</button>
          <button class="cat-tab" [class.active]="selectedCat() === 'seeds'" (click)="selectedCat.set('seeds')">Hạt giống</button>
          <button class="cat-tab" [class.active]="selectedCat() === 'care'" (click)="selectedCat.set('care')">Chăm sóc</button>
          <button class="cat-tab" [class.active]="selectedCat() === 'decor'" (click)="selectedCat.set('decor')">Trang trí</button>
          <button class="cat-tab" [class.active]="selectedCat() === 'bundle'" (click)="selectedCat.set('bundle')">Gói Combo</button>
          <button class="cat-tab market-tab" [class.active]="selectedCat() === 'market'" (click)="selectedCat.set('market')">🌾 Chợ Nông Sản</button>
        </div>
      </div>

      <!-- CHẾ ĐỘ 1: CHỢ NÔNG SẢN & TRAO ĐỔI VẬT TƯ (END-GAME CROP SINK) -->
      @if (selectedCat() === 'market') {
        <div class="market-exchange-view">
          <!-- 1. BÁN NÔNG SẢN LẤY XU -->
          <div class="vintage-card market-section">
            <div class="section-title-row">
              <span class="section-emoji">🪙</span>
              <div>
                <h3 class="section-heading">Thu Mua Nông Sản (Bán Lấy Xu Vàng)</h3>
                <p class="section-sub">Bán các loại củ quả, hoa trái thu hoạch để tích lũy Xu mua sắm vật phẩm và mở rộng ô đất.</p>
              </div>
            </div>

            <div class="crops-exchange-grid">
              @for (crop of allHarvestedCrops(); track crop.id) {
                @let qty = state.inventory().harvested[crop.id] || 0;
                @let unitPrice = getCropSellPrice(crop.id);

                <div class="vintage-card crop-sell-card" [class.has-stock]="qty > 0">
                  <div class="crop-sell-header">
                    <span class="crop-sell-icon">
                      <img [src]="'assets/farm-assets/crops/' + crop.id + '.png'" class="crop-market-thumb pixel-art" [alt]="crop.nameVi" width="32" height="32" />
                    </span>
                    <div>
                      <h4 class="crop-sell-name">{{ crop.nameVi }}</h4>
                      <span class="crop-sell-price">🪙 +{{ unitPrice }} Xu / củ, quả</span>
                    </div>
                  </div>

                  <div class="crop-stock-row">
                    <span class="stock-label">Trong kho:</span>
                    <span class="stock-qty" [class.zero]="qty === 0"><strong>{{ qty }}</strong> nông sản</span>
                  </div>

                  <div class="crop-sell-actions">
                    <button
                      class="btn btn-secondary btn-sm"
                      [disabled]="qty < 1"
                      (click)="state.sellHarvestedCrop(crop.id, 1)">
                      Bán 1 (+{{ unitPrice }} Xu)
                    </button>
                    @if (qty > 1) {
                      <button
                        class="btn btn-primary btn-sm"
                        (click)="state.sellHarvestedCrop(crop.id, qty)">
                        Bán hết (+{{ unitPrice * qty }} Xu)
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- 2. TRẠM TRAO ĐỔI VẬT TƯ NÔNG NGHIỆP (3 CROPS -> 1 FERTILIZER / 2 CROPS -> 2 WATER) -->
          <div class="vintage-card market-section">
            <div class="section-title-row">
              <span class="section-emoji">⚡</span>
              <div>
                <h3 class="section-heading">Trạm Trao Đổi Vật Tư (Tái Tạo Mùa Vụ)</h3>
                <p class="section-sub">Đổi nông sản dư thừa lấy Phân bón vi sinh (thúc chín tức thì) hoặc Nước tưới cây.</p>
              </div>
            </div>

            <div class="exchange-cards-row">
              <!-- ĐỔI 3 NÔNG SẢN -> 1 PHÂN BÓN -->
              <div class="vintage-card trade-recipe-card">
                <div class="recipe-badge">⚡ Công thức VIP</div>
                <div class="recipe-visual">
                  <span class="recipe-icon">🧺 x3 Nông sản</span>
                  <span class="recipe-arrow">➔</span>
                  <span class="recipe-icon">
                    <img src="assets/farm-assets/tools/fertilizer.png" width="24" height="24" class="pixel-art" style="vertical-align: middle; margin-right: 4px; display: inline-block;" />
                    x1 Phân bón
                  </span>
                </div>
                <h4 class="recipe-title">Đổi 3 Nông sản lấy 1 Phân bón</h4>
                <p class="recipe-desc">Chọn loại nông sản bạn có từ 3 củ/quả trở lên để đổi lấy phân bón tăng tốc:</p>

                <div class="trade-selector-row">
                  <select #fertSelect class="market-select">
                    @for (crop of eligibleForFertilizer(); track crop.id) {
                      <option [value]="crop.id">{{ crop.nameVi }} (có {{ state.inventory().harvested[crop.id] || 0 }})</option>
                    }
                  </select>
                  <button
                    class="btn btn-primary btn-sm"
                    [disabled]="eligibleForFertilizer().length === 0"
                    (click)="state.tradeCropsForFertilizer(fertSelect.value)">
                    Đổi ngay
                  </button>
                </div>
                @if (eligibleForFertilizer().length === 0) {
                  <span class="trade-warn-hint">⚠️ Cần ít nhất 3 củ/quả cùng loại để đổi.</span>
                }
              </div>

              <!-- ĐỔI 2 NÔNG SẢN -> 2 NƯỚC TƯỚI -->
              <div class="vintage-card trade-recipe-card">
                <div class="recipe-badge blue">💧 Công thức thường</div>
                <div class="recipe-visual">
                  <span class="recipe-icon">🧺 x2 Nông sản</span>
                  <span class="recipe-arrow">➔</span>
                  <span class="recipe-icon">
                    <img src="assets/farm-assets/tools/watering_can.png" width="24" height="24" class="pixel-art" style="vertical-align: middle; margin-right: 4px; display: inline-block;" />
                    x2 Nước tưới
                  </span>
                </div>
                <h4 class="recipe-title">Đổi 2 Nông sản lấy 2 Lượt nước</h4>
                <p class="recipe-desc">Chọn loại nông sản bạn có từ 2 củ/quả trở lên để bổ sung nước tưới:</p>

                <div class="trade-selector-row">
                  <select #waterSelect class="market-select">
                    @for (crop of eligibleForWater(); track crop.id) {
                      <option [value]="crop.id">{{ crop.nameVi }} (có {{ state.inventory().harvested[crop.id] || 0 }})</option>
                    }
                  </select>
                  <button
                    class="btn btn-secondary btn-sm"
                    [disabled]="eligibleForWater().length === 0"
                    (click)="state.tradeCropsForWater(waterSelect.value)">
                    Đổi ngay
                  </button>
                </div>
                @if (eligibleForWater().length === 0) {
                  <span class="trade-warn-hint">⚠️ Cần ít nhất 2 củ/quả cùng loại để đổi.</span>
                }
              </div>
            </div>
          </div>
        </div>
      } @else {
        <!-- CHẾ ĐỘ 2: CỬA HÀNG MUA VẬT PHẨM (SEEDS, CARE, DECOR, BUNDLE) -->
        <div class="products-grid">
        @for (prod of filteredProducts(); track prod.id) {
          @let isLocked = prod.cropKey ? !state.isCropUnlocked(prod.cropKey) : false;
          @let lockInfo = prod.cropKey ? state.getCropLockInfo(prod.cropKey) : null;

          <div class="vintage-card product-card" [class.item-locked]="isLocked">
            <!-- Huy hiệu trạng thái -->
            @if (isLocked) {
              <div class="prod-badge lock-badge">
                🔒 {{ lockInfo?.tierName }}
              </div>
            } @else {
              <div class="prod-badge">{{ prod.duration }}</div>
            }

            <div class="prod-sprite" [innerHTML]="getSprite(prod.sprite) | safeHtml"></div>
            <h4 class="prod-title">{{ prod.name }}</h4>
            <p class="prod-desc">{{ prod.desc }}</p>

            <!-- Điều kiện mở khóa nếu bị khóa -->
            @if (isLocked) {
              <div class="prod-lock-hint">
                <span class="lock-req-icon">🔒</span>
                <span class="lock-req-text">
                  Cần Lv.{{ lockInfo?.requiredLevel }}
                  @if (lockInfo?.requiredLessonTitle) {
                    & Mở bài "{{ lockInfo?.requiredLessonTitle }}"
                  }
                </span>
              </div>
            } @else {
              <div class="prod-usage">{{ prod.usage }}</div>
            }

            <div class="prod-footer">
              <span class="price-tag">🪙 {{ prod.price }} Xu</span>
              @if (isLocked) {
                <button
                  class="btn btn-sm btn-locked"
                  (click)="state.showToast('🔒 Hạt giống này đang khóa! ' + (lockInfo?.missingReasons?.join(' & ') || ''))"
                  title="Chưa đủ điều kiện mua">
                  🔒 Chưa mở
                </button>
              } @else {
                <button class="btn btn-primary btn-sm" (click)="state.addToCart(prod)">+ Thêm vào giỏ</button>
              }
            </div>
          </div>
        }
      </div>
      }
    </div>
  `,
  styles: [`
    .category-tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .cat-tab {
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      font-weight: 600;
      font-size: 13px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      color: var(--ink);
    }
    .cat-tab.active {
      background: var(--navy);
      color: #FFFDF9;
      border-color: var(--navy);
    }
    .market-tab {
      background: #EAEFE6;
      border-color: #BACDB0;
      color: #385E2B;
    }
    .market-tab.active {
      background: #385E2B;
      color: #FFFDF9;
      border-color: #385E2B;
    }
    .market-exchange-view {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 14px;
    }
    .market-section {
      padding: 20px;
    }
    .section-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .section-emoji {
      font-size: 28px;
    }
    .section-heading {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 700;
      color: var(--navy);
      margin: 0;
    }
    .section-sub {
      font-size: 12.5px;
      color: var(--ink-muted);
      margin: 2px 0 0;
    }
    .crops-exchange-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
    }
    .crop-sell-card {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #FAF6EE;
      border: 1px solid var(--border);
    }
    .crop-sell-card.has-stock {
      background: #FCF9F2;
      border-color: #C8D8BE;
    }
    .crop-sell-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .crop-sell-icon {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .crop-market-thumb {
      width: 32px;
      height: 32px;
      object-fit: contain;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
    }
    .crop-sell-name {
      font-size: 15px;
      font-weight: 700;
      color: var(--navy);
      margin: 0;
    }
    .crop-sell-price {
      font-size: 11.5px;
      color: #7A5B0B;
      font-weight: 600;
    }
    .crop-stock-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
    }
    .stock-qty.zero {
      color: #A65E65;
    }
    .crop-sell-actions {
      display: flex;
      gap: 6px;
    }
    .exchange-cards-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }
    .trade-recipe-card {
      padding: 18px;
      background: #FAF6EE;
      border: 1.5px solid var(--border);
      position: relative;
    }
    .recipe-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;
      background: #E8EFE3;
      color: #385E2B;
    }
    .recipe-badge.blue {
      background: #E2ECF5;
      color: #265B82;
    }
    .recipe-visual {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 700;
      color: var(--navy);
      margin: 6px 0 10px;
    }
    .recipe-arrow {
      color: var(--ink-muted);
    }
    .recipe-title {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 4px;
    }
    .recipe-desc {
      font-size: 12px;
      color: var(--ink-muted);
      margin-bottom: 12px;
    }
    .trade-selector-row {
      display: flex;
      gap: 8px;
    }
    .market-select {
      flex: 1;
      padding: 6px 10px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-strong);
      background: #FFFDF8;
      font-family: inherit;
      font-size: 12.5px;
      color: var(--navy);
    }
    .trade-warn-hint {
      display: inline-block;
      font-size: 11px;
      color: #9C3848;
      margin-top: 6px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
      margin-top: 14px;
    }
    .product-card {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 20px 16px;
    }
    .prod-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 10.5px;
      font-weight: 600;
      background: #EAE2D2;
      padding: 2px 7px;
      border-radius: 999px;
      color: var(--ink-muted);
    }
    .prod-sprite {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(1.4);
      margin: 10px 0;
    }
    .prod-sprite img {
      max-height: 48px;
      max-width: 48px;
      object-fit: contain;
      image-rendering: pixelated;
    }
    .prod-title {
      font-family: var(--font-serif);
      font-size: 17px;
      font-weight: 700;
      color: var(--navy);
      margin-bottom: 4px;
    }
    .prod-desc {
      font-size: 12px;
      color: var(--ink-muted);
      margin-bottom: 8px;
    }
    .prod-usage {
      font-size: 11.5px;
      background: var(--bg-paper);
      padding: 6px;
      border-radius: 4px;
      color: var(--olive);
      margin-bottom: 16px;
      font-weight: 500;
    }
    .prod-footer {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .price-tag {
      font-weight: 700;
      font-size: 14px;
      color: var(--gold-dark);
    }
    .item-locked {
      background: #F7F3EA;
      border: 1px dashed #C8BBA5;
      opacity: 0.88;
    }
    .item-locked .prod-sprite {
      filter: saturate(0.65) brightness(0.95);
    }
    .lock-badge {
      background: #FBE5E5;
      color: #9C2738;
      border: 1px solid #E8B4B8;
      font-weight: 700;
    }
    .prod-lock-hint {
      font-size: 11px;
      background: #FAF0E4;
      border: 1px solid #E4CEB2;
      padding: 6px 8px;
      border-radius: 6px;
      color: #7D4E1D;
      margin-bottom: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 5px;
      text-align: left;
      line-height: 1.25;
    }
    .btn-locked {
      background: #E2D9CB;
      color: #6C5B48;
      border: 1px solid #C4B5A0;
      cursor: not-allowed;
      font-size: 12px;
      font-weight: 700;
      padding: 5px 10px;
      border-radius: var(--radius-sm);
    }
    .btn-locked:hover {
      background: #D8CEBE;
    }

    /* ================= RESPONSIVE MOBILE (< 600px) ================= */
    @media (max-width: 600px) {
      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
      .products-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .product-card {
        padding: 16px 12px;
      }
    }
  `]
})
export class ShopComponent {
  state = inject(GameStateService);

  selectedCat = signal<string>('all');

  items: ShopItem[] = [
    // --- HẠNG I: MẦM NON (Lv. 1-3) ---
    {
      id: 's_carrot',
      cat: 'seeds',
      name: 'Hạt giống Cà rốt',
      price: 15,
      sprite: 's_carrot',
      duration: '5 phút',
      usage: 'Gieo hạt để thu hoạch Cà rốt mở khóa bài học TOEIC 450.',
      desc: 'Giống cà rốt ngọt giòn cho người mới bắt đầu canh tác.',
      cropKey: 'carrot'
    },
    {
      id: 's_cucumber',
      cat: 'seeds',
      name: 'Hạt giống Dưa chuột',
      price: 12,
      sprite: 's_cucumber',
      duration: '5 phút',
      usage: 'Trồng dưa chuột thanh mát, mau cho trái và thu hồi vốn nhanh.',
      desc: 'Dưa chuột xanh giòn ngọt nước, dễ canh tác và lớn nhanh.',
      cropKey: 'cucumber'
    },
    {
      id: 's_radish',
      cat: 'seeds',
      name: 'Hạt giống Củ cải đỏ',
      price: 14,
      sprite: 's_radish',
      duration: '6 phút',
      usage: 'Trồng củ cải đỏ tròn xoe xinh xắn.',
      desc: 'Củ cải đỏ giàu khoáng chất, màu sắc rực rỡ vui mắt.',
      cropKey: 'radish'
    },
    {
      id: 's_potato',
      cat: 'seeds',
      name: 'Hạt giống Khoai tây',
      price: 15,
      sprite: 's_potato',
      duration: '6 phút',
      usage: 'Thu hoạch khoai tây bùi bở để mở khóa các bài học đời sống.',
      desc: 'Củ khoai tây giàu tinh bột, cây trồng thiết yếu của nông trại.',
      cropKey: 'potato'
    },
    {
      id: 's_corn',
      cat: 'seeds',
      name: 'Hạt giống Bắp ngô',
      price: 18,
      sprite: 's_corn',
      duration: '8 phút',
      usage: 'Thu hoạch bắp ngô vàng để chuẩn bị bước lên TOEIC 600.',
      desc: 'Hạt bắp vàng óng ả, sản lượng dồi dào, giá trị bán cao.',
      cropKey: 'corn'
    },

    // --- HẠNG II: HOA TRÁI (Lv. 4-6) ---
    {
      id: 's_tomato',
      cat: 'seeds',
      name: 'Hạt giống Cà chua',
      price: 22,
      sprite: 's_tomato',
      duration: '10 phút',
      usage: 'Trồng giàn cà chua đỏ mọng nước mở khóa bài học TOEIC 600.',
      desc: 'Nông sản chủ lực mùa vụ, quả mọng đỏ tươi.',
      cropKey: 'tomato'
    },
    {
      id: 's_strawberry',
      cat: 'seeds',
      name: 'Hạt giống Dâu tây',
      price: 25,
      sprite: 's_strawberry',
      duration: '10 phút',
      usage: 'Trồng dâu tây chín đỏ mọng để thu hoạch nông sản giá trị cao.',
      desc: 'Trái dâu tây thơm ngọt thanh tao mang lại nguồn thu lớn.',
      cropKey: 'strawberry'
    },
    {
      id: 's_orange',
      cat: 'seeds',
      name: 'Hạt giống Cam sành',
      price: 26,
      sprite: 's_orange',
      duration: '11 phút',
      usage: 'Trồng cây cam sai quả mọng vàng ươm.',
      desc: 'Cam sành vỏ mỏng mọng nước, giàu vitamin C.',
      cropKey: 'orange'
    },
    {
      id: 's_pumpkin',
      cat: 'seeds',
      name: 'Hạt giống Bí ngô',
      price: 18,
      sprite: 's_pumpkin',
      duration: '12 phút',
      usage: 'Trồng bí ngô vàng cam tròn xoe thu hoạch nhiều nông sản.',
      desc: 'Trái bí ngô tròn vàng cam đậm đà, biểu tượng của mùa vụ bội thu.',
      cropKey: 'pumpkin'
    },
    {
      id: 's_wheat',
      cat: 'seeds',
      name: 'Hạt giống Lúa mì',
      price: 20,
      sprite: 's_wheat',
      duration: '12 phút',
      usage: 'Gieo lúa mì trên ruộng đất màu mỡ cho thu hoạch lớn.',
      desc: 'Những bông lúa mì vàng óng trĩu hạt, biểu tượng của sự no ấm.',
      cropKey: 'wheat'
    },

    // --- HẠNG III: LÀM VƯỜN (Lv. 7-9) ---
    {
      id: 's_lemon',
      cat: 'seeds',
      name: 'Hạt giống Chanh',
      price: 22,
      sprite: 's_lemon',
      duration: '14 phút',
      usage: 'Trồng cây chanh vàng mọng nước cho hương thơm thanh mát.',
      desc: 'Chanh vàng thanh mát, mọng nước giàu dưỡng chất.',
      cropKey: 'lemon'
    },
    {
      id: 's_blueberry',
      cat: 'seeds',
      name: 'Hạt giống Việt quất',
      price: 24,
      sprite: 's_blueberry',
      duration: '14 phút',
      usage: 'Trồng bụi việt quất ngọt thơm mở khóa chuyên đề TOEIC 800.',
      desc: 'Những chùm việt quất tím thẫm mọng nước, giàu chất chống oxy hóa.',
      cropKey: 'blueberry'
    },
    {
      id: 's_peach',
      cat: 'seeds',
      name: 'Hạt giống Đào tiên',
      price: 28,
      sprite: 's_peach',
      duration: '15 phút',
      usage: 'Gieo hạt đào tiên hồng thắm, nông sản cao cấp vùng ôn đới.',
      desc: 'Trái đào hồng nhung thơm ngọt dịu dàng, hương vị thanh tao.',
      cropKey: 'peach'
    },
    {
      id: 's_banana',
      cat: 'seeds',
      name: 'Hạt giống Chuối chín',
      price: 30,
      sprite: 's_banana',
      duration: '15 phút',
      usage: 'Trồng chuối vàng ươm cho năng suất dồi dào.',
      desc: 'Nải chuối vàng ươm giàu năng lượng cho các buổi học tập chuyên sâu.',
      cropKey: 'banana'
    },
    {
      id: 's_watermelon',
      cat: 'seeds',
      name: 'Hạt giống Dưa hấu',
      price: 32,
      sprite: 's_watermelon',
      duration: '16 phút',
      usage: 'Trồng dưa hấu giải nhiệt thanh mát, bán được giá cao tại Chợ.',
      desc: 'Trái dưa hấu vỏ xanh ruột đỏ mọng ngọt, giải khát ngày hè oi ả.',
      cropKey: 'watermelon'
    },

    // --- HẠNG IV: THƯỢNG HẠNG (Lv. 10+) ---
    {
      id: 's_grapes',
      cat: 'seeds',
      name: 'Hạt giống Nho tím',
      price: 38,
      sprite: 's_grapes',
      duration: '18 phút',
      usage: 'Trồng giàn nho tím trĩu quả đồng quê mở bài TOEIC 900.',
      desc: 'Chùm nho tím đậm đà vị ngọt tự nhiên, giá trị kinh tế rất cao.',
      cropKey: 'grapes'
    },
    {
      id: 's_apple',
      cat: 'seeds',
      name: 'Hạt giống Táo đỏ',
      price: 40,
      sprite: 's_apple',
      duration: '18 phút',
      usage: 'Trồng cây táo đỏ trĩu cành, nông sản thượng hạng hàng đầu.',
      desc: 'Táo đỏ giòn ngọt, mang lại nguồn Xu khổng lồ khi bán.',
      cropKey: 'apple'
    },
    {
      id: 's_cherry',
      cat: 'seeds',
      name: 'Hạt giống Cherry',
      price: 50,
      sprite: 's_cherry',
      duration: '20 phút',
      usage: 'Trồng cherry đỏ mọng thượng phẩm đỉnh cao của nông trại.',
      desc: 'Loại quả hoàng gia mang lại giá trị bán cao nhất toàn nông trại.',
      cropKey: 'cherry'
    },

    // --- VẬT PHẨM CHĂM SÓC & DECOR ---
    {
      id: 'c_water',
      cat: 'care',
      name: 'Bình nước tinh khiết (x3)',
      price: 10,
      sprite: 'water',
      duration: 'Dùng ngay',
      usage: 'Cộng +3 lượt tưới nước vào kho đồ.',
      desc: 'Giữ ẩm cho đất nảy mầm nhanh chóng.'
    },
    {
      id: 'c_fert',
      cat: 'care',
      name: 'Phân bón cơ bản (Bón lót)',
      price: 12,
      sprite: 'fertilizer',
      duration: 'Kích hoạt',
      usage: 'Bón lót kích hoạt tính giờ sinh trưởng cho hạt giống mới gieo.',
      desc: 'Cần thiết cùng Nước tưới để hạt bắt đầu tính giờ lớn.'
    },
    {
      id: 'c_speed_fert',
      cat: 'care',
      name: 'Phân bón tăng tốc (VIP)',
      price: 35,
      sprite: 'speed_fertilizer',
      duration: '-5 phút',
      usage: 'Giảm ngay 5 phút sinh trưởng cho cây đang lớn.',
      desc: 'Rút ngắn thời gian chín của cây trồng đang sinh trưởng.'
    },
    {
      id: 'd_lamp',
      cat: 'decor',
      name: 'Đèn lồng khu vườn vintage',
      price: 40,
      sprite: 'lamp',
      duration: 'Vĩnh viễn',
      usage: 'Thắp sáng ấm áp cho mảnh vườn ban đêm.',
      desc: 'Đèn sắt rèn cổ điển phong cách châu Âu.'
    },
    {
      id: 'd_fence',
      cat: 'decor',
      name: 'Hàng rào gỗ mộc (Wooden Fence)',
      price: 60,
      sprite: 'bundle',
      duration: 'Vĩnh viễn',
      usage: 'Hàng rào gỗ thông vintage bảo vệ và làm đẹp khu vườn.',
      desc: 'Thiết kế mộc mạc kiểu trang trại tự nhiên Bắc Âu.'
    },
    {
      id: 'd_scarecrow',
      cat: 'decor',
      name: 'Bù nhìn rơm nông trại (Scarecrow)',
      price: 100,
      sprite: 'lamp',
      duration: 'Vĩnh viễn',
      usage: 'Biểu tượng của vụ mùa bội thu, xua chim chóc khỏi luống đất.',
      desc: 'Bù nhìn rơm thủ công phong cách Naturalist mộc mạc.'
    },
    {
      id: 'b_starter',
      cat: 'bundle',
      name: 'Gói Khởi Đầu Vườn Học',
      price: 50,
      sprite: 'bundle',
      duration: 'Combo ưu đãi',
      usage: 'Nhận 2 Hạt Cà rốt + 3 Nước + 1 Phân bón.',
      desc: 'Gói tiện lợi mở đầu cuộc hành trình.'
    }
  ];

  filteredProducts(): ShopItem[] {
    const cat = this.selectedCat();
    if (cat === 'all') return this.items;
    return this.items.filter(i => i.cat === cat);
  }

  getSprite(key: string): string {
    return SPRITES[key] || SPRITES['bundle'];
  }

  allHarvestedCrops() {
    return CROP_CATALOG.map(c => ({
      id: c.id,
      nameVi: c.nameVi,
      icon: c.id
    }));
  }

  getCropSellPrice(cropId: string): number {
    const crop = CROP_CATALOG.find(c => c.id === cropId);
    if (crop) return crop.sellPrice || Math.round(crop.price * 1.6);
    const legacyPrices: Record<string, number> = {
      sunflower: 32, tulip: 35, rose: 42, kiwi: 56
    };
    return legacyPrices[cropId] || 20;
  }

  eligibleForFertilizer() {
    const harvested = this.state.inventory().harvested;
    return this.allHarvestedCrops().filter(c => (harvested[c.id] || 0) >= 3);
  }

  eligibleForWater() {
    const harvested = this.state.inventory().harvested;
    return this.allHarvestedCrops().filter(c => (harvested[c.id] || 0) >= 2);
  }
}
