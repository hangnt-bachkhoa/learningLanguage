using EnglishFarm.Entities.Farm;
using EnglishFarm.Models.Farm;

namespace EnglishFarm.Business.Farm;

public static class FarmMapper
{
    public static FarmPlotResponseModel ToResponse(FarmPlotEntity entity)
    {
        var now = DateTime.UtcNow;
        int remainingSec = 0;
        if (entity.HarvestableAtUtc.HasValue)
        {
            remainingSec = Math.Max(0, (int)Math.Ceiling((entity.HarvestableAtUtc.Value - now).TotalSeconds));
        }

        return new FarmPlotResponseModel
        {
            Id = entity.Id,
            PlotIndex = entity.PlotIndex,
            Status = entity.Status.ToString().ToLowerInvariant(),
            CropId = entity.CropId,
            CropCode = entity.Crop?.Code,
            CropNameVi = entity.Crop?.NameVi,
            IsWatered = entity.IsWatered,
            IsFertilized = entity.IsFertilized,
            GrowthProgress = entity.GrowthProgress,
            PlantedAt = entity.PlantedAt,
            PlantedAtUtc = entity.PlantedAtUtc ?? entity.PlantedAt,
            GrowthStartedAtUtc = entity.GrowthStartedAtUtc,
            HarvestableAtUtc = entity.HarvestableAtUtc,
            RemainingSeconds = remainingSec,
            ServerUtcNow = now
        };
    }

    public static CropCatalogResponseModel ToResponse(CropCatalogEntity entity, bool isUnlocked = true)
    {
        return new CropCatalogResponseModel
        {
            Id = entity.Id,
            Code = entity.Code,
            NameVi = entity.NameVi,
            SeedSpritePath = entity.SeedSpritePath,
            MatureSpritePath = entity.MatureSpritePath,
            SeedPriceCoins = entity.SeedPriceCoins,
            GrowthMinutes = entity.GrowthMinutes,
            HarvestXp = entity.HarvestXp,
            HarvestCoins = entity.HarvestCoins,
            Tier = entity.Tier,
            RequiredXp = entity.RequiredXp,
            RequiredLevel = entity.RequiredLevel,
            RequiredLessonId = entity.RequiredLessonId,
            RequiredLessonTitle = entity.RequiredLesson?.Title,
            IsUnlocked = isUnlocked
        };
    }

    public static UserInventoryResponseModel ToResponse(UserInventoryEntity entity)
    {
        return new UserInventoryResponseModel
        {
            Id = entity.Id,
            ItemType = entity.ItemType.ToString().ToLowerInvariant(),
            ItemCode = entity.ItemCode,
            Quantity = entity.Quantity
        };
    }
}
