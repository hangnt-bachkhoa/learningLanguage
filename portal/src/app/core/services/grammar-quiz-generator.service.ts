import { Injectable } from '@angular/core';
import { GrammarQuestion } from '../constants/default-grammar-topics.constant';

export interface CandidateVocabWord {
  id: number;
  word: string;
  meaningVi: string;
  exampleEn?: string | null;
  exampleVi?: string | null;
  wordType?: string | null;
}

export type SemanticTag = 'person' | 'food_crop' | 'document_product' | 'uncountable' | 'place';

export interface WordFamily {
  n: string;
  v: string;
  adj: string;
  adv: string;
}

export interface VerbForms {
  base: string;
  s: string;
  past: string;
  pp: string;
  ing: string;
}

export interface GrammarQuizQuestionDto {
  id: string;
  sourceType: 'DYNAMIC_VOCAB' | 'STATIC_GRAMMAR';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

// Bảng động từ bất quy tắc phổ biến trong TOEIC
const IRREGULAR_VERBS: Record<string, VerbForms> = {
  grow: { base: 'grow', s: 'grows', past: 'grew', pp: 'grown', ing: 'growing' },
  eat: { base: 'eat', s: 'eats', past: 'ate', pp: 'eaten', ing: 'eating' },
  send: { base: 'send', s: 'sends', past: 'sent', pp: 'sent', ing: 'sending' },
  buy: { base: 'buy', s: 'buys', past: 'bought', pp: 'bought', ing: 'buying' },
  make: { base: 'make', s: 'makes', past: 'made', pp: 'made', ing: 'making' },
  write: { base: 'write', s: 'writes', past: 'wrote', pp: 'written', ing: 'writing' },
  see: { base: 'see', s: 'sees', past: 'saw', pp: 'seen', ing: 'seeing' },
  take: { base: 'take', s: 'takes', past: 'took', pp: 'taken', ing: 'taking' },
  give: { base: 'give', s: 'gives', past: 'gave', pp: 'given', ing: 'giving' },
  choose: { base: 'choose', s: 'chooses', past: 'chose', pp: 'chosen', ing: 'choosing' },
  pay: { base: 'pay', s: 'pays', past: 'paid', pp: 'paid', ing: 'paying' },
  find: { base: 'find', s: 'finds', past: 'found', pp: 'found', ing: 'finding' },
  leave: { base: 'leave', s: 'leaves', past: 'left', pp: 'left', ing: 'leaving' },
  meet: { base: 'meet', s: 'meets', past: 'met', pp: 'met', ing: 'meeting' },
  build: { base: 'build', s: 'builds', past: 'built', pp: 'built', ing: 'building' },
  sell: { base: 'sell', s: 'sells', past: 'sold', pp: 'sold', ing: 'selling' },
  hold: { base: 'hold', s: 'holds', past: 'held', pp: 'held', ing: 'holding' },
  bring: { base: 'bring', s: 'brings', past: 'brought', pp: 'brought', ing: 'bringing' },
  speak: { base: 'speak', s: 'speaks', past: 'spoke', pp: 'spoken', ing: 'speaking' },
  understand: { base: 'understand', s: 'understands', past: 'understood', pp: 'understood', ing: 'understanding' }
};

// Từ điển họ từ (Word Family) cho Strategy A
const WORD_FAMILIES: WordFamily[] = [
  { n: 'success', v: 'succeed', adj: 'successful', adv: 'successfully' },
  { n: 'impression', v: 'impress', adj: 'impressive', adv: 'impressively' },
  { n: 'competition', v: 'compete', adj: 'competitive', adv: 'competitively' },
  { n: 'reliability', v: 'rely', adj: 'reliable', adv: 'reliably' },
  { n: 'creation', v: 'create', adj: 'creative', adv: 'creatively' },
  { n: 'effectiveness', v: 'effect', adj: 'effective', adv: 'effectively' },
  { n: 'management', v: 'manage', adj: 'manageable', adv: 'managerially' },
  { n: 'productivity', v: 'produce', adj: 'productive', adv: 'productively' },
  { n: 'decision', v: 'decide', adj: 'decisive', adv: 'decisively' },
  { n: 'significance', v: 'signify', adj: 'significant', adv: 'significantly' },
  { n: 'care', v: 'care', adj: 'careful', adv: 'carefully' },
  { n: 'smoothness', v: 'smooth', adj: 'smooth', adv: 'smoothly' },
  { n: 'punctuality', v: 'punctuate', adj: 'punctual', adv: 'punctually' },
  { n: 'frequency', v: 'frequent', adj: 'frequent', adv: 'frequently' },
  { n: 'thoroughness', v: 'thorough', adj: 'thorough', adv: 'thoroughly' },
  { n: 'profession', v: 'professionalize', adj: 'professional', adv: 'professionally' },
  { n: 'satisfaction', v: 'satisfy', adj: 'satisfactory', adv: 'satisfactorily' },
  { n: 'operation', v: 'operate', adj: 'operational', adv: 'operationally' },
  { n: 'consideration', v: 'consider', adj: 'considerable', adv: 'considerably' },
  { n: 'accuracy', v: 'accurate', adj: 'accurate', adv: 'accurately' }
];

@Injectable({
  providedIn: 'root'
})
export class GrammarQuizGeneratorService {
  /**
   * Chia động từ có quy tắc (Regular Verb) và tra cứu bất quy tắc
   */
  conjugateVerb(baseWord: string): VerbForms {
    const clean = baseWord.trim().toLowerCase();
    if (IRREGULAR_VERBS[clean]) {
      return IRREGULAR_VERBS[clean];
    }

    // Động từ có quy tắc (Regular)
    // 1. Dạng ngôi thứ 3 số ít (s)
    let s = clean + 's';
    if (/(?:s|sh|ch|x|z|o)$/.test(clean)) {
      s = clean + 'es';
    } else if (/[bcdfghjklmnpqrstvwxyz]y$/.test(clean)) {
      s = clean.slice(0, -1) + 'ies';
    }

    // 2. Dạng quá khứ (past) và phân từ 2 (pp)
    let past = clean + 'ed';
    if (clean.endsWith('e')) {
      past = clean + 'd';
    } else if (/[bcdfghjklmnpqrstvwxyz]y$/.test(clean)) {
      past = clean.slice(0, -1) + 'ied';
    } else if (/[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnprstvz]$/.test(clean)) {
      // Gấp đôi phụ âm cuối (e.g. plan -> planned, stop -> stopped)
      past = clean + clean.slice(-1) + 'ed';
    }

    // 3. Dạng V-ing
    let ing = clean + 'ing';
    if (clean.endsWith('ie')) {
      ing = clean.slice(0, -2) + 'ying';
    } else if (clean.endsWith('e') && !clean.endsWith('ee')) {
      ing = clean.slice(0, -1) + 'ing';
    } else if (/[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnprstvz]$/.test(clean)) {
      ing = clean + clean.slice(-1) + 'ing';
    }

    return { base: clean, s, past, pp: past, ing };
  }

  /**
   * Phân loại Semantic Tag tự động từ vốn từ vựng hiện có
   */
  classifySemanticTag(word: string, meaningVi: string): SemanticTag {
    const w = word.toLowerCase();
    const m = meaningVi.toLowerCase();

    if (
      m.includes('người') || m.includes('nhân viên') || m.includes('giám đốc') ||
      m.includes('trợ lý') || m.includes('chuyên gia') || m.includes('thư ký') ||
      w.endsWith('or') || w.endsWith('er') || w.endsWith('ant') || w.endsWith('ist')
    ) {
      return 'person';
    }

    if (
      m.includes('cà rốt') || m.includes('khoai') || m.includes('ngô') ||
      m.includes('cà chua') || m.includes('dâu') || m.includes('táo') ||
      m.includes('hoa') || m.includes('rau') || m.includes('nông sản') ||
      ['carrot', 'potato', 'corn', 'tomato', 'strawberry', 'apple', 'pumpkin', 'wheat', 'blueberry', 'watermelon', 'sunflower', 'vegetable'].includes(w)
    ) {
      return 'food_crop';
    }

    if (
      m.includes('thiết bị') || m.includes('hành lý') || m.includes('thông tin') ||
      m.includes('lời khuyên') || m.includes('nội thất') ||
      ['equipment', 'information', 'advice', 'luggage', 'furniture'].includes(w)
    ) {
      return 'uncountable';
    }

    if (
      m.includes('phòng') || m.includes('văn phòng') || m.includes('nhà kho') ||
      m.includes('hội trường') || m.includes('nhà ga') ||
      ['office', 'warehouse', 'auditorium', 'headquarters', 'room'].includes(w)
    ) {
      return 'place';
    }

    return 'document_product';
  }

  /**
   * Tạo bài kiểm tra Ngữ pháp Hybrid 10 câu (7 Dynamic + 3 Static)
   */
  buildGrammarTestSession(
    topicCode: string,
    unlockedVocabs: CandidateVocabWord[],
    staticQuestions: GrammarQuestion[],
    sessionSize = 10
  ): GrammarQuizQuestionDto[] {
    const targetDynamic = Math.min(7, sessionSize);

    // 1. Sinh các câu hỏi ngữ pháp động theo 3 Chiến lược
    const dynamicQuestions = this.generateDynamicQuestions(
      topicCode,
      unlockedVocabs,
      targetDynamic
    );

    // 2. Chuyển đổi câu hỏi tĩnh sang QuizQuestionDto
    const formattedStatic: GrammarQuizQuestionDto[] = (staticQuestions || []).map((q, idx) => ({
      id: `static_${topicCode}_${idx + 1}`,
      sourceType: 'STATIC_GRAMMAR',
      prompt: q.prompt,
      options: [...q.options],
      correctIndex: q.correctIndex,
      explanationVi: q.explanationVi
    }));

    // 3. Ghép nối Hybrid Mix (7 dynamic + 3 static)
    const neededStatic = sessionSize - dynamicQuestions.length;
    const shuffledStatic = this.shuffle([...formattedStatic]);
    const pickedStatic = shuffledStatic.slice(0, Math.max(neededStatic, 0));

    // Nếu câu hỏi động ít hơn dự kiến, bổ sung thêm câu hỏi tĩnh cho đủ sessionSize
    const combined = [...dynamicQuestions, ...pickedStatic];
    if (combined.length < sessionSize && formattedStatic.length > pickedStatic.length) {
      const remainingStatic = formattedStatic.filter(s => !pickedStatic.some(p => p.id === s.id));
      combined.push(...remainingStatic.slice(0, sessionSize - combined.length));
    }

    return this.shuffle(combined).slice(0, sessionSize);
  }

  /**
   * Điều hướng sinh câu hỏi động dựa trên mã chuyên đề (Strategy A, B, C)
   */
  private generateDynamicQuestions(
    topicCode: string,
    vocabPool: CandidateVocabWord[],
    targetCount: number
  ): GrammarQuizQuestionDto[] {
    const list: GrammarQuizQuestionDto[] = [];
    const usedPrompts = new Set<string>();

    // Chuẩn bị danh sách đối tượng & danh từ ngữ nghĩa từ kho từ vựng đã mở khóa
    const crops = vocabPool.filter(v => this.classifySemanticTag(v.word, v.meaningVi) === 'food_crop').map(v => v.word.toLowerCase());
    const docs = vocabPool.filter(v => this.classifySemanticTag(v.word, v.meaningVi) === 'document_product').map(v => v.word.toLowerCase());
    const persons = vocabPool.filter(v => this.classifySemanticTag(v.word, v.meaningVi) === 'person').map(v => v.word);
    const uncountables = ['equipment', 'information', 'software', 'luggage', 'furniture'];

    const safeCrop = crops.length > 0 ? crops[0] : 'harvested crops';
    const safeDoc = docs.length > 0 ? docs[0] : 'quarterly report';
    const safePerson = persons.length > 0 ? `The ${persons[0].toLowerCase()}` : 'The project manager';

    let attempts = 0;
    while (list.length < targetCount && attempts < 30) {
      attempts++;
      let question: GrammarQuizQuestionDto | null = null;

      switch (topicCode) {
        // Strategy A: Word-Family Cloze (Parts of Speech)
        case 'gr_01_pos':
          question = this.generateStrategyA_WordFamily(safeDoc, safePerson);
          break;

        // Strategy C: Pronouns & Possessives
        case 'gr_02_pronouns':
          question = this.generateStrategyC_Pronouns(safeDoc);
          break;

        // Strategy B: Simple Tenses (Present, Past, Future)
        case 'gr_03_simple_tenses':
          question = this.generateStrategyB_SimpleTenses(safePerson, safeDoc, safeCrop);
          break;

        // Strategy B: Subject-Verb Agreement
        case 'gr_04_sv_agreement':
          question = this.generateStrategyB_SubjectVerbAgreement(uncountables, safeDoc);
          break;

        // Strategy B: Continuous & Perfect Tenses
        case 'gr_05_cont_perfect':
          question = this.generateStrategyB_ContPerfect(safePerson, safeDoc);
          break;

        // Strategy C: Prepositions of Time & Place
        case 'gr_06_prepositions':
          question = this.generateStrategyC_Prepositions();
          break;

        // Strategy B: Comparisons & Modifiers
        case 'gr_07_comparisons':
          question = this.generateStrategyB_Comparisons();
          break;

        // Strategy C: Conjunctions vs Prepositions
        case 'gr_08_conjunctions':
          question = this.generateStrategyC_Conjunctions(safeDoc);
          break;

        // Strategy B: Passive Voice
        case 'gr_09_passive':
          question = this.generateStrategyB_PassiveVoice(safeDoc, safeCrop);
          break;

        // Strategy B: To-V, Gerunds & Participles
        case 'gr_10_verbals':
          question = this.generateStrategyB_Verbals(safeDoc);
          break;

        // Strategy C: Relative Clauses
        case 'gr_11_relatives':
          question = this.generateStrategyC_RelativeClauses(safePerson, safeDoc);
          break;

        // Strategy B: Conditionals & Inversion
        case 'gr_12_conditionals':
          question = this.generateStrategyB_Conditionals();
          break;

        // Strategy B: Subjunctive Mood
        case 'gr_13_subjunctive':
          question = this.generateStrategyB_Subjunctive(safePerson);
          break;

        default:
          break;
      }

      if (question && !usedPrompts.has(question.prompt) && this.hasUniqueOptions(question.options)) {
        usedPrompts.add(question.prompt);
        list.push(question);
      }
    }

    return list;
  }

  // =========================================================================
  // CHIẾN LƯỢC A: Word-Family Cloze (Parts of Speech)
  // =========================================================================
  private generateStrategyA_WordFamily(safeDoc: string, safePerson: string): GrammarQuizQuestionDto {
    const wf = WORD_FAMILIES[Math.floor(Math.random() * WORD_FAMILIES.length)];
    const templates = [
      {
        slot: 'adj',
        prompt: `${safePerson} delivered an exceptionally ______ presentation on the ${safeDoc} yesterday.`,
        correct: wf.adj,
        explanation: `Trước danh từ "presentation" cần một Tính từ để bổ nghĩa. Đáp án đúng là "${wf.adj}".`
      },
      {
        slot: 'adv',
        prompt: `The engineering team finalized the ${safeDoc} ______ before the quarterly deadline.`,
        correct: wf.adv,
        explanation: `Đứng cuối câu bổ nghĩa cho động từ "finalized" cần một Trạng từ. Đáp án đúng là "${wf.adv}".`
      },
      {
        slot: 'n',
        prompt: `Management announced that overall ______ in the department has reached an all-time high.`,
        correct: wf.n,
        explanation: `Sau tính từ "overall" làm chủ ngữ của mệnh đề cần một Danh từ. Đáp án đúng là "${wf.n}".`
      },
      {
        slot: 'adv',
        prompt: `The newly upgraded operating software runs ______ during peak business hours.`,
        correct: wf.adv,
        explanation: `Bổ nghĩa cho động từ thường "runs" cần một Trạng từ. Đáp án đúng là "${wf.adv}".`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const rawOptions = [wf.n, wf.v, wf.adj, wf.adv];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, rawOptions);

    return {
      id: `dyn_pos_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  // =========================================================================
  // CHIẾN LƯỢC B: Verb-Form Mutation (Tenses, Passive, S-V, Verbals)
  // =========================================================================
  private generateStrategyB_SimpleTenses(person: string, doc: string, crop: string): GrammarQuizQuestionDto {
    const isDoc = Math.random() > 0.5;
    const targetObj = isDoc ? doc : crop;
    const verbBase = isDoc ? 'review' : 'harvest';
    const conj = this.conjugateVerb(verbBase);

    const isPast = Math.random() > 0.4;
    let prompt: string;
    let correct: string;
    let explanation: string;

    if (isPast) {
      prompt = `${person} ______ the ${targetObj} last Friday afternoon.`;
      correct = conj.past;
      explanation = `Dấu hiệu "last Friday" chỉ hành động đã kết thúc trong quá khứ → chia thì Quá khứ đơn ("${conj.past}").`;
    } else {
      prompt = `${person} ______ the ${targetObj} promptly tomorrow morning.`;
      correct = `will ${conj.base}`;
      explanation = `Dấu hiệu "tomorrow morning" chỉ sự việc trong tương lai → chia thì Tương lai đơn ("will ${conj.base}").`;
    }

    const distractors = [conj.s, conj.past, `will ${conj.base}`, conj.ing];
    const { options, correctIndex } = this.buildUniqueOptions(correct, distractors);

    return {
      id: `dyn_tense_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt,
      options,
      correctIndex,
      explanationVi: explanation
    };
  }

  private generateStrategyB_SubjectVerbAgreement(uncountables: string[], doc: string): GrammarQuizQuestionDto {
    const unc = uncountables[Math.floor(Math.random() * uncountables.length)];
    const templates = [
      {
        prompt: `All the ${unc} in the central facility ______ thoroughly every week.`,
        correct: 'is inspected',
        distractors: ['are inspected', 'were inspecting', 'have inspected'],
        explanation: `"${unc}" là danh từ không đếm được nên động từ chia ở ngôi thứ 3 SỐ ÍT ("is inspected").`
      },
      {
        prompt: `The number of international orders for the ${doc} ______ noticeably since last month.`,
        correct: 'has grown',
        distractors: ['have grown', 'are growing', 'grow'],
        explanation: `Cụm "The number of + N(số nhiều)" luôn đi với động từ số ít ("has grown").`
      },
      {
        prompt: `Each participant in the development workshop ______ eligible for a completion certificate.`,
        correct: 'is',
        distractors: ['are', 'were', 'have been'],
        explanation: `"Each + danh từ" quy định động từ chia ở ngôi SỐ ÍT ("is").`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, [pick.correct, ...pick.distractors]);

    return {
      id: `dyn_sva_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  private generateStrategyB_ContPerfect(person: string, doc: string): GrammarQuizQuestionDto {
    const conj = this.conjugateVerb('finalize');
    const isCont = Math.random() > 0.5;

    if (isCont) {
      const prompt = `${person} is currently ______ the ${doc} with external auditors.`;
      const correct = conj.ing;
      const { options, correctIndex } = this.buildUniqueOptions(correct, [conj.base, conj.ing, conj.past, conj.s]);
      return {
        id: `dyn_cont_${Date.now()}_${Math.random()}`,
        sourceType: 'DYNAMIC_VOCAB',
        prompt,
        options,
        correctIndex,
        explanationVi: `Sau "is currently" diễn tả hành động đang diễn ra cần dạng V-ing ("${conj.ing}").`
      };
    } else {
      const prompt = `Our department ______ the ${doc} steadily over the past three quarters.`;
      const correct = `has ${conj.pp}`;
      const { options, correctIndex } = this.buildUniqueOptions(correct, [`has ${conj.pp}`, conj.past, conj.s, `is ${conj.ing}`]);
      return {
        id: `dyn_perf_${Date.now()}_${Math.random()}`,
        sourceType: 'DYNAMIC_VOCAB',
        prompt,
        options,
        correctIndex,
        explanationVi: `Cụm "over the past + khoảng thời gian" là dấu hiệu của thì Hiện tại hoàn thành ("has ${conj.pp}").`
      };
    }
  }

  private generateStrategyB_PassiveVoice(doc: string, crop: string): GrammarQuizQuestionDto {
    const isDoc = Math.random() > 0.5;
    const item = isDoc ? doc : crop;
    const verbBase = isDoc ? 'approve' : 'deliver';
    const conj = this.conjugateVerb(verbBase);

    const prompt = `The ${item} ______ by the regional director yesterday afternoon.`;
    const correct = `was ${conj.pp}`;
    const distractors = [conj.past, `was ${conj.pp}`, `has ${conj.pp}`, conj.ing];
    const { options, correctIndex } = this.buildUniqueOptions(correct, distractors);

    return {
      id: `dyn_pass_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt,
      options,
      correctIndex,
      explanationVi: `Chủ ngữ "${item}" bị tác động và phía sau có "by the regional director" → chọn câu bị động quá khứ đơn ("was ${conj.pp}").`
    };
  }

  private generateStrategyB_Verbals(doc: string): GrammarQuizQuestionDto {
    const conj = this.conjugateVerb('submit');
    const templates = [
      {
        prompt: `We genuinely look forward to ______ the finalized ${doc} next Tuesday.`,
        correct: conj.ing,
        distractors: [conj.base, conj.ing, `to ${conj.base}`, conj.pp],
        explanation: `Trong cụm "look forward to", "to" là giới từ nên động từ đi sau bắt buộc là V-ing ("${conj.ing}").`
      },
      {
        prompt: `The executive committee decided to postpone ______ the new ${doc}.`,
        correct: conj.ing,
        distractors: [conj.base, conj.ing, `to ${conj.base}`, conj.pp],
        explanation: `Động từ "postpone" theo sau bởi Danh động từ V-ing ("${conj.ing}").`
      },
      {
        prompt: `Please do not hesitate ______ our support desk if you encounter difficulties.`,
        correct: 'to contact',
        distractors: ['contact', 'to contact', 'contacting', 'contacted'],
        explanation: `Cấu trúc cố định: "hesitate to V" (ngần ngại làm gì) → chọn "to contact".`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, pick.distractors);

    return {
      id: `dyn_vbl_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  private generateStrategyB_Comparisons(): GrammarQuizQuestionDto {
    const templates = [
      {
        prompt: `The newly installed solar energy system operates ______ more efficiently than the previous setup.`,
        correct: 'significantly',
        distractors: ['very', 'significantly', 'quite', 'too'],
        explanation: `Để nhấn mạnh tính từ so sánh hơn ("more efficiently"), ta dùng phó từ "significantly". Tuyệt đối không dùng "very".`
      },
      {
        prompt: `Representatives strive to address customer inquiries as ______ as possible.`,
        correct: 'promptly',
        distractors: ['prompt', 'promptly', 'promptness', 'more prompt'],
        explanation: `Trong cấu trúc "as... as", từ bổ nghĩa cho động từ thường "address" phải là một Trạng từ ("promptly").`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, pick.distractors);

    return {
      id: `dyn_comp_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  private generateStrategyB_Conditionals(): GrammarQuizQuestionDto {
    const templates = [
      {
        prompt: `______ you have any inquiries regarding the invoice terms, please contact our support desk.`,
        correct: 'Should',
        distractors: ['Should', 'Had', 'Were', 'If you'],
        explanation: `Đảo ngữ câu điều kiện loại 1: "Should + S + V-bare, S + V..." tương đương với "If you have".`
      },
      {
        prompt: `Had the logistics firm dispatched the cargo earlier, all delivery targets ______ met on time.`,
        correct: 'would have been',
        distractors: ['will be', 'would be', 'would have been', 'had been'],
        explanation: `Mệnh đề đảo ngữ loại 3 ("Had + S + V3/ed") đòi hỏi mệnh đề chính ở dạng "would have been + V3/ed".`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, pick.distractors);

    return {
      id: `dyn_cond_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  private generateStrategyB_Subjunctive(person: string): GrammarQuizQuestionDto {
    const templates = [
      {
        prompt: `The board recommended that ${person} ______ an updated proposal by next Monday.`,
        correct: 'submit',
        distractors: ['submits', 'submit', 'submitted', 'is submitting'],
        explanation: `Cấu trúc thức giả định: "recommend that + S + (should) + V-bare" → động từ luôn giữ nguyên mẫu ("submit").`
      },
      {
        prompt: `It is essential that every staff member ______ the emergency exit procedure.`,
        correct: 'understand',
        distractors: ['understands', 'understand', 'understood', 'understanding'],
        explanation: `Cấu trúc giả định với tính từ: "It is essential that + S + V-bare" → động từ nguyên mẫu ("understand").`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, pick.distractors);

    return {
      id: `dyn_sub_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  // =========================================================================
  // CHIẾN LƯỢC C: Example Sentence Function-Word Cloze (Prepositions, Pronouns, Conjunctions)
  // =========================================================================
  private generateStrategyC_Pronouns(doc: string): GrammarQuizQuestionDto {
    const templates = [
      {
        prompt: `The creative director conducted the presentation on the ${doc} by ______ yesterday.`,
        correct: 'himself',
        distractors: ['he', 'him', 'his', 'himself'],
        explanation: `Cụm "by himself" mang nghĩa tự mình làm, đại từ phản thân đứng sau giới từ "by".`
      },
      {
        prompt: `The regional managers reviewed ______ quarterly budgets before sending them to the board.`,
        correct: 'their',
        distractors: ['they', 'them', 'their', 'themselves'],
        explanation: `Đứng trước cụm danh từ "quarterly budgets" cần một Tính từ sở hữu ("their").`
      },
      {
        prompt: `Our marketing campaign succeeded, while ______ failed to meet expected targets.`,
        correct: 'theirs',
        distractors: ['they', 'their', 'theirs', 'them'],
        explanation: `"theirs" là đại từ sở hữu thay thế cho "their marketing campaign" để tránh lặp từ.`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, pick.distractors);

    return {
      id: `dyn_pro_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  private generateStrategyC_Prepositions(): GrammarQuizQuestionDto {
    const templates = [
      {
        prompt: `All expense reports must be submitted to the accounting office ______ 5:00 P.M. on Friday.`,
        correct: 'by',
        distractors: ['until', 'by', 'during', 'for'],
        explanation: `Chỉ mốc thời hạn chót hoàn thành hành động nộp (submit), ta dùng giới từ "by" (trước hoặc đúng lúc).`
      },
      {
        prompt: `Visitors are requested to keep their mobile phones silent ______ the entire presentation.`,
        correct: 'during',
        distractors: ['while', 'during', 'since', 'until'],
        explanation: `Trước một cụm danh từ sự kiện ("the entire presentation"), ta dùng giới từ "during". "while" phải đi với mệnh đề.`
      },
      {
        prompt: `Reimbursement requests will be processed ______ five business days of submission.`,
        correct: 'within',
        distractors: ['within', 'between', 'among', 'along'],
        explanation: `Trước khoảng thời gian ("five business days"), giới từ "within" mang nghĩa "trong vòng 5 ngày làm việc".`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, pick.distractors);

    return {
      id: `dyn_prep_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  private generateStrategyC_Conjunctions(doc: string): GrammarQuizQuestionDto {
    const templates = [
      {
        prompt: `______ the technical difficulties, the keynote speech started precisely on schedule.`,
        correct: 'Despite',
        distractors: ['Although', 'Despite', 'Because', 'While'],
        explanation: `"the technical difficulties" là cụm danh từ nên phải dùng giới từ "Despite" (mặc dù). "Although" phải đi với mệnh đề S + V.`
      },
      {
        prompt: `______ the server maintenance is scheduled for tonight, the portal will remain fully operational.`,
        correct: 'Although',
        distractors: ['Although', 'Despite', 'Because of', 'During'],
        explanation: `Phía sau là một mệnh đề hoàn chỉnh (S + V) mang ý nghĩa tương phản → chọn liên từ "Although".`
      },
      {
        prompt: `Production of the ${doc} was temporarily halted ______ unexpected weather conditions.`,
        correct: 'due to',
        distractors: ['because', 'due to', 'while', 'even though'],
        explanation: `"unexpected weather conditions" là cụm danh từ chỉ nguyên nhân → chọn giới từ "due to".`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, pick.distractors);

    return {
      id: `dyn_conj_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  private generateStrategyC_RelativeClauses(person: string, doc: string): GrammarQuizQuestionDto {
    const templates = [
      {
        prompt: `${person} ______ credentials and portfolio best matched our requirements was awarded the contract.`,
        correct: 'whose',
        distractors: ['who', 'whom', 'whose', 'which'],
        explanation: `Sau chỗ trống là cụm danh từ "credentials and portfolio" thuộc về chủ ngữ → dùng đại từ quan hệ sở hữu "whose".`
      },
      {
        prompt: `The finalized ${doc}, ______ was approved by the board, outlines our strategy for next year.`,
        correct: 'which',
        distractors: ['that', 'which', 'where', 'who'],
        explanation: `Sau dấu phẩy (mệnh đề không xác định) bổ nghĩa cho danh từ chỉ vật, chỉ được dùng "which", không dùng "that".`
      }
    ];

    const pick = templates[Math.floor(Math.random() * templates.length)];
    const { options, correctIndex } = this.buildUniqueOptions(pick.correct, pick.distractors);

    return {
      id: `dyn_rel_${Date.now()}_${Math.random()}`,
      sourceType: 'DYNAMIC_VOCAB',
      prompt: pick.prompt,
      options,
      correctIndex,
      explanationVi: pick.explanation
    };
  }

  // =========================================================================
  // HÀM TIỆN ÍCH HỖ TRỢ (OPTIONS & FISHER-YATES SHUFFLE)
  // =========================================================================
  private buildUniqueOptions(correct: string, candidateOptions: string[]): { options: string[]; correctIndex: number } {
    const uniqueSet = new Set<string>();
    uniqueSet.add(correct);

    for (const opt of candidateOptions) {
      if (opt && opt.trim()) {
        uniqueSet.add(opt.trim());
      }
      if (uniqueSet.size >= 4) break;
    }

    // Nếu chưa đủ 4 options, bổ sung thêm distractors mặc định
    const fallbackOptions = ['is', 'are', 'was', 'were', 'have', 'has', 'doing', 'done'];
    for (const fb of fallbackOptions) {
      if (uniqueSet.size >= 4) break;
      uniqueSet.add(fb);
    }

    const shuffled = this.shuffle(Array.from(uniqueSet).slice(0, 4));
    const correctIndex = shuffled.indexOf(correct);

    return {
      options: shuffled,
      correctIndex: correctIndex >= 0 ? correctIndex : 0
    };
  }

  private hasUniqueOptions(options: string[]): boolean {
    if (!options || options.length !== 4) return false;
    return new Set(options).size === 4;
  }

  private shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
