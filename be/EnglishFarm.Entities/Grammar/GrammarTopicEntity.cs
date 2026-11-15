using EnglishFarm.Entities.Common;

namespace EnglishFarm.Entities.Grammar;

public class GrammarTopicEntity : BaseEntity
{
    public string Code { get; set; } = string.Empty; // unique, e.g. "gr_01_pos"
    public string Level { get; set; } = "Pre-A1";    // "Pre-A1", "A2", "B1-B2", "B2-C1"
    public string ToeicTarget { get; set; } = string.Empty; // e.g. "0-350"
    public int OrderIndex { get; set; }
    public string TitleEn { get; set; } = string.Empty;
    public string TitleVi { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string RulesJson { get; set; } = "[]";
    public string TrapsJson { get; set; } = "[]";
    public string ExamplesJson { get; set; } = "[]";

    public virtual ICollection<GrammarQuestionEntity> Questions { get; set; } = new List<GrammarQuestionEntity>();
    public virtual ICollection<UserGrammarProgressEntity> UserProgresses { get; set; } = new List<UserGrammarProgressEntity>();
}
