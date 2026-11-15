using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.Farm;

namespace EnglishFarm.Entities.Learning;

public class LessonEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string LanguageCode { get; set; } = "en"; // en | ja | ko | zh | fr | de...
    public string LevelTag { get; set; } = "Pre-A1";
    public int OrderIndex { get; set; }

    // Điều kiện mở khóa từ nông sản
    public int? RequiredCropId { get; set; }
    public int RequiredCropQty { get; set; } = 0;
    public virtual CropCatalogEntity? RequiredCrop { get; set; }

    public virtual ICollection<VocabularyEntity> Vocabularies { get; set; } = new List<VocabularyEntity>();
    public virtual ICollection<QuizQuestionEntity> QuizQuestions { get; set; } = new List<QuizQuestionEntity>();
}
