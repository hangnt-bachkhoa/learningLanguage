using System.ComponentModel.DataAnnotations;

namespace EnglishFarm.Models.Farm;

public class PlantCropRequestModel
{
    [Required]
    [Range(0, 8, ErrorMessage = "PlotIndex must be between 0 and 8")]
    public int PlotIndex { get; set; }

    [Required]
    public string CropCode { get; set; } = string.Empty;
}

public class WaterPlotRequestModel
{
    [Required]
    [Range(0, 8)]
    public int PlotIndex { get; set; }
}

public class ApplyCareRequestModel
{
    [Required]
    [Range(0, 8)]
    public int PlotIndex { get; set; }

    [Required]
    public string CareType { get; set; } = string.Empty; // "water" | "fertilizer"
}

public class FarmPlotResponseModel
{
    public int Id { get; set; }
    public int PlotIndex { get; set; }
    public string Status { get; set; } = string.Empty;
    public int? CropId { get; set; }
    public string? CropNameVi { get; set; }
    public string? CropCode { get; set; }
    public bool IsWatered { get; set; }
    public int GrowthProgress { get; set; }
    public DateTime? PlantedAt { get; set; }
    public DateTime? PlantedAtUtc { get; set; }
    public DateTime? HarvestableAtUtc { get; set; }
    public int RemainingSeconds { get; set; }
    public DateTime ServerUtcNow { get; set; } = DateTime.UtcNow;
}

public class UserInventoryResponseModel
{
    public int Id { get; set; }
    public string ItemType { get; set; } = string.Empty;
    public string ItemCode { get; set; } = string.Empty;
    public int Quantity { get; set; }
}

public class CropCatalogResponseModel
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string NameVi { get; set; } = string.Empty;
    public string? SeedSpritePath { get; set; }
    public string? MatureSpritePath { get; set; }
    public int SeedPriceCoins { get; set; }
    public int GrowthMinutes { get; set; }
    public int HarvestXp { get; set; }
    public int HarvestCoins { get; set; }
    public int Tier { get; set; } = 1;
    public int RequiredXp { get; set; } = 0;
    public int RequiredLevel { get; set; } = 1;
    public int? RequiredLessonId { get; set; }
    public string? RequiredLessonTitle { get; set; }
    public bool IsUnlocked { get; set; } = true;
}
