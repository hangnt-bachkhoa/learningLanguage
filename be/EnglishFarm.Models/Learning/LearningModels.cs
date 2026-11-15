using System.ComponentModel.DataAnnotations;

namespace EnglishFarm.Models.Learning;

public class SubmitQuizRequestModel
{
    [Required]
    public int LessonId { get; set; }

    public Guid? SessionId { get; set; }

    // Map: QuestionId -> isCorrectOnFirstTry (chỉ tính lần gặp đầu tiên)
    public Dictionary<int, bool> FirstTryResults { get; set; } = new();

    // Map cũ để backward compatible nếu còn dùng
    public Dictionary<int, int> Answers { get; set; } = new();

    public int TotalTries { get; set; } = 10;
}

public class QuizResultResponseModel
{
    public int LessonId { get; set; }
    public int Stars { get; set; } // 1, 2, 3 sao
    public int BestStarsClaimed { get; set; }
    public bool IsNewRecord { get; set; }
    public int TotalQuestions { get; set; } = 10;
    public int FirstTryCorrectCount { get; set; }
    public int CorrectAnswers { get; set; }
    public int ScorePercent { get; set; }
    public bool IsPassed { get; set; }

    // Phần thưởng Delta
    public bool RewardGranted { get; set; }
    public int RewardSeeds { get; set; }
    public int RewardWater { get; set; }
    public int RewardFertilizer { get; set; }
    public int RewardCoins { get; set; }
    public int RewardXp { get; set; }
    public string? CropName { get; set; }
    public string Message { get; set; } = string.Empty;
}

public class QuizQuestionResponseModel
{
    public int Id { get; set; }
    public int LessonId { get; set; }
    public string Prompt { get; set; } = string.Empty;
    public string? Word { get; set; }
    public string? Phonetic { get; set; }
    public string? SpriteKey { get; set; }
    public string QuestionType { get; set; } = "meaning"; // "meaning" | "context" | "listening"
    public string? ExampleEn { get; set; }
    public string? ExampleVi { get; set; }
    public List<string> Options { get; set; } = new();
    public int CorrectOptionIndex { get; set; }
}

public class QuizSessionResponseModel
{
    public Guid SessionId { get; set; }
    public int LessonId { get; set; }
    public string LessonTitle { get; set; } = string.Empty;
    public string? RequiredCropName { get; set; }
    public int BestStarsClaimed { get; set; }
    public int TotalQuestions { get; set; } = 10;
    public List<QuizQuestionResponseModel> Questions { get; set; } = new();
}

public class LessonResponseModel
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string LanguageCode { get; set; } = "en";
    public string LevelTag { get; set; } = string.Empty;
    public int OrderIndex { get; set; }
    public bool IsUnlocked { get; set; }
    public int? RequiredCropId { get; set; }
    public int RequiredCropQty { get; set; }
    public string? RequiredCropName { get; set; }
    public int BestStarsClaimed { get; set; } = 0;
}

public class VocabularyResponseModel
{
    public int Id { get; set; }
    public string Word { get; set; } = string.Empty;
    public string? Phonetic { get; set; }
    public string? IpaUs { get; set; }
    public string? IpaUk { get; set; }
    public string? WordType { get; set; }
    public string MeaningVi { get; set; } = string.Empty;
    public string? ExampleEn { get; set; }
    public string? ExampleVi { get; set; }
    public string? SpriteKey { get; set; }
}

public class ReviewScheduleResponseModel
{
    public int LessonId { get; set; }
    public string LessonTitle { get; set; } = string.Empty;
    public DateOnly ScheduledDate { get; set; }
    public bool FirstDone { get; set; }
    public bool Day1Done { get; set; }
    public bool Day3Done { get; set; }
    public bool Day7Done { get; set; }
    public bool Day14Done { get; set; }
}

public class CompleteReviewRequestModel
{
    public int LessonId { get; set; }
    public int HardCount { get; set; }
    public int GoodCount { get; set; }
    public int EasyCount { get; set; }
}

public class CompleteReviewResponseModel
{
    public bool Success { get; set; } = true;
    public int RewardXp { get; set; } = 30;
    public int RewardCoins { get; set; } = 20;
    public int RewardWater { get; set; } = 2;
    public int RewardFertilizer { get; set; } = 1;
    public string Message { get; set; } = "Hoàn thành phiên ôn tập thành công!";
}
