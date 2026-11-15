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
  // GIAI ĐOẠN 4: 11 LOẠI CÂY TRỒNG KHI CHÍN (READY MATURE CROPS)
  // =========================================================================

  // 1. CÀ RỐT
  readyCarrot: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="72" rx="16" ry="6" fill="#382210"/>
      <path d="M36 50 Q45 47 54 50 L50 74 Q45 78 40 74 Z" fill="#FF7814" stroke="#B84900" stroke-width="2.5"/>
      <line x1="39" y1="56" x2="49" y2="56" stroke="#D95700" stroke-width="2" stroke-linecap="round"/>
      <line x1="41" y1="64" x2="48" y2="64" stroke="#D95700" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="42" cy="52" rx="2.5" ry="1.5" fill="#FFA55C"/>
      <path d="M45 50 C32 38 22 22 28 8 C38 14 42 32 45 50 Z" fill="#4E8C24" stroke="#2B5211" stroke-width="2"/>
      <path d="M45 50 C58 38 68 22 62 8 C52 14 48 32 45 50 Z" fill="#5FA82E" stroke="#2B5211" stroke-width="2"/>
      <path d="M45 50 C40 28 38 12 45 4 C52 12 50 28 45 50 Z" fill="#75CF38" stroke="#2B5211" stroke-width="2"/>
      <circle cx="30" cy="14" r="4.5" fill="#75CF38"/>
      <circle cx="60" cy="14" r="4.5" fill="#8CE64C"/>
      <circle cx="45" cy="8" r="5" fill="#9EF25E"/>
    </svg>
  `,

  // 2. BẮP NGÔ
  readyCorn: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="74" rx="16" ry="6" fill="#382210"/>
      <!-- Bẹ lá xanh bọc ngoài -->
      <path d="M45 72 C30 65 24 45 28 30 C38 34 42 50 45 72 Z" fill="#528E28" stroke="#2E5414" stroke-width="2"/>
      <path d="M45 72 C60 65 66 45 62 30 C52 34 48 50 45 72 Z" fill="#66AB34" stroke="#2E5414" stroke-width="2"/>
      <!-- Bắp ngô vàng -->
      <path d="M35 56 C35 28 40 16 45 16 C50 16 55 28 55 56 Z" fill="#F5C022" stroke="#A67B00" stroke-width="2.5"/>
      <!-- Hạt bắp đều -->
      <circle cx="42" cy="26" r="2.5" fill="#FFE27A"/>
      <circle cx="48" cy="26" r="2.5" fill="#FFE27A"/>
      <circle cx="40" cy="34" r="2.8" fill="#FFE27A"/>
      <circle cx="46" cy="34" r="2.8" fill="#FFE27A"/>
      <circle cx="50" cy="34" r="2.2" fill="#E6AE15"/>
      <circle cx="41" cy="42" r="3" fill="#FFE27A"/>
      <circle cx="48" cy="42" r="3" fill="#FFE27A"/>
      <circle cx="42" cy="50" r="3" fill="#FFE27A"/>
      <circle cx="48" cy="50" r="3" fill="#FFE27A"/>
      <!-- Râu ngô trên đỉnh -->
      <path d="M43 16 Q41 10 38 8 M45 16 V6 M47 16 Q50 10 52 8" stroke="#8C6538" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,

  // 3. CÀ CHUA
  readyTomato: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="74" rx="16" ry="6" fill="#382210"/>
      <!-- Quả cà chua đỏ mọng -->
      <circle cx="45" cy="46" r="24" fill="#E53924" stroke="#8A1B0D" stroke-width="2.5"/>
      <!-- Bóng sáng -->
      <ellipse cx="36" cy="36" rx="5" ry="9" transform="rotate(-30 36 36)" fill="#FF7A69"/>
      <circle cx="34" cy="32" r="3" fill="#FFFFFF"/>
      <!-- Tai lá xanh trên đỉnh -->
      <path d="M45 22 L41 12 M45 22 L49 12 M45 22 L35 18 M45 22 L55 18 M45 22 L45 8" stroke="#487D21" stroke-width="3" stroke-linecap="round"/>
      <polygon points="45,22 41,18 45,14 49,18" fill="#5BA12B"/>
    </svg>
  `,

  // 4. HOA HƯỚNG DƯƠNG (SUNFLOWER)
  readySunflower: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="76" rx="15" ry="5" fill="#382210"/>
      <!-- Thân cây xanh khỏe -->
      <rect x="42" y="38" width="6" height="38" rx="2" fill="#4B8528" stroke="#2B5216" stroke-width="2"/>
      <path d="M42 58 C30 54 22 46 25 38 C35 38 40 48 42 58 Z" fill="#5BA12B" stroke="#2B5216" stroke-width="1.8"/>
      <path d="M48 52 C60 48 68 40 65 32 C55 32 50 42 48 52 Z" fill="#6CB832" stroke="#2B5216" stroke-width="1.8"/>
      <!-- Vòng cánh hoa vàng rực -->
      <circle cx="45" cy="30" r="24" fill="#F7BA1E" stroke="#B88005" stroke-width="2"/>
      <!-- Các cánh hoa viền răng cưa -->
      <path d="M45 6 L48 16 L45 20 L42 16 Z" fill="#FFCF33"/>
      <path d="M45 54 L48 44 L45 40 L42 44 Z" fill="#FFCF33"/>
      <path d="M21 30 L31 27 L35 30 L31 33 Z" fill="#FFCF33"/>
      <path d="M69 30 L59 27 L55 30 L59 33 Z" fill="#FFCF33"/>
      <path d="M28 13 L37 20 L35 24 L29 20 Z" fill="#FFCF33"/>
      <path d="M62 13 L53 20 L55 24 L61 20 Z" fill="#FFCF33"/>
      <path d="M28 47 L37 40 L35 36 L29 40 Z" fill="#FFCF33"/>
      <path d="M62 47 L53 40 L55 36 L61 40 Z" fill="#FFCF33"/>
      <!-- Nhị hoa nâu hạt dẻ -->
      <circle cx="45" cy="30" r="13" fill="#543315" stroke="#3D2109" stroke-width="2"/>
      <circle cx="45" cy="30" r="10" fill="#6B411B"/>
      <circle cx="42" cy="27" r="1.5" fill="#99602E"/>
      <circle cx="48" cy="28" r="1.5" fill="#99602E"/>
      <circle cx="45" cy="33" r="1.5" fill="#99602E"/>
    </svg>
  `,

  // 5. HOA HỒNG (ROSE)
  readyRose: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="76" rx="14" ry="5" fill="#382210"/>
      <!-- Thân cây hoa hồng xanh thẫm có gai -->
      <path d="M45 74 Q43 55 45 40" stroke="#3C6B22" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <polygon points="43,58 38,55 43,53" fill="#3C6B22"/>
      <polygon points="46,48 51,45 46,43" fill="#3C6B22"/>
      <!-- Lá hoa hồng răng cưa -->
      <path d="M43 58 C30 56 24 46 28 38 C38 40 42 50 43 58 Z" fill="#4B8528" stroke="#244512" stroke-width="1.8"/>
      <path d="M46 50 C58 48 64 38 60 30 C50 32 46 42 46 50 Z" fill="#589B30" stroke="#244512" stroke-width="1.8"/>
      <!-- Bông hoa hồng nhiều lớp cánh đỏ kiêu sa -->
      <circle cx="45" cy="28" r="18" fill="#C91834" stroke="#7A0B1D" stroke-width="2.5"/>
      <path d="M34 26 C34 16 56 16 56 26 C56 36 34 36 34 26 Z" fill="#E02845"/>
      <path d="M38 24 C40 18 50 18 52 24 C52 30 38 30 38 24 Z" fill="#F0435F"/>
      <ellipse cx="45" cy="24" rx="4" ry="3" fill="#FF7088"/>
    </svg>
  `,

  // 6. HOA TULIP (TULIP)
  readyTulip: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="76" rx="14" ry="5" fill="#382210"/>
      <!-- Cành thẳng thanh mảnh -->
      <rect x="43" y="36" width="4" height="40" rx="2" fill="#4D8A29" stroke="#2A5214" stroke-width="1.8"/>
      <!-- 2 Lá tulip dài vươn ôm thân -->
      <path d="M43 74 C26 64 20 40 28 24 C34 36 40 56 43 74 Z" fill="#5FA334" stroke="#2A5214" stroke-width="2"/>
      <path d="M47 74 C64 64 70 40 62 24 C56 36 50 56 47 74 Z" fill="#72BD40" stroke="#2A5214" stroke-width="2"/>
      <!-- Búp hoa tulip hình chén màu tím hồng vintage -->
      <path d="M32 36 C30 18 40 12 45 22 C50 12 60 18 58 36 C56 46 34 46 32 36 Z" fill="#D6386C" stroke="#7D1339" stroke-width="2.5"/>
      <path d="M40 26 C42 16 48 16 50 26 C50 36 40 36 40 26 Z" fill="#E85A8A"/>
      <ellipse cx="45" cy="30" rx="4" ry="8" fill="#F786AD"/>
    </svg>
  `,

  // 7. XOÀI (MANGO)
  readyMango: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="76" rx="15" ry="5" fill="#382210"/>
      <rect x="43" y="52" width="5" height="24" rx="2" fill="#5A3A1A"/>
      <!-- Lá xoài thon dài -->
      <path d="M43 54 C26 50 16 38 18 28 C30 30 38 42 43 54 Z" fill="#3D7020" stroke="#20400F" stroke-width="1.8"/>
      <path d="M47 50 C64 46 74 34 72 24 C60 26 52 38 47 50 Z" fill="#4B8728" stroke="#20400F" stroke-width="1.8"/>
      <!-- Quả xoài vàng ươm dáng cong chữ S -->
      <path d="M42 20 C54 18 64 26 60 42 C56 56 42 56 36 44 C32 34 34 22 42 20 Z" fill="#FAB81B" stroke="#A86F00" stroke-width="2.5"/>
      <path d="M50 24 C58 30 56 44 48 48 C44 44 46 30 50 24 Z" fill="#FFD054"/>
      <ellipse cx="38" cy="28" rx="4" ry="8" transform="rotate(-15 38 28)" fill="#FA8E14" opacity="0.7"/>
      <path d="M42 20 L40 12" stroke="#5A3A1A" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  // 8. KIWI (KIWI)
  readyKiwi: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="74" rx="15" ry="5" fill="#382210"/>
      <!-- Thân leo & lá kiwi tròn -->
      <path d="M45 72 Q42 52 45 42" stroke="#4A6E24" stroke-width="4" fill="none"/>
      <ellipse cx="28" cy="40" rx="10" ry="7" fill="#528A28" stroke="#2A4D10" stroke-width="1.8"/>
      <ellipse cx="62" cy="40" rx="10" ry="7" fill="#62A132" stroke="#2A4D10" stroke-width="1.8"/>
      <!-- Nửa quả kiwi bổ đôi lộ ruột ngọc -->
      <ellipse cx="45" cy="38" rx="19" ry="17" fill="#75522E" stroke="#422D16" stroke-width="2.5"/>
      <ellipse cx="45" cy="38" rx="16" ry="14" fill="#99C942"/>
      <ellipse cx="45" cy="38" rx="6" ry="5" fill="#E8F5C4"/>
      <!-- Vòng hạt đen bao quanh -->
      <circle cx="39" cy="34" r="1.2" fill="#261E14"/>
      <circle cx="43" cy="31" r="1.2" fill="#261E14"/>
      <circle cx="47" cy="31" r="1.2" fill="#261E14"/>
      <circle cx="51" cy="34" r="1.2" fill="#261E14"/>
      <circle cx="52" cy="40" r="1.2" fill="#261E14"/>
      <circle cx="49" cy="44" r="1.2" fill="#261E14"/>
      <circle cx="45" cy="45" r="1.2" fill="#261E14"/>
      <circle cx="41" cy="44" r="1.2" fill="#261E14"/>
      <circle cx="38" cy="40" r="1.2" fill="#261E14"/>
    </svg>
  `,

  // 9. CHANH (LEMON)
  readyLemon: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="74" rx="15" ry="5" fill="#382210"/>
      <!-- Cành lá chanh xanh biếc -->
      <path d="M45 70 Q43 52 45 40" stroke="#4A7520" stroke-width="4" fill="none"/>
      <path d="M43 50 C28 46 22 34 26 24 C36 26 42 38 43 50 Z" fill="#4E8C24" stroke="#254C0D" stroke-width="2"/>
      <!-- Quả chanh vàng tươi bầu dục có chóp 2 đầu -->
      <path d="M26 36 C24 30 28 26 36 24 C50 20 62 26 64 36 C66 46 54 52 40 50 C28 48 24 42 26 36 Z" fill="#FCE028" stroke="#AB9100" stroke-width="2.5"/>
      <ellipse cx="38" cy="32" rx="6" ry="3" transform="rotate(-15 38 32)" fill="#FFF48F"/>
      <circle cx="25" cy="35" r="2" fill="#FCE028"/>
      <circle cx="65" cy="37" r="2" fill="#FCE028"/>
      <path d="M45 22 L45 16" stroke="#4A7520" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,

  // 10. TÁO (APPLE)
  readyApple: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="74" rx="16" ry="6" fill="#382210"/>
      <!-- Gốc cây & cành -->
      <path d="M45 72 V50" stroke="#54381C" stroke-width="5" stroke-linecap="round"/>
      <!-- Táo đỏ chín mọng -->
      <path d="M45 24 C34 18 20 24 20 40 C20 58 34 66 45 66 C56 66 70 58 70 40 C70 24 56 18 45 24 Z" fill="#DE2C2C" stroke="#7A1111" stroke-width="2.5"/>
      <ellipse cx="32" cy="34" rx="5" ry="10" transform="rotate(-25 32 34)" fill="#FFA3A3"/>
      <circle cx="36" cy="28" r="3" fill="#FFFFFF"/>
      <!-- Cuống nâu & lá xanh -->
      <path d="M45 22 C45 12 52 10 54 8" fill="none" stroke="#4A3018" stroke-width="3" stroke-linecap="round"/>
      <path d="M48 16 C56 12 64 14 64 18 C58 22 50 20 48 16 Z" fill="#58A826" stroke="#2C5910" stroke-width="1.8"/>
    </svg>
  `,

  // 11. CHERRY (CHERRY)
  readyCherry: `
    <svg viewBox="0 0 90 90" width="100%" height="100%">
      <ellipse cx="45" cy="74" rx="16" ry="6" fill="#382210"/>
      <!-- Cặp cuống xanh chụm chữ V -->
      <path d="M45 14 Q36 28 34 46" stroke="#45781E" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M45 14 Q52 30 56 48" stroke="#45781E" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="46" cy="14" rx="8" ry="4" transform="rotate(-20 46 14)" fill="#61A32D" stroke="#2F5712" stroke-width="1.5"/>
      <!-- Quả cherry trái -->
      <circle cx="33" cy="50" r="13" fill="#B81433" stroke="#630718" stroke-width="2.5"/>
      <ellipse cx="28" cy="44" rx="2.5" ry="4.5" transform="rotate(-30 28 44)" fill="#FF708C"/>
      <circle cx="30" cy="42" r="1.5" fill="#FFFFFF"/>
      <!-- Quả cherry phải -->
      <circle cx="56" cy="52" r="13" fill="#C9183B" stroke="#630718" stroke-width="2.5"/>
      <ellipse cx="51" cy="46" rx="2.5" ry="4.5" transform="rotate(-30 51 46)" fill="#FF708C"/>
      <circle cx="53" cy="44" r="1.5" fill="#FFFFFF"/>
    </svg>
  `,

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
    <svg viewBox="0 0 60 60" width="46" height="46">
      <path d="M14 16 L46 16 L42 50 L18 50 Z" fill="#C9A377" stroke="#694C2D" stroke-width="2.5"/>
      <rect x="12" y="12" width="36" height="7" rx="2" fill="#DFC099" stroke="#694C2D" stroke-width="2"/>
      <rect x="20" y="25" width="20" height="18" rx="2" fill="#FFFDF8"/>
      <path d="M30 38 V32 M30 33 C26 31 24 26 28 25 C31 27 30 31 30 33 Z" fill="#6FA338" stroke="#487328" stroke-width="1.2"/>
      <path d="M30 33 C34 31 36 26 32 25 C29 27 30 31 30 33 Z" fill="#8DCB49" stroke="#487328" stroke-width="1.2"/>
    </svg>
  `,

  wateringCan: `
    <svg viewBox="0 0 60 60" width="46" height="46">
      <path d="M20 22 H40 L44 48 H16 Z" fill="#5F8E9B" stroke="#2B464E" stroke-width="2.5"/>
      <ellipse cx="30" cy="22" rx="10" ry="3" fill="#80B0BE"/>
      <path d="M16 26 C8 28 8 44 17 46" fill="none" stroke="#2B464E" stroke-width="3" stroke-linecap="round"/>
      <path d="M38 36 L52 20" fill="none" stroke="#2B464E" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="54" cy="18" rx="5" ry="3" transform="rotate(-30 54 18)" fill="#D4AF37" stroke="#2B464E" stroke-width="1.8"/>
      <circle cx="56" cy="12" r="1.5" fill="#55B4D4"/>
      <circle cx="59" cy="16" r="1.2" fill="#55B4D4"/>
    </svg>
  `,

  fertilizerSack: `
    <svg viewBox="0 0 60 60" width="46" height="46">
      <path d="M18 20 C18 16 24 16 30 18 C36 16 42 16 42 20 L46 50 H14 Z" fill="#C49F74" stroke="#5E4020" stroke-width="2.5"/>
      <rect x="22" y="20" width="16" height="4" rx="2" fill="#E8D5B5" stroke="#5E4020" stroke-width="1.8"/>
      <circle cx="30" cy="35" r="7" fill="#E8D9BF"/>
      <circle cx="30" cy="35" r="4" fill="#6DA637"/>
    </svg>
  `,

  harvestBasket: `
    <svg viewBox="0 0 60 60" width="46" height="46">
      <path d="M16 28 C16 10 44 10 44 28" fill="none" stroke="#634525" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M10 26 H50 L44 50 H16 Z" fill="#B3804D" stroke="#57381A" stroke-width="2.5"/>
      <line x1="13" y1="32" x2="47" y2="32" stroke="#8A5A2B" stroke-width="2"/>
      <line x1="15" y1="38" x2="45" y2="38" stroke="#8A5A2B" stroke-width="2"/>
      <line x1="17" y1="44" x2="43" y2="44" stroke="#8A5A2B" stroke-width="2"/>
    </svg>
  `,

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
