import { CropCatalog } from '../models/game.models';
import { FARM_ASSETS } from './farm-assets.constant';
import { PIXEL_UI_ICONS } from './pixel-ui-icons.constant';

export type LangCode = 'en' | 'ja';

export interface CropCatalogItem {
  id: string;
  tier: 1 | 2 | 3 | 4;
  nameVi: string;
  seedPrice: number;
  sellPrice: number;
  growthMinutes: number;        // Scaled 3x-12x realistic durations
  minLevel: number;             // Evaluated against currentWorkspace().level
  minCompletedTopics: number;   // Evaluated against currentWorkspace().completedLessonCodes.length
  // Extended fields for UI, shop & farm compatibility
  seedNameVi: string;
  shopId: string;
  price: number;
  duration: string;
  usage: string;
  desc: string;
  initialSeeds: number;
  initialHarvested: number;
  matureSvg: string;
  emblemSvg: string;
  tierNameVi: string;
  requiredLevel: number;
}

export function formatGrowthDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} phút`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} giờ`;
  }
  return `${hours} giờ ${remainingMinutes} phút`;
}

export function formatCropDurationLabel(minutes: number): string {
  const dur = formatGrowthDuration(minutes);
  return `${dur} (Tưới -2p, Phân -10p)`;
}

export function kraftSeedPacket(cropIdOrEmblem: string): string {
  const trimmed = (cropIdOrEmblem || '').trim();
  const isSvgMarkup = trimmed.startsWith('<');

  if (isSvgMarkup) {
    return `<div class="kraft-seed-packet pixel-art" style="position: relative; width: 46px; height: 46px; background: #C49A71; border: 2px solid #3B2D24; border-radius: 4px; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.12);">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background: #B5885C; border-bottom: 1px dashed #8C6339;"></div>
      <div style="width: 28px; height: 28px; background: #FFFDF8; border: 1px solid #A8815B; border-radius: 2px; display: flex; align-items: center; justify-content: center; margin-top: 4px;">
        ${trimmed}
      </div>
    </div>`;
  }

  let id = trimmed.toLowerCase();
  if (id === 'sunflower') id = 'pumpkin';
  if (id === 'rose') id = 'blueberry';
  if (id === 'tulip') id = 'wheat';
  if (id === 'kiwi') id = 'watermelon';
  if (id === 'grape') id = 'grapes';

  return `<div class="kraft-seed-packet pixel-art" style="position: relative; width: 46px; height: 46px; background: #C49A71; border: 2px solid #3B2D24; border-radius: 4px; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.12);">
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background: #B5885C; border-bottom: 1px dashed #8C6339;"></div>
    <div style="width: 28px; height: 28px; background: #FFFDF8; border: 1px solid #A8815B; border-radius: 2px; display: flex; align-items: center; justify-content: center; margin-top: 4px;">
      <img src="assets/farm-assets/crops/${id}.png" class="pixel-art" width="22" height="22" style="display: block; image-rendering: pixelated; object-fit: contain;" alt="${id}" />
    </div>
  </div>`;
}

export const CROP_CATALOG: CropCatalogItem[] = [
  // =========================================================================
  // HẠNG I – MẦM NON (Lv. 1–2 · 15–30 phút)
  // =========================================================================
  {
    id: 'cucumber',
    tier: 1,
    nameVi: 'Dưa chuột',
    seedNameVi: 'Hạt giống Dưa chuột',
    shopId: 's_cucumber',
    seedPrice: 12,
    price: 12,
    sellPrice: 22,
    growthMinutes: 15,
    minLevel: 1,
    requiredLevel: 1,
    minCompletedTopics: 0,
    duration: formatCropDurationLabel(15),
    usage: 'Trồng dưa chuột thanh mát, mau cho trái, phù hợp tích lũy vốn đầu mùa.',
    desc: 'Dưa chuột xanh giòn ngọt nước, dễ canh tác và thu hoạch nhanh.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyCucumber,
    emblemSvg: `<ellipse cx="8" cy="8" rx="2" ry="5" transform="rotate(-30 8 8)" fill="#4A8532"/>`,
    tierNameVi: 'Hạng I - Mầm non'
  },
  {
    id: 'radish',
    tier: 1,
    nameVi: 'Củ cải đỏ',
    seedNameVi: 'Hạt giống Củ cải đỏ',
    shopId: 's_radish',
    seedPrice: 14,
    price: 14,
    sellPrice: 25,
    growthMinutes: 18,
    minLevel: 1,
    requiredLevel: 1,
    minCompletedTopics: 1,
    duration: formatCropDurationLabel(18),
    usage: 'Trồng củ cải đỏ tròn xoe xinh xắn mở đầu vụ mùa rực rỡ.',
    desc: 'Củ cải đỏ giàu khoáng chất, màu sắc rực rỡ vui mắt.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyRadish,
    emblemSvg: `<circle cx="8" cy="8.5" r="3.5" fill="#D6384C"/><path d="M7 5 L8 2 L9 5 Z" fill="#4B8B2E"/>`,
    tierNameVi: 'Hạng I - Mầm non'
  },
  {
    id: 'carrot',
    tier: 1,
    nameVi: 'Cà rốt',
    seedNameVi: 'Hạt giống Cà rốt',
    shopId: 's_carrot',
    seedPrice: 15,
    price: 15,
    sellPrice: 28,
    growthMinutes: 20,
    minLevel: 1,
    requiredLevel: 1,
    minCompletedTopics: 0,
    duration: formatCropDurationLabel(20),
    usage: 'Gieo trên ô đất trống. Thu hoạch để bán lấy Xu và tích lũy nông sản.',
    desc: 'Củ cà rốt cam giòn ngọt, dễ trồng cho người mới bắt đầu.',
    initialSeeds: 3,
    initialHarvested: 2,
    matureSvg: FARM_ASSETS.readyCarrot,
    emblemSvg: `<rect x="8" y="6" width="2" height="2" fill="#5D9E42"/><rect x="7" y="8" width="3" height="2" fill="#F28522"/><rect x="6" y="10" width="2" height="2" fill="#E36D17"/>`,
    tierNameVi: 'Hạng I - Mầm non'
  },
  {
    id: 'potato',
    tier: 1,
    nameVi: 'Khoai tây',
    seedNameVi: 'Hạt giống Khoai tây',
    shopId: 's_potato',
    seedPrice: 15,
    price: 15,
    sellPrice: 30,
    growthMinutes: 25,
    minLevel: 2,
    requiredLevel: 2,
    minCompletedTopics: 2,
    duration: formatCropDurationLabel(25),
    usage: 'Thu hoạch khoai tây bùi bở để tích lũy Xu và mở rộng nông trại.',
    desc: 'Củ khoai tây giàu tinh bột, cây trồng kinh tế mộc mạc và thiết yếu.',
    initialSeeds: 3,
    initialHarvested: 3,
    matureSvg: FARM_ASSETS.readyPotato,
    emblemSvg: `<ellipse cx="8" cy="8" rx="3.5" ry="2.5" fill="#C99E5C"/><circle cx="7" cy="7.5" r="0.6" fill="#7A5624"/>`,
    tierNameVi: 'Hạng I - Mầm non'
  },
  {
    id: 'corn',
    tier: 1,
    nameVi: 'Bắp ngô',
    seedNameVi: 'Hạt giống Ngô',
    shopId: 's_corn',
    seedPrice: 18,
    price: 18,
    sellPrice: 34,
    growthMinutes: 30,
    minLevel: 2,
    requiredLevel: 2,
    minCompletedTopics: 3,
    duration: formatCropDurationLabel(30),
    usage: 'Gieo hạt ngô trên ô đất trống để thu hoạch bắp ngô vàng óng ả.',
    desc: 'Bắp ngô vàng óng ả giàu năng lượng, giá trị kinh tế cao.',
    initialSeeds: 3,
    initialHarvested: 1,
    matureSvg: FARM_ASSETS.readyCorn,
    emblemSvg: `<rect x="7" y="6" width="2" height="4" fill="#F2C138"/><rect x="6" y="9" width="4" height="2" fill="#639E46"/>`,
    tierNameVi: 'Hạng I - Mầm non'
  },

  // =========================================================================
  // HẠNG II – HOA TRÁI (Lv. 3–5 · 40–60 phút)
  // =========================================================================
  {
    id: 'tomato',
    tier: 2,
    nameVi: 'Cà chua',
    seedNameVi: 'Hạt giống Cà chua',
    shopId: 's_tomato',
    seedPrice: 22,
    price: 22,
    sellPrice: 42,
    growthMinutes: 40,
    minLevel: 3,
    requiredLevel: 3,
    minCompletedTopics: 4,
    duration: formatCropDurationLabel(40),
    usage: 'Trồng cà chua đỏ mọng trên luống đất mở đầu Hạng II.',
    desc: 'Cà chua chín đỏ tươi, bổ sung dinh dưỡng và bán lấy nhiều Xu vàng.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyTomato,
    emblemSvg: `<rect x="7" y="7" width="2" height="1" fill="#639E46"/><rect x="6" y="8" width="4" height="3" fill="#E34B39"/><rect x="7" y="8" width="1" height="1" fill="#FF8C7A"/>`,
    tierNameVi: 'Hạng II - Hoa trái'
  },
  {
    id: 'strawberry',
    tier: 2,
    nameVi: 'Dâu tây',
    seedNameVi: 'Hạt giống Dâu tây',
    shopId: 's_strawberry',
    seedPrice: 25,
    price: 25,
    sellPrice: 48,
    growthMinutes: 45,
    minLevel: 4,
    requiredLevel: 4,
    minCompletedTopics: 5,
    duration: formatCropDurationLabel(45),
    usage: 'Gieo hạt dâu tây chín đỏ mọng để thu hoạch trái ngọt giá trị cao.',
    desc: 'Những trái dâu tây đỏ tươi chua ngọt hấp dẫn, giá trị thương mại cao.',
    initialSeeds: 3,
    initialHarvested: 2,
    matureSvg: FARM_ASSETS.readyStrawberry,
    emblemSvg: `<path d="M5 6 C5 5 11 5 11 6 C10 9 8 11 8 11 C8 11 6 9 5 6 Z" fill="#E62E43"/><circle cx="8" cy="8" r="0.5" fill="#FFDF73"/>`,
    tierNameVi: 'Hạng II - Hoa trái'
  },
  {
    id: 'orange',
    tier: 2,
    nameVi: 'Cam sành',
    seedNameVi: 'Hạt giống Cam sành',
    shopId: 's_orange',
    seedPrice: 26,
    price: 26,
    sellPrice: 52,
    growthMinutes: 55,
    minLevel: 4,
    requiredLevel: 4,
    minCompletedTopics: 6,
    duration: formatCropDurationLabel(55),
    usage: 'Trồng cây cam sai quả mọng vàng ươm cho vụ mùa ngọt ngào.',
    desc: 'Cam sành vỏ mỏng mọng nước, giàu vitamin C cho trí não tinh anh.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyOrange,
    emblemSvg: `<circle cx="8" cy="8.5" r="4" fill="#F28500"/><circle cx="8" cy="4.5" r="1" fill="#4B8B2E"/>`,
    tierNameVi: 'Hạng II - Hoa trái'
  },
  {
    id: 'pumpkin',
    tier: 2,
    nameVi: 'Bí ngô',
    seedNameVi: 'Hạt giống Bí ngô',
    shopId: 's_pumpkin',
    seedPrice: 18,
    price: 18,
    sellPrice: 45,
    growthMinutes: 60,
    minLevel: 5,
    requiredLevel: 5,
    minCompletedTopics: 7,
    duration: formatCropDurationLabel(60),
    usage: 'Gieo hạt bí ngô trên luống đất tơi xốp cho vụ thu hoạch bội thu.',
    desc: 'Trái bí ngô tròn vàng cam đậm đà, thu hoạch cho mùa vụ bội thu.',
    initialSeeds: 3,
    initialHarvested: 1,
    matureSvg: FARM_ASSETS.readyPumpkin,
    emblemSvg: `<ellipse cx="8" cy="8.5" rx="3.5" ry="3" fill="#E87817"/><rect x="7.5" y="5" width="1" height="1.5" fill="#588E33"/>`,
    tierNameVi: 'Hạng II - Hoa trái'
  },
  {
    id: 'wheat',
    tier: 2,
    nameVi: 'Lúa mì',
    seedNameVi: 'Hạt giống Lúa mì',
    shopId: 's_wheat',
    seedPrice: 20,
    price: 20,
    sellPrice: 48,
    growthMinutes: 60,
    minLevel: 5,
    requiredLevel: 5,
    minCompletedTopics: 8,
    duration: formatCropDurationLabel(60),
    usage: 'Gieo lúa mì trên ruộng đất màu mỡ chuẩn bị bước sang Hạng III.',
    desc: 'Những bông lúa mì vàng óng trĩu hạt, biểu tượng của sự no ấm.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyWheat,
    emblemSvg: `<path d="M7 11 L9 7 M7 8 L9 8 M7 6 L9 6" stroke="#DCA22C" stroke-width="1.2"/>`,
    tierNameVi: 'Hạng II - Hoa trái'
  },

  // =========================================================================
  // HẠNG III – LÀM VƯỜN (Lv. 6–8 · 75–120 phút)
  // =========================================================================
  {
    id: 'lemon',
    tier: 3,
    nameVi: 'Chanh',
    seedNameVi: 'Hạt giống Chanh',
    shopId: 's_lemon',
    seedPrice: 22,
    price: 22,
    sellPrice: 50,
    growthMinutes: 75,
    minLevel: 6,
    requiredLevel: 6,
    minCompletedTopics: 10,
    duration: formatCropDurationLabel(75),
    usage: 'Trồng cây chanh vàng mọng nước cho chuỗi cung ứng nông sản.',
    desc: 'Chanh vàng tươi mát lành, dễ chăm sóc và mau ra quả.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyLemon,
    emblemSvg: `<ellipse cx="8" cy="8" rx="3.5" ry="2.5" transform="rotate(-15 8 8)" fill="#FCE028"/>`,
    tierNameVi: 'Hạng III - Làm vườn'
  },
  {
    id: 'blueberry',
    tier: 3,
    nameVi: 'Việt quất',
    seedNameVi: 'Hạt giống Việt quất',
    shopId: 's_blueberry',
    seedPrice: 24,
    price: 24,
    sellPrice: 56,
    growthMinutes: 80,
    minLevel: 7,
    requiredLevel: 7,
    minCompletedTopics: 11,
    duration: formatCropDurationLabel(80),
    usage: 'Trồng bụi việt quất ngọt thơm giá trị dinh dưỡng cao.',
    desc: 'Những chùm việt quất tím thẫm mọng nước, giàu chất chống oxy hóa.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyBlueberry,
    emblemSvg: `<circle cx="7" cy="8" r="2" fill="#3D4A8A"/><circle cx="9.5" cy="8.5" r="1.8" fill="#5B6AB5"/>`,
    tierNameVi: 'Hạng III - Làm vườn'
  },
  {
    id: 'peach',
    tier: 3,
    nameVi: 'Đào tiên',
    seedNameVi: 'Hạt giống Đào tiên',
    shopId: 's_peach',
    seedPrice: 28,
    price: 28,
    sellPrice: 65,
    growthMinutes: 90,
    minLevel: 7,
    requiredLevel: 7,
    minCompletedTopics: 12,
    duration: formatCropDurationLabel(90),
    usage: 'Gieo hạt đào tiên hồng thắm mở ra khu vườn trái cây thượng hạng.',
    desc: 'Trái đào hồng nhung thơm ngọt dịu dàng, hương sắc thanh tao.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyPeach,
    emblemSvg: `<circle cx="7" cy="8.5" r="3.2" fill="#FF8DA1"/><circle cx="9" cy="8.5" r="3.2" fill="#FFA5B5"/>`,
    tierNameVi: 'Hạng III - Làm vườn'
  },
  {
    id: 'banana',
    tier: 3,
    nameVi: 'Chuối chín',
    seedNameVi: 'Hạt giống Chuối chín',
    shopId: 's_banana',
    seedPrice: 30,
    price: 30,
    sellPrice: 70,
    growthMinutes: 100,
    minLevel: 8,
    requiredLevel: 8,
    minCompletedTopics: 13,
    duration: formatCropDurationLabel(100),
    usage: 'Trồng cây chuối cho buồng quả vàng trĩu năng lượng.',
    desc: 'Nải chuối vàng ươm giàu dinh dưỡng, tiếp thêm năng lượng học bài.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyBanana,
    emblemSvg: `<path d="M5 11 Q8 10 11 5 Q10 4 8 7 Q6 9 5 11 Z" fill="#F4D03F"/>`,
    tierNameVi: 'Hạng III - Làm vườn'
  },
  {
    id: 'watermelon',
    tier: 3,
    nameVi: 'Dưa hấu',
    seedNameVi: 'Hạt giống Dưa hấu',
    shopId: 's_watermelon',
    seedPrice: 32,
    price: 32,
    sellPrice: 78,
    growthMinutes: 120,
    minLevel: 8,
    requiredLevel: 8,
    minCompletedTopics: 14,
    duration: formatCropDurationLabel(120),
    usage: 'Trồng dưa hấu giải nhiệt thanh mát, lợi nhuận bán chợ vượt trội.',
    desc: 'Trái dưa hấu vỏ xanh ruột đỏ mọng ngọt, giải khát ngày hè oi ả.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyWatermelon,
    emblemSvg: `<path d="M5 8 C5 11 11 11 11 8 Z" fill="#2E7535"/><path d="M6 8 C6 10 10 10 10 8 Z" fill="#D62839"/>`,
    tierNameVi: 'Hạng III - Làm vườn'
  },

  // =========================================================================
  // HẠNG IV – THƯỢNG HẠNG (Lv. 9–11 · 150–240 phút · 2.5–4 giờ)
  // =========================================================================
  {
    id: 'grapes',
    tier: 4,
    nameVi: 'Nho tím',
    seedNameVi: 'Hạt giống Nho tím',
    shopId: 's_grapes',
    seedPrice: 38,
    price: 38,
    sellPrice: 92,
    growthMinutes: 150,
    minLevel: 9,
    requiredLevel: 9,
    minCompletedTopics: 16,
    duration: formatCropDurationLabel(150),
    usage: 'Trồng giàn nho tím trĩu quả đồng quê cho các chuyên đề cao cấp.',
    desc: 'Chùm nho tím đậm đà vị ngọt tự nhiên, giá trị kinh tế rất cao.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyGrapes,
    emblemSvg: `<circle cx="7" cy="7" r="2" fill="#6C3483"/><circle cx="9" cy="7" r="2" fill="#7D3C98"/><circle cx="8" cy="9.5" r="2" fill="#884EA0"/>`,
    tierNameVi: 'Hạng IV - Thượng hạng'
  },
  {
    id: 'apple',
    tier: 4,
    nameVi: 'Táo',
    seedNameVi: 'Hạt giống Táo',
    shopId: 's_apple',
    seedPrice: 40,
    price: 40,
    sellPrice: 100,
    growthMinutes: 180,
    minLevel: 10,
    requiredLevel: 10,
    minCompletedTopics: 18,
    duration: formatCropDurationLabel(180),
    usage: 'Gieo hạt táo đỏ ngọt giòn thu hoạch nông sản đỉnh cao.',
    desc: 'Cây táo đỏ cổ điển mang lại nguồn thu nhập lớn và nhiều điểm XP.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyApple,
    emblemSvg: `<circle cx="8" cy="8.5" r="3" fill="#DE2C2C"/><rect x="7.5" y="5" width="1" height="2" fill="#4A3018"/>`,
    tierNameVi: 'Hạng IV - Thượng hạng'
  },
  {
    id: 'cherry',
    tier: 4,
    nameVi: 'Cherry',
    seedNameVi: 'Hạt giống Cherry',
    shopId: 's_cherry',
    seedPrice: 50,
    price: 50,
    sellPrice: 130,
    growthMinutes: 240,
    minLevel: 11,
    requiredLevel: 11,
    minCompletedTopics: 20,
    duration: formatCropDurationLabel(240),
    usage: 'Trồng cây cherry mọng đỏ cao cấp nhất nông trại.',
    desc: 'Quả cherry căng mọng tuyệt hảo, mang lại lượng XP và Xu cao nhất.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyCherry,
    emblemSvg: `<circle cx="6.5" cy="9" r="2" fill="#B81433"/><circle cx="9.5" cy="9.5" r="2" fill="#C9183B"/><path d="M8 6 L6.5 8 M8 6 L9.5 8.5" stroke="#45781E" stroke-width="0.8"/>`,
    tierNameVi: 'Hạng IV - Thượng hạng'
  }
];

export const SPRITES: Record<string, string> = {
  seed: kraftSeedPacket('carrot'),
  seeds_on_soil: FARM_ASSETS.seedsOnSoil,
  sprout: FARM_ASSETS.sprout,
  padlock: PIXEL_UI_ICONS['icon_padlock'],
  water: FARM_ASSETS.wateringCan,
  fertilizer: FARM_ASSETS.fertilizerSack,
  speed_fertilizer: FARM_ASSETS.speedFertilizer,
  basket: PIXEL_UI_ICONS['icon_harvest_basket'],
  lamp: PIXEL_UI_ICONS['decor_lamp'],
  fence: PIXEL_UI_ICONS['decor_fence'],
  scarecrow: PIXEL_UI_ICONS['decor_scarecrow'],
  bundle: PIXEL_UI_ICONS['icon_harvest_basket']
};

CROP_CATALOG.forEach(c => {
  SPRITES[c.id] = c.matureSvg;
  SPRITES[c.shopId] = kraftSeedPacket(c.id);
  SPRITES['seed_' + c.id] = kraftSeedPacket(c.id);
});

// Backward-compatibility aliases cho dữ liệu cũ (sunflower, tulip, rose, kiwi, mango, grape)
SPRITES['sunflower'] = FARM_ASSETS.readyPumpkin;
SPRITES['s_sunflower'] = SPRITES['s_pumpkin'];
SPRITES['seed_sunflower'] = SPRITES['s_pumpkin'];

SPRITES['tulip'] = FARM_ASSETS.readyWheat;
SPRITES['s_tulip'] = SPRITES['s_wheat'];
SPRITES['seed_tulip'] = SPRITES['s_wheat'];

SPRITES['rose'] = FARM_ASSETS.readyBlueberry;
SPRITES['s_rose'] = SPRITES['s_blueberry'];
SPRITES['seed_rose'] = SPRITES['s_blueberry'];

SPRITES['kiwi'] = FARM_ASSETS.readyWatermelon;
SPRITES['s_kiwi'] = SPRITES['s_watermelon'];
SPRITES['seed_kiwi'] = SPRITES['s_watermelon'];

SPRITES['mango'] = FARM_ASSETS.readyOrange;
SPRITES['s_mango'] = SPRITES['s_orange'];
SPRITES['seed_mango'] = SPRITES['s_orange'];

SPRITES['grape'] = FARM_ASSETS.readyGrapes;
SPRITES['s_grape'] = SPRITES['s_grapes'];
SPRITES['seed_grape'] = SPRITES['s_grapes'];
