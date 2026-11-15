using EnglishFarm.Entities.Common;

namespace EnglishFarm.Entities.Learning;

public class QuizQuestionEntity : BaseEntity
{
    public int LessonId { get; set; }
    public string Prompt { get; set; } = string.Empty;
    public string? SpriteKey { get; set; }
    public string OptionsJson { get; set; } = "[]"; // Mảng JSON 4 lựa chọn
    public int CorrectOptionIndex { get; set; }

    public virtual LessonEntity? Lesson { get; set; }
}
