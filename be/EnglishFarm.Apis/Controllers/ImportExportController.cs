using EnglishFarm.Business.ImportExport.Models;
using EnglishFarm.Business.ImportExport.Services;
using Microsoft.AspNetCore.Mvc;

namespace EnglishFarm.Apis.Controllers;

public class ImportExportController : ApiControllerBase
{
    private readonly IVocabularyImportExportService _service;

    public ImportExportController(IVocabularyImportExportService service)
    {
        _service = service;
    }

    /// <summary>
    /// Nạp từ vựng trực tiếp từ chuỗi văn bản (ví dụ bài viết TOEIC 1000+ từ)
    /// </summary>
    [HttpPost("raw-text")]
    public async Task<IActionResult> ImportRawTextAsync([FromBody] ImportToeicTextRequestModel model)
    {
        return await ExecuteFunction(() => _service.ImportFromRawTextAsync(model));
    }

    /// <summary>
    /// Nạp từ vựng theo cấu trúc JSON danh mục chủ đề và từ vựng
    /// </summary>
    [HttpPost("structured")]
    public async Task<IActionResult> ImportStructuredAsync([FromBody] ImportStructuredRequestModel model)
    {
        return await ExecuteFunction(() => _service.ImportStructuredAsync(model));
    }

    /// <summary>
    /// Upload file văn bản (.txt) để tự động bóc tách và nạp vào hệ thống
    /// </summary>
    [HttpPost("upload-file")]
    public async Task<IActionResult> UploadAndImportFileAsync(
        IFormFile file,
        [FromQuery] string languageCode = "en",
        [FromQuery] bool autoGenerateQuiz = true)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { success = false, message = "Vui lòng chọn file tải lên." });
        }

        using var reader = new StreamReader(file.OpenReadStream());
        string content = await reader.ReadToEndAsync();

        var model = new ImportToeicTextRequestModel
        {
            RawText = content,
            LanguageCode = languageCode,
            AutoGenerateQuizQuestions = autoGenerateQuiz
        };

        return await ExecuteFunction(() => _service.ImportFromRawTextAsync(model));
    }

    /// <summary>
    /// Xuất danh sách từ vựng ra định dạng JSON
    /// </summary>
    [HttpGet("export/json")]
    public async Task<IActionResult> ExportToJsonAsync(
        [FromQuery] string? languageCode = "en",
        [FromQuery] int? lessonId = null)
    {
        var bytes = await _service.ExportToJsonAsync(languageCode, lessonId);
        string fileName = $"vocabularies_{languageCode ?? "all"}_{DateTime.UtcNow:yyyyMMdd_HHmmss}.json";
        return File(bytes, "application/json", fileName);
    }

    /// <summary>
    /// Xuất danh sách từ vựng ra định dạng CSV (Hỗ trợ mở bằng Microsoft Excel tiếng Việt)
    /// </summary>
    [HttpGet("export/csv")]
    public async Task<IActionResult> ExportToCsvAsync(
        [FromQuery] string? languageCode = "en",
        [FromQuery] int? lessonId = null)
    {
        var bytes = await _service.ExportToCsvAsync(languageCode, lessonId);
        string fileName = $"vocabularies_{languageCode ?? "all"}_{DateTime.UtcNow:yyyyMMdd_HHmmss}.csv";
        return File(bytes, "text/csv; charset=utf-8", fileName);
    }
}
