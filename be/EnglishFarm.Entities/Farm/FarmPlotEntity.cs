using EnglishFarm.Entities.Common;
using EnglishFarm.Entities.User;

namespace EnglishFarm.Entities.Farm;

public class FarmPlotEntity : BaseEntity
{
    public int UserId { get; set; }
    public int PlotIndex { get; set; } // 0 -> 8 (lưới 3x3)
    public PlotStatus Status { get; set; } = PlotStatus.Locked;
    public int? CropId { get; set; }
    public virtual CropCatalogEntity? Crop { get; set; }
    public bool IsWatered { get; set; }
    public int GrowthProgress { get; set; } = 0; // 0 -> 100%
    public DateTime? PlantedAt { get; set; }
    public DateTime? PlantedAtUtc { get; set; }
    public DateTime? HarvestableAtUtc { get; set; }

    public virtual UserEntity? User { get; set; }
}
