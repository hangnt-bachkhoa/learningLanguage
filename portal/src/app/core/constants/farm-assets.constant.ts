// =========================================================================
// THƯ VIỆN ASSETS VECTOR PIXEL & BOTANICAL CHUẨN 100% THEO THIẾT KẾ MẪU
// =========================================================================

export const FARM_ASSETS = {
  // 1. Ô ĐẤT CANH TÁC 2D TOP-DOWN VỚI VIỀN ĐẤT NÂU (KHÔNG PHẢI 3D NGHIÊNG)
  tilledSoil: `
    <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
      <!-- Lớp đất nền ngoài gờ lồi lõm (Scalloped soil border) -->
      <rect x="0" y="0" width="100" height="100" rx="10" fill="#543A23"/>
      <rect x="3" y="3" width="94" height="94" rx="8" fill="#6B4A2C"/>
      <!-- Lòng luống đất cày xới xốp -->
      <rect x="7" y="7" width="86" height="86" rx="6" fill="#845C37"/>
      <!-- Rãnh luống cày ngang (Furrows) -->
      <rect x="12" y="18" width="76" height="7" rx="3" fill="#614226" opacity="0.75"/>
      <rect x="12" y="34" width="76" height="7" rx="3" fill="#614226" opacity="0.75"/>
      <rect x="12" y="50" width="76" height="7" rx="3" fill="#614226" opacity="0.75"/>
      <rect x="12" y="66" width="76" height="7" rx="3" fill="#614226" opacity="0.75"/>
      <rect x="12" y="80" width="76" height="6" rx="3" fill="#614226" opacity="0.6"/>
      <!-- Hạt đất xốp nổi -->
      <circle cx="20" cy="13" r="3" fill="#A87A50"/>
      <circle cx="50" cy="27" r="3.5" fill="#A87A50"/>
      <circle cx="78" cy="43" r="3" fill="#A87A50"/>
      <circle cx="34" cy="59" r="3.5" fill="#A87A50"/>
      <circle cx="70" cy="74" r="3" fill="#A87A50"/>
    </svg>
  `,

  // 2. GIAI ĐOẠN 1: MỚI GIEO HẠT / SỎI ĐẤT
  seedsOnSoil: `
    <svg viewBox="0 0 70 70" width="100%" height="100%">
      <ellipse cx="26" cy="34" rx="5" ry="3.5" fill="#E8D9BD" stroke="#4A321D" stroke-width="1.8"/>
      <ellipse cx="44" cy="28" rx="5.5" ry="4" fill="#D9C49E" stroke="#4A321D" stroke-width="1.8"/>
      <ellipse cx="46" cy="44" rx="5" ry="3.5" fill="#E8D9BD" stroke="#4A321D" stroke-width="1.8"/>
      <ellipse cx="30" cy="46" rx="4.5" ry="3" fill="#F2E8D5" stroke="#4A321D" stroke-width="1.8"/>
      <circle cx="20" cy="26" r="2.5" fill="#3D2614"/>
      <circle cx="54" cy="35" r="2.5" fill="#3D2614"/>
      <circle cx="36" cy="38" r="2" fill="#3D2614"/>
    </svg>
  `,

  // GIAI ĐOẠN 2: MẦM NON 2 LÁ (SPROUT)
  sprout: `
    <svg viewBox="0 0 70 70" width="100%" height="100%">
      <ellipse cx="35" cy="54" rx="10" ry="4" fill="#382210"/>
      <rect x="33" y="32" width="4" height="22" rx="2" fill="#528231"/>
      <path d="M33 36 C22 34 16 24 18 16 C28 15 34 24 33 36 Z" fill="#75BA3C" stroke="#3D6E18" stroke-width="2"/>
      <circle cx="25" cy="23" r="2" fill="#A6E864"/>
      <path d="M37 36 C48 34 54 24 52 16 C42 15 36 24 37 36 Z" fill="#8CD448" stroke="#3D6E18" stroke-width="2"/>
      <circle cx="45" cy="23" r="2" fill="#BAF777"/>
    </svg>
  `,

  // GIAI ĐOẠN 3: CÂY ĐANG LỚN XUM XUÊ (GROWING BUSH)
  growingPlant: `
    <svg viewBox="0 0 80 80" width="100%" height="100%">
      <ellipse cx="40" cy="62" rx="14" ry="5" fill="#382210"/>
      <path d="M40 56 C22 52 14 36 18 24 C30 22 38 36 40 56 Z" fill="#589B2B" stroke="#335E14" stroke-width="2"/>
      <path d="M40 56 C58 52 66 36 62 24 C50 22 42 36 40 56 Z" fill="#69B535" stroke="#335E14" stroke-width="2"/>
      <path d="M40 56 C34 34 32 16 40 8 C48 16 46 34 40 56 Z" fill="#80D643" stroke="#335E14" stroke-width="2"/>
      <path d="M40 56 C28 44 24 40 32 30 C42 38 40 50 40 56 Z" fill="#9AE354"/>
      <path d="M40 56 C52 44 56 40 48 30 C38 38 40 50 40 56 Z" fill="#A8F560"/>
    </svg>
  `,

  // =========================================================================
  // GIAI ĐOẠN 4: 13 LOẠI NÔNG SẢN PIXEL-ART 32x32 CHUẨN VINTAGE (PNG ASSETS)
  // =========================================================================

  // 1. CÀ RỐT
  readyCarrot: `<img src="assets/farm-assets/crops/carrot.png" class="pixel-art crop-pixel-img" alt="Cà rốt" width="48" height="48" />`,

  // 2. KHOAI TÂY
  readyPotato: `<img src="assets/farm-assets/crops/potato.png" class="pixel-art crop-pixel-img" alt="Khoai tây" width="48" height="48" />`,

  // 3. BẮP NGÔ
  readyCorn: `<img src="assets/farm-assets/crops/corn.png" class="pixel-art crop-pixel-img" alt="Bắp ngô" width="48" height="48" />`,

  // 4. CÀ CHUA
  readyTomato: `<img src="assets/farm-assets/crops/tomato.png" class="pixel-art crop-pixel-img" alt="Cà chua" width="48" height="48" />`,

  // 5. DÂU TÂY
  readyStrawberry: `<img src="assets/farm-assets/crops/strawberry.png" class="pixel-art crop-pixel-img" alt="Dâu tây" width="48" height="48" />`,

  // 6. BÍ NGÔ (thay cho Sunflower)
  readyPumpkin: `<img src="assets/farm-assets/crops/pumpkin.png" class="pixel-art crop-pixel-img" alt="Bí ngô" width="48" height="48" />`,

  // 7. LÚA MÌ (thay cho Tulip)
  readyWheat: `<img src="assets/farm-assets/crops/wheat.png" class="pixel-art crop-pixel-img" alt="Lúa mì" width="48" height="48" />`,

  // 8. VIỆT QUẤT (thay cho Rose)
  readyBlueberry: `<img src="assets/farm-assets/crops/blueberry.png" class="pixel-art crop-pixel-img" alt="Việt quất" width="48" height="48" />`,

  // 9. CHANH VÀNG
  readyLemon: `<img src="assets/farm-assets/crops/lemon.png" class="pixel-art crop-pixel-img" alt="Chanh" width="48" height="48" />`,

  // 10. DƯA HẤU (thay cho Kiwi)
  readyWatermelon: `<img src="assets/farm-assets/crops/watermelon.png" class="pixel-art crop-pixel-img" alt="Dưa hấu" width="48" height="48" />`,

  // 11. XOÀI
  readyMango: `<img src="assets/farm-assets/crops/mango.png" class="pixel-art crop-pixel-img" alt="Xoài" width="48" height="48" />`,

  // 12. TÁO ĐỎ
  readyApple: `<img src="assets/farm-assets/crops/apple.png" class="pixel-art crop-pixel-img" alt="Táo" width="48" height="48" />`,

  // 13. CHERRY
  readyCherry: `<img src="assets/farm-assets/crops/cherry.png" class="pixel-art crop-pixel-img" alt="Cherry" width="48" height="48" />`,

  // NÔNG SẢN BỔ SUNG ĐẦY ĐỦ TỪ BỘ ASSETS
  readyCucumber: `<img src="assets/farm-assets/crops/cucumber.png" class="pixel-art crop-pixel-img" alt="Dưa chuột" width="48" height="48" />`,
  readyOrange: `<img src="assets/farm-assets/crops/orange.png" class="pixel-art crop-pixel-img" alt="Cam sành" width="48" height="48" />`,
  readyBanana: `<img src="assets/farm-assets/crops/banana.png" class="pixel-art crop-pixel-img" alt="Chuối chín" width="48" height="48" />`,
  readyPeach: `<img src="assets/farm-assets/crops/peach.png" class="pixel-art crop-pixel-img" alt="Đào tiên" width="48" height="48" />`,
  readyGrapes: `<img src="assets/farm-assets/crops/grapes.png" class="pixel-art crop-pixel-img" alt="Nho tím" width="48" height="48" />`,
  readyChili: `<img src="assets/farm-assets/crops/chili.png" class="pixel-art crop-pixel-img" alt="Ớt hiểm" width="48" height="48" />`,
  readyCoconut: `<img src="assets/farm-assets/crops/coconut.png" class="pixel-art crop-pixel-img" alt="Dừa xiêm" width="48" height="48" />`,
  readyRadish: `<img src="assets/farm-assets/crops/radish.png" class="pixel-art crop-pixel-img" alt="Củ cải đỏ" width="48" height="48" />`,
  readyBroccoli: `<img src="assets/farm-assets/crops/broccoli.png" class="pixel-art crop-pixel-img" alt="Súp lơ xanh" width="48" height="48" />`,
  readyPear: `<img src="assets/farm-assets/crops/pear.png" class="pixel-art crop-pixel-img" alt="Quả lê" width="48" height="48" />`,

  // Backward compatibility aliases cho dữ liệu cũ (sunflower, tulip, rose, kiwi)
  readySunflower: `<img src="assets/farm-assets/crops/pumpkin.png" class="pixel-art crop-pixel-img" alt="Bí ngô" width="48" height="48" />`,
  readyTulip: `<img src="assets/farm-assets/crops/wheat.png" class="pixel-art crop-pixel-img" alt="Lúa mì" width="48" height="48" />`,
  readyRose: `<img src="assets/farm-assets/crops/blueberry.png" class="pixel-art crop-pixel-img" alt="Việt quất" width="48" height="48" />`,
  readyKiwi: `<img src="assets/farm-assets/crops/watermelon.png" class="pixel-art crop-pixel-img" alt="Dưa hấu" width="48" height="48" />`,

  // Ô ĐẤT BỊ KHÓA (PADLOCK ĐỒNG CỔ ĐIỂN)
  lockedPadlock: `
    <svg viewBox="0 0 70 70" width="100%" height="100%">
      <path d="M26 30 V20 C26 12 44 12 44 20 V30" fill="none" stroke="#66594A" stroke-width="6" stroke-linecap="round"/>
      <path d="M26 30 V20 C26 14 44 14 44 20 V30" fill="none" stroke="#998774" stroke-width="3" stroke-linecap="round"/>
      <rect x="18" y="28" width="34" height="28" rx="5" fill="#C4964F" stroke="#5E4017" stroke-width="2.5"/>
      <rect x="21" y="31" width="28" height="6" rx="2.5" fill="#DFC080"/>
      <circle cx="35" cy="40" r="4" fill="#3D280D"/>
      <polygon points="33,40 37,40 38,48 32,48" fill="#3D280D"/>
    </svg>
  `,

  // 3. BỐN NÚT CÔNG CỤ CANH TÁC
  seedBag: `
    <div class="kraft-seed-packet pixel-art" style="position: relative; width: 26px; height: 28px; background: #C49A71; border: 1.5px solid #3B2D24; border-radius: 3px; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.12); margin: 0 auto;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: #B5885C; border-bottom: 1px dashed #8C6339;"></div>
      <div style="width: 16px; height: 16px; background: #FFFDF8; border: 1px solid #A8815B; border-radius: 2px; display: flex; align-items: center; justify-content: center; margin-top: 3px;">
        <img src="assets/farm-assets/crops/carrot.png" class="pixel-art" width="12" height="12" style="display: block; image-rendering: pixelated; object-fit: contain;" alt="Hạt giống" />
      </div>
    </div>
  `,

  wateringCan: `<img src="assets/farm-assets/tools/watering_can.png" class="pixel-art tool-pixel-img" alt="Bình tưới nước" width="46" height="46" style="image-rendering: pixelated; object-fit: contain; display: block;" />`,

  fertilizerSack: `<img src="assets/farm-assets/tools/fertilizer.png" class="pixel-art tool-pixel-img" alt="Phân bón" width="46" height="46" style="image-rendering: pixelated; object-fit: contain; display: block;" />`,

  speedFertilizer: `<img src="assets/sprites/items/icon_speed_fertilizer.svg" class="pixel-art tool-pixel-img" alt="Phân bón tăng tốc" width="46" height="46" style="image-rendering: pixelated; object-fit: contain; display: block;" />`,

  harvestBasket: `<img src="assets/sprites/items/icon_harvest_basket.svg" class="pixel-art tool-pixel-img" alt="Thu hoạch" width="46" height="46" style="image-rendering: pixelated; object-fit: contain; display: block;" />`,

  // Sketch Cối xay gió
  windmillSketch: `
    <svg viewBox="0 0 60 60" width="48" height="48">
      <polygon points="24,52 36,52 34,26 26,26" fill="#F0E5D3" stroke="#8C6F56" stroke-width="1.8"/>
      <polygon points="25,26 35,26 30,18" fill="#C49A78" stroke="#8C6F56" stroke-width="1.8"/>
      <path d="M28 52 V44 Q30 42 32 44 V52" fill="#8C6F56"/>
      <line x1="30" y1="22" x2="14" y2="8" stroke="#7A5F48" stroke-width="2"/>
      <line x1="30" y1="22" x2="46" y2="36" stroke="#7A5F48" stroke-width="2"/>
      <line x1="30" y1="22" x2="44" y2="8" stroke="#7A5F48" stroke-width="2"/>
      <line x1="30" y1="22" x2="16" y2="36" stroke="#7A5F48" stroke-width="2"/>
    </svg>
  `,

  potSprout: `
    <svg viewBox="0 0 60 60" width="44" height="44">
      <path d="M30 28 C22 26 18 18 22 12 C28 12 30 20 30 28 Z" fill="#75BA3C" stroke="#3D6E18" stroke-width="1.2"/>
      <path d="M30 28 C38 26 42 18 38 12 C32 12 30 20 30 28 Z" fill="#8CD448" stroke="#3D6E18" stroke-width="1.2"/>
      <polygon points="18,30 42,30 38,48 22,48" fill="#C96B3E" stroke="#692F13" stroke-width="2"/>
      <rect x="16" y="28" width="28" height="5" rx="1.5" fill="#DC7E50" stroke="#692F13" stroke-width="1.8"/>
    </svg>
  `,

  botanicalFlower: `
    <svg viewBox="0 0 60 60" width="68" height="68">
      <path d="M36 48 C36 40 44 38 48 40 C44 44 38 48 36 48 Z" fill="#588E33" stroke="#2F5417" stroke-width="1.2"/>
      <path d="M26 46 C26 38 18 38 14 42 C20 44 24 46 26 46 Z" fill="#67A838" stroke="#2F5417" stroke-width="1.2"/>
      <circle cx="30" cy="26" r="16" fill="#D95B83"/>
      <circle cx="24" cy="20" r="5" fill="#ED7E9F"/>
      <circle cx="34" cy="18" r="5.5" fill="#F7A1B9"/>
      <circle cx="22" cy="28" r="4.5" fill="#C94970"/>
      <circle cx="32" cy="26" r="6" fill="#FFAEC3"/>
      <circle cx="38" cy="28" r="5" fill="#ED7E9F"/>
      <circle cx="28" cy="34" r="5" fill="#B83A61"/>
    </svg>
  `
};
