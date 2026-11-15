using System.Text.Json;
using EnglishFarm.Business.Common;
using EnglishFarm.Entities.Grammar;
using EnglishFarm.Entities.User;
using EnglishFarm.Models.Grammar;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.Business.Grammar;

public class GrammarService : IGrammarService
{
    private readonly IRepository<GrammarTopicEntity> _topicRepo;
    private readonly IRepository<UserGrammarProgressEntity> _progressRepo;
    private readonly IRepository<UserEntity> _userRepo;
    private readonly IUnitOfWork _uow;

    public GrammarService(
        IRepository<GrammarTopicEntity> topicRepo,
        IRepository<UserGrammarProgressEntity> progressRepo,
        IRepository<UserEntity> userRepo,
        IUnitOfWork uow)
    {
        _topicRepo = topicRepo;
        _progressRepo = progressRepo;
        _userRepo = userRepo;
        _uow = uow;
    }

    public async Task<List<GrammarTopicResponseModel>> GetTopicsAsync(int userId, CancellationToken ct = default)
    {
        var topics = await _topicRepo.Query()
            .Include(t => t.Questions)
            .OrderBy(t => t.OrderIndex)
            .ToListAsync(ct);

        var progresses = await _progressRepo.Query()
            .Where(p => p.UserId == userId)
            .ToDictionaryAsync(p => p.GrammarTopicId, ct);

        var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var result = new List<GrammarTopicResponseModel>();

        foreach (var t in topics)
        {
            var p = progresses.GetValueOrDefault(t.Id);
            var rules = JsonSerializer.Deserialize<List<string>>(t.RulesJson, jsonOptions) ?? new();
            var traps = JsonSerializer.Deserialize<List<string>>(t.TrapsJson, jsonOptions) ?? new();
            var examples = JsonSerializer.Deserialize<List<GrammarExampleModel>>(t.ExamplesJson, jsonOptions) ?? new();

            var questions = t.Questions.Select(q => new GrammarQuestionResponseModel
            {
                Id = q.Id,
                Prompt = q.Prompt,
                Options = JsonSerializer.Deserialize<List<string>>(q.OptionsJson, jsonOptions) ?? new(),
                CorrectIndex = q.CorrectIndex,
                ExplanationVi = q.ExplanationVi
            }).ToList();

            result.Add(new GrammarTopicResponseModel
            {
                Id = t.Id,
                Code = t.Code,
                Level = t.Level,
                ToeicTarget = t.ToeicTarget,
                OrderIndex = t.OrderIndex,
                TitleEn = t.TitleEn,
                TitleVi = t.TitleVi,
                Summary = t.Summary,
                Rules = rules,
                Traps = traps,
                Examples = examples,
                Questions = questions,
                IsStudied = p?.IsStudied ?? false,
                BestStarsClaimed = p?.BestStarsClaimed ?? 0,
                LastPracticedAt = p?.LastPracticedAt
            });
        }

        return result;
    }

    public async Task MarkAsStudiedAsync(int userId, string topicCode, CancellationToken ct = default)
    {
        var topic = await _topicRepo.Query()
            .FirstOrDefaultAsync(t => t.Code == topicCode, ct);

        if (topic == null)
        {
            throw new KeyNotFoundException($"Không tìm thấy chuyên đề ngữ pháp với mã: {topicCode}");
        }

        var progress = await _progressRepo.Query(tracking: true)
            .FirstOrDefaultAsync(p => p.UserId == userId && p.GrammarTopicId == topic.Id, ct);

        if (progress != null)
        {
            progress.IsStudied = true;
            _progressRepo.Update(progress);
        }
        else
        {
            await _progressRepo.AddAsync(new UserGrammarProgressEntity
            {
                UserId = userId,
                GrammarTopicId = topic.Id,
                IsStudied = true,
                BestStarsClaimed = 0
            }, ct);
        }

        // Quy tắc: Đánh dấu đã học tuyệt đối KHÔNG cộng XP và KHÔNG cộng Xu
        await _uow.SaveChangesAsync(ct);
    }

    public async Task<GrammarQuizResultResponseModel> CompleteQuizAsync(
        int userId, string topicCode, CompleteGrammarQuizRequestModel model, CancellationToken ct = default)
    {
        var topic = await _topicRepo.Query()
            .FirstOrDefaultAsync(t => t.Code == topicCode, ct);

        if (topic == null)
        {
            throw new KeyNotFoundException($"Không tìm thấy chuyên đề ngữ pháp với mã: {topicCode}");
        }

        int totalQuestions = model.TotalQuestions > 0 ? model.TotalQuestions : 1;
        int firstTryCorrect = Math.Max(0, Math.Min(totalQuestions, model.FirstTryCorrect));
        double accuracy = firstTryCorrect / (double)totalQuestions;
        int scorePercent = (int)Math.Round(accuracy * 100);

        // Quy tắc 3-Star Delta Rewards (10 - 20 - 30 XP)
        int newStars;
        if (accuracy >= 1.0)
        {
            newStars = 3;
        }
        else if (accuracy >= 0.8)
        {
            newStars = 2;
        }
        else
        {
            newStars = 1;
        }

        using var tx = await _uow.BeginTransactionAsync(ct);

        var progress = await _progressRepo.Query(tracking: true)
            .FirstOrDefaultAsync(p => p.UserId == userId && p.GrammarTopicId == topic.Id, ct);

        int oldStars = progress?.BestStarsClaimed ?? 0;
        bool isNewRecord = newStars > oldStars;
        int deltaXp = 0;
        int deltaCoins = 0;

        if (isNewRecord)
        {
            deltaXp = GetTierXp(newStars) - GetTierXp(oldStars);
            deltaCoins = GetTierCoins(newStars) - GetTierCoins(oldStars);
        }

        if (progress != null)
        {
            if (isNewRecord)
            {
                progress.BestStarsClaimed = newStars;
            }
            progress.IsStudied = true;
            progress.LastPracticedAt = DateTime.UtcNow;
            _progressRepo.Update(progress);
        }
        else
        {
            progress = new UserGrammarProgressEntity
            {
                UserId = userId,
                GrammarTopicId = topic.Id,
                IsStudied = true,
                BestStarsClaimed = newStars,
                LastPracticedAt = DateTime.UtcNow
            };
            await _progressRepo.AddAsync(progress, ct);
        }

        // Cập nhật User XP, Coins và Leveling System (Reset XP khi lên cấp, trần 1000 XP)
        var user = await _userRepo.Query(tracking: true).FirstOrDefaultAsync(u => u.Id == userId, ct);
        if (user == null)
        {
            user = new UserEntity
            {
                Id = userId,
                FullName = "Học viên English Farm",
                Email = "student@englishfarm.local",
                Coins = 100,
                Xp = 0,
                Level = 1
            };
            await _userRepo.AddAsync(user, ct);
        }

        if (deltaCoins > 0)
        {
            user.Coins += deltaCoins;
        }

        if (deltaXp > 0)
        {
            int currentXp = user.Xp + deltaXp;
            while (currentXp >= GetXpRequired(user.Level))
            {
                currentXp -= GetXpRequired(user.Level);
                user.Level += 1;
            }
            user.Xp = Math.Min(1000, currentXp);
        }
        _userRepo.Update(user);

        await _uow.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);

        int nextLevelXp = GetXpRequired(user.Level);

        return new GrammarQuizResultResponseModel
        {
            Stars = newStars,
            BestStarsClaimed = progress.BestStarsClaimed,
            IsNewRecord = isNewRecord,
            RewardXp = deltaXp,
            RewardCoins = deltaCoins,
            FirstTryCorrect = firstTryCorrect,
            TotalQuestions = totalQuestions,
            ScorePercent = scorePercent,
            Level = user.Level,
            CurrentXp = user.Xp,
            NextLevelXpRequired = nextLevelXp,
            Message = isNewRecord
                ? $"Xuất sắc! Bạn đạt kỷ lục mới {newStars} sao và nhận +{deltaXp} XP, +{deltaCoins} Xu!"
                : $"Bạn đạt {newStars} sao ({scorePercent}%). Giữ vững phong độ để ôn luyện kiến thức!"
        };
    }

    private static int GetTierXp(int stars) => stars switch
    {
        3 => 30,
        2 => 20,
        1 => 10,
        _ => 0
    };

    private static int GetTierCoins(int stars) => stars switch
    {
        3 => 50,
        2 => 35,
        1 => 20,
        _ => 0
    };

    private static int GetXpRequired(int level)
    {
        return Math.Min(1000, 50 + (level - 1) * 50);
    }
}
