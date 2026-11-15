using EnglishFarm.Entities.Common;

namespace EnglishFarm.Entities.User;

public class UserPlannerBookEntity : BaseEntity
{
    public int UserId { get; set; }
    public string ModuleType { get; set; } = "Vocabulary"; // Vocabulary | Grammar | Listening
    public string CoverColor { get; set; } = "#78815D";
    public string? Note { get; set; }

    public virtual UserEntity? User { get; set; }
}
