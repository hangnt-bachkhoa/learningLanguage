import { CropCatalog } from '../models/game.models';
import { FARM_ASSETS } from './farm-assets.constant';
import { PIXEL_UI_ICONS } from './pixel-ui-icons.constant';

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

export const CROP_CATALOG: CropCatalog[] = [
  // =========================================================================
  // HẠNG I – MẦM NON (Lv. 1–3 · TOEIC 450 · Bài #01–#13 & Ngữ pháp Pre-A1)
  // =========================================================================
  {
    id: 'carrot',
    nameVi: 'Cà rốt',
    seedNameVi: 'Hạt giống Cà rốt',
    shopId: 's_carrot',
    price: 15,
    sellPrice: 25,
    duration: '5 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 5,
    usage: 'Gieo trên ô đất trống. Thu hoạch để bán lấy Xu và mở khóa bài học cơ bản.',
    desc: 'Củ cà rốt cam giòn ngọt, dễ trồng cho người mới bắt đầu.',
    initialSeeds: 3,
    initialHarvested: 2,
    matureSvg: FARM_ASSETS.readyCarrot,
    emblemSvg: `<rect x="8" y="6" width="2" height="2" fill="#5D9E42"/><rect x="7" y="8" width="3" height="2" fill="#F28522"/><rect x="6" y="10" width="2" height="2" fill="#E36D17"/>`,
    tier: 1,
    tierNameVi: 'Hạng I - Mầm non',
    minLevel: 1,
    requiredLevel: 1,
    requiredXp: 0,
    requiredLessonId: 1,
    requiredLessonTitle: 'Fruits & Vegetables'
  },
  {
    id: 'cucumber',
    nameVi: 'Dưa chuột',
    seedNameVi: 'Hạt giống Dưa chuột',
    shopId: 's_cucumber',
    price: 12,
    sellPrice: 20,
    duration: '5 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 5,
    usage: 'Trồng dưa chuột thanh mát, mau cho trái, phù hợp tích lũy vốn đầu mùa.',
    desc: 'Dưa chuột xanh giòn ngọt nước, dễ canh tác và thu hoạch nhanh.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyCucumber,
    emblemSvg: `<ellipse cx="8" cy="8" rx="2" ry="5" transform="rotate(-30 8 8)" fill="#4A8532"/>`,
    tier: 1,
    tierNameVi: 'Hạng I - Mầm non',
    minLevel: 1,
    requiredLevel: 1,
    requiredXp: 0,
    requiredLessonId: 1,
    requiredLessonTitle: 'Fruits & Vegetables'
  },
  {
    id: 'radish',
    nameVi: 'Củ cải đỏ',
    seedNameVi: 'Hạt giống Củ cải đỏ',
    shopId: 's_radish',
    price: 14,
    sellPrice: 24,
    duration: '6 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 6,
    usage: 'Trồng củ cải đỏ tròn xoe xinh xắn mở khóa bài học TOEIC 450.',
    desc: 'Củ cải đỏ giàu khoáng chất, màu sắc rực rỡ vui mắt.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyRadish,
    emblemSvg: `<circle cx="8" cy="8.5" r="3.5" fill="#D6384C"/><path d="M7 5 L8 2 L9 5 Z" fill="#4B8B2E"/>`,
    tier: 1,
    tierNameVi: 'Hạng I - Mầm non',
    minLevel: 2,
    requiredLevel: 2,
    requiredXp: 0,
    requiredLessonId: 1,
    requiredLessonTitle: 'Fruits & Vegetables'
  },
  {
    id: 'potato',
    nameVi: 'Khoai tây',
    seedNameVi: 'Hạt giống Khoai tây',
    shopId: 's_potato',
    price: 15,
    sellPrice: 26,
    duration: '6 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 6,
    usage: 'Thu hoạch khoai tây bùi bở để mở khóa các bài học Logistics, Xây dựng & Bất động sản.',
    desc: 'Củ khoai tây giàu tinh bột, cây trồng kinh tế mộc mạc và thiết yếu.',
    initialSeeds: 3,
    initialHarvested: 3,
    matureSvg: FARM_ASSETS.readyPotato,
    emblemSvg: `<ellipse cx="8" cy="8" rx="3.5" ry="2.5" fill="#C99E5C"/><circle cx="7" cy="7.5" r="0.6" fill="#7A5624"/>`,
    tier: 1,
    tierNameVi: 'Hạng I - Mầm non',
    minLevel: 2,
    requiredLevel: 2,
    requiredXp: 0,
    requiredLessonId: 1,
    requiredLessonTitle: 'Fruits & Vegetables'
  },
  {
    id: 'corn',
    nameVi: 'Bắp ngô',
    seedNameVi: 'Hạt giống Ngô',
    shopId: 's_corn',
    price: 18,
    sellPrice: 30,
    duration: '8 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 8,
    usage: 'Gieo hạt ngô trên ô đất trống để thu hoạch bắp ngô vàng óng ả.',
    desc: 'Bắp ngô vàng óng ả giàu năng lượng, giá trị kinh tế cao.',
    initialSeeds: 3,
    initialHarvested: 1,
    matureSvg: FARM_ASSETS.readyCorn,
    emblemSvg: `<rect x="7" y="6" width="2" height="4" fill="#F2C138"/><rect x="6" y="9" width="4" height="2" fill="#639E46"/>`,
    tier: 1,
    tierNameVi: 'Hạng I - Mầm non',
    minLevel: 3,
    requiredLevel: 3,
    requiredXp: 0,
    requiredLessonId: 3,
    requiredLessonTitle: 'Văn phòng (Office)'
  },

  // =========================================================================
  // HẠNG II – HOA TRÁI (Lv. 4–6 · TOEIC 600 · Bài #14–#25 & Ngữ pháp A2)
  // =========================================================================
  {
    id: 'tomato',
    nameVi: 'Cà chua',
    seedNameVi: 'Hạt giống Cà chua',
    shopId: 's_tomato',
    price: 22,
    sellPrice: 38,
    duration: '10 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 10,
    usage: 'Trồng cà chua đỏ mọng trên luống đất mở khóa TOEIC 600.',
    desc: 'Cà chua chín đỏ tươi, bổ sung dinh dưỡng và bán lấy nhiều Xu vàng.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyTomato,
    emblemSvg: `<rect x="7" y="7" width="2" height="1" fill="#639E46"/><rect x="6" y="8" width="4" height="3" fill="#E34B39"/><rect x="7" y="8" width="1" height="1" fill="#FF8C7A"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    minLevel: 4,
    requiredLevel: 4,
    requiredXp: 0,
    requiredLessonId: 15,
    requiredLessonTitle: 'Công nghệ (Technology)'
  },
  {
    id: 'strawberry',
    nameVi: 'Dâu tây',
    seedNameVi: 'Hạt giống Dâu tây',
    shopId: 's_strawberry',
    price: 25,
    sellPrice: 42,
    duration: '10 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 10,
    usage: 'Gieo hạt dâu tây chín đỏ mọng để thu hoạch trái ngọt giá trị cao.',
    desc: 'Những trái dâu tây đỏ tươi chua ngọt hấp dẫn, giá trị thương mại cao.',
    initialSeeds: 3,
    initialHarvested: 2,
    matureSvg: FARM_ASSETS.readyStrawberry,
    emblemSvg: `<path d="M5 6 C5 5 11 5 11 6 C10 9 8 11 8 11 C8 11 6 9 5 6 Z" fill="#E62E43"/><circle cx="8" cy="8" r="0.5" fill="#FFDF73"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    minLevel: 4,
    requiredLevel: 4,
    requiredXp: 0,
    requiredLessonId: 16,
    requiredLessonTitle: 'Y tế (Healthcare)'
  },
  {
    id: 'orange',
    nameVi: 'Cam sành',
    seedNameVi: 'Hạt giống Cam sành',
    shopId: 's_orange',
    price: 26,
    sellPrice: 44,
    duration: '11 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 11,
    usage: 'Trồng cây cam sai quả mọng vàng ươm mở khóa Logistics & Vận tải.',
    desc: 'Cam sành vỏ mỏng mọng nước, giàu vitamin C cho trí não tinh anh.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyOrange,
    emblemSvg: `<circle cx="8" cy="8.5" r="4" fill="#F28500"/><circle cx="8" cy="4.5" r="1" fill="#4B8B2E"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    minLevel: 5,
    requiredLevel: 5,
    requiredXp: 0,
    requiredLessonId: 18,
    requiredLessonTitle: 'Logistics (Logistics)'
  },
  {
    id: 'pumpkin',
    nameVi: 'Bí ngô',
    seedNameVi: 'Hạt giống Bí ngô',
    shopId: 's_pumpkin',
    price: 18,
    sellPrice: 32,
    duration: '12 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 12,
    usage: 'Gieo hạt bí ngô trên luống đất tơi xốp cho vụ thu hoạch bội thu.',
    desc: 'Trái bí ngô tròn vàng cam đậm đà, thu hoạch cho mùa vụ bội thu.',
    initialSeeds: 3,
    initialHarvested: 1,
    matureSvg: FARM_ASSETS.readyPumpkin,
    emblemSvg: `<ellipse cx="8" cy="8.5" rx="3.5" ry="3" fill="#E87817"/><rect x="7.5" y="5" width="1" height="1.5" fill="#588E33"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    minLevel: 5,
    requiredLevel: 5,
    requiredXp: 0,
    requiredLessonId: 20,
    requiredLessonTitle: 'Xây dựng (Construction)'
  },
  {
    id: 'wheat',
    nameVi: 'Lúa mì',
    seedNameVi: 'Hạt giống Lúa mì',
    shopId: 's_wheat',
    price: 20,
    sellPrice: 35,
    duration: '12 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 12,
    usage: 'Gieo lúa mì trên ruộng đất màu mỡ chuẩn bị bước sang Hạng III.',
    desc: 'Những bông lúa mì vàng óng trĩu hạt, biểu tượng của sự no ấm.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyWheat,
    emblemSvg: `<path d="M7 11 L9 7 M7 8 L9 8 M7 6 L9 6" stroke="#DCA22C" stroke-width="1.2"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    minLevel: 6,
    requiredLevel: 6,
    requiredXp: 0,
    requiredLessonId: 22,
    requiredLessonTitle: 'Môi trường (Environment)'
  },

  // =========================================================================
  // HẠNG III – LÀM VƯỜN (Lv. 7–9 · TOEIC 800 · Bài #26–#38 & Ngữ pháp B1–B2)
  // =========================================================================
  {
    id: 'lemon',
    nameVi: 'Chanh',
    seedNameVi: 'Hạt giống Chanh',
    shopId: 's_lemon',
    price: 22,
    sellPrice: 38,
    duration: '14 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 14,
    usage: 'Trồng cây chanh vàng mọng nước cho chuỗi cung ứng nông sản.',
    desc: 'Chanh vàng tươi mát lành, dễ chăm sóc và mau ra quả.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyLemon,
    emblemSvg: `<ellipse cx="8" cy="8" rx="3.5" ry="2.5" transform="rotate(-15 8 8)" fill="#FCE028"/>`,
    tier: 3,
    tierNameVi: 'Hạng III - Làm vườn',
    minLevel: 7,
    requiredLevel: 7,
    requiredXp: 0,
    requiredLessonId: 27,
    requiredLessonTitle: 'Chuỗi cung ứng (Supply Chain)'
  },
  {
    id: 'blueberry',
    nameVi: 'Việt quất',
    seedNameVi: 'Hạt giống Việt quất',
    shopId: 's_blueberry',
    price: 24,
    sellPrice: 42,
    duration: '14 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 14,
    usage: 'Trồng bụi việt quất ngọt thơm giá trị dinh dưỡng cao.',
    desc: 'Những chùm việt quất tím thẫm mọng nước, giàu chất chống oxy hóa.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyBlueberry,
    emblemSvg: `<circle cx="7" cy="8" r="2" fill="#3D4A8A"/><circle cx="9.5" cy="8.5" r="1.8" fill="#5B6AB5"/>`,
    tier: 3,
    tierNameVi: 'Hạng III - Làm vườn',
    minLevel: 7,
    requiredLevel: 7,
    requiredXp: 0,
    requiredLessonId: 28,
    requiredLessonTitle: 'Giao tiếp (Communication)'
  },
  {
    id: 'peach',
    nameVi: 'Đào tiên',
    seedNameVi: 'Hạt giống Đào tiên',
    shopId: 's_peach',
    price: 28,
    sellPrice: 48,
    duration: '15 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 15,
    usage: 'Gieo hạt đào tiên hồng thắm mở khóa các bài học quản trị dự án.',
    desc: 'Trái đào hồng nhung thơm ngọt dịu dàng, hương sắc thanh tao.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyPeach,
    emblemSvg: `<circle cx="7" cy="8.5" r="3.2" fill="#FF8DA1"/><circle cx="9" cy="8.5" r="3.2" fill="#FFA5B5"/>`,
    tier: 3,
    tierNameVi: 'Hạng III - Làm vườn',
    minLevel: 8,
    requiredLevel: 8,
    requiredXp: 0,
    requiredLessonId: 30,
    requiredLessonTitle: 'Quản lý dự án (Project Management)'
  },
  {
    id: 'banana',
    nameVi: 'Chuối chín',
    seedNameVi: 'Hạt giống Chuối chín',
    shopId: 's_banana',
    price: 30,
    sellPrice: 52,
    duration: '15 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 15,
    usage: 'Trồng cây chuối cho buồng quả vàng trĩu năng lượng.',
    desc: 'Nải chuối vàng ươm giàu dinh dưỡng, tiếp thêm năng lượng học bài.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyBanana,
    emblemSvg: `<path d="M5 11 Q8 10 11 5 Q10 4 8 7 Q6 9 5 11 Z" fill="#F4D03F"/>`,
    tier: 3,
    tierNameVi: 'Hạng III - Làm vườn',
    minLevel: 8,
    requiredLevel: 8,
    requiredXp: 0,
    requiredLessonId: 32,
    requiredLessonTitle: 'Thể thao (Sports)'
  },
  {
    id: 'watermelon',
    nameVi: 'Dưa hấu',
    seedNameVi: 'Hạt giống Dưa hấu',
    shopId: 's_watermelon',
    price: 32,
    sellPrice: 56,
    duration: '16 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 16,
    usage: 'Trồng dưa hấu giải nhiệt thanh mát, lợi nhuận bán chợ vượt trội.',
    desc: 'Trái dưa hấu vỏ xanh ruột đỏ mọng ngọt, giải khát ngày hè oi ả.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyWatermelon,
    emblemSvg: `<path d="M5 8 C5 11 11 11 11 8 Z" fill="#2E7535"/><path d="M6 8 C6 10 10 10 10 8 Z" fill="#D62839"/>`,
    tier: 3,
    tierNameVi: 'Hạng III - Làm vườn',
    minLevel: 9,
    requiredLevel: 9,
    requiredXp: 0,
    requiredLessonId: 35,
    requiredLessonTitle: 'Thời trang (Fashion)'
  },

  // =========================================================================
  // HẠNG IV – THƯỢNG HẠNG (Lv. 10+ · TOEIC 900 · Bài #39–#52 & Ngữ pháp B2–C1)
  // =========================================================================
  {
    id: 'grapes',
    nameVi: 'Nho tím',
    seedNameVi: 'Hạt giống Nho tím',
    shopId: 's_grapes',
    price: 38,
    sellPrice: 68,
    duration: '18 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 18,
    usage: 'Trồng giàn nho tím trĩu quả đồng quê cho các chuyên đề TOEIC 900.',
    desc: 'Chùm nho tím đậm đà vị ngọt tự nhiên, giá trị kinh tế rất cao.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyGrapes,
    emblemSvg: `<circle cx="7" cy="7" r="2" fill="#6C3483"/><circle cx="9" cy="7" r="2" fill="#7D3C98"/><circle cx="8" cy="9.5" r="2" fill="#884EA0"/>`,
    tier: 4,
    tierNameVi: 'Hạng IV - Thượng hạng',
    minLevel: 10,
    requiredLevel: 10,
    requiredXp: 0,
    requiredLessonId: 40,
    requiredLessonTitle: 'Thực phẩm và đồ uống (Food & Beverage)'
  },
  {
    id: 'apple',
    nameVi: 'Táo',
    seedNameVi: 'Hạt giống Táo',
    shopId: 's_apple',
    price: 40,
    sellPrice: 72,
    duration: '18 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 18,
    usage: 'Gieo hạt táo đỏ ngọt giòn thu hoạch nông sản đỉnh cao.',
    desc: 'Cây táo đỏ cổ điển mang lại nguồn thu nhập lớn và nhiều điểm XP.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyApple,
    emblemSvg: `<circle cx="8" cy="8.5" r="3" fill="#DE2C2C"/><rect x="7.5" y="5" width="1" height="2" fill="#4A3018"/>`,
    tier: 4,
    tierNameVi: 'Hạng IV - Thượng hạng',
    minLevel: 10,
    requiredLevel: 10,
    requiredXp: 0,
    requiredLessonId: 41,
    requiredLessonTitle: 'Vận tải (Transportation Systems)'
  },
  {
    id: 'cherry',
    nameVi: 'Cherry',
    seedNameVi: 'Hạt giống Cherry',
    shopId: 's_cherry',
    price: 50,
    sellPrice: 90,
    duration: '20 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 20,
    usage: 'Trồng cây cherry mọng đỏ cao cấp nhất nông trại.',
    desc: 'Quả cherry căng mọng tuyệt hảo, mang lại lượng XP và Xu cao nhất.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyCherry,
    emblemSvg: `<circle cx="6.5" cy="9" r="2" fill="#B81433"/><circle cx="9.5" cy="9.5" r="2" fill="#C9183B"/><path d="M8 6 L6.5 8 M8 6 L9.5 8.5" stroke="#45781E" stroke-width="0.8"/>`,
    tier: 4,
    tierNameVi: 'Hạng IV - Thượng hạng',
    minLevel: 11,
    requiredLevel: 11,
    requiredXp: 0,
    requiredLessonId: 45,
    requiredLessonTitle: 'Quan hệ đối tác (Partnerships)'
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
