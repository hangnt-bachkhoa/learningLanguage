using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.User;

namespace EnglishFarm.Entities.Learning;

public class UserWordStatEntity : BaseEntity
{
    public int UserId { get; set; }
    public int VocabularyId { get; set; }
    public int Attempts { get; set; } = 0;
    public int WrongCount { get; set; } = 0;
    public DateTime? LastSeenAt { get; set; }

    public virtual UserEntity? User { get; set; }
    public virtual VocabularyEntity? Vocabulary { get; set; }
}
