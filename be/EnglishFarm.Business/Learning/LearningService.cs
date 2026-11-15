using EnglishFarm.Business.Common;
using EnglishFarm.Entities.Farm;
using EnglishFarm.Entities.Learning;
using EnglishFarm.Entities.User;
using EnglishFarm.Models.Learning;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace EnglishFarm.Business.Learning;

public class LearningService : ILearningService
{
    private readonly IRepository<LessonEntity> _lessonRepo;
    private readonly IRepository<VocabularyEntity> _vocabRepo;
    private readonly IRepository<QuizQuestionEntity> _quizRepo;
    private readonly IRepository<UserLessonProgressEntity> _progressRepo;
    private readonly IRepository<ReviewScheduleEntity> _reviewRepo;
    private readonly IRepository<UserEntity> _userRepo;
    private readonly IRepository<UserInventoryEntity> _invRepo;
    private readonly IRepository<UserWordStatEntity> _wordStatRepo;
    private readonly IRepository<QuizSessionEntity> _sessionRepo;
    private readonly IUnitOfWork _uow;

    public LearningService(
        IRepository<LessonEntity> lessonRepo,
        IRepository<VocabularyEntity> vocabRepo,
        IRepository<QuizQuestionEntity> quizRepo,
        IRepository<UserLessonProgressEntity> progressRepo,
        IRepository<ReviewScheduleEntity> reviewRepo,
        IRepository<UserEntity> userRepo,
        IRepository<UserInventoryEntity> invRepo,
        IRepository<UserWordStatEntity> wordStatRepo,
        IRepository<QuizSessionEntity> sessionRepo,
        IUnitOfWork uow)
    {
        _lessonRepo = lessonRepo;
        _vocabRepo = vocabRepo;
        _quizRepo = quizRepo;
        _progressRepo = progressRepo;
        _reviewRepo = reviewRepo;
        _userRepo = userRepo;
        _invRepo = invRepo;
        _wordStatRepo = wordStatRepo;
        _sessionRepo = sessionRepo;
        _uow = uow;
    }

    public async Task<List<LessonResponseModel>> GetLessonsAsync(int userId, string? languageCode = null, CancellationToken ct = default)
    {
        var query = await _lessonRepo.Query().Include(x => x.RequiredCrop).ToListAsync(ct);
        if (!string.IsNullOrWhiteSpace(languageCode))
        {
            query = query.Where(x => x.LanguageCode == languageCode).ToList();
        }

        var lessons = query.OrderBy(x => x.OrderIndex).ToList();

        var progresses = await _progressRepo.Query()
            .Where(x => x.UserId == userId)
            .ToDictionaryAsync(x => x.LessonId, ct);

        return lessons.Select(l =>
        {
            progresses.TryGetValue(l.Id, out var p);
            bool isUnlocked = l.OrderIndex == 1 || l.RequiredCropQty == 0 || (p != null && p.IsUnlocked);
            int bestStars = p?.BestStarsClaimed ?? 0;
            return LearningMapper.ToResponse(l, isUnlocked, bestStars);
        }).ToList();
    }

    public async Task<List<VocabularyResponseModel>> GetVocabulariesAsync(int lessonId, CancellationToken ct = default)
    {
        var vocabs = await _vocabRepo.Query()
            .Where(x => x.LessonId == lessonId)
            .OrderBy(x => x.Id)
            .ToListAsync(ct);

        return vocabs.Select(LearningMapper.ToResponse).ToList();
    }

    /// <summary>
    /// Thuật toán 1: Smart Pool Sampling bốc 10 câu có trọng số & sinh 3 dạng câu hỏi phong phú
    /// </summary>
    public async Task<QuizSessionResponseModel> GetQuizSessionAsync(int userId, int lessonId, CancellationToken ct = default)
    {
        var lesson = await _lessonRepo.Query()
            .Include(x => x.RequiredCrop)
            .FirstOrDefaultAsync(x => x.Id == lessonId, ct);

        if (lesson == null)
            throw new KeyNotFoundException($"Không tìm thấy bài học với ID = {lessonId}");

        var vocabs = await _vocabRepo.Query()
            .Where(x => x.LessonId == lessonId)
            .ToListAsync(ct);

        if (vocabs.Count == 0)
            throw new InvalidOperationException("Bài học này chưa có từ vựng để tạo đề kiểm tra");

        // Lấy thống kê độ khó của từng từ từ UserWordStats
        var userStats = await _wordStatRepo.Query()
            .Where(x => x.UserId == userId && vocabs.Select(v => v.Id).Contains(x.VocabularyId))
            .ToDictionaryAsync(x => x.VocabularyId, ct);

        var random = Random.Shared;

        // Tính trọng số ưu tiên: từ hay sai (+50), từ chưa học (+30), từ lâu chưa ôn (+20), cộng nhiễu random (0-15)
        var weightedList = vocabs.Select(w =>
        {
            userStats.TryGetValue(w.Id, out var stat);
            int wrongScore = (stat?.WrongCount ?? 0) * 50;
            int coldScore = (stat == null || stat.Attempts == 0) ? 30 : 0;
            int daysSince = stat?.LastSeenAt != null ? (int)(DateTime.UtcNow - stat.LastSeenAt.Value).TotalDays : 99;
            int spacedScore = daysSince >= 3 ? 20 : 0;
            int noise = random.Next(0, 15);

            return new
            {
                Vocab = w,
                Weight = wrongScore + coldScore + spacedScore + noise
            };
        })
        .OrderByDescending(x => x.Weight)
        .Take(Math.Min(10, vocabs.Count))
        .Select(x => x.Vocab)
        .ToList();

        // Nếu bài có ít hơn 10 từ thì bù thêm cho đủ 10 bằng cách bốc lại ngẫu nhiên
        while (weightedList.Count < 10)
        {
            var extra = vocabs.OrderBy(_ => random.Next()).First();
            weightedList.Add(extra);
        }

        // Thuật toán 2: Sinh 4 dạng câu hỏi (typeCycle: EN_TO_VI, CONTEXT_CLOZE, LISTENING, VI_TO_EN)
        // và bốc Distractor 3 tầng (Tier 1: cùng bài & cùng từ loại -> Tier 2: cùng bài & khác từ loại -> Tier 3: khác bài & cùng từ loại)
        var otherVocabs = await _vocabRepo.Query().Where(x => x.LessonId != lessonId).Take(100).ToListAsync(ct);

        List<string> Select3TierDistractors(VocabularyEntity target, bool isWordField, string correctVal)
        {
            var targetType = (target.WordType ?? "noun").Trim().ToLowerInvariant();
            var chosen = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { correctVal.Trim() };
            var result = new List<string>();

            string GetVal(VocabularyEntity item) => (isWordField ? item.Word : item.MeaningVi).Trim();

            // Tier 1: Cùng bài học VÀ cùng từ loại (wordType)
            foreach (var item in vocabs.OrderBy(_ => random.Next()))
            {
                if (item.Id == target.Id) continue;
                var vType = (item.WordType ?? "noun").Trim().ToLowerInvariant();
                var val = GetVal(item);
                if (vType == targetType && !string.IsNullOrWhiteSpace(val) && chosen.Add(val))
                {
                    result.Add(val);
                    if (result.Count == 3) return result;
                }
            }

            // Tier 2: Cùng bài học VÀ khác từ loại
            foreach (var item in vocabs.OrderBy(_ => random.Next()))
            {
                if (item.Id == target.Id) continue;
                var val = GetVal(item);
                if (!string.IsNullOrWhiteSpace(val) && chosen.Add(val))
                {
                    result.Add(val);
                    if (result.Count == 3) return result;
                }
            }

            // Tier 3: Khác bài học VÀ cùng từ loại (safety net)
            foreach (var item in otherVocabs.OrderBy(_ => random.Next()))
            {
                if (item.Id == target.Id) continue;
                var vType = (item.WordType ?? "noun").Trim().ToLowerInvariant();
                var val = GetVal(item);
                if (vType == targetType && !string.IsNullOrWhiteSpace(val) && chosen.Add(val))
                {
                    result.Add(val);
                    if (result.Count == 3) return result;
                }
            }

            // Dự phòng cuối cùng
            foreach (var item in otherVocabs.OrderBy(_ => random.Next()))
            {
                var val = GetVal(item);
                if (!string.IsNullOrWhiteSpace(val) && chosen.Add(val))
                {
                    result.Add(val);
                    if (result.Count == 3) return result;
                }
            }

            return result;
        }

        var typeCycle = new[] { "EN_TO_VI", "CONTEXT_CLOZE", "LISTENING", "VI_TO_EN" };
        var questions = new List<QuizQuestionResponseModel>();

        for (int i = 0; i < weightedList.Count; i++)
        {
            var v = weightedList[i];
            string desiredFormat = typeCycle[i % typeCycle.Length];
            string qType = "meaning";
            string prompt = string.Empty;
            string correctOption = string.Empty;
            List<string> distractors = new();

            if (desiredFormat == "CONTEXT_CLOZE" && !string.IsNullOrWhiteSpace(v.ExampleEn))
            {
                var clozeRegex = new Regex($@"\b{Regex.Escape(v.Word.Trim())}(s|es|ed|ing)?\b", RegexOptions.IgnoreCase);
                var match = clozeRegex.Match(v.ExampleEn);
                if (match.Success)
                {
                    qType = "context";
                    string blankExample = clozeRegex.Replace(v.ExampleEn, "_______");
                    prompt = $"Điền từ thích hợp vào chỗ trống:\n\"{blankExample}\"";
                    correctOption = match.Value;
                    distractors = Select3TierDistractors(v, isWordField: true, correctOption);
                }
                else
                {
                    desiredFormat = "EN_TO_VI";
                }
            }

            if (desiredFormat == "VI_TO_EN")
            {
                qType = "meaning";
                prompt = $"Chọn từ tiếng Anh có nghĩa là: \"{v.MeaningVi.Trim()}\"";
                correctOption = v.Word.Trim();
                distractors = Select3TierDistractors(v, isWordField: true, correctOption);
            }
            else if (desiredFormat == "LISTENING")
            {
                qType = "listening";
                prompt = !string.IsNullOrWhiteSpace(v.Phonetic)
                    ? $"Nghe phát âm hoặc nhìn phiên âm /{v.Phonetic}/ để chọn từ đúng:"
                    : "Nghe phát âm của từ và chọn từ tiếng Anh tương ứng:";
                correctOption = v.Word.Trim();
                distractors = Select3TierDistractors(v, isWordField: true, correctOption);
            }
            else if (desiredFormat == "EN_TO_VI" || string.IsNullOrEmpty(prompt))
            {
                qType = "meaning";
                prompt = $"Từ \"{v.Word}\" có nghĩa là gì?";
                correctOption = v.MeaningVi.Trim();
                distractors = Select3TierDistractors(v, isWordField: false, correctOption);
            }

            var options = new List<string> { correctOption };
            options.AddRange(distractors);
            options = options.OrderBy(_ => random.Next()).ToList();
            int correctIdx = options.IndexOf(correctOption);

            questions.Add(new QuizQuestionResponseModel
            {
                Id = v.Id,
                LessonId = lessonId,
                Prompt = prompt,
                Word = v.Word,
                Phonetic = v.Phonetic ?? v.IpaUs ?? string.Empty,
                SpriteKey = v.SpriteKey,
                QuestionType = qType,
                ExampleEn = v.ExampleEn,
                ExampleVi = v.ExampleVi,
                Options = options,
                CorrectOptionIndex = correctIdx
            });
        }

        // Lấy tiến độ hiện tại của User với bài học
        var progress = await _progressRepo.Query()
            .FirstOrDefaultAsync(x => x.UserId == userId && x.LessonId == lessonId, ct);

        // Lưu phiên Quiz vào bảng QuizSessions
        var session = new QuizSessionEntity
        {
            SessionId = Guid.NewGuid(),
            UserId = userId,
            LessonId = lessonId,
            TotalQuestions = questions.Count,
            QuestionIdsJson = JsonSerializer.Serialize(questions.Select(q => q.Id).ToList())
        };
        await _sessionRepo.AddAsync(session, ct);
        await _uow.SaveChangesAsync(ct);

        return new QuizSessionResponseModel
        {
            SessionId = session.SessionId,
            LessonId = lessonId,
            LessonTitle = lesson.Title,
            RequiredCropName = lesson.RequiredCrop?.NameVi ?? "Cây trồng",
            BestStarsClaimed = progress?.BestStarsClaimed ?? 0,
            TotalQuestions = questions.Count,
            Questions = questions
        };
    }

    public async Task<List<QuizQuestionResponseModel>> GetQuizQuestionsAsync(int lessonId, CancellationToken ct = default)
    {
        // Wrapper duy trì tương thích cũ: tự động bốc phiên 10 câu
        var session = await GetQuizSessionAsync(userId: 1, lessonId, ct);
        return session.Questions;
    }

    /// <summary>
    /// Thuật toán 3: Chấm điểm an toàn & Tính thưởng chênh lệch Delta Reward
    /// </summary>
    public async Task<QuizResultResponseModel> SubmitQuizAsync(int userId, SubmitQuizRequestModel model, CancellationToken ct = default)
    {
        using var tx = await _uow.BeginTransactionAsync(ct);

        var lesson = await _lessonRepo.Query()
            .Include(x => x.RequiredCrop)
            .FirstOrDefaultAsync(x => x.Id == model.LessonId, ct);

        if (lesson == null)
            throw new KeyNotFoundException($"Không tìm thấy bài học ID = {model.LessonId}");

        // 1. Tính số câu đúng ở LẦN THỬ ĐẦU TIÊN (First Try)
        int totalQuestions = 10;
        int firstTryCorrectCount = 0;

        if (model.FirstTryResults != null && model.FirstTryResults.Count > 0)
        {
            firstTryCorrectCount = model.FirstTryResults.Values.Count(isCorrect => isCorrect);
            totalQuestions = Math.Max(10, model.FirstTryResults.Count);
        }
        else if (model.Answers != null && model.Answers.Count > 0)
        {
            // Fallback nếu client cũ chỉ gửi model.Answers
            var dbQuestions = await _quizRepo.Query().Where(x => x.LessonId == model.LessonId).ToListAsync(ct);
            foreach (var q in dbQuestions)
            {
                if (model.Answers.TryGetValue(q.Id, out var selected) && selected == q.CorrectOptionIndex)
                {
                    firstTryCorrectCount++;
                }
            }
            totalQuestions = dbQuestions.Count > 0 ? dbQuestions.Count : 10;
        }

        // 2. Xác định hạng Sao theo số câu đúng lần đầu
        int newStars = 1;
        if (firstTryCorrectCount >= 10)
        {
            newStars = 3; // Hoàn hảo 10/10: 3 Sao
        }
        else if (firstTryCorrectCount >= 8)
        {
            newStars = 2; // Khá tốt 8-9/10: 2 Sao
        }
        else
        {
            newStars = 1; // Hoàn thành sửa sai: 1 Sao
        }

        int scorePercent = (int)Math.Round((double)firstTryCorrectCount / totalQuestions * 100);
        bool isPassed = true; // Người học đã kiên trì sửa hết lỗi và hoàn tất trọn vẹn 10 câu

        // 3. Truy vấn tiến độ bài học của người dùng
        var progress = await _progressRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.LessonId == model.LessonId, ct);

        if (progress == null)
        {
            progress = new UserLessonProgressEntity
            {
                UserId = userId,
                LessonId = model.LessonId,
                IsUnlocked = true,
                BestScorePercent = scorePercent,
                BestStarsClaimed = 0,
                IsRewardClaimed = false,
                FirstPassedAt = DateTime.UtcNow
            };
            await _progressRepo.AddAsync(progress, ct);
        }
        else
        {
            progress.IsUnlocked = true;
            if (scorePercent > progress.BestScorePercent)
            {
                progress.BestScorePercent = scorePercent;
            }
            if (progress.FirstPassedAt == null)
            {
                progress.FirstPassedAt = DateTime.UtcNow;
            }
        }

        // 4. Ma trận phần thưởng định mức theo hạng Sao (Rule 2: 10 - 20 - 30 XP Scale)
        // 3★: 2 Hạt, 2 Nước, 1 Phân bón, 50 Xu, 30 XP
        // 2★: 1 Hạt, 2 Nước, 0 Phân bón, 35 Xu, 20 XP
        // 1★: 1 Hạt, 1 Nước, 0 Phân bón, 20 Xu, 10 XP
        // 0★: 0
        (int Seeds, int Water, int Fert, int Coins, int Xp) GetTierReward(int star) => star switch
        {
            3 => (2, 2, 1, 50, 30),
            2 => (1, 2, 0, 35, 20),
            1 => (1, 1, 0, 20, 10),
            _ => (0, 0, 0, 0, 0)
        };

        int oldStars = progress.BestStarsClaimed;
        bool isNewRecord = newStars > oldStars;

        int deltaSeeds = 0;
        int deltaWater = 0;
        int deltaFert = 0;
        int deltaCoins = 0;
        int deltaXp = 0;
        bool rewardGranted = false;
        string message = string.Empty;

        if (isNewRecord)
        {
            var oldR = GetTierReward(oldStars);
            var newR = GetTierReward(newStars);

            deltaSeeds = newR.Seeds - oldR.Seeds;
            deltaWater = newR.Water - oldR.Water;
            deltaFert  = newR.Fert - oldR.Fert;
            deltaCoins = newR.Coins - oldR.Coins;
            deltaXp    = newR.Xp - oldR.Xp;

            progress.BestStarsClaimed = newStars;
            progress.IsRewardClaimed = true;
            rewardGranted = true;

            message = $"Xuất sắc! Bạn đạt kỷ lục mới {newStars}★ và nhận thưởng chênh lệch Nông trại!";
        }
        else
        {
            // Làm lại bài đã đạt hạng: không nhân đôi thưởng (Anti-Exploit Idempotency)
            deltaSeeds = 0;
            deltaWater = 0;
            deltaFert = 0;
            deltaCoins = 0;
            deltaXp = 0;
            rewardGranted = false;
            message = $"Bạn đã hoàn thành phiên ôn tập {newStars}★! Giữ vững thành tích cũ {oldStars}★.";
        }

        // 5. Cập nhật Coins & XP vào User
        var user = await _userRepo.Query(tracking: true).FirstOrDefaultAsync(x => x.Id == userId, ct);
        if (user != null)
        {
            user.Coins += deltaCoins;
            user.Xp += deltaXp;
            _userRepo.Update(user);
        }

        // 6. Cập nhật Vật phẩm Nông trại vào UserInventory
        string seedCode = lesson.RequiredCrop?.Code ?? "carrot";
        string cropNameVi = lesson.RequiredCrop?.NameVi ?? "Cà rốt";

        if (deltaSeeds > 0)
        {
            var seedItem = await _invRepo.Query(tracking: true)
                .FirstOrDefaultAsync(x => x.UserId == userId && x.ItemType == InventoryItemType.Seed && x.ItemCode == seedCode, ct);
            if (seedItem != null)
            {
                seedItem.Quantity += deltaSeeds;
            }
            else
            {
                await _invRepo.AddAsync(new UserInventoryEntity
                {
                    UserId = userId,
                    ItemType = InventoryItemType.Seed,
                    ItemCode = seedCode,
                    Quantity = deltaSeeds
                }, ct);
            }
        }

        if (deltaWater > 0)
        {
            var waterItem = await _invRepo.Query(tracking: true)
                .FirstOrDefaultAsync(x => x.UserId == userId && x.ItemType == InventoryItemType.Water, ct);
            if (waterItem != null)
            {
                waterItem.Quantity += deltaWater;
            }
            else
            {
                await _invRepo.AddAsync(new UserInventoryEntity
                {
                    UserId = userId,
                    ItemType = InventoryItemType.Water,
                    ItemCode = "water",
                    Quantity = deltaWater
                }, ct);
            }
        }

        if (deltaFert > 0)
        {
            var fertItem = await _invRepo.Query(tracking: true)
                .FirstOrDefaultAsync(x => x.UserId == userId && x.ItemType == InventoryItemType.Fertilizer, ct);
            if (fertItem != null)
            {
                fertItem.Quantity += deltaFert;
            }
            else
            {
                await _invRepo.AddAsync(new UserInventoryEntity
                {
                    UserId = userId,
                    ItemType = InventoryItemType.Fertilizer,
                    ItemCode = "fertilizer",
                    Quantity = deltaFert
                }, ct);
            }
        }

        // 7. Cập nhật bảng UserWordStats theo dõi lịch sử làm từ vựng của User
        if (model.FirstTryResults != null)
        {
            var vocabIds = model.FirstTryResults.Keys.ToList();
            var stats = await _wordStatRepo.Query(tracking: true)
                .Where(x => x.UserId == userId && vocabIds.Contains(x.VocabularyId))
                .ToListAsync(ct);

            var statMap = stats.ToDictionary(x => x.VocabularyId);

            foreach (var kvp in model.FirstTryResults)
            {
                int vocabId = kvp.Key;
                bool isCorrect = kvp.Value;

                if (statMap.TryGetValue(vocabId, out var stat))
                {
                    stat.Attempts += 1;
                    if (!isCorrect)
                    {
                        stat.WrongCount += 1;
                    }
                    stat.LastSeenAt = DateTime.UtcNow;
                    _wordStatRepo.Update(stat);
                }
                else
                {
                    await _wordStatRepo.AddAsync(new UserWordStatEntity
                    {
                        UserId = userId,
                        VocabularyId = vocabId,
                        Attempts = 1,
                        WrongCount = isCorrect ? 0 : 1,
                        LastSeenAt = DateTime.UtcNow
                    }, ct);
                }
            }
        }

        // 8. Đánh dấu phiên QuizSession hoàn tất
        if (model.SessionId.HasValue)
        {
            var sess = await _sessionRepo.Query(tracking: true)
                .FirstOrDefaultAsync(x => x.SessionId == model.SessionId.Value, ct);
            if (sess != null)
            {
                sess.CompletedAt = DateTime.UtcNow;
                _sessionRepo.Update(sess);
            }
        }

        // 9. Lên lịch ôn tập Ebbinghaus nếu chưa có
        var schedule = await _reviewRepo.Query()
            .FirstOrDefaultAsync(x => x.UserId == userId && x.LessonId == model.LessonId, ct);
        if (schedule == null)
        {
            await _reviewRepo.AddAsync(new ReviewScheduleEntity
            {
                UserId = userId,
                LessonId = model.LessonId,
                ScheduledDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)),
                FirstDone = true
            }, ct);
        }

        _progressRepo.Update(progress);
        await _uow.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);

        return new QuizResultResponseModel
        {
            LessonId = model.LessonId,
            Stars = newStars,
            BestStarsClaimed = progress.BestStarsClaimed,
            IsNewRecord = isNewRecord,
            TotalQuestions = totalQuestions,
            FirstTryCorrectCount = firstTryCorrectCount,
            CorrectAnswers = firstTryCorrectCount,
            ScorePercent = scorePercent,
            IsPassed = isPassed,
            RewardGranted = rewardGranted,
            RewardSeeds = deltaSeeds,
            RewardWater = deltaWater,
            RewardFertilizer = deltaFert,
            RewardCoins = deltaCoins,
            RewardXp = deltaXp,
            CropName = cropNameVi,
            Message = message
        };
    }

    public async Task<List<ReviewScheduleResponseModel>> GetReviewSchedulesAsync(int userId, CancellationToken ct = default)
    {
        var schedules = await _reviewRepo.Query()
            .Include(x => x.Lesson)
            .Where(x => x.UserId == userId)
            .OrderBy(x => x.ScheduledDate)
            .ToListAsync(ct);

        return schedules.Select(s => new ReviewScheduleResponseModel
        {
            LessonId = s.LessonId,
            LessonTitle = s.Lesson?.Title ?? string.Empty,
            ScheduledDate = s.ScheduledDate,
            FirstDone = s.FirstDone,
            Day1Done = s.Day1Done,
            Day3Done = s.Day3Done,
            Day7Done = s.Day7Done,
            Day14Done = s.Day14Done
        }).ToList();
    }

    public async Task<CompleteReviewResponseModel> CompleteReviewAsync(int userId, CompleteReviewRequestModel model, CancellationToken ct = default)
    {
        using var tx = await _uow.BeginTransactionAsync(ct);

        int rewardXp = 30 + (model.EasyCount * 5) + (model.GoodCount * 3);
        int rewardCoins = 20 + (model.EasyCount * 2);

        var user = await _userRepo.Query(tracking: true).FirstOrDefaultAsync(x => x.Id == userId, ct);
        if (user != null)
        {
            user.Xp += rewardXp;
            user.Coins += rewardCoins;
        }

        var waterItem = await _invRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ItemType == InventoryItemType.Water, ct);
        if (waterItem != null)
        {
            waterItem.Quantity += 2;
        }
        else
        {
            await _invRepo.AddAsync(new UserInventoryEntity
            {
                UserId = userId,
                ItemType = InventoryItemType.Water,
                ItemCode = "water",
                Quantity = 2
            }, ct);
        }

        await _uow.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);

        return new CompleteReviewResponseModel
        {
            Success = true,
            RewardXp = rewardXp,
            RewardCoins = rewardCoins,
            RewardWater = 2,
            RewardFertilizer = 1,
            Message = $"Tuyệt vời! Bạn đã hoàn thành phiên ôn tập Active Recall và nhận thưởng +{rewardXp} XP, +{rewardCoins} Xu, +2 Nước tưới cây!"
        };
    }
}
