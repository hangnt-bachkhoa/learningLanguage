using EnglishFarm.Models.User;

namespace EnglishFarm.Business.User;

public interface IUserService
{
    Task<UserProfileResponseModel> GetProfileAsync(int userId, CancellationToken ct = default);
    Task<List<PlannerBookResponseModel>> GetPlannerBooksAsync(int userId, CancellationToken ct = default);
    Task<PlannerBookResponseModel> UpdatePlannerBookAsync(int userId, UpdatePlannerBookRequestModel model, CancellationToken ct = default);
}
