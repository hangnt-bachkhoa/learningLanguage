using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.User;

namespace EnglishFarm.Entities.Farm;

public class UserInventoryEntity : BaseEntity
{
    public int UserId { get; set; }
    public InventoryItemType ItemType { get; set; }
    public string ItemCode { get; set; } = string.Empty; // carrot, water, fertilizer, lamp...
    public int Quantity { get; set; } = 0;

    public virtual UserEntity? User { get; set; }
}
