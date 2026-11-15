namespace EnglishFarm.Business.ImportExport.Models;

/// <summary>
/// Model nhận văn bản thô (như bài viết IRIS TOEIC hoặc tương tự) để parse và nạp vào DB
/// </summary>
public class ImportToeicTextRequestModel
{
    public string RawText { get; set; } = string.Empty;
    public string LanguageCode { get; set; } = "en";
    public string? DefaultLevelTag { get; set; }
    public bool AutoGenerateQuizQuestions { get; set; } = true;
}

/// <summary>
/// Model nạp từ vựng có cấu trúc sẵn (JSON)
/// </summary>
public class ImportStructuredRequestModel
{
    public string LanguageCode { get; set; } = "en";
    public bool AutoGenerateQuizQuestions { get; set; } = true;
    public List<ImportTopicItemModel> Topics { get; set; } = new();
}

public class ImportTopicItemModel
{
    public string Title { get; set; } = string.Empty;
    public string? LevelTag { get; set; }
    public int? RequiredCropId { get; set; }
    public int RequiredCropQty { get; set; } = 0;
    public List<ImportVocabularyItemModel> Vocabularies { get; set; } = new();
}

public class ImportVocabularyItemModel
{
    public string Word { get; set; } = string.Empty;
    public string? Phonetic { get; set; }
    public string? IpaUs { get; set; }
    public string? IpaUk { get; set; }
    public string? WordType { get; set; }
    public string MeaningVi { get; set; } = string.Empty;
    public string? ExampleEn { get; set; }
    public string? ExampleVi { get; set; }
}

/// <summary>
/// Kết quả sau khi nạp dữ liệu
/// </summary>
public class ImportResultModel
{
    public bool Success { get; set; } = true;
    public int TotalTopicsImported { get; set; }
    public int TotalVocabulariesImported { get; set; }
    public int TotalQuizQuestionsCreated { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<string> ImportedTopicTitles { get; set; } = new();
}

/// <summary>
/// Model xuất dữ liệu ra JSON / CSV
/// </summary>
public class ExportVocabularyModel
{
    public int LessonId { get; set; }
    public string TopicTitle { get; set; } = string.Empty;
    public string LanguageCode { get; set; } = "en";
    public string LevelTag { get; set; } = string.Empty;
    public int VocabularyId { get; set; }
    public string Word { get; set; } = string.Empty;
    public string? Phonetic { get; set; }
    public string? WordType { get; set; }
    public string MeaningVi { get; set; } = string.Empty;
    public string? ExampleEn { get; set; }
    public string? ExampleVi { get; set; }
}
