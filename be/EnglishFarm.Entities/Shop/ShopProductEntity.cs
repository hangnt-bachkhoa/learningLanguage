using EnglishFarm.Entities.Common;

namespace EnglishFarm.Entities.Shop;

public class ShopProductEntity : BaseEntity
{
    public string Category { get; set; } = "seeds"; // seeds | care | decor | bundle
    public string NameVi { get; set; } = string.Empty;
    public string ItemCode { get; set; } = string.Empty;
    public int PriceCoins { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
}
