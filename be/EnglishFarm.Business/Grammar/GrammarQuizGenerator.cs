using System.Text.Json;
using System.Text.RegularExpressions;
using EnglishFarm.Business.Common;
using EnglishFarm.Entities.Grammar;
using EnglishFarm.Entities.Learning;
using EnglishFarm.Models.Grammar;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.Business.Grammar;

public class GrammarQuizGenerator : IGrammarQuizGenerator
{
    private readonly IRepository<GrammarTopicEntity> _topicRepo;
    private readonly IRepository<VocabularyEntity> _vocabRepo;
    private readonly IRepository<LessonEntity> _lessonRepo;
    private readonly IRepository<UserLessonProgressEntity> _lessonProgressRepo;

    public GrammarQuizGenerator(
        IRepository<GrammarTopicEntity> topicRepo,
        IRepository<VocabularyEntity> vocabRepo,
        IRepository<LessonEntity> lessonRepo,
        IRepository<UserLessonProgressEntity> lessonProgressRepo)
    {
        _topicRepo = topicRepo;
        _vocabRepo = vocabRepo;
        _lessonRepo = lessonRepo;
        _lessonProgressRepo = lessonProgressRepo;
    }

    private record WordFamily(string N, string V, string Adj, string Adv);
    private record VerbForms(string Base, string S, string Past, string Pp, string Ing);

    private static readonly Dictionary<string, VerbForms> IrregularVerbs = new(StringComparer.OrdinalIgnoreCase)
    {
        ["grow"] = new("grow", "grows", "grew", "grown", "growing"),
        ["eat"] = new("eat", "eats", "ate", "eaten", "eating"),
        ["send"] = new("send", "sends", "sent", "sent", "sending"),
        ["buy"] = new("buy", "buys", "bought", "bought", "buying"),
        ["make"] = new("make", "makes", "made", "made", "making"),
        ["write"] = new("write", "writes", "wrote", "written", "writing"),
        ["see"] = new("see", "sees", "saw", "seen", "seeing"),
        ["take"] = new("take", "takes", "took", "taken", "taking"),
        ["give"] = new("give", "gives", "gave", "given", "giving"),
        ["choose"] = new("choose", "chooses", "chose", "chosen", "choosing"),
        ["pay"] = new("pay", "pays", "paid", "paid", "paying"),
        ["find"] = new("find", "finds", "found", "found", "finding"),
        ["leave"] = new("leave", "leaves", "left", "left", "leaving"),
        ["meet"] = new("meet", "meets", "met", "met", "meeting"),
        ["build"] = new("build", "builds", "built", "built", "building"),
        ["sell"] = new("sell", "sells", "sold", "sold", "selling"),
        ["hold"] = new("hold", "holds", "held", "held", "holding"),
        ["speak"] = new("speak", "speaks", "spoke", "spoken", "speaking"),
        ["understand"] = new("understand", "understands", "understood", "understood", "understanding")
    };

    private static readonly List<WordFamily> WordFamilies = new()
    {
        new("success", "succeed", "successful", "successfully"),
        new("impression", "impress", "impressive", "impressively"),
        new("competition", "compete", "competitive", "competitively"),
        new("reliability", "rely", "reliable", "reliably"),
        new("creation", "create", "creative", "creatively"),
        new("effectiveness", "effect", "effective", "effectively"),
        new("management", "manage", "manageable", "managerially"),
        new("productivity", "produce", "productive", "productively"),
        new("decision", "decide", "decisive", "decisively"),
        new("significance", "signify", "significant", "significantly"),
        new("care", "care", "careful", "carefully"),
        new("smoothness", "smooth", "smooth", "smoothly"),
        new("punctuality", "punctuate", "punctual", "punctually"),
        new("frequency", "frequent", "frequent", "frequently"),
        new("thoroughness", "thorough", "thorough", "thoroughly"),
        new("profession", "professionalize", "professional", "professionally"),
        new("satisfaction", "satisfy", "satisfactory", "satisfactorily"),
        new("operation", "operate", "operational", "operationally"),
        new("consideration", "consider", "considerable", "considerably"),
        new("accuracy", "accurate", "accurate", "accurately")
    };

    public async Task<List<GrammarQuestionResponseModel>> BuildGrammarTestSessionAsync(
        string topicCode,
        int userId,
        int sessionSize = 10,
        CancellationToken ct = default)
    {
        var topic = await _topicRepo.Query()
            .Include(t => t.Questions)
            .FirstOrDefaultAsync(t => t.Code == topicCode, ct);

        if (topic == null)
        {
            throw new KeyNotFoundException($"Không tìm thấy chuyên đề ngữ pháp: {topicCode}");
        }

        // Lấy danh sách từ vựng từ các bài học mà user đã mở khóa
        var unlockedLessonIds = await _lessonRepo.Query()
            .Where(l => l.RequiredCropId == null) // Các bài mở sẵn
            .Select(l => l.Id)
            .ToListAsync(ct);

        var vocabs = await _vocabRepo.Query()
            .Where(v => unlockedLessonIds.Contains(v.LessonId))
            .Take(100)
            .ToListAsync(ct);

        int targetDynamic = Math.Min(7, sessionSize);
        var dynamicQuestions = GenerateDynamicQuestions(topicCode, vocabs, targetDynamic);

        // Chuyển đổi câu hỏi tĩnh
        var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var staticQuestions = topic.Questions.Select(q => new GrammarQuestionResponseModel
        {
            Id = q.Id,
            SourceType = "STATIC_GRAMMAR",
            Prompt = q.Prompt,
            Options = JsonSerializer.Deserialize<List<string>>(q.OptionsJson, jsonOptions) ?? new(),
            CorrectIndex = q.CorrectIndex,
            ExplanationVi = q.ExplanationVi
        }).ToList();

        var random = new Random();
        var shuffledStatic = staticQuestions.OrderBy(_ => random.Next()).ToList();
        int neededStatic = Math.Max(0, sessionSize - dynamicQuestions.Count);
        var pickedStatic = shuffledStatic.Take(neededStatic).ToList();

        var combined = new List<GrammarQuestionResponseModel>();
        combined.AddRange(dynamicQuestions);
        combined.AddRange(pickedStatic);

        // Bổ sung thêm câu hỏi tĩnh nếu tổng chưa đạt sessionSize
        if (combined.Count < sessionSize && staticQuestions.Count > pickedStatic.Count)
        {
            var remaining = staticQuestions.Where(s => !pickedStatic.Any(p => p.Id == s.Id)).ToList();
            combined.AddRange(remaining.Take(sessionSize - combined.Count));
        }

        return combined.OrderBy(_ => random.Next()).Take(sessionSize).ToList();
    }

    private static VerbForms ConjugateVerb(string baseWord)
    {
        var clean = baseWord.Trim().ToLowerInvariant();
        if (IrregularVerbs.TryGetValue(clean, out var forms))
        {
            return forms;
        }

        // Động cơ chia thì có quy tắc
        string s = clean + "s";
        if (Regex.IsMatch(clean, "(?:s|sh|ch|x|z|o)$"))
        {
            s = clean + "es";
        }
        else if (Regex.IsMatch(clean, "[bcdfghjklmnpqrstvwxyz]y$"))
        {
            s = clean[..^1] + "ies";
        }

        string past = clean + "ed";
        if (clean.EndsWith('e'))
        {
            past = clean + "d";
        }
        else if (Regex.IsMatch(clean, "[bcdfghjklmnpqrstvwxyz]y$"))
        {
            past = clean[..^1] + "ied";
        }
        else if (Regex.IsMatch(clean, "[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnprstvz]$"))
        {
            past = clean + clean[^1] + "ed";
        }

        string ing = clean + "ing";
        if (clean.EndsWith("ie"))
        {
            ing = clean[..^2] + "ying";
        }
        else if (clean.EndsWith('e') && !clean.EndsWith("ee"))
        {
            ing = clean[..^1] + "ing";
        }
        else if (Regex.IsMatch(clean, "[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnprstvz]$"))
        {
            ing = clean + clean[^1] + "ing";
        }

        return new VerbForms(clean, s, past, past, ing);
    }

    private List<GrammarQuestionResponseModel> GenerateDynamicQuestions(
        string topicCode,
        List<VocabularyEntity> vocabs,
        int targetCount)
    {
        var list = new List<GrammarQuestionResponseModel>();
        var usedPrompts = new HashSet<string>();
        var random = new Random();

        string safeDoc = "quarterly report";
        string safePerson = "The project manager";
        string safeCrop = "harvested produce";

        int attempts = 0;
        int pseudoId = 10001;

        while (list.Count < targetCount && attempts < 25)
        {
            attempts++;
            GrammarQuestionResponseModel? q = null;

            switch (topicCode)
            {
                case "gr_01_pos":
                {
                    var wf = WordFamilies[random.Next(WordFamilies.Count)];
                    string prompt = $"{safePerson} delivered an exceptionally ______ presentation on the {safeDoc} yesterday.";
                    string correct = wf.Adj;
                    q = BuildModel(pseudoId++, prompt, correct, new[] { wf.N, wf.V, wf.Adj, wf.Adv },
                        $"Trước danh từ \"presentation\" cần một Tính từ bổ nghĩa. Đáp án đúng là \"{wf.Adj}\".");
                    break;
                }
                case "gr_02_pronouns":
                {
                    string prompt = $"The creative director finalized the {safeDoc} by ______ yesterday afternoon.";
                    string correct = "himself";
                    q = BuildModel(pseudoId++, prompt, correct, new[] { "he", "him", "his", "himself" },
                        "Cụm \"by himself\" mang nghĩa tự mình làm, đại từ phản thân đứng sau giới từ \"by\".");
                    break;
                }
                case "gr_03_simple_tenses":
                {
                    var conj = ConjugateVerb("review");
                    string prompt = $"{safePerson} ______ the {safeDoc} last Friday afternoon.";
                    string correct = conj.Past;
                    q = BuildModel(pseudoId++, prompt, correct, new[] { conj.S, conj.Past, "will " + conj.Base, conj.Ing },
                        $"Dấu hiệu \"last Friday\" chỉ quá khứ đã kết thúc → chia thì Quá khứ đơn (\"{conj.Past}\").");
                    break;
                }
                case "gr_04_sv_agreement":
                {
                    string prompt = $"All the laboratory equipment in the facility ______ inspected periodically.";
                    string correct = "is";
                    q = BuildModel(pseudoId++, prompt, correct, new[] { "is", "are", "were", "have been" },
                        "\"equipment\" là danh từ không đếm được nên động từ chia ở ngôi thứ 3 SỐ ÍT (\"is\").");
                    break;
                }
                case "gr_05_cont_perfect":
                {
                    var conj = ConjugateVerb("finalize");
                    string prompt = $"The department ______ the {safeDoc} steadily over the past two quarters.";
                    string correct = $"has {conj.Pp}";
                    q = BuildModel(pseudoId++, prompt, correct, new[] { $"has {conj.Pp}", conj.Past, conj.S, $"is {conj.Ing}" },
                        $"Cụm \"over the past + khoảng thời gian\" là dấu hiệu của thì Hiện tại hoàn thành (\"{correct}\").");
                    break;
                }
                case "gr_06_prepositions":
                {
                    string prompt = $"All financial reimbursement claims must be submitted ______ 5:00 P.M. on Friday.";
                    string correct = "by";
                    q = BuildModel(pseudoId++, prompt, correct, new[] { "until", "by", "during", "for" },
                        "Chỉ mốc thời hạn chót hoàn thành hành động nộp (submit), ta dùng giới từ \"by\".");
                    break;
                }
                case "gr_07_comparisons":
                {
                    string prompt = $"The new software operates ______ more reliably than the system used previously.";
                    string correct = "significantly";
                    q = BuildModel(pseudoId++, prompt, correct, new[] { "very", "significantly", "quite", "too" },
                        "Để nhấn mạnh tính từ so sánh hơn (\"more reliably\"), ta dùng phó từ \"significantly\". Không dùng \"very\".");
                    break;
                }
                case "gr_08_conjunctions":
                {
                    string prompt = $"______ the inclement weather conditions, the outdoor agricultural expo started on schedule.";
                    string correct = "Despite";
                    q = BuildModel(pseudoId++, prompt, correct, new[] { "Although", "Despite", "Because", "While" },
                        "Phía sau là cụm danh từ nên phải dùng giới từ \"Despite\". \"Although\" phải đi với mệnh đề S + V.");
                    break;
                }
                case "gr_09_passive":
                {
                    var conj = ConjugateVerb("approve");
                    string item = random.NextDouble() > 0.5 ? safeDoc : safeCrop;
                    string prompt = $"The {item} ______ by the regional committee yesterday afternoon.";
                    string correct = $"was {conj.Pp}";
                    q = BuildModel(pseudoId++, prompt, correct, new[] { conj.Past, $"was {conj.Pp}", $"has {conj.Pp}", conj.Ing },
                        $"Chủ ngữ \"{item}\" bị tác động và có \"by the committee\" → câu bị động quá khứ đơn (\"{correct}\").");
                    break;
                }
                case "gr_10_verbals":
                {
                    var conj = ConjugateVerb("receive");
                    string prompt = $"We genuinely look forward to ______ the finalized {safeDoc} next week.";
                    string correct = conj.Ing;
                    q = BuildModel(pseudoId++, prompt, correct, new[] { conj.Base, conj.Ing, $"to {conj.Base}", conj.Pp },
                        $"Trong cụm \"look forward to\", \"to\" là giới từ nên động từ đi sau bắt buộc là V-ing (\"{conj.Ing}\").");
                    break;
                }
                case "gr_11_relatives":
                {
                    string prompt = $"{safePerson} ______ credentials and portfolio best matched the job specifications was hired.";
                    string correct = "whose";
                    q = BuildModel(pseudoId++, prompt, correct, new[] { "who", "whom", "whose", "which" },
                        "Sau chỗ trống là cụm danh từ thuộc về chủ ngữ → dùng đại từ quan hệ sở hữu \"whose\".");
                    break;
                }
                default:
                    break;
            }

            if (q != null && !usedPrompts.Contains(q.Prompt))
            {
                usedPrompts.Add(q.Prompt);
                list.Add(q);
            }
        }

        return list;
    }

    private static GrammarQuestionResponseModel BuildModel(
        int id,
        string prompt,
        string correct,
        string[] candidates,
        string explanation)
    {
        var random = new Random();
        var set = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { correct };
        foreach (var c in candidates)
        {
            if (!string.IsNullOrWhiteSpace(c)) set.Add(c.Trim());
            if (set.Count >= 4) break;
        }

        var fallbacks = new[] { "is", "are", "was", "were", "done", "doing" };
        foreach (var fb in fallbacks)
        {
            if (set.Count >= 4) break;
            set.Add(fb);
        }

        var shuffled = set.Take(4).OrderBy(_ => random.Next()).ToList();
        int correctIdx = shuffled.IndexOf(correct);

        return new GrammarQuestionResponseModel
        {
            Id = id,
            SourceType = "DYNAMIC_VOCAB",
            Prompt = prompt,
            Options = shuffled,
            CorrectIndex = correctIdx >= 0 ? correctIdx : 0,
            ExplanationVi = explanation
        };
    }
}
