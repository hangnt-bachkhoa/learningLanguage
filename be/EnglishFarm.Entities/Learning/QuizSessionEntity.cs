using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.User;

namespace EnglishFarm.Entities.Learning;

public class QuizSessionEntity : BaseEntity
{
    public Guid SessionId { get; set; } = Guid.NewGuid();
    public int UserId { get; set; }
    public int LessonId { get; set; }
    public string QuestionIdsJson { get; set; } = "[]";
    public int TotalQuestions { get; set; } = 10;
    public DateTime? CompletedAt { get; set; }

    public virtual UserEntity? User { get; set; }
    public virtual LessonEntity? Lesson { get; set; }
}
