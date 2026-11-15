using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Text.Unicode;
using EnglishFarm.Business.ImportExport.Models;
using EnglishFarm.DB;
using EnglishFarm.Entities.Learning;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.Business.ImportExport.Services;

public class VocabularyImportExportService : IVocabularyImportExportService
{
    private readonly EnglishFarmDbContext _dbContext;

    public VocabularyImportExportService(EnglishFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ImportResultModel> ImportFromRawTextAsync(ImportToeicTextRequestModel model)
    {
        if (string.IsNullOrWhiteSpace(model.RawText))
        {
            return new ImportResultModel
            {
                Success = false,
                Message = "Nội dung văn bản trống. Vui lòng cung cấp nội dung bài viết."
            };
        }

        // Bóc tách văn bản theo định dạng TOEIC từng chủ đề
        var structuredRequest = ParseRawToeicText(model);
        return await ImportStructuredAsync(structuredRequest);
    }

    public async Task<ImportResultModel> ImportStructuredAsync(ImportStructuredRequestModel model)
    {
        var result = new ImportResultModel();

        if (model.Topics == null || model.Topics.Count == 0)
        {
            result.Success = false;
            result.Message = "Danh sách chủ đề trống.";
            return result;
        }

        var executionStrategy = _dbContext.Database.CreateExecutionStrategy();

        await executionStrategy.ExecuteAsync(async () =>
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();

            try
            {
                int maxOrder = await _dbContext.Lessons
                    .Where(l => l.LanguageCode == model.LanguageCode)
                    .Select(l => (int?)l.OrderIndex)
                    .MaxAsync() ?? 0;

                int topicCounter = 1;

                foreach (var topic in model.Topics)
                {
                    if (string.IsNullOrWhiteSpace(topic.Title) || topic.Vocabularies.Count == 0)
                    {
                        continue;
                    }

                    // 1. Kiểm tra hoặc tạo Lesson
                    var lesson = await _dbContext.Lessons
                        .Include(l => l.Vocabularies)
                        .Include(l => l.QuizQuestions)
                        .FirstOrDefaultAsync(l => l.Title == topic.Title && l.LanguageCode == model.LanguageCode);

                    if (lesson == null)
                    {
                        maxOrder++;

                        // Xác định Level và điều kiện mở khóa nông sản
                        string levelTag = topic.LevelTag ?? (topicCounter <= 15 ? "TOEIC 450" : (topicCounter <= 35 ? "TOEIC 650" : "TOEIC 800"));
                        int? requiredCropId = topic.RequiredCropId;
                        int requiredCropQty = topic.RequiredCropQty;

                        if (requiredCropId == null)
                        {
                            if (topicCounter <= 5)
                            {
                                requiredCropId = null;
                                requiredCropQty = 0;
                            }
                            else if (topicCounter <= 15)
                            {
                                requiredCropId = 1; // Carrot
                                requiredCropQty = 2;
                            }
                            else if (topicCounter <= 30)
                            {
                                requiredCropId = 2; // Corn
                                requiredCropQty = 3;
                            }
                            else
                            {
                                requiredCropId = 3; // Tomato
                                requiredCropQty = 3;
                            }
                        }

                        lesson = new LessonEntity
                        {
                            Title = topic.Title.Trim(),
                            LanguageCode = model.LanguageCode,
                            LevelTag = levelTag,
                            OrderIndex = maxOrder,
                            RequiredCropId = requiredCropId,
                            RequiredCropQty = requiredCropQty
                        };

                        _dbContext.Lessons.Add(lesson);
                        await _dbContext.SaveChangesAsync();
                        result.TotalTopicsImported++;
                        result.ImportedTopicTitles.Add(lesson.Title);
                    }

                    // 2. Thêm từ vựng (Không import hình ảnh - SpriteKey = null)
                    var existingWords = lesson.Vocabularies.Select(v => v.Word.ToLowerInvariant()).ToHashSet();
                    var newVocabs = new List<VocabularyEntity>();

                    foreach (var v in topic.Vocabularies)
                    {
                        if (string.IsNullOrWhiteSpace(v.Word) || existingWords.Contains(v.Word.ToLowerInvariant()))
                        {
                            continue;
                        }

                        var vocab = new VocabularyEntity
                        {
                            LessonId = lesson.Id,
                            Word = v.Word.Trim(),
                            Phonetic = v.Phonetic?.Trim(),
                            IpaUs = v.IpaUs?.Trim() ?? v.Phonetic?.Trim() ?? string.Empty,
                            IpaUk = v.IpaUk?.Trim() ?? string.Empty,
                            WordType = v.WordType ?? DetectWordType(v.Word),
                            MeaningVi = v.MeaningVi.Trim(),
                            ExampleEn = v.ExampleEn?.Trim(),
                            ExampleVi = v.ExampleVi?.Trim(),
                            SpriteKey = null // Đảm bảo không gán ảnh cho từ vựng
                        };

                        newVocabs.Add(vocab);
                        existingWords.Add(vocab.Word.ToLowerInvariant());
                        result.TotalVocabulariesImported++;
                    }

                    if (newVocabs.Count > 0)
                    {
                        _dbContext.Vocabularies.AddRange(newVocabs);
                        await _dbContext.SaveChangesAsync();
                    }

                    // 3. Tự động sinh câu hỏi Quiz
                    if (model.AutoGenerateQuizQuestions && lesson.QuizQuestions.Count == 0)
                    {
                        var allWords = topic.Vocabularies;
                        if (allWords.Count >= 4)
                        {
                            var random = new Random(topicCounter * 31);
                            var sampleWords = allWords.OrderBy(_ => random.Next()).Take(3).ToList();

                            foreach (var sw in sampleWords)
                            {
                                var correctMeaning = sw.MeaningVi.Trim();
                                var distractors = allWords
                                    .Where(w => w.MeaningVi.Trim() != correctMeaning)
                                    .Select(w => w.MeaningVi.Trim())
                                    .Distinct()
                                    .OrderBy(_ => random.Next())
                                    .Take(3)
                                    .ToList();

                                if (distractors.Count < 3)
                                {
                                    distractors.AddRange(new[] { "Khái niệm khác", "Không xác định", "Ý nghĩa chung" }.Take(3 - distractors.Count));
                                }

                                var options = new List<string> { correctMeaning };
                                options.AddRange(distractors);
                                options = options.OrderBy(_ => random.Next()).ToList();
                                int correctIdx = options.IndexOf(correctMeaning);

                                var quiz = new QuizQuestionEntity
                                {
                                    LessonId = lesson.Id,
                                    Prompt = $"Từ \"{sw.Word.Trim()}\" có nghĩa là gì?",
                                    SpriteKey = null,
                                    OptionsJson = JsonSerializer.Serialize(options, new JsonSerializerOptions
                                    {
                                        Encoder = JavaScriptEncoder.Create(UnicodeRanges.All)
                                    }),
                                    CorrectOptionIndex = correctIdx
                                };

                                _dbContext.QuizQuestions.Add(quiz);
                                result.TotalQuizQuestionsCreated++;
                            }

                            await _dbContext.SaveChangesAsync();
                        }
                    }

                    topicCounter++;
                }

                await transaction.CommitAsync();
                result.Success = true;
                result.Message = $"Nạp thành công {result.TotalTopicsImported} chủ đề, {result.TotalVocabulariesImported} từ vựng và {result.TotalQuizQuestionsCreated} câu hỏi trắc nghiệm.";
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                result.Success = false;
                result.Message = $"Lỗi trong quá trình nạp dữ liệu: {ex.Message}";
            }
        });

        return result;
    }

    public async Task<List<ExportVocabularyModel>> ExportVocabulariesAsync(string? languageCode, int? lessonId)
    {
        var query = _dbContext.Vocabularies
            .Include(v => v.Lesson)
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(languageCode))
        {
            query = query.Where(v => v.Lesson != null && v.Lesson.LanguageCode == languageCode);
        }

        if (lessonId.HasValue && lessonId.Value > 0)
        {
            query = query.Where(v => v.LessonId == lessonId.Value);
        }

        return await query
            .OrderBy(v => v.LessonId)
            .ThenBy(v => v.Word)
            .Select(v => new ExportVocabularyModel
            {
                LessonId = v.LessonId,
                TopicTitle = v.Lesson != null ? v.Lesson.Title : string.Empty,
                LanguageCode = v.Lesson != null ? v.Lesson.LanguageCode : "en",
                LevelTag = v.Lesson != null ? v.Lesson.LevelTag : string.Empty,
                VocabularyId = v.Id,
                Word = v.Word,
                Phonetic = v.Phonetic,
                WordType = v.WordType,
                MeaningVi = v.MeaningVi,
                ExampleEn = v.ExampleEn,
                ExampleVi = v.ExampleVi
            })
            .ToListAsync();
    }

    public async Task<byte[]> ExportToCsvAsync(string? languageCode, int? lessonId)
    {
        var vocabs = await ExportVocabulariesAsync(languageCode, lessonId);
        var sb = new StringBuilder();

        // Header CSV
        sb.AppendLine("Chủ đề,Ngôn ngữ,Cấp độ,Từ vựng,Phiên âm,Loại từ,Dịch nghĩa,Ví dụ tiếng Anh,Dịch ví dụ");

        foreach (var item in vocabs)
        {
            sb.AppendLine(string.Join(",",
                EscapeCsvField(item.TopicTitle),
                EscapeCsvField(item.LanguageCode),
                EscapeCsvField(item.LevelTag),
                EscapeCsvField(item.Word),
                EscapeCsvField(item.Phonetic ?? string.Empty),
                EscapeCsvField(item.WordType ?? string.Empty),
                EscapeCsvField(item.MeaningVi),
                EscapeCsvField(item.ExampleEn ?? string.Empty),
                EscapeCsvField(item.ExampleVi ?? string.Empty)
            ));
        }

        // Thêm UTF-8 BOM (0xEF, 0xBB, 0xBF) để Excel nhận diện chuẩn tiếng Việt
        var preamble = Encoding.UTF8.GetPreamble();
        var bytes = Encoding.UTF8.GetBytes(sb.ToString());
        var resultBytes = new byte[preamble.Length + bytes.Length];
        Buffer.BlockCopy(preamble, 0, resultBytes, 0, preamble.Length);
        Buffer.BlockCopy(bytes, 0, resultBytes, preamble.Length, bytes.Length);

        return resultBytes;
    }

    public async Task<byte[]> ExportToJsonAsync(string? languageCode, int? lessonId)
    {
        var vocabs = await ExportVocabulariesAsync(languageCode, lessonId);

        // Nhóm theo chủ đề
        var grouped = vocabs
            .GroupBy(v => new { v.LessonId, v.TopicTitle, v.LanguageCode, v.LevelTag })
            .Select(g => new
            {
                LessonId = g.Key.LessonId,
                Topic = g.Key.TopicTitle,
                Language = g.Key.LanguageCode,
                Level = g.Key.LevelTag,
                Count = g.Count(),
                Vocabularies = g.Select(x => new
                {
                    x.VocabularyId,
                    x.Word,
                    x.Phonetic,
                    x.WordType,
                    x.MeaningVi,
                    x.ExampleEn,
                    x.ExampleVi
                }).ToList()
            });

        var options = new JsonSerializerOptions
        {
            WriteIndented = true,
            Encoder = JavaScriptEncoder.Create(UnicodeRanges.All)
        };

        return JsonSerializer.SerializeToUtf8Bytes(grouped, options);
    }

    #region Helper Methods

    private ImportStructuredRequestModel ParseRawToeicText(ImportToeicTextRequestModel model)
    {
        var result = new ImportStructuredRequestModel
        {
            LanguageCode = model.LanguageCode,
            AutoGenerateQuizQuestions = model.AutoGenerateQuizQuestions
        };

        var sections = Regex.Split(model.RawText, @"Từ vựng TOEIC theo chủ đề:\s*");
        var topicsMap = new Dictionary<string, ImportTopicItemModel>(StringComparer.OrdinalIgnoreCase);

        foreach (var section in sections)
        {
            var lines = section.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.RemoveEmptyEntries)
                               .Select(l => l.Trim())
                               .Where(l => !string.IsNullOrWhiteSpace(l))
                               .ToList();

            if (lines.Count == 0) continue;

            string topicTitle = lines[0];
            if (topicTitle.StartsWith("[") || topicTitle.StartsWith("http") || topicTitle.Length > 80)
            {
                continue;
            }

            if (!topicsMap.TryGetValue(topicTitle, out var topicItem))
            {
                topicItem = new ImportTopicItemModel
                {
                    Title = topicTitle,
                    LevelTag = model.DefaultLevelTag
                };
                topicsMap[topicTitle] = topicItem;
            }

            var contentLines = lines.Skip(1)
                .Where(l => l != "Từ vựng TOEIC" && l != "Phiên âm" && l != "Dịch nghĩa" && l != "Ví dụ")
                .Where(l => !l.StartsWith("Từ vựng TOEIC theo chủ đề:") && !l.StartsWith("[") && !l.StartsWith("http"))
                .ToList();

            int i = 0;
            while (i < contentLines.Count - 3)
            {
                string w = contentLines[i];
                string p = contentLines[i + 1];
                string m = contentLines[i + 2];
                string e = contentLines[i + 3];

                bool isValidWord =
                    w.Length <= 35 &&
                    !w.Any(c => "àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ[]()".Contains(c)) &&
                    (p.StartsWith('/') || p.EndsWith('/') || p.Contains('ˈ') || p.Contains('ˌ')) &&
                    e.Length >= 5 && e.Contains(' ');

                if (isValidWord)
                {
                    if (!topicItem.Vocabularies.Any(x => x.Word.Equals(w, StringComparison.OrdinalIgnoreCase)))
                    {
                        topicItem.Vocabularies.Add(new ImportVocabularyItemModel
                        {
                            Word = w,
                            Phonetic = p,
                            MeaningVi = m,
                            ExampleEn = e,
                            WordType = DetectWordType(w)
                        });
                    }
                    i += 4;
                }
                else
                {
                    i++;
                }
            }
        }

        result.Topics = topicsMap.Values.Where(t => t.Vocabularies.Count > 0).ToList();
        return result;
    }

    private static string DetectWordType(string word)
    {
        string w = word.ToLowerInvariant().Trim();
        if (w.EndsWith("ment") || w.EndsWith("tion") || w.EndsWith("sion") || w.EndsWith("ence") ||
            w.EndsWith("ance") || w.EndsWith("er") || w.EndsWith("or") || w.EndsWith("ist") ||
            w.EndsWith("ity") || w.EndsWith("ness") || w.EndsWith("ship"))
        {
            return "noun";
        }
        if (w.EndsWith("able") || w.EndsWith("ible") || w.EndsWith("ive") || w.EndsWith("al") ||
            w.EndsWith("ful") || w.EndsWith("ous") || w.EndsWith("ic") || w.EndsWith("ish"))
        {
            return "adjective";
        }
        if (w.EndsWith("ly"))
        {
            return "adverb";
        }
        if (w.EndsWith("ize") || w.EndsWith("ise") || w.EndsWith("ate") || w.EndsWith("fy"))
        {
            return "verb";
        }
        return "noun";
    }

    private static string EscapeCsvField(string field)
    {
        if (string.IsNullOrEmpty(field)) return "\"\"";
        if (field.Contains(",") || field.Contains("\"") || field.Contains("\n") || field.Contains("\r"))
        {
            return $"\"{field.Replace("\"", "\"\"")}\"";
        }
        return $"\"{field}\"";
    }

    #endregion
}
