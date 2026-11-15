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

    public GrammarController(IGrammarService grammarService)
    {
        _grammarService = grammarService;
    }

    [HttpGet("topics")]
    public async Task<IActionResult> GetTopicsAsync()
    {
        int userId = 1; // Default single user in local mode
        return await ExecuteFunction(() => _grammarService.GetTopicsAsync(userId));
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
