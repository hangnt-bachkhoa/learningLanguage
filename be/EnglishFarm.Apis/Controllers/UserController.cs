using EnglishFarm.Business.User;
using EnglishFarm.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace EnglishFarm.Apis.Controllers;

public class UserController : ApiControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfileAsync()
    {
        int userId = 1;
        return await ExecuteFunction(() => _userService.GetProfileAsync(userId));
    }

    [HttpGet("planner-books")]
    public async Task<IActionResult> GetPlannerBooksAsync()
    {
        int userId = 1;
        return await ExecuteFunction(() => _userService.GetPlannerBooksAsync(userId));
    }

    [HttpPut("planner-books")]
    public async Task<IActionResult> UpdatePlannerBookAsync([FromBody] UpdatePlannerBookRequestModel model)
    {
        int userId = 1;
        return await ExecuteFunction(() => _userService.UpdatePlannerBookAsync(userId, model));
    }
}
