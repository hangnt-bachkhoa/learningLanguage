using EnglishFarm.Entities.User;
using EnglishFarm.Models.User;

namespace EnglishFarm.Business.User;

public static class UserMapper
{
    public static UserProfileResponseModel ToResponse(UserEntity entity)
    {
        return new UserProfileResponseModel
        {
            Id = entity.Id,
            FullName = entity.FullName,
            Email = entity.Email,
            Xp = entity.Xp,
            Coins = entity.Coins,
            Level = entity.Level,
            CreatedAt = entity.CreatedAt
        };
    }

    public static PlannerBookResponseModel ToResponse(UserPlannerBookEntity entity)
    {
        return new PlannerBookResponseModel
        {
            Id = entity.Id,
            ModuleType = entity.ModuleType,
            CoverColor = entity.CoverColor,
            Note = entity.Note
        };
    }
}
