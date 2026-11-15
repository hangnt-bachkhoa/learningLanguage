using EnglishFarm.Business.Grammar;
using EnglishFarm.Models.Grammar;
using Microsoft.AspNetCore.Mvc;

namespace EnglishFarm.Apis.Controllers;

[ApiController]
[Route("api/grammar")]
[Route("api/v1/grammar")]
public class GrammarController : ApiControllerBase
{
    private readonly IGrammarService _grammarService;
    private readonly IGrammarQuizGenerator _grammarQuizGenerator;

    public GrammarController(
        IGrammarService grammarService,
        IGrammarQuizGenerator grammarQuizGenerator)
    {
        _grammarService = grammarService;
        _grammarQuizGenerator = grammarQuizGenerator;
    }

    [HttpGet("topics")]
    public async Task<IActionResult> GetTopicsAsync()
    {
        int userId = 1; // Default single user in local mode
        return await ExecuteFunction(() => _grammarService.GetTopicsAsync(userId));
    }

    [HttpGet("topics/{code}/quiz-session")]
    public async Task<IActionResult> GetQuizSessionAsync(string code, [FromQuery] int sessionSize = 10)
    {
        int userId = 1;
        return await ExecuteFunction(() => _grammarQuizGenerator.BuildGrammarTestSessionAsync(code, userId, sessionSize));
    }

    [HttpPost("topics/{code}/study")]
    public async Task<IActionResult> MarkAsStudiedAsync(string code)
    {
        int userId = 1;
        return await ExecuteFunction(async () =>
        {
            await _grammarService.MarkAsStudiedAsync(userId, code);
            return new { success = true, message = "Đã đánh dấu đã học chuyên đề ngữ pháp (0 XP, 0 Xu)." };
        });
    }

    [HttpPost("topics/{code}/quiz/complete")]
    public async Task<IActionResult> CompleteQuizAsync(string code, [FromBody] CompleteGrammarQuizRequestModel model)
    {
        int userId = 1;
        return await ExecuteFunction(() => _grammarService.CompleteQuizAsync(userId, code, model));
    }
}
