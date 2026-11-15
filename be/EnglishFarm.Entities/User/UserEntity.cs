using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.Farm;
using EnglishFarm.Entities.Grammar;
using EnglishFarm.Entities.Learning;

namespace EnglishFarm.Entities.User;

public class UserEntity : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public int Xp { get; set; } = 0;
    public int Coins { get; set; } = 100;
    public int Level { get; set; } = 1;

    // Chống race-condition khi trừ Xu đồng thời
    public byte[] RowVersion { get; set; } = Array.Empty<byte>();

    // Navigations
    public virtual ICollection<UserPlannerBookEntity> PlannerBooks { get; set; } = new List<UserPlannerBookEntity>();
    public virtual ICollection<FarmPlotEntity> FarmPlots { get; set; } = new List<FarmPlotEntity>();
    public virtual ICollection<UserInventoryEntity> Inventories { get; set; } = new List<UserInventoryEntity>();
    public virtual ICollection<UserLessonProgressEntity> LessonProgresses { get; set; } = new List<UserLessonProgressEntity>();
    public virtual ICollection<UserGrammarProgressEntity> GrammarProgresses { get; set; } = new List<UserGrammarProgressEntity>();
}
