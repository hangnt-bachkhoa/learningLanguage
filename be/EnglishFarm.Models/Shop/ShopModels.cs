using System.ComponentModel.DataAnnotations;

namespace EnglishFarm.Models.Shop;

public class CheckoutOrderItemModel
{
    [Required]
    public int ShopProductId { get; set; }

    [Range(1, 999)]
    public int Quantity { get; set; }
}

public class CheckoutOrderRequestModel
{
    [Required, MinLength(1, ErrorMessage = "Giỏ hàng không được để trống")]
    public List<CheckoutOrderItemModel> Items { get; set; } = new();
}

public class ShopProductResponseModel
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public string NameVi { get; set; } = string.Empty;
    public string ItemCode { get; set; } = string.Empty;
    public int PriceCoins { get; set; }
    public string? Description { get; set; }
}

public class ShopOrderResponseModel
{
    public int OrderId { get; set; }
    public int TotalCoins { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<ShopOrderItemResponseModel> Items { get; set; } = new();
}

public class ShopOrderItemResponseModel
{
    public int ProductId { get; set; }
    public string ProductNameVi { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int UnitPriceCoins { get; set; }
}
