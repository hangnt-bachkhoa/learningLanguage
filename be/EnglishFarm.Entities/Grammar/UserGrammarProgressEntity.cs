using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.User;

namespace EnglishFarm.Entities.Grammar;

public class UserGrammarProgressEntity : BaseEntity
{
    public int UserId { get; set; }
    public int GrammarTopicId { get; set; }
    public bool IsStudied { get; set; } = false;
    public int BestStarsClaimed { get; set; } = 0; // 0..3
    public DateTime? LastPracticedAt { get; set; }

    public virtual UserEntity User { get; set; } = null!;
    public virtual GrammarTopicEntity GrammarTopic { get; set; } = null!;
}
