using EnglishFarm.Entities.Common;

namespace EnglishFarm.Entities.Shop;

public class ShopOrderItemEntity : BaseEntity
{
    public int ShopOrderId { get; set; }
    public int ShopProductId { get; set; }
    public int Quantity { get; set; }
    public int UnitPriceCoins { get; set; }

    public virtual ShopOrderEntity? ShopOrder { get; set; }
    public virtual ShopProductEntity? ShopProduct { get; set; }
}
