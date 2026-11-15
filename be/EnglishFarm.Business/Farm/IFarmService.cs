using EnglishFarm.Models.Farm;

namespace EnglishFarm.Business.Farm;

public interface IFarmService
{
    Task<List<FarmPlotResponseModel>> GetUserPlotsAsync(int userId, CancellationToken ct = default);
    Task<FarmPlotResponseModel> PlantCropAsync(int userId, PlantCropRequestModel model, CancellationToken ct = default);
    Task<FarmPlotResponseModel> WaterPlotAsync(int userId, int plotIndex, CancellationToken ct = default);
    Task<FarmPlotResponseModel> ApplyCareAsync(int userId, ApplyCareRequestModel model, CancellationToken ct = default);
    Task<FarmPlotResponseModel> HarvestPlotAsync(int userId, int plotIndex, CancellationToken ct = default);
    Task<List<UserInventoryResponseModel>> GetUserInventoryAsync(int userId, CancellationToken ct = default);
    Task<List<CropCatalogResponseModel>> GetCropCatalogsAsync(int? userId = null, CancellationToken ct = default);
}
