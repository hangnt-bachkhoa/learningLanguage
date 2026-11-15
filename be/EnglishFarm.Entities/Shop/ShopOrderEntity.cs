using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.User;

namespace EnglishFarm.Entities.Shop;

public class ShopOrderEntity : BaseEntity
{
    public int UserId { get; set; }
    public int TotalCoins { get; set; }

    public virtual UserEntity? User { get; set; }
    public virtual ICollection<ShopOrderItemEntity> Items { get; set; } = new List<ShopOrderItemEntity>();
}
