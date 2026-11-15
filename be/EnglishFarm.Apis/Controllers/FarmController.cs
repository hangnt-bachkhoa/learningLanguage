using EnglishFarm.Business.Farm;
using EnglishFarm.Models.Farm;
using Microsoft.AspNetCore.Mvc;

namespace EnglishFarm.Apis.Controllers;

public class FarmController : ApiControllerBase
{
    private readonly IFarmService _farmService;

    public FarmController(IFarmService farmService)
    {
        _farmService = farmService;
    }

    [HttpGet("plots")]
    public async Task<IActionResult> GetPlotsAsync()
    {
        int userId = 1; // Giả lập user đăng nhập
        return await ExecuteFunction(() => _farmService.GetUserPlotsAsync(userId));
    }

    [HttpPost("plant")]
    public async Task<IActionResult> PlantAsync([FromBody] PlantCropRequestModel model)
    {
        int userId = 1;
        return await ExecuteFunction(() => _farmService.PlantCropAsync(userId, model));
    }

    [HttpPost("water/{plotIndex:int}")]
    public async Task<IActionResult> WaterAsync(int plotIndex)
    {
        int userId = 1;
        return await ExecuteFunction(() => _farmService.WaterPlotAsync(userId, plotIndex));
    }

    [HttpPost("care")]
    public async Task<IActionResult> ApplyCareAsync([FromBody] ApplyCareRequestModel model)
    {
        int userId = 1;
        return await ExecuteFunction(() => _farmService.ApplyCareAsync(userId, model));
    }

    [HttpPost("harvest/{plotIndex:int}")]
    public async Task<IActionResult> HarvestAsync(int plotIndex)
    {
        int userId = 1;
        return await ExecuteFunction(() => _farmService.HarvestPlotAsync(userId, plotIndex));
    }

    [HttpGet("inventory")]
    public async Task<IActionResult> GetInventoryAsync()
    {
        int userId = 1;
        return await ExecuteFunction(() => _farmService.GetUserInventoryAsync(userId));
    }

    [HttpGet("crops")]
    public async Task<IActionResult> GetCropsAsync()
    {
        int userId = 1;
        return await ExecuteFunction(() => _farmService.GetCropCatalogsAsync(userId));
    }
}
