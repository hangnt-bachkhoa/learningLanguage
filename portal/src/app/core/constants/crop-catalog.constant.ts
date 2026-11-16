import { CropCatalog } from '../models/game.models';
import { FARM_ASSETS } from './farm-assets.constant';

export function kraftSeedPacket(emblemSvg: string): string {
  return `<svg width="46" height="46" viewBox="0 0 16 16" class="pixel-art">
    <rect x="2" y="3" width="12" height="11" fill="#3B2D24"/>
    <rect x="3" y="4" width="10" height="9" fill="#C49A71"/>
    <rect x="4" y="5" width="8" height="8" fill="#EBDAC0"/>
    ${emblemSvg}
  </svg>`;
}

export const CROP_CATALOG: CropCatalog[] = [
  {
    id: 'carrot',
    nameVi: 'Cà rốt',
    seedNameVi: 'Hạt giống Cà rốt',
    shopId: 's_carrot',
    price: 10,
    duration: '5 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 5,
    usage: 'Gieo trên ô đất trống. Thu hoạch để nhận Xu và mở khóa bài học.',
    desc: 'Củ cà rốt cam giòn ngọt, dễ trồng cho người mới bắt đầu.',
    initialSeeds: 3,
    initialHarvested: 2,
    matureSvg: FARM_ASSETS.readyCarrot,
    emblemSvg: `<rect x="8" y="6" width="2" height="2" fill="#5D9E42"/>
      <rect x="7" y="8" width="3" height="2" fill="#F28522"/>
      <rect x="6" y="10" width="2" height="2" fill="#E36D17"/>`,
    tier: 1,
    tierNameVi: 'Hạng I - Mầm non',
    requiredLevel: 1,
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
    requiredLevel: 1,
    requiredXp: 30,
    requiredLessonId: 1,
    requiredLessonTitle: 'Fruits & Vegetables'
  },
  {
    id: 'corn',
    nameVi: 'Bắp ngô',
    seedNameVi: 'Hạt giống Ngô',
    shopId: 's_corn',
    price: 20,
    duration: '8 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 8,
    usage: 'Gieo hạt ngô trên ô đất trống để thu hoạch bắp ngô vàng.',
    desc: 'Bắp ngô vàng óng ả giàu năng lượng, giá trị kinh tế cao.',
    initialSeeds: 3,
    initialHarvested: 1,
    matureSvg: FARM_ASSETS.readyCorn,
    emblemSvg: `<rect x="7" y="6" width="2" height="4" fill="#F2C138"/>
      <rect x="6" y="9" width="4" height="2" fill="#639E46"/>`,
    tier: 1,
    tierNameVi: 'Hạng I - Mầm non',
    requiredLevel: 1,
    requiredXp: 50,
    requiredLessonId: 3,
    requiredLessonTitle: 'Văn phòng (Office)'
  },
  {
    id: 'tomato',
    nameVi: 'Cà chua',
    seedNameVi: 'Hạt giống Cà chua',
    shopId: 's_tomato',
    price: 30,
    duration: '10 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 10,
    usage: 'Trồng cà chua đỏ mọng trên luống đất.',
    desc: 'Cà chua chín đỏ tươi, bổ sung dinh dưỡng và tăng nhanh điểm XP.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyTomato,
    emblemSvg: `<rect x="7" y="7" width="2" height="1" fill="#639E46"/>
      <rect x="6" y="8" width="4" height="3" fill="#E34B39"/>
      <rect x="7" y="8" width="1" height="1" fill="#FF8C7A"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    requiredLevel: 2,
    requiredXp: 100,
    requiredLessonId: 5,
    requiredLessonTitle: 'Kinh doanh (Business)'
  },
  {
    id: 'strawberry',
    nameVi: 'Dâu tây',
    seedNameVi: 'Hạt giống Dâu tây',
    shopId: 's_strawberry',
    price: 25,
    duration: '12 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 12,
    usage: 'Gieo hạt dâu tây chín đỏ mọng để thu hoạch trái ngọt giá trị cao.',
    desc: 'Những trái dâu tây đỏ tươi chua ngọt hấp dẫn, giá trị cao.',
    initialSeeds: 3,
    initialHarvested: 2,
    matureSvg: FARM_ASSETS.readyStrawberry,
    emblemSvg: `<path d="M5 6 C5 5 11 5 11 6 C10 9 8 11 8 11 C8 11 6 9 5 6 Z" fill="#E62E43"/><circle cx="8" cy="8" r="0.5" fill="#FFDF73"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    requiredLevel: 2,
    requiredXp: 80,
    requiredLessonId: 4,
    requiredLessonTitle: 'Nhân sự (Human Resources)'
  },
  {
    id: 'pumpkin',
    nameVi: 'Bí ngô',
    seedNameVi: 'Hạt giống Bí ngô',
    shopId: 's_pumpkin',
    price: 18,
    duration: '15 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 15,
    usage: 'Gieo hạt bí ngô trên luống đất tơi xốp.',
    desc: 'Trái bí ngô tròn vàng cam đậm đà, thu hoạch cho mùa vụ bội thu.',
    initialSeeds: 3,
    initialHarvested: 1,
    matureSvg: FARM_ASSETS.readyPumpkin,
    emblemSvg: `<ellipse cx="8" cy="8.5" rx="3.5" ry="3" fill="#E87817"/>
      <rect x="7.5" y="5" width="1" height="1.5" fill="#588E33"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    requiredLevel: 2,
    requiredXp: 150,
    requiredLessonId: 6,
    requiredLessonTitle: 'Tài chính (Finance)'
  },
  {
    id: 'wheat',
    nameVi: 'Lúa mì',
    seedNameVi: 'Hạt giống Lúa mì',
    shopId: 's_wheat',
    price: 20,
    duration: '12 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 12,
    usage: 'Gieo lúa mì trên ruộng đất màu mỡ.',
    desc: 'Những bông lúa mì vàng óng trĩu hạt, biểu tượng của sự no ấm.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyWheat,
    emblemSvg: `<path d="M7 11 L9 7 M7 8 L9 8 M7 6 L9 6" stroke="#DCA22C" stroke-width="1.2"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    requiredLevel: 2,
    requiredXp: 200,
    requiredLessonId: 7,
    requiredLessonTitle: 'Ngân hàng (Banking)'
  },
  {
    id: 'blueberry',
    nameVi: 'Việt quất',
    seedNameVi: 'Hạt giống Việt quất',
    shopId: 's_blueberry',
    price: 24,
    duration: '15 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 15,
    usage: 'Trồng bụi việt quất ngọt ngào.',
    desc: 'Những chùm việt quất tím thẫm mọng nước, giàu chất chống oxy hóa.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyBlueberry,
    emblemSvg: `<circle cx="7" cy="8" r="2" fill="#3D4A8A"/>
      <circle cx="9.5" cy="8.5" r="1.8" fill="#5B6AB5"/>`,
    tier: 3,
    tierNameVi: 'Hạng III - Làm vườn',
    requiredLevel: 3,
    requiredXp: 280,
    requiredLessonId: 8,
    requiredLessonTitle: 'Marketing & Quảng cáo'
  },
  {
    id: 'lemon',
    nameVi: 'Chanh',
    seedNameVi: 'Hạt giống Chanh',
    shopId: 's_lemon',
    price: 22,
    duration: '15 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 15,
    usage: 'Trồng cây chanh vàng mọng nước.',
    desc: 'Chanh vàng tươi mát lành, dễ chăm sóc và mau ra quả.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyLemon,
    emblemSvg: `<ellipse cx="8" cy="8" rx="3.5" ry="2.5" transform="rotate(-15 8 8)" fill="#FCE028"/>`,
    tier: 3,
    tierNameVi: 'Hạng III - Làm vườn',
    requiredLevel: 3,
    requiredXp: 340,
    requiredLessonId: 10,
    requiredLessonTitle: 'Nhà hàng (Restaurant)'
  },
  {
    id: 'watermelon',
    nameVi: 'Dưa hấu',
    seedNameVi: 'Hạt giống Dưa hấu',
    shopId: 's_watermelon',
    price: 32,
    duration: '18 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 18,
    usage: 'Trồng dưa hấu giải nhiệt thanh mát.',
    desc: 'Trái dưa hấu vỏ xanh ruột đỏ mọng ngọt, giải khát ngày hè oi ả.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyWatermelon,
    emblemSvg: `<path d="M5 8 C5 11 11 11 11 8 Z" fill="#2E7535"/>
      <path d="M6 8 C6 10 10 10 10 8 Z" fill="#D62839"/>`,
    tier: 3,
    tierNameVi: 'Hạng III - Làm vườn',
    requiredLevel: 3,
    requiredXp: 420,
    requiredLessonId: 12,
    requiredLessonTitle: 'Du lịch (Travel)'
  },
  {
    id: 'mango',
    nameVi: 'Xoài',
    seedNameVi: 'Hạt giống Xoài',
    shopId: 's_mango',
    price: 35,
    duration: '18 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 18,
    usage: 'Trồng cây xoài cát ngọt lịm.',
    desc: 'Xoài chín vàng ươm mọng nước, năng suất thu hoạch cao.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyMango,
    emblemSvg: `<ellipse cx="8" cy="8" rx="2.5" ry="3.5" transform="rotate(-15 8 8)" fill="#FAB81B"/>`,
    tier: 4,
    tierNameVi: 'Hạng IV - Thượng hạng',
    requiredLevel: 4,
    requiredXp: 500,
    requiredLessonId: 15,
    requiredLessonTitle: 'Công nghệ (Technology)'
  },
  {
    id: 'apple',
    nameVi: 'Táo',
    seedNameVi: 'Hạt giống Táo',
    shopId: 's_apple',
    price: 40,
    duration: '15 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 15,
    usage: 'Gieo hạt táo đỏ ngọt giòn.',
    desc: 'Cây táo đỏ cổ điển mang lại nguồn thu nhập lớn và nhiều điểm XP.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyApple,
    emblemSvg: `<circle cx="8" cy="8.5" r="3" fill="#DE2C2C"/>
      <rect x="7.5" y="5" width="1" height="2" fill="#4A3018"/>`,
    tier: 4,
    tierNameVi: 'Hạng IV - Thượng hạng',
    requiredLevel: 4,
    requiredXp: 650,
    requiredLessonId: 22,
    requiredLessonTitle: 'Môi trường (Environment)'
  },
  {
    id: 'cherry',
    nameVi: 'Cherry',
    seedNameVi: 'Hạt giống Cherry',
    shopId: 's_cherry',
    price: 50,
    duration: '20 phút (Tưới -2p, Phân -5p)',
    growthMinutes: 20,
    usage: 'Trồng cây cherry mọng đỏ cao cấp.',
    desc: 'Quả cherry căng mọng tuyệt hảo, mang lại lượng XP và Xu cao nhất.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyCherry,
    emblemSvg: `<circle cx="6.5" cy="9" r="2" fill="#B81433"/>
      <circle cx="9.5" cy="9.5" r="2" fill="#C9183B"/>
      <path d="M8 6 L6.5 8 M8 6 L9.5 8.5" stroke="#45781E" stroke-width="0.8"/>`,
    tier: 4,
    tierNameVi: 'Hạng IV - Thượng hạng',
    requiredLevel: 5,
    requiredXp: 800,
    requiredLessonId: 34,
    requiredLessonTitle: 'Nghệ thuật (Arts)'
  }
];

export const SPRITES: Record<string, string> = {
  seed: kraftSeedPacket(`<rect x="6" y="9" width="4" height="2" fill="#639E46"/><rect x="7" y="7" width="2" height="2" fill="#81C25B"/>`),
  seeds_on_soil: FARM_ASSETS.seedsOnSoil,
  sprout: FARM_ASSETS.sprout,
  padlock: FARM_ASSETS.lockedPadlock,
  water: FARM_ASSETS.wateringCan,
  fertilizer: FARM_ASSETS.fertilizerSack,
  basket: FARM_ASSETS.harvestBasket,
  lamp: `<svg width="44" height="44" viewBox="0 0 16 16" class="pixel-art">
    <rect x="5" y="2" width="6" height="12" fill="#263847"/>
    <rect x="6" y="4" width="4" height="4" fill="#F5D97E"/>
    <rect x="7" y="8" width="2" height="4" fill="#465C6E"/>
  </svg>`,
  bundle: `<svg width="44" height="44" viewBox="0 0 16 16" class="pixel-art">
    <rect x="2" y="4" width="12" height="10" fill="#3B2D24"/>
    <rect x="3" y="5" width="10" height="8" fill="#B57A4E"/>
    <rect x="3" y="5" width="10" height="2" fill="#D19564"/>
    <rect x="7" y="7" width="2" height="2" fill="#E4B43C"/>
  </svg>`
};

CROP_CATALOG.forEach(c => {
  SPRITES[c.id] = c.matureSvg;
  SPRITES[c.shopId] = kraftSeedPacket(c.emblemSvg);
  SPRITES['seed_' + c.id] = kraftSeedPacket(c.emblemSvg);
});

// Backward-compatibility aliases cho dữ liệu cũ (sunflower, tulip, rose, kiwi)
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
