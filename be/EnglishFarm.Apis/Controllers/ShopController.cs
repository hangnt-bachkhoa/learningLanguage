using EnglishFarm.Business.Shop;
using EnglishFarm.Models.Shop;
using Microsoft.AspNetCore.Mvc;

namespace EnglishFarm.Apis.Controllers;

public class ShopController : ApiControllerBase
{
    private readonly IShopService _shopService;

    public ShopController(IShopService shopService)
    {
        _shopService = shopService;
    }

    [HttpGet("products")]
    public async Task<IActionResult> GetProductsAsync([FromQuery] string? category)
    {
        return await ExecuteFunction(() => _shopService.GetProductsAsync(category));
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> CheckoutAsync([FromBody] CheckoutOrderRequestModel model)
    {
        int userId = 1;
        return await ExecuteFunction(() => _shopService.CheckoutAsync(userId, model));
    }
}
