using EnglishFarm.Business.Common;
using EnglishFarm.Entities.User;
using EnglishFarm.Models.User;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.Business.User;

public class UserService : IUserService
{
    private readonly IRepository<UserEntity> _userRepo;
    private readonly IRepository<UserPlannerBookEntity> _plannerRepo;
    private readonly IUnitOfWork _uow;

    public UserService(
        IRepository<UserEntity> userRepo,
        IRepository<UserPlannerBookEntity> plannerRepo,
        IUnitOfWork uow)
    {
        _userRepo = userRepo;
        _plannerRepo = plannerRepo;
        _uow = uow;
    }

    public async Task<UserProfileResponseModel> GetProfileAsync(int userId, CancellationToken ct = default)
    {
        var user = await _userRepo.GetByIdAsync(userId, ct)
            ?? throw new InvalidOperationException("Người dùng không tồn tại");

        return UserMapper.ToResponse(user);
    }

    public async Task<List<PlannerBookResponseModel>> GetPlannerBooksAsync(int userId, CancellationToken ct = default)
    {
        var books = await _plannerRepo.Query()
            .Where(x => x.UserId == userId)
            .ToListAsync(ct);

        return books.Select(UserMapper.ToResponse).ToList();
    }

    public async Task<PlannerBookResponseModel> UpdatePlannerBookAsync(int userId, UpdatePlannerBookRequestModel model, CancellationToken ct = default)
    {
        var book = await _plannerRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ModuleType == model.ModuleType, ct);

        if (book == null)
        {
            book = new UserPlannerBookEntity
            {
                UserId = userId,
                ModuleType = model.ModuleType,
                CoverColor = model.CoverColor,
                Note = model.Note
            };
            await _plannerRepo.AddAsync(book, ct);
        }
        else
        {
            book.CoverColor = model.CoverColor;
            book.Note = model.Note;
            _plannerRepo.Update(book);
        }

        await _uow.SaveChangesAsync(ct);
        return UserMapper.ToResponse(book);
    }
}
