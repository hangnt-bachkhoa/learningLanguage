using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.User;

namespace EnglishFarm.Entities.Learning;

public class ReviewScheduleEntity : BaseEntity
{
    public int UserId { get; set; }
    public int LessonId { get; set; }
    public string ModuleType { get; set; } = "Vocabulary";
    public DateOnly ScheduledDate { get; set; }
    public bool FirstDone { get; set; }
    public bool Day1Done { get; set; }
    public bool Day3Done { get; set; }
    public bool Day7Done { get; set; }
    public bool Day14Done { get; set; }

    public virtual UserEntity? User { get; set; }
    public virtual LessonEntity? Lesson { get; set; }
}
