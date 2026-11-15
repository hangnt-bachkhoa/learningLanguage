using EnglishFarm.Entities.Shop;
using EnglishFarm.Models.Shop;

namespace EnglishFarm.Business.Shop;

public static class ShopMapper
{
    public static ShopProductResponseModel ToResponse(ShopProductEntity entity)
    {
        return new ShopProductResponseModel
        {
            Id = entity.Id,
            Category = entity.Category,
            NameVi = entity.NameVi,
            ItemCode = entity.ItemCode,
            PriceCoins = entity.PriceCoins,
            Description = entity.Description
        };
    }
}
