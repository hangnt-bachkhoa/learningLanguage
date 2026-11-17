import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PixelIconComponent } from '../../shared/components/pixel-icon/pixel-icon.component';
import { PosTagBadgeComponent } from '../../shared/components/pos-tag-badge/pos-tag-badge.component';

export type GuideSectionId = 'loop' | 'spaced-repetition' | 'quests' | 'pos' | 'pity' | 'tips';

interface GuideSection {
  id: GuideSectionId;
  title: string;
  shortTitle: string;
  icon: string;
  badge: string;
}

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, RouterLink, PixelIconComponent, PosTagBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="guide-screen">
      <!-- HEADER CHÍNH -->
      <header class="guide-header">
        <div class="header-content">
          <div class="header-badge">
            <app-pixel-icon name="icon_books_stack" [size]="16"></app-pixel-icon>
            <span>CẨM NANG NÔNG DÂN HỌC TIẾNG ANH</span>
          </div>
          <h1 class="guide-title font-serif">Hướng Dẫn Sử Dụng English Farm</h1>
          <p class="guide-subtitle">
            Khám phá trọn vẹn quy trình học ngoại ngữ kết hợp canh tác nông trại sinh thái tự nhiên.
          </p>
        </div>
      </header>

      <!-- THANH CHUYỂN TAB CHUYÊN MỤC -->
      <nav class="guide-tabs-nav" aria-label="Các chuyên mục hướng dẫn">
        @for (sec of sections; track sec.id) {
          <button
            type="button"
            class="tab-pill-btn"
            [class.active]="activeSection() === sec.id"
            (click)="setSection(sec.id)">
            <app-pixel-icon [name]="sec.icon" [size]="16"></app-pixel-icon>
            <span class="tab-label">{{ sec.shortTitle }}</span>
          </button>
        }
      </nav>

      <!-- NỘI DUNG TỪNG PHẦN HƯỚNG DẪN -->
      <main class="guide-content-area">
        
        <!-- PHẦN 1: VÒNG LẶP NÔNG TRẠI (FARM-TO-LEARN LOOP) -->
        @if (activeSection() === 'loop') {
          <article class="guide-card">
            <div class="card-header-band">
              <div class="band-left">
                <span class="chapter-number">Chương 01</span>
                <h2 class="card-title font-serif">Vòng Lặp Canh Tác Cốt Lõi (Farm-to-Learn Loop)</h2>
              </div>
              <span class="band-tag tag-olive">Cơ chế chính</span>
            </div>

            <p class="card-intro">
              Mỗi từ vựng và chủ đề bạn học đều gắn liền trực tiếp với sự phát triển của khu vườn. Không có "cày chay" hay nạp tiền — hạt giống chỉ nảy mầm khi bạn thực sự nạp kiến thức!
            </p>

            <div class="steps-flow">
              <!-- BƯỚC 1 -->
              <div class="step-card">
                <div class="step-badge">1</div>
                <div class="step-body">
                  <div class="step-title-row">
                    <h3 class="step-title">Học Từ Mới &amp; Làm Quiz Ôn Tập</h3>
                    <app-pixel-icon name="icon_sparkle" [size]="16"></app-pixel-icon>
                  </div>
                  <p class="step-desc">
                    Vào mục <strong>Từ vựng</strong> hoặc <strong>Ngữ pháp</strong>. Khi đánh dấu "Đã học" hoặc hoàn thành bài thi Quiz trắc nghiệm, hệ thống sẽ cấp ngay <strong>Bộ nguyên liệu kích hoạt</strong> (+1 Nước tưới, +1 Phân bón) cùng Xu vàng và XP.
                  </p>
                  <div class="step-reward-pill">
                    <span>Phần thưởng:</span>
                    <strong>+1 💧 Nước · +1 🪴 Phân · +Xu &amp; XP</strong>
                  </div>
                </div>
              </div>

              <!-- BƯỚC 2 -->
              <div class="step-card">
                <div class="step-badge">2</div>
                <div class="step-body">
                  <div class="step-title-row">
                    <h3 class="step-title">Gieo Hạt Trên Luống Đất Trống</h3>
                    <app-pixel-icon name="icon_sprout_action" [size]="16"></app-pixel-icon>
                  </div>
                  <p class="step-desc">
                    Mở màn hình <strong>Nông trại</strong>, chạm vào ô đất trống và chọn loại hạt muốn gieo (Cà rốt, Dưa chuột, Cà chua, Khoai tây, Bắp ngô...). Hạt giống sẽ ở trạng thái chờ kích hoạt sinh trưởng.
                  </p>
                </div>
              </div>

              <!-- BƯỚC 3 -->
              <div class="step-card">
                <div class="step-badge">3</div>
                <div class="step-body">
                  <div class="step-title-row">
                    <h3 class="step-title">Tưới Nước &amp; Bón Phân (Care-Gate)</h3>
                    <app-pixel-icon name="icon_dew_drop" [size]="16"></app-pixel-icon>
                  </div>
                  <p class="step-desc">
                    <strong>Bắt buộc:</strong> Cây cần được Tưới nước để bắt đầu đếm ngược thời gian lớn. Bón thêm Phân bón cơ bản sẽ giúp rút ngắn thời gian sinh trưởng tới 50%!
                  </p>
                  <div class="step-tip-box">
                    💡 <em>Quy tắc Chăm sóc: Mỗi khi học 1 bài mới hoặc hoàn thành 1 lượt ôn tập ngắt quãng, bạn sẽ nhận đủ 1 lượt tưới nước cho cây mới trồng.</em>
                  </div>
                </div>
              </div>

              <!-- BƯỚC 4 -->
              <div class="step-card">
                <div class="step-badge">4</div>
                <div class="step-body">
                  <div class="step-title-row">
                    <h3 class="step-title">Thu Hoạch Nông Sản &amp; Phát Triển</h3>
                    <app-pixel-icon name="icon_harvest_basket" [size]="16"></app-pixel-icon>
                  </div>
                  <p class="step-desc">
                    Khi cây chín vàng, bấm <strong>Thu hoạch</strong> để thu củ quả vào Kho đồ. Bạn có thể bán nông sản trong Cửa hàng lấy Xu, mua đồ trang trí nông trại hoặc nâng cấp các công cụ canh tác cao cấp!
                  </p>
                </div>
              </div>
            </div>

            <div class="action-footer-row">
              <a routerLink="/farm" class="guide-action-btn primary-btn">
                <app-pixel-icon name="icon_sprout_action" [size]="16"></app-pixel-icon>
                <span>Vào Nông trại ngay ›</span>
              </a>
              <a routerLink="/lessons" class="guide-action-btn secondary-btn">
                <app-pixel-icon name="icon_books_stack" [size]="16"></app-pixel-icon>
                <span>Danh sách bài học ›</span>
              </a>
            </div>
          </article>
        }

        <!-- PHẦN 2: LỊCH ÔN TẬP EBBINGHAUS (SPACED REPETITION) -->
        @if (activeSection() === 'spaced-repetition') {
          <article class="guide-card">
            <div class="card-header-band">
              <div class="band-left">
                <span class="chapter-number">Chương 02</span>
                <h2 class="card-title font-serif">Định Luật Quên Lãng Ebbinghaus (Spaced Repetition)</h2>
              </div>
              <span class="band-tag tag-rose">Trí nhớ dài hạn</span>
            </div>

            <p class="card-intro">
              Não bộ con người quên tới 75% thông tin mới học chỉ sau 48 giờ nếu không được ôn ngắt quãng. English Farm áp dụng chu kỳ 5 mốc Ebbinghaus khoa học để đưa từ vựng vào trí nhớ vĩnh viễn.
            </p>

            <div class="ebbinghaus-timeline">
              <div class="stage-row">
                <div class="stage-col-badge stage-d0">D0</div>
                <div class="stage-col-content">
                  <div class="stage-name">Ngày học đầu tiên (Cohort D0)</div>
                  <div class="stage-sub">Đánh dấu "Đã học" từ vựng mới. Cấp +1 Nước +1 Phân để gieo cây đầu mùa.</div>
                </div>
              </div>

              <div class="stage-row">
                <div class="stage-col-badge stage-d1">D1</div>
                <div class="stage-col-content">
                  <div class="stage-name">Sau 24 Giờ (+1 Ngày)</div>
                  <div class="stage-sub">Khung giờ ôn tập đầu tiên. Ngăn chặn sự sụt giảm 50% trí nhớ ban đầu.</div>
                </div>
              </div>

              <div class="stage-row">
                <div class="stage-col-badge stage-d3">D3</div>
                <div class="stage-col-content">
                  <div class="stage-name">Sau 3 Ngày (+3 Ngày)</div>
                  <div class="stage-sub">Củng cố kết nối nơ-ron thần kinh khi não bộ bắt đầu lọc bớt chi tiết thừa.</div>
                </div>
              </div>

              <div class="stage-row">
                <div class="stage-col-badge stage-d7">D7</div>
                <div class="stage-col-content">
                  <div class="stage-name">Sau 7 Ngày (+7 Ngày)</div>
                  <div class="stage-sub">Chuyển từ vựng từ bộ nhớ ngắn hạn (RAM) sang bộ nhớ trung hạn.</div>
                </div>
              </div>

              <div class="stage-row">
                <div class="stage-col-badge stage-d14">D14</div>
                <div class="stage-col-content">
                  <div class="stage-name">Sau 14 Ngày — Thành Thạo Vĩnh Viễn ⭐</div>
                  <div class="stage-sub">Từ vựng đã ghi dấu vào tiềm thức dài hạn, sẵn sàng cho phản xạ giao tiếp tự nhiên.</div>
                </div>
              </div>
            </div>

            <div class="info-alert-box alert-rose">
              <span class="alert-icon">🔒</span>
              <div class="alert-text">
                <strong>Chống Tick Ảo &amp; Tự Động Hóa:</strong> Bạn không thể bấm hoàn thành thủ công. Hệ thống chỉ thăng hạng chu kỳ khi bạn làm đúng bài Quiz ôn tập tại ngày chỉ định. Trả lời sai sẽ giữ nguyên hoặc yêu cầu ôn lại để đảm bảo chất lượng nhớ thực chất!
              </div>
            </div>

            <div class="action-footer-row">
              <a routerLink="/review" class="guide-action-btn primary-btn">
                <app-pixel-icon name="icon_memory_brain" [size]="16"></app-pixel-icon>
                <span>Mở Lịch Ôn Tập Ebbinghaus ›</span>
              </a>
            </div>
          </article>
        }

        <!-- PHẦN 3: NHIỆM VỤ HÀNG NGÀY & CHUỖI HỌC (DAILY QUESTS & STREAK) -->
        @if (activeSection() === 'quests') {
          <article class="guide-card">
            <div class="card-header-band">
              <div class="band-left">
                <span class="chapter-number">Chương 03</span>
                <h2 class="card-title font-serif">Nhiệm Vụ Hàng Ngày &amp; Chuỗi Ngày Học (Streak)</h2>
              </div>
              <span class="band-tag tag-gold">Kỷ luật hàng ngày</span>
            </div>

            <p class="card-intro">
              Mỗi ngày vào 00:00 (giờ Việt Nam UTC+7), hệ thống tự động sinh 3 nhiệm vụ thông minh tương ứng với trình độ hiện tại của bạn, cùng 1 Rương Hoàn Thành Đặc Biệt (3/3).
            </p>

            <div class="quests-structure-grid">
              <div class="quest-box">
                <div class="quest-box-top">
                  <span class="quest-slot-pill">Slot 1 · Đầu vào</span>
                  <app-pixel-icon name="icon_books_stack" [size]="16"></app-pixel-icon>
                </div>
                <h4 class="quest-box-title">Học Từ Mới / Lý Thuyết</h4>
                <p class="quest-box-desc">Đánh dấu 10 từ mới hoặc hoàn thành 1 bài lý thuyết ngữ pháp trọng điểm.</p>
                <span class="quest-reward">+1 Hạt giống · +20 XP</span>
              </div>

              <div class="quest-box">
                <div class="quest-box-top">
                  <span class="quest-slot-pill">Slot 2 · Đầu ra</span>
                  <app-pixel-icon name="icon_retry" [size]="16"></app-pixel-icon>
                </div>
                <h4 class="quest-box-title">Luyện Tập &amp; Ôn Tập</h4>
                <p class="quest-box-desc">Hoàn thành bài thi Quiz hoặc vượt qua 1 mốc ôn tập ngắt quãng Ebbinghaus.</p>
                <span class="quest-reward">+1 Nước tưới · +25 Xu</span>
              </div>

              <div class="quest-box">
                <div class="quest-box-top">
                  <span class="quest-slot-pill">Slot 3 · Nông trại</span>
                  <app-pixel-icon name="icon_sprout_action" [size]="16"></app-pixel-icon>
                </div>
                <h4 class="quest-box-title">Chăm Sóc &amp; Thu Hoạch</h4>
                <p class="quest-box-desc">Tưới nước hoặc thu hoạch nông sản đã chín để đưa vào kho.</p>
                <span class="quest-reward">+1 Phân bón · +30 XP</span>
              </div>
            </div>

            <!-- RƯƠNG ĐẶC BIỆT -->
            <div class="grand-chest-banner">
              <div class="chest-icon-col">
                <app-pixel-icon name="chest_closed" [size]="32"></app-pixel-icon>
              </div>
              <div class="chest-body">
                <h4 class="chest-title font-serif">Rương Hoàn Thành Ngày (3/3 Nhiệm Vụ)</h4>
                <p class="chest-desc">
                  Mở khóa khi bạn hoàn thành cả 3 nhiệm vụ trong ngày. Nhận ngay <strong>+1 Khiên Đóng Băng Streak Freeze</strong> (bảo vệ chuỗi khi lỡ quên học) cùng kho Xu và Phân bón cao cấp!
                </p>
              </div>
            </div>

            <!-- CƠ CHẾ STREAK -->
            <div class="streak-explainer">
              <div class="streak-header">
                <app-pixel-icon name="icon_flame" [size]="20"></app-pixel-icon>
                <span class="streak-title">Quy Tắc Chuỗi Ngày Học (Streak)</span>
              </div>
              <ul class="streak-bullets">
                <li>Chuỗi chỉ tăng khi bạn thực hiện ít nhất 1 hoạt động học tập thực tế trong ngày (đánh dấu từ, làm quiz, hoàn tất ngữ pháp).</li>
                <li>Múi giờ tính toán chuẩn xác theo giờ Việt Nam (UTC+7).</li>
                <li>Nếu bận không học trong ngày, Khiên Đóng Băng (Streak Freeze) sẽ tự động kích hoạt để giữ nguyên chuỗi cho bạn.</li>
              </ul>
            </div>
          </article>
        }

        <!-- PHẦN 4: THẺ PHÂN LOẠI TỪ (BEGINNER-FRIENDLY POS) -->
        @if (activeSection() === 'pos') {
          <article class="guide-card">
            <div class="card-header-band">
              <div class="band-left">
                <span class="chapter-number">Chương 04</span>
                <h2 class="card-title font-serif">Thẻ Phân Biệt Loại Từ Thân Thiện (POS Badges)</h2>
              </div>
              <span class="band-tag tag-blue">Ngữ pháp trực quan</span>
            </div>

            <p class="card-intro">
              Người mới học tiếng Anh thường thấy bối rối trước các ký hiệu viết tắt như (n), (v), (adj), (adv). English Farm thiết kế lại toàn bộ thẻ loại từ theo màu sắc cổ điển kèm câu hỏi trợ giúp để bạn nhận diện tức thì:
            </p>

            <div class="pos-showcase-grid">
              <!-- NOUN -->
              <div class="pos-item-box">
                <div class="pos-badge-wrapper">
                  <app-pos-tag type="noun" mode="full" [showQuestionHint]="true"></app-pos-tag>
                </div>
                <div class="pos-question">Câu hỏi gợi ý: <em>"Ai? Cái gì? Con gì? Nơi nào?"</em></div>
                <p class="pos-example">Ví dụ: <strong>Farmer</strong> (Bác nông dân), <strong>Seed</strong> (Hạt giống), <strong>Garden</strong> (Khu vườn).</p>
              </div>

              <!-- VERB -->
              <div class="pos-item-box">
                <div class="pos-badge-wrapper">
                  <app-pos-tag type="verb" mode="full" [showQuestionHint]="true"></app-pos-tag>
                </div>
                <div class="pos-question">Câu hỏi gợi ý: <em>"Làm hành động gì?"</em></div>
                <p class="pos-example">Ví dụ: <strong>Plant</strong> (Gieo trồng), <strong>Water</strong> (Tưới nước), <strong>Harvest</strong> (Thu hoạch).</p>
              </div>

              <!-- ADJECTIVE -->
              <div class="pos-item-box">
                <div class="pos-badge-wrapper">
                  <app-pos-tag type="adj" mode="full" [showQuestionHint]="true"></app-pos-tag>
                </div>
                <div class="pos-question">Câu hỏi gợi ý: <em>"Như thế nào? Màu gì? Tính chất ra sao?"</em></div>
                <p class="pos-example">Ví dụ: <strong>Fresh</strong> (Tươi ngon), <strong>Ripe</strong> (Chín mọng), <strong>Green</strong> (Xanh tươi).</p>
              </div>

              <!-- ADVERB -->
              <div class="pos-item-box">
                <div class="pos-badge-wrapper">
                  <app-pos-tag type="adv" mode="full" [showQuestionHint]="true"></app-pos-tag>
                </div>
                <div class="pos-question">Câu hỏi gợi ý: <em>"Thực hiện hành động ra sao? Khi nào?"</em></div>
                <p class="pos-example">Ví dụ: <strong>Quickly</strong> (Nhanh chóng), <strong>Daily</strong> (Mỗi ngày), <strong>Carefully</strong> (Cẩn thận).</p>
              </div>

              <!-- PREPOSITION -->
              <div class="pos-item-box">
                <div class="pos-badge-wrapper">
                  <app-pos-tag type="prep" mode="full" [showQuestionHint]="true"></app-pos-tag>
                </div>
                <div class="pos-question">Câu hỏi gợi ý: <em>"Ở đâu? Vào lúc nào? Phương hướng nào?"</em></div>
                <p class="pos-example">Ví dụ: <strong>In</strong> (Trong), <strong>Under</strong> (Dưới), <strong>Before</strong> (Trước khi).</p>
              </div>

              <!-- PRONOUN -->
              <div class="pos-item-box">
                <div class="pos-badge-wrapper">
                  <app-pos-tag type="pron" mode="full" [showQuestionHint]="true"></app-pos-tag>
                </div>
                <div class="pos-question">Câu hỏi gợi ý: <em>"Thay thế cho ai, cái gì?"</em></div>
                <p class="pos-example">Ví dụ: <strong>He</strong> (Anh ấy), <strong>They</strong> (Họ), <strong>It</strong> (Nó/Điều đó).</p>
              </div>
            </div>
          </article>
        }

        <!-- PHẦN 5: RƠI MAY MẮN & BẢO HIỂM (PITY SYSTEM) -->
        @if (activeSection() === 'pity') {
          <article class="guide-card">
            <div class="card-header-band">
              <div class="band-left">
                <span class="chapter-number">Chương 05</span>
                <h2 class="card-title font-serif">Phần Thưởng May Mắn &amp; Cơ Chế Bảo Hiểm (Pity)</h2>
              </div>
              <span class="band-tag tag-olive">Cân bằng kinh tế</span>
            </div>

            <p class="card-intro">
              Sau mỗi bài kiểm tra Quiz, ngoài điểm XP và Xu vàng cơ bản, bạn còn có cơ hội kích hoạt rơi phần thưởng nông trại may mắn!
            </p>

            <div class="drop-rates-grid">
              <div class="rate-card">
                <div class="rate-icon">🪴</div>
                <div class="rate-info">
                  <h4 class="rate-title">Phân Bón Vi Sinh</h4>
                  <div class="rate-percent">Tỉ lệ rơi: <strong>5.0%</strong> / bài thi</div>
                  <div class="rate-pity">Bảo hiểm nổ chắc chắn: <strong>Tối đa 20 lượt</strong></div>
                </div>
              </div>

              <div class="rate-card">
                <div class="rate-icon">🥕</div>
                <div class="rate-info">
                  <h4 class="rate-title">Hạt Giống Hiếm</h4>
                  <div class="rate-percent">Tỉ lệ rơi: <strong>1.0%</strong> / bài thi</div>
                  <div class="rate-pity">Bảo hiểm nổ chắc chắn: <strong>Tối đa 26 lượt</strong></div>
                </div>
              </div>
            </div>

            <div class="info-alert-box alert-olive">
              <span class="alert-icon">🎲</span>
              <div class="alert-text">
                <strong>Chống Cày Cuốc Quá Mức (Daily Roll Cap):</strong> Mỗi ngày bạn được quay tối đa <strong>10 lượt may mắn</strong> khi làm Quiz. Khi đã đạt 10/10 lượt, bạn vẫn nhận đủ Xu và XP bình thường, giúp bạn cân đối thời gian học tập lành mạnh.
              </div>
            </div>
          </article>
        }

        <!-- PHẦN 6: MẸO & THỦ THUẬT (PRO-TIPS) -->
        @if (activeSection() === 'tips') {
          <article class="guide-card">
            <div class="card-header-band">
              <div class="band-left">
                <span class="chapter-number">Chương 06</span>
                <h2 class="card-title font-serif">Mẹo &amp; Thủ Thuật Canh Tác Hiệu Quả</h2>
              </div>
              <span class="band-tag tag-gold">Lời khuyên</span>
            </div>

            <div class="tips-accordion">
              <div class="tip-row">
                <span class="tip-num">01</span>
                <div class="tip-content">
                  <h4 class="tip-headline">Tận dụng Bón Lót ngay khi vừa Gieo Hạt</h4>
                  <p class="tip-text">Bón phân cơ bản ngay từ đầu sẽ rút ngắn thời gian sinh trưởng của cây từ 5 phút xuống còn 2.5 phút, giúp bạn thu hoạch nông sản cực nhanh.</p>
                </div>
              </div>

              <div class="tip-row">
                <span class="tip-num">02</span>
                <div class="tip-content">
                  <h4 class="tip-headline">Đừng để lỡ khung giờ Ôn tập D1 &amp; D3</h4>
                  <p class="tip-text">Ôn đúng hạn D1 và D3 trong mục <strong>Tiến độ</strong> là chìa khóa vàng giúp bạn nhớ 90% từ vựng mà không phải học vẹt nhồi nhét.</p>
                </div>
              </div>

              <div class="tip-row">
                <span class="tip-num">03</span>
                <div class="tip-content">
                  <h4 class="tip-headline">Bật Loa Nghe Phát Âm Ở Mọi Câu Hỏi</h4>
                  <p class="tip-text">Nghe ngữ điệu phát âm chuẩn kèm phiên âm quốc tế IPA giúp cải thiện kỹ năng Listening TOEIC và phản xạ nói tự nhiên.</p>
                </div>
              </div>

              <div class="tip-row">
                <span class="tip-num">04</span>
                <div class="tip-content">
                  <h4 class="tip-headline">Tiết kiệm Xu để mua Vật Phẩm Trang Trí</h4>
                  <p class="tip-text">Hàng rào gỗ, Bù nhìn rơm và Đèn lồng nông trại trong Cửa hàng không chỉ làm đẹp khu vườn mà còn tăng tính thẩm mỹ cho giao diện nông trại của bạn!</p>
                </div>
              </div>
            </div>

            <div class="action-footer-row">
              <a routerLink="/shop" class="guide-action-btn primary-btn">
                <app-pixel-icon name="icon_cart" [size]="16"></app-pixel-icon>
                <span>Ghé Thăm Cửa Hàng ›</span>
              </a>
              <a routerLink="/" class="guide-action-btn secondary-btn">
                <app-pixel-icon name="icon_home" [size]="16"></app-pixel-icon>
                <span>Về Trang Chủ ›</span>
              </a>
            </div>
          </article>
        }

      </main>
    </div>
  `,
  styles: [`
    .guide-screen {
      max-width: 680px;
      margin: 0 auto;
      padding: 10px 16px 48px;
    }

    /* HEADER */
    .guide-header {
      margin-bottom: 20px;
      text-align: center;
    }
    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: #EFE9DD;
      border: 1px solid #D9C8B5;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      color: #7D7565;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .guide-title {
      font-size: 24px;
      font-weight: 800;
      color: var(--navy);
      margin: 0 0 6px;
      line-height: 1.25;
    }
    .guide-subtitle {
      font-size: 13.5px;
      color: var(--ink-muted);
      margin: 0;
      line-height: 1.45;
    }

    /* TABS NAV */
    .guide-tabs-nav {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 18px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .guide-tabs-nav::-webkit-scrollbar {
      display: none;
    }

    .tab-pill-btn {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 7px 13px;
      background: #FFFDF9;
      border: 1.5px solid #D9C8B5;
      border-radius: 12px;
      font-size: 12.5px;
      font-weight: 600;
      color: #635848;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;

      &:hover {
        background: #F4EFE6;
        color: var(--navy);
      }

      &.active {
        background: #78815D;
        color: #FFFDF9;
        border-color: #5F6647;
        box-shadow: 0 2px 6px rgba(120, 129, 93, 0.25);
      }
    }

    /* CARD CONTAINER */
    .guide-card {
      background: #FFFDF9;
      border: 1.5px solid #D9C8B5;
      border-radius: 18px;
      padding: 24px 20px;
      box-shadow: 0 3px 12px rgba(44, 53, 64, 0.04);
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card-header-band {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 14px;
      border-bottom: 1.5px solid #EFE9DD;
      margin-bottom: 14px;
    }
    .chapter-number {
      display: block;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #A65E65;
      margin-bottom: 2px;
    }
    .card-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--navy);
      margin: 0;
      line-height: 1.3;
    }
    .band-tag {
      font-size: 11px;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .tag-olive {
      background: #EAF3E7;
      color: #3D6E18;
      border: 1px solid #BBDCB0;
    }
    .tag-rose {
      background: #FDF2F3;
      color: #8C2C35;
      border: 1px solid #E8BAC0;
    }
    .tag-gold {
      background: #FDF6E2;
      color: #8A6818;
      border: 1px solid #EADB9C;
    }
    .tag-blue {
      background: #EBF3F8;
      color: #275E84;
      border: 1px solid #B9D7EC;
    }

    .card-intro {
      font-size: 13.5px;
      color: #554A3E;
      line-height: 1.5;
      margin: 0 0 18px;
    }

    /* STEPS FLOW */
    .steps-flow {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }
    .step-card {
      display: flex;
      gap: 12px;
      padding: 12px 14px;
      background: #FAF7F0;
      border: 1px solid #E5DCCF;
      border-radius: 12px;
    }
    .step-badge {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      background: #78815D;
      color: #FFFDF9;
      font-weight: 800;
      font-size: 14px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .step-body {
      flex: 1;
    }
    .step-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .step-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--navy);
      margin: 0;
    }
    .step-desc {
      font-size: 12.5px;
      color: #5C5245;
      line-height: 1.45;
      margin: 0;
    }
    .step-reward-pill {
      margin-top: 6px;
      font-size: 11.5px;
      color: #3B5B3B;
      background: #E8F2E4;
      padding: 3px 8px;
      border-radius: 6px;
      display: inline-flex;
      gap: 6px;
    }
    .step-tip-box {
      margin-top: 6px;
      font-size: 11.5px;
      color: #695F50;
      background: #FFFDF8;
      border-left: 3px solid #78815D;
      padding: 4px 8px;
      border-radius: 0 6px 6px 0;
    }

    /* EBBINGHAUS TIMELINE */
    .ebbinghaus-timeline {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 18px;
    }
    .stage-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: #FAF6EF;
      border: 1px solid #E5DBCB;
      border-radius: 10px;
    }
    .stage-col-badge {
      width: 40px;
      height: 32px;
      border-radius: 8px;
      font-weight: 800;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #FFFDF9;
    }
    .stage-d0 { background: #8C8070; }
    .stage-d1 { background: #78815D; }
    .stage-d3 { background: #5E7A8A; }
    .stage-d7 { background: #A65E65; }
    .stage-d14 { background: #C99B32; }

    .stage-name {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--navy);
    }
    .stage-sub {
      font-size: 12px;
      color: var(--ink-muted);
      line-height: 1.35;
    }

    /* QUESTS STRUCTURE */
    .quests-structure-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    .quest-box {
      background: #FAF6EF;
      border: 1px solid #E2D7C7;
      border-radius: 12px;
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .quest-box-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .quest-slot-pill {
      font-size: 10px;
      font-weight: 700;
      color: #7D7565;
      text-transform: uppercase;
    }
    .quest-box-title {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--navy);
      margin: 0;
    }
    .quest-box-desc {
      font-size: 11.5px;
      color: #635848;
      line-height: 1.35;
      margin: 0;
      flex: 1;
    }
    .quest-reward {
      font-size: 11px;
      font-weight: 800;
      color: #3D6E18;
      background: #EAF3E7;
      padding: 2px 6px;
      border-radius: 4px;
      width: fit-content;
    }

    .grand-chest-banner {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px;
      background: #FDF8ED;
      border: 1.5px solid #E5CCA0;
      border-radius: 12px;
      margin-bottom: 16px;
    }
    .chest-title {
      font-size: 14.5px;
      font-weight: 800;
      color: #6B4E0E;
      margin: 0 0 4px;
    }
    .chest-desc {
      font-size: 12px;
      color: #7A5B18;
      line-height: 1.4;
      margin: 0;
    }

    .streak-explainer {
      background: #FAF7F0;
      border: 1px solid #E5DCCF;
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 16px;
    }
    .streak-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-weight: 700;
      color: var(--navy);
      font-size: 13.5px;
    }
    .streak-bullets {
      margin: 0;
      padding-left: 18px;
      font-size: 12px;
      color: #554A3E;
      line-height: 1.5;
    }

    /* POS SHOWCASE GRID */
    .pos-showcase-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }
    .pos-item-box {
      background: #FAF6EF;
      border: 1px solid #E5DCCF;
      border-radius: 12px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .pos-question {
      font-size: 11.5px;
      color: #7D7565;
    }
    .pos-example {
      font-size: 12px;
      color: #3B3227;
      margin: 0;
      line-height: 1.35;
    }

    /* DROP RATES */
    .drop-rates-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    .rate-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px;
      background: #FAF6EF;
      border: 1px solid #E2D7C7;
      border-radius: 12px;
    }
    .rate-icon {
      font-size: 28px;
    }
    .rate-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 2px;
    }
    .rate-percent {
      font-size: 12px;
      color: #3D6E18;
    }
    .rate-pity {
      font-size: 11px;
      color: #7D7565;
    }

    /* ALERTS */
    .info-alert-box {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 12px;
      font-size: 12.5px;
      line-height: 1.45;
      margin-bottom: 18px;
    }
    .alert-icon {
      font-size: 18px;
      line-height: 1;
    }
    .alert-rose {
      background: #FDF2F3;
      border: 1px solid #E8BAC0;
      color: #6E2E35;
    }
    .alert-olive {
      background: #F1F7EE;
      border: 1px solid #BDDAB2;
      color: #315818;
    }

    /* TIPS ACCORDION */
    .tips-accordion {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    .tip-row {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 12px 14px;
      background: #FAF6EF;
      border: 1px solid #E2D7C7;
      border-radius: 12px;
    }
    .tip-num {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 800;
      color: #78815D;
    }
    .tip-headline {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 3px;
    }
    .tip-text {
      font-size: 12px;
      color: #554A3E;
      line-height: 1.45;
      margin: 0;
    }

    /* ACTION FOOTER */
    .action-footer-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-top: 16px;
      border-top: 1px dashed #D9C8B5;
    }
    .guide-action-btn {
      flex: 1;
      min-height: 44px;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      box-sizing: border-box;
      transition: transform 0.12s ease, background 0.15s ease;

      &:active { transform: scale(0.985); }
    }
    .primary-btn {
      background: #A65E65;
      color: #FFFDF9 !important;
      border: 1.5px solid #8F4D53;
      &:hover { background: #8F4D53; }
    }
    .secondary-btn {
      background: #F4EFE3;
      color: #263847 !important;
      border: 1.5px solid #C2AD95;
      &:hover { background: #EAE2D2; }
    }

    /* RESPONSIVE */
    @media (max-width: 600px) {
      .guide-screen {
        padding: 6px 12px 36px;
      }
      .guide-title {
        font-size: 20px;
      }
      .guide-card {
        padding: 18px 14px;
        border-radius: 14px;
      }
      .quests-structure-grid {
        grid-template-columns: 1fr;
      }
      .pos-showcase-grid {
        grid-template-columns: 1fr;
      }
      .drop-rates-grid {
        grid-template-columns: 1fr;
      }
      .action-footer-row {
        flex-direction: column;
      }
      .guide-action-btn {
        width: 100%;
      }
    }
  `]
})
export class GuideComponent {
  activeSection = signal<GuideSectionId>('loop');

  sections: GuideSection[] = [
    { id: 'loop', title: 'Vòng Lặp Nông Trại Cốt Lõi', shortTitle: 'Vòng lặp Farm', icon: 'icon_sprout_action', badge: 'Core' },
    { id: 'spaced-repetition', title: 'Lịch Ôn Ebbinghaus', shortTitle: 'Lịch Ebbinghaus', icon: 'icon_memory_brain', badge: 'Khoa học' },
    { id: 'quests', title: 'Nhiệm Vụ & Chuỗi Streak', shortTitle: 'Nhiệm vụ & Streak', icon: 'icon_flame', badge: 'Hàng ngày' },
    { id: 'pos', title: 'Thẻ Loại Từ Thân Thiện', shortTitle: 'Loại từ (POS)', icon: 'icon_books_stack', badge: 'Ngữ pháp' },
    { id: 'pity', title: 'Tỉ Lệ Rơi & Bảo Hiểm', shortTitle: 'Rơi & Bảo hiểm', icon: 'icon_wheat_sheaf', badge: 'May mắn' },
    { id: 'tips', title: 'Mẹo Canh Tác Hiệu Quả', shortTitle: 'Mẹo canh tác', icon: 'icon_tools', badge: 'Tips' }
  ];

  setSection(id: GuideSectionId) {
    this.activeSection.set(id);
  }
}
