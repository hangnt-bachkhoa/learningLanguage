using EnglishFarm.Models.Common;
using Microsoft.AspNetCore.Mvc;

namespace EnglishFarm.Apis.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    protected async Task<IActionResult> ExecuteFunction<T>(Func<Task<T>> action)
    {
        try
        {
            var result = await action();
            return Ok(ApiResponse<T>.Ok(result));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse<T>.Fail(400, ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ApiResponse<T>.Fail(500, "Lỗi hệ thống: " + ex.Message));
        }
    }
}
