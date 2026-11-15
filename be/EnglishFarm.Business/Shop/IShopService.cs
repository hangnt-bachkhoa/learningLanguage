using EnglishFarm.Models.Shop;

namespace EnglishFarm.Business.Shop;

public interface IShopService
{
    Task<List<ShopProductResponseModel>> GetProductsAsync(string? category = null, CancellationToken ct = default);
    Task<ShopOrderResponseModel> CheckoutAsync(int userId, CheckoutOrderRequestModel model, CancellationToken ct = default);
}
