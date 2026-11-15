using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.Learning;

namespace EnglishFarm.Entities.Farm;

public class CropCatalogEntity : BaseEntity
{
    public string Code { get; set; } = string.Empty; // carrot, corn, tomato, sunflower...
    public string NameVi { get; set; } = string.Empty;
    public string? SeedSpritePath { get; set; }
    public string? MatureSpritePath { get; set; }
    public int SeedPriceCoins { get; set; }
    public int GrowthMinutes { get; set; }
    public int HarvestXp { get; set; } = 20;
    public int HarvestCoins { get; set; } = 15;

    // Phân cấp & Điều kiện mở khóa
    public int Tier { get; set; } = 1; // 1: Mầm xanh, 2: Hoa trái, 3: Làm vườn, 4: Thượng hạng
    public int RequiredXp { get; set; } = 0;
    public int RequiredLevel { get; set; } = 1;
    public int? RequiredLessonId { get; set; }
    public virtual LessonEntity? RequiredLesson { get; set; }
}
