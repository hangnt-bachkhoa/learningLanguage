using EnglishFarm.Entities.Common;

namespace EnglishFarm.Entities.Grammar;

public class GrammarQuestionEntity : BaseEntity
{
    public int GrammarTopicId { get; set; }
    public string Prompt { get; set; } = string.Empty;
    public string OptionsJson { get; set; } = "[]";
    public int CorrectIndex { get; set; }
    public string ExplanationVi { get; set; } = string.Empty;

    public virtual GrammarTopicEntity GrammarTopic { get; set; } = null!;
}
