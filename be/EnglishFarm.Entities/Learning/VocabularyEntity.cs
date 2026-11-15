using EnglishFarm.Entities.Common;

namespace EnglishFarm.Entities.Learning;

public class VocabularyEntity : BaseEntity
{
    public int LessonId { get; set; }
    public string Word { get; set; } = string.Empty;
    public string? Phonetic { get; set; } // Romaji (ja), Pinyin (zh), IPA (en), Hangul pronunciation (ko)
    public string? IpaUs { get; set; }
    public string? IpaUk { get; set; }
    public string? WordType { get; set; }
    public string MeaningVi { get; set; } = string.Empty;
    public string? ExampleEn { get; set; }
    public string? ExampleVi { get; set; }
    public string? SpriteKey { get; set; }

    public virtual LessonEntity? Lesson { get; set; }
}
