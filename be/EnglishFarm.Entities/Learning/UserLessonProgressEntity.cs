using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.User;

namespace EnglishFarm.Entities.Learning;

public class UserLessonProgressEntity : BaseEntity
{
    public int UserId { get; set; }
    public int LessonId { get; set; }
    public bool IsUnlocked { get; set; }
    public int BestScorePercent { get; set; }
    public int BestStarsClaimed { get; set; } = 0; // 0, 1, 2, 3 sao đã nhận thưởng
    public bool IsRewardClaimed { get; set; } // Cờ chống nhận thưởng trùng lặp khi làm lại Quiz
    public DateTime? FirstPassedAt { get; set; }

    public virtual UserEntity? User { get; set; }
    public virtual LessonEntity? Lesson { get; set; }
}
