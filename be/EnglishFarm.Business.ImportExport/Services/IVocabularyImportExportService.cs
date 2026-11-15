using EnglishFarm.Business.ImportExport.Models;

namespace EnglishFarm.Business.ImportExport.Services;

public interface IVocabularyImportExportService
{
    /// <summary>
    /// Nạp dữ liệu trực tiếp từ bài viết / chuỗi văn bản (ví dụ bài TOEIC 1000+ từ)
    /// </summary>
    Task<ImportResultModel> ImportFromRawTextAsync(ImportToeicTextRequestModel model);

    /// <summary>
    /// Nạp dữ liệu theo định dạng có cấu trúc (JSON / DTO)
    /// </summary>
    Task<ImportResultModel> ImportStructuredAsync(ImportStructuredRequestModel model);

    /// <summary>
    /// Lấy danh sách từ vựng theo ngôn ngữ hoặc bài học để xuất
    /// </summary>
    Task<List<ExportVocabularyModel>> ExportVocabulariesAsync(string? languageCode, int? lessonId);

    /// <summary>
    /// Xuất ra mảng byte CSV (có BOM UTF-8 hỗ trợ Excel tiếng Việt)
    /// </summary>
    Task<byte[]> ExportToCsvAsync(string? languageCode, int? lessonId);

    /// <summary>
    /// Xuất ra mảng byte JSON
    /// </summary>
    Task<byte[]> ExportToJsonAsync(string? languageCode, int? lessonId);
}
