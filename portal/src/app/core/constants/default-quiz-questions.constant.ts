import { QuizQuestionDto, QuizSessionDto } from '../services/farm-api.service';
import { DEFAULT_VOCABULARIES } from './default-vocabularies.constant';

export const MOCK_QUIZ_DATA: Record<number, { title: string; cropName: string; questions: QuizQuestionDto[] }> = {
  1: {
    title: 'Fruits & Vegetables',
    cropName: 'Cà rốt',
    questions: [
      {
        id: 101,
        lessonId: 1,
        prompt: 'Từ "Carrot" có nghĩa tiếng Việt là gì?',
        word: 'Carrot',
        phonetic: 'ˈkærət',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'Rabbits love eating fresh orange carrots.',
        exampleVi: 'Thỏ rất thích ăn những củ cà rốt tươi màu cam.',
        options: ['Cà chua', 'Bắp ngô', 'Cà rốt', 'Khoai tây'],
        correctOptionIndex: 2
      },
      {
        id: 102,
        lessonId: 1,
        prompt: 'Điền từ thích hợp vào chỗ trống:',
        word: 'Tomato',
        phonetic: 'təˈmɑːtəʊ',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'She picked a ripe red tomato from the garden.',
        exampleVi: 'Cô ấy hái một quả cà chua đỏ mọng từ khu vườn.',
        options: ['Tomato', 'Potato', 'Apple', 'Banana'],
        correctOptionIndex: 0
      },
      {
        id: 103,
        lessonId: 1,
        prompt: 'Nghe và chọn từ phát âm chính xác:',
        word: 'Corn',
        phonetic: 'kɔːn',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'Farmers harvest golden corn in late autumn.',
        exampleVi: 'Nông dân thu hoạch bắp ngô vàng óng vào cuối thu.',
        options: ['Bean', 'Corn', 'Pea', 'Wheat'],
        correctOptionIndex: 1
      },
      {
        id: 104,
        lessonId: 1,
        prompt: 'Từ "Potato" có nghĩa tiếng Việt là gì?',
        word: 'Potato',
        phonetic: 'pəˈteɪtəʊ',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'Mashed potatoes are a popular side dish.',
        exampleVi: 'Khoai tây nghiền là một món ăn kèm phổ biến.',
        options: ['Khoai lang', 'Khoai tây', 'Hành tây', 'Tỏi tây'],
        correctOptionIndex: 1
      },
      {
        id: 105,
        lessonId: 1,
        prompt: 'Chọn từ tiếng Anh có nghĩa là "Quả dưa chuột":',
        word: 'Cucumber',
        phonetic: 'ˈkjuːkʌmbər',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'Cool cucumbers make the summer salad crisp.',
        exampleVi: 'Dưa chuột mát lạnh làm món salad mùa hè thêm giòn.',
        options: ['Cabbage', 'Lettuce', 'Spinach', 'Cucumber'],
        correctOptionIndex: 3
      },
      {
        id: 106,
        lessonId: 1,
        prompt: 'Điền từ thích hợp vào ngữ cảnh nông trại:',
        word: 'Harvest',
        phonetic: 'ˈhɑːvɪst',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'It is time to harvest the ripe vegetables.',
        exampleVi: 'Đã đến lúc thu hoạch rau củ chín.',
        options: ['harvest', 'freeze', 'destroy', 'forget'],
        correctOptionIndex: 0
      },
      {
        id: 107,
        lessonId: 1,
        prompt: 'Nghe phát âm và chọn nghĩa đúng của từ:',
        word: 'Pumpkin',
        phonetic: 'ˈpʌmpkɪn',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'We carved a giant pumpkin for Halloween.',
        exampleVi: 'Chúng tôi khắc một quả bí ngô khổng lồ cho lễ Halloween.',
        options: ['Bí ngô', 'Dưa hấu', 'Đu đủ', 'Thanh long'],
        correctOptionIndex: 0
      },
      {
        id: 108,
        lessonId: 1,
        prompt: 'Từ nào sau đây là "Quả dâu tây"?',
        word: 'Strawberry',
        phonetic: 'ˈstrɔːbəri',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'Fresh strawberries taste sweet with milk.',
        exampleVi: 'Dâu tây tươi có vị ngọt khi ăn kèm sữa.',
        options: ['Blueberry', 'Strawberry', 'Raspberry', 'Cherry'],
        correctOptionIndex: 1
      },
      {
        id: 109,
        lessonId: 1,
        prompt: 'Điền từ thích hợp vào câu:',
        word: 'Fresh',
        phonetic: 'freʃ',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'The farm sells fresh organic fruits daily.',
        exampleVi: 'Nông trại bán trái cây hữu cơ tươi mỗi ngày.',
        options: ['stale', 'fresh', 'expired', 'artificial'],
        correctOptionIndex: 1
      },
      {
        id: 110,
        lessonId: 1,
        prompt: 'Nghe phát âm và chọn từ đúng:',
        word: 'Garden',
        phonetic: 'ˈɡɑːdn',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'Grandma spends every morning in the flower garden.',
        exampleVi: 'Bà dành mỗi buổi sáng trong khu vườn hoa.',
        options: ['Market', 'Kitchen', 'Garden', 'Balcony'],
        correctOptionIndex: 2
      }
    ]
  },
  3: {
    title: 'Văn phòng (Office)',
    cropName: 'Cà rốt',
    questions: [
      {
        id: 301,
        lessonId: 3,
        prompt: 'Từ "Deadline" trong môi trường công sở có nghĩa là gì?',
        word: 'Deadline',
        phonetic: 'ˈdedlaɪn',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'We must submit the proposal before the deadline.',
        exampleVi: 'Chúng ta phải nộp đề xuất trước hạn chót.',
        options: ['Bàn phím', 'Cuộc họp', 'Hạn chót', 'Máy fax'],
        correctOptionIndex: 2
      },
      {
        id: 302,
        lessonId: 3,
        prompt: 'Điền từ thích hợp vào câu:',
        word: 'Schedule',
        phonetic: 'ˈʃedjuːl',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'Please check your schedule before booking the meeting room.',
        exampleVi: 'Vui lòng kiểm tra lịch trình của bạn trước khi đặt phòng họp.',
        options: ['schedule', 'pencil', 'stapler', 'drawer'],
        correctOptionIndex: 0
      },
      {
        id: 303,
        lessonId: 3,
        prompt: 'Nghe và chọn từ phát âm chính xác:',
        word: 'Conference',
        phonetic: 'ˈkɒnfərəns',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'The international sales conference starts at 9 a.m.',
        exampleVi: 'Hội nghị kinh doanh quốc tế bắt đầu lúc 9 giờ sáng.',
        options: ['Document', 'Conference', 'Contract', 'Department'],
        correctOptionIndex: 1
      },
      {
        id: 304,
        lessonId: 3,
        prompt: 'Từ "Supervisor" có nghĩa là gì?',
        word: 'Supervisor',
        phonetic: 'ˈsuːpəvaɪzər',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'Report any safety concerns directly to your supervisor.',
        exampleVi: 'Báo cáo bất kỳ mối lo ngại an toàn nào trực tiếp cho người giám sát.',
        options: ['Khách hàng', 'Người giám sát', 'Thực tập sinh', 'Bảo vệ'],
        correctOptionIndex: 1
      },
      {
        id: 305,
        lessonId: 3,
        prompt: 'Điền từ thích hợp vào ngữ cảnh:',
        word: 'Appointment',
        phonetic: 'əˈpɔɪntmənt',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'I have a confirmed appointment with the CEO tomorrow.',
        exampleVi: 'Tôi có một cuộc hẹn đã được xác nhận với CEO vào ngày mai.',
        options: ['appointment', 'complaint', 'mistake', 'holiday'],
        correctOptionIndex: 0
      },
      {
        id: 306,
        lessonId: 3,
        prompt: 'Từ "Briefcase" nghĩa là gì?',
        word: 'Briefcase',
        phonetic: 'ˈbriːfkeɪs',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'He carried confidential reports in a leather briefcase.',
        exampleVi: 'Anh ấy mang báo cáo mật trong một chiếc cặp tài liệu bằng da.',
        options: ['Ví tiền', 'Cặp tài liệu', 'Balo du lịch', 'Hộp bút'],
        correctOptionIndex: 1
      },
      {
        id: 307,
        lessonId: 3,
        prompt: 'Nghe và chọn nghĩa của từ:',
        word: 'Stationery',
        phonetic: 'ˈsteɪʃənri',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'The assistant ordered pens, notebooks, and other stationery.',
        exampleVi: 'Trợ lý đã đặt bút, sổ tay và các văn phòng phẩm khác.',
        options: ['Thiết bị cơ khí', 'Văn phòng phẩm', 'Đồ nội thất', 'Hàng gia dụng'],
        correctOptionIndex: 1
      },
      {
        id: 308,
        lessonId: 3,
        prompt: 'Từ "Receptionist" nghĩa là gì?',
        word: 'Receptionist',
        phonetic: 'rɪˈsepʃənɪst',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'The receptionist asked all visitors to sign in.',
        exampleVi: 'Nhân viên lễ tân yêu cầu tất cả khách ký tên vào sổ.',
        options: ['Nhân viên lễ tân', 'Kế toán trưởng', 'Kỹ sư phần mềm', 'Tài xế'],
        correctOptionIndex: 0
      },
      {
        id: 309,
        lessonId: 3,
        prompt: 'Điền từ còn thiếu vào câu thông báo:',
        word: 'Memo',
        phonetic: 'ˈmeməʊ',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'Management circulated an internal memo regarding the holiday.',
        exampleVi: 'Ban quản lý đã gửi một thông báo nội bộ về kỳ nghỉ lễ.',
        options: ['memo', 'rumor', 'postcard', 'ticket'],
        correctOptionIndex: 0
      },
      {
        id: 310,
        lessonId: 3,
        prompt: 'Nghe và chọn từ phát âm chính xác:',
        word: 'Workspace',
        phonetic: 'ˈwɜːkspeɪs',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'An ergonomic workspace increases daily productivity.',
        exampleVi: 'Một không gian làm việc chuẩn công thái học giúp tăng năng suất hàng ngày.',
        options: ['Warehouse', 'Workspace', 'Workshop', 'Wardrobe'],
        correctOptionIndex: 1
      }
    ]
  },
  4: {
    title: 'Nhân sự (Human Resources)',
    cropName: 'Cà rốt',
    questions: [
      {
        id: 401,
        lessonId: 4,
        prompt: 'Từ "Candidate" nghĩa là gì?',
        word: 'Candidate',
        phonetic: 'ˈkændɪdət',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'The hiring committee interviewed five strong candidates.',
        exampleVi: 'Hội đồng tuyển dụng đã phỏng vấn năm ứng viên xuất sắc.',
        options: ['Người thuê nhà', 'Ứng viên', 'Khách hàng', 'Nhà đầu tư'],
        correctOptionIndex: 1
      },
      {
        id: 402,
        lessonId: 4,
        prompt: 'Điền từ thích hợp vào câu:',
        word: 'Resume',
        phonetic: 'ˈrezjuːmeɪ',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'Be sure to highlight your relevant experience on your resume.',
        exampleVi: 'Hãy nhớ làm nổi bật kinh nghiệm phù hợp trong hồ sơ xin việc của bạn.',
        options: ['resume', 'receipt', 'menu', 'invitation'],
        correctOptionIndex: 0
      },
      {
        id: 403,
        lessonId: 4,
        prompt: 'Nghe và chọn từ phát âm đúng:',
        word: 'Salary',
        phonetic: 'ˈsæləri',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'They offered a competitive starting salary with bonuses.',
        exampleVi: 'Họ đưa ra mức lương khởi điểm cạnh tranh kèm theo tiền thưởng.',
        options: ['Safety', 'Salary', 'Summary', 'Survey'],
        correctOptionIndex: 1
      },
      {
        id: 404,
        lessonId: 4,
        prompt: 'Từ "Interview" có nghĩa là gì?',
        word: 'Interview',
        phonetic: 'ˈɪntəvjuː',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'She prepared thoroughly for her final job interview.',
        exampleVi: 'Cô ấy đã chuẩn bị kỹ lưỡng cho buổi phỏng vấn xin việc cuối cùng.',
        options: ['Buổi hòa nhạc', 'Buổi phỏng vấn', 'Kỳ nghỉ', 'Lễ khánh thành'],
        correctOptionIndex: 1
      },
      {
        id: 405,
        lessonId: 4,
        prompt: 'Điền từ thích hợp vào chỗ trống:',
        word: 'Benefit',
        phonetic: 'ˈbenɪfɪt',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'Health insurance is one of the key employee benefits.',
        exampleVi: 'Bảo hiểm y tế là một trong những phúc lợi nhân viên quan trọng.',
        options: ['benefits', 'penalties', 'debts', 'losses'],
        correctOptionIndex: 0
      },
      {
        id: 406,
        lessonId: 4,
        prompt: 'Từ "Recruitment" nghĩa là gì?',
        word: 'Recruitment',
        phonetic: 'rɪˈkruːtmənt',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'The firm launched a recruitment drive for tech engineers.',
        exampleVi: 'Công ty đã phát động chiến dịch tuyển dụng kỹ sư công nghệ.',
        options: ['Sự giải thể', 'Sự tuyển dụng', 'Sự phá sản', 'Sự sát nhập'],
        correctOptionIndex: 1
      },
      {
        id: 407,
        lessonId: 4,
        prompt: 'Nghe và chọn từ đúng:',
        word: 'Promotion',
        phonetic: 'prəˈməʊʃn',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'Hard work earned him a promotion to department head.',
        exampleVi: 'Sự chăm chỉ đã mang lại cho anh ấy sự thăng chức lên trưởng phòng.',
        options: ['Permission', 'Promotion', 'Protection', 'Production'],
        correctOptionIndex: 1
      },
      {
        id: 408,
        lessonId: 4,
        prompt: 'Từ "Colleague" nghĩa là gì?',
        word: 'Colleague',
        phonetic: 'ˈkɒliːɡ',
        spriteKey: null,
        questionType: 'meaning',
        exampleEn: 'I shared the project updates with my colleagues.',
        exampleVi: 'Tôi đã chia sẻ cập nhật dự án với các đồng nghiệp của mình.',
        options: ['Đối thủ', 'Đồng nghiệp', 'Học sinh', 'Thầy giáo'],
        correctOptionIndex: 1
      },
      {
        id: 409,
        lessonId: 4,
        prompt: 'Điền từ phù hợp vào câu:',
        word: 'Resign',
        phonetic: 'rɪˈzaɪn',
        spriteKey: null,
        questionType: 'context',
        exampleEn: 'He decided to resign from his position to start a business.',
        exampleVi: 'Anh ấy quyết định từ chức để khởi nghiệp kinh doanh.',
        options: ['resign', 'remain', 'arrest', 'borrow'],
        correctOptionIndex: 0
      },
      {
        id: 410,
        lessonId: 4,
        prompt: 'Nghe và chọn nghĩa của từ:',
        word: 'Contract',
        phonetic: 'ˈkɒntrækt',
        spriteKey: null,
        questionType: 'listening',
        exampleEn: 'Both parties signed the employment contract today.',
        exampleVi: 'Cả hai bên đã ký hợp đồng lao động hôm nay.',
        options: ['Hóa đơn tiền điện', 'Hợp đồng lao động', 'Thẻ căn cước', 'Sổ hộ khẩu'],
        correctOptionIndex: 1
      }
    ]
  }
};

/**
 * Trả về danh sách câu hỏi kiểm tra đầy đủ (10 câu) cho mọi bài học.
 * Nếu bài học chưa có trong bộ mẫu, tự động sinh bộ câu hỏi phong phú tương ứng.
 */
export function getDefaultQuizSession(lessonId: number, lessonTitle?: string): QuizSessionDto {
  if (MOCK_QUIZ_DATA[lessonId]) {
    const data = MOCK_QUIZ_DATA[lessonId];
    return {
      sessionId: `offline_quiz_${lessonId}_${Date.now()}`,
      lessonId,
      lessonTitle: data.title,
      requiredCropName: data.cropName,
      bestStarsClaimed: 0,
      totalQuestions: data.questions.length,
      questions: data.questions
    };
  }

  // Tự động sinh câu hỏi thực tế từ 1.300+ từ vựng của bài học nếu có trong bộ DEFAULT_VOCABULARIES
  const lessonVocabs = DEFAULT_VOCABULARIES[lessonId] || DEFAULT_VOCABULARIES[1] || [];
  if (lessonVocabs.length >= 4) {
    const selectedWords = lessonVocabs.slice(0, Math.min(10, lessonVocabs.length));
    const allMeanings = lessonVocabs.map(v => v.meaningVi);
    const allWords = lessonVocabs.map(v => v.word);

    const questions: QuizQuestionDto[] = selectedWords.map((v, idx) => {
      const qType: 'meaning' | 'context' | 'listening' = idx % 3 === 0 ? 'meaning' : (idx % 3 === 1 ? 'context' : 'listening');
      const qId = lessonId * 100 + (idx + 1);

      if (qType === 'meaning') {
        const distractors = allMeanings.filter(m => m !== v.meaningVi);
        const shuffledDistractors = [...distractors].sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [...shuffledDistractors, v.meaningVi].sort(() => 0.5 - Math.random());
        const correctOptionIndex = options.indexOf(v.meaningVi);
        return {
          id: qId,
          lessonId,
          prompt: `Từ "${v.word}" có nghĩa tiếng Việt là gì?`,
          word: v.word,
          phonetic: v.phonetic,
          questionType: 'meaning',
          exampleEn: v.exampleEn,
          exampleVi: v.exampleVi,
          options,
          correctOptionIndex
        };
      } else if (qType === 'context') {
        const distractors = allWords.filter(w => w !== v.word);
        const shuffledDistractors = [...distractors].sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [...shuffledDistractors, v.word].sort(() => 0.5 - Math.random());
        const correctOptionIndex = options.indexOf(v.word);
        return {
          id: qId,
          lessonId,
          prompt: `Điền từ thích hợp vào ngữ cảnh: "${v.meaningVi}"`,
          word: v.word,
          phonetic: v.phonetic,
          questionType: 'context',
          exampleEn: v.exampleEn,
          exampleVi: v.exampleVi,
          options,
          correctOptionIndex
        };
      } else {
        const distractors = allMeanings.filter(m => m !== v.meaningVi);
        const shuffledDistractors = [...distractors].sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [...shuffledDistractors, v.meaningVi].sort(() => 0.5 - Math.random());
        const correctOptionIndex = options.indexOf(v.meaningVi);
        return {
          id: qId,
          lessonId,
          prompt: `Nghe phát âm và chọn nghĩa đúng của từ:`,
          word: v.word,
          phonetic: v.phonetic,
          questionType: 'listening',
          exampleEn: v.exampleEn,
          exampleVi: v.exampleVi,
          options,
          correctOptionIndex
        };
      }
    });

    const cropNames = ['Cà rốt', 'Bắp ngô', 'Cà chua', 'Hướng dương', 'Hoa hồng', 'Hoa tulip', 'Xoài', 'Kiwi', 'Chanh vàng', 'Táo đỏ', 'Cherry'];
    const requiredCropName = cropNames[(lessonId - 1) % cropNames.length];

    return {
      sessionId: `offline_quiz_${lessonId}_${Date.now()}`,
      lessonId,
      lessonTitle: lessonTitle || `Chủ đề ${lessonId} (TOEIC Vocab)`,
      requiredCropName,
      bestStarsClaimed: 0,
      totalQuestions: questions.length,
      questions
    };
  }

  // Bộ câu hỏi tổng quát TOEIC cho các bài học từ số 5 trở đi
  const title = lessonTitle || `Chủ đề ${lessonId} (TOEIC Vocab)`;
  const genericQuestions: QuizQuestionDto[] = [
    {
      id: lessonId * 100 + 1,
      lessonId,
      prompt: 'Từ "Negotiation" có nghĩa là gì?',
      word: 'Negotiation',
      phonetic: 'nɪˌɡəʊʃiˈeɪʃn',
      spriteKey: null,
      questionType: 'meaning',
      exampleEn: 'The contract negotiation lasted over three hours.',
      exampleVi: 'Cuộc đàm phán hợp đồng kéo dài hơn ba tiếng đồng hồ.',
      options: ['Cuộc biểu tình', 'Cuộc đàm phán thương lượng', 'Lễ trao giải', 'Bản ghi nhớ'],
      correctOptionIndex: 1
    },
    {
      id: lessonId * 100 + 2,
      lessonId,
      prompt: 'Điền từ phù hợp vào câu kinh doanh:',
      word: 'Revenue',
      phonetic: 'ˈrevənjuː',
      spriteKey: null,
      questionType: 'context',
      exampleEn: 'The company reported a 20% increase in quarterly revenue.',
      exampleVi: 'Công ty báo cáo doanh thu quý tăng 20%.',
      options: ['revenue', 'debt', 'penalty', 'disaster'],
      correctOptionIndex: 0
    },
    {
      id: lessonId * 100 + 3,
      lessonId,
      prompt: 'Nghe phát âm và chọn từ chính xác:',
      word: 'Investment',
      phonetic: 'ɪnˈvestmənt',
      spriteKey: null,
      questionType: 'listening',
      exampleEn: 'Smart investment in technology pays off in the long run.',
      exampleVi: 'Đầu tư thông minh vào công nghệ mang lại hiệu quả lâu dài.',
      options: ['Instrument', 'Investment', 'Information', 'Invitation'],
      correctOptionIndex: 1
    },
    {
      id: lessonId * 100 + 4,
      lessonId,
      prompt: 'Từ "Strategy" có nghĩa là gì?',
      word: 'Strategy',
      phonetic: 'ˈstrætədʒi',
      spriteKey: null,
      questionType: 'meaning',
      exampleEn: 'We need a clear marketing strategy for the new product.',
      exampleVi: 'Chúng ta cần một chiến lược tiếp thị rõ ràng cho sản phẩm mới.',
      options: ['Món tráng miệng', 'Chiến lược kế hoạch', 'Hóa đơn thanh toán', 'Vật liệu xây dựng'],
      correctOptionIndex: 1
    },
    {
      id: lessonId * 100 + 5,
      lessonId,
      prompt: 'Điền từ thích hợp vào câu:',
      word: 'Budget',
      phonetic: 'ˈbʌdʒɪt',
      spriteKey: null,
      questionType: 'context',
      exampleEn: 'The project must be finished within the approved budget.',
      exampleVi: 'Dự án phải được hoàn thành trong phạm vi ngân sách đã duyệt.',
      options: ['budget', 'ticket', 'pocket', 'jacket'],
      correctOptionIndex: 0
    },
    {
      id: lessonId * 100 + 6,
      lessonId,
      prompt: 'Từ "Customer" nghĩa là gì?',
      word: 'Customer',
      phonetic: 'ˈkʌstəmər',
      spriteKey: null,
      questionType: 'meaning',
      exampleEn: 'Customer satisfaction is our company top priority.',
      exampleVi: 'Sự hài lòng của khách hàng là ưu tiên hàng đầu của công ty chúng tôi.',
      options: ['Nhà cung cấp', 'Khách hàng', 'Đối tác', 'Bảo hiểm'],
      correctOptionIndex: 1
    },
    {
      id: lessonId * 100 + 7,
      lessonId,
      prompt: 'Nghe và chọn từ phát âm đúng:',
      word: 'Transaction',
      phonetic: 'trænˈzækʃn',
      spriteKey: null,
      questionType: 'listening',
      exampleEn: 'The online banking transaction was completed in seconds.',
      exampleVi: 'Giao dịch ngân hàng trực tuyến đã hoàn tất trong vài giây.',
      options: ['Transportation', 'Transaction', 'Transformation', 'Translation'],
      correctOptionIndex: 1
    },
    {
      id: lessonId * 100 + 8,
      lessonId,
      prompt: 'Từ "Feedback" có nghĩa là gì?',
      word: 'Feedback',
      phonetic: 'ˈfiːdbæk',
      spriteKey: null,
      questionType: 'meaning',
      exampleEn: 'We welcome honest feedback from our clients.',
      exampleVi: 'Chúng tôi hoan nghênh phản hồi chân thành từ khách hàng.',
      options: ['Bữa ăn sáng', 'Ý kiến phản hồi đóng góp', 'Kính râm', 'Chuyến bay'],
      correctOptionIndex: 1
    },
    {
      id: lessonId * 100 + 9,
      lessonId,
      prompt: 'Điền từ thích hợp vào câu:',
      word: 'Partner',
      phonetic: 'ˈpɑːtnər',
      spriteKey: null,
      questionType: 'context',
      exampleEn: 'They formed a strategic partner agreement to expand in Asia.',
      exampleVi: 'Họ đã lập một thỏa thuận đối tác chiến lược để mở rộng tại Châu Á.',
      options: ['partner', 'stranger', 'rival', 'passenger'],
      correctOptionIndex: 0
    },
    {
      id: lessonId * 100 + 10,
      lessonId,
      prompt: 'Nghe phát âm và chọn nghĩa đúng:',
      word: 'Efficient',
      phonetic: 'ɪˈfɪʃnt',
      spriteKey: null,
      questionType: 'listening',
      exampleEn: 'The new workflow is both fast and efficient.',
      exampleVi: 'Quy trình làm việc mới vừa nhanh chóng vừa hiệu quả.',
      options: ['Chậm chạp', 'Hiệu quả năng suất', 'Tốn kém', 'Phức tạp'],
      correctOptionIndex: 1
    }
  ];

  return {
    sessionId: `offline_quiz_${lessonId}_${Date.now()}`,
    lessonId,
    lessonTitle: title,
    requiredCropName: lessonId === 1 ? 'Cà rốt' : lessonId === 2 ? 'Bắp ngô' : 'Cà chua',
    bestStarsClaimed: 0,
    totalQuestions: genericQuestions.length,
    questions: genericQuestions
  };
}
