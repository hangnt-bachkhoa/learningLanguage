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
    duration: '2 phút (2 lượt tưới)',
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
    id: 'corn',
    nameVi: 'Bắp ngô',
    seedNameVi: 'Hạt giống Ngô',
    shopId: 's_corn',
    price: 20,
    duration: '5 phút (3 lượt tưới)',
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
    duration: '8 phút (4 lượt tưới)',
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
    id: 'sunflower',
    nameVi: 'Hoa hướng dương',
    seedNameVi: 'Hạt giống Hướng dương',
    shopId: 's_sunflower',
    price: 18,
    duration: '4 phút (2 lượt tưới)',
    usage: 'Gieo trồng hoa hướng dương đón nắng.',
    desc: 'Hoa hướng dương vàng rực rỡ, biểu tượng của sự kiên trì học tập.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readySunflower,
    emblemSvg: `<circle cx="8" cy="8" r="3" fill="#F7BA1E"/>
      <circle cx="8" cy="8" r="1.5" fill="#543315"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    requiredLevel: 2,
    requiredXp: 150,
    requiredLessonId: 4,
    requiredLessonTitle: 'Nhân sự (Human Resources)'
  },
  {
    id: 'tulip',
    nameVi: 'Hoa tulip',
    seedNameVi: 'Hạt giống Hoa tulip',
    shopId: 's_tulip',
    price: 20,
    duration: '4 phút (2 lượt tưới)',
    usage: 'Gieo hoa tulip phong cách Hà Lan thanh lịch.',
    desc: 'Búp hoa tulip màu hồng tím duyên dáng, sinh trưởng nhanh.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyTulip,
    emblemSvg: `<path d="M6 9 C5 6 7 5 8 7 C9 5 11 6 10 9 Z" fill="#D6386C"/>`,
    tier: 2,
    tierNameVi: 'Hạng II - Hoa trái',
    requiredLevel: 2,
    requiredXp: 200,
    requiredLessonId: 6,
    requiredLessonTitle: 'Tài chính (Finance)'
  },
  {
    id: 'rose',
    nameVi: 'Hoa hồng',
    seedNameVi: 'Hạt giống Hoa hồng',
    shopId: 's_rose',
    price: 24,
    duration: '5 phút (3 lượt tưới)',
    usage: 'Trồng hoa hồng đỏ kiêu sa làm đẹp cho nông trại.',
    desc: 'Những đóa hồng nhung đỏ thắm, tỏa hương thơm ngát.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyRose,
    emblemSvg: `<circle cx="8" cy="8" r="3" fill="#C91834"/>
      <circle cx="8" cy="7.5" r="1.5" fill="#FF7088"/>`,
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
    duration: '5 phút (2 lượt tưới)',
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
    id: 'kiwi',
    nameVi: 'Kiwi',
    seedNameVi: 'Hạt giống Kiwi',
    shopId: 's_kiwi',
    price: 32,
    duration: '6 phút (3 lượt tưới)',
    usage: 'Trồng giàn kiwi thanh mát.',
    desc: 'Quả kiwi ruột xanh ngọc ngọt dịu, giàu vitamin C.',
    initialSeeds: 3,
    initialHarvested: 0,
    matureSvg: FARM_ASSETS.readyKiwi,
    emblemSvg: `<circle cx="8" cy="8" r="3" fill="#75522E"/>
      <circle cx="8" cy="8" r="2.2" fill="#99C942"/>`,
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
    duration: '7 phút (3 lượt tưới)',
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
    duration: '8 phút (4 lượt tưới)',
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
    duration: '10 phút (4 lượt tưới)',
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
});
