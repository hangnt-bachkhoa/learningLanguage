using EnglishFarm.Business.Learning;
using EnglishFarm.Models.Learning;
using Microsoft.AspNetCore.Mvc;

namespace EnglishFarm.Apis.Controllers;

public class LearningController : ApiControllerBase
{
    private readonly ILearningService _learningService;

    public LearningController(ILearningService learningService)
    {
        _learningService = learningService;
    }

    [HttpGet("lessons")]
    public async Task<IActionResult> GetLessonsAsync([FromQuery] string? languageCode)
    {
        int userId = 1;
        return await ExecuteFunction(() => _learningService.GetLessonsAsync(userId, languageCode));
    }

    [HttpGet("lessons/{lessonId:int}/vocabularies")]
    public async Task<IActionResult> GetVocabulariesAsync(int lessonId)
    {
        return await ExecuteFunction(() => _learningService.GetVocabulariesAsync(lessonId));
    }

    [HttpGet("lessons/{lessonId:int}/quiz")]
    public async Task<IActionResult> GetQuizQuestionsAsync(int lessonId)
    {
        return await ExecuteFunction(() => _learningService.GetQuizQuestionsAsync(lessonId));
    }

    [HttpGet("lessons/{lessonId:int}/quiz-session")]
    public async Task<IActionResult> GetQuizSessionAsync(int lessonId)
    {
        int userId = 1;
        return await ExecuteFunction(() => _learningService.GetQuizSessionAsync(userId, lessonId));
    }

    [HttpPost("quiz/submit")]
    public async Task<IActionResult> SubmitQuizAsync([FromBody] SubmitQuizRequestModel model)
    {
        int userId = 1;
        return await ExecuteFunction(() => _learningService.SubmitQuizAsync(userId, model));
    }

    [HttpGet("reviews")]
    public async Task<IActionResult> GetReviewsAsync()
    {
        int userId = 1;
        return await ExecuteFunction(() => _learningService.GetReviewSchedulesAsync(userId));
    }

    [HttpPost("review/complete")]
    public async Task<IActionResult> CompleteReviewAsync([FromBody] CompleteReviewRequestModel model)
    {
        int userId = 1;
        return await ExecuteFunction(() => _learningService.CompleteReviewAsync(userId, model));
    }
}
