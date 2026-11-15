using EnglishFarm.Business.Common;
using EnglishFarm.Entities.Farm;
using EnglishFarm.Entities.Learning;
using EnglishFarm.Entities.User;
using EnglishFarm.Models.Farm;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.Business.Farm;

public class FarmService : IFarmService
{
    private readonly IRepository<FarmPlotEntity> _plotRepo;
    private readonly IRepository<CropCatalogEntity> _cropRepo;
    private readonly IRepository<UserInventoryEntity> _inventoryRepo;
    private readonly IRepository<UserEntity> _userRepo;
    private readonly IRepository<LessonEntity> _lessonRepo;
    private readonly IRepository<UserLessonProgressEntity> _progressRepo;
    private readonly IUnitOfWork _uow;

    public FarmService(
        IRepository<FarmPlotEntity> plotRepo,
        IRepository<CropCatalogEntity> cropRepo,
        IRepository<UserInventoryEntity> inventoryRepo,
        IRepository<UserEntity> userRepo,
        IRepository<LessonEntity> lessonRepo,
        IRepository<UserLessonProgressEntity> progressRepo,
        IUnitOfWork uow)
    {
        _plotRepo = plotRepo;
        _cropRepo = cropRepo;
        _inventoryRepo = inventoryRepo;
        _userRepo = userRepo;
        _lessonRepo = lessonRepo;
        _progressRepo = progressRepo;
        _uow = uow;
    }

    public async Task<List<FarmPlotResponseModel>> GetUserPlotsAsync(int userId, CancellationToken ct = default)
    {
        var plots = await _plotRepo.Query()
            .Include(x => x.Crop)
            .Where(x => x.UserId == userId)
            .OrderBy(x => x.PlotIndex)
            .ToListAsync(ct);

        return plots.Select(FarmMapper.ToResponse).ToList();
    }

    public async Task<FarmPlotResponseModel> PlantCropAsync(int userId, PlantCropRequestModel model, CancellationToken ct = default)
    {
        using var tx = await _uow.BeginTransactionAsync(ct);

        var plot = await _plotRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.PlotIndex == model.PlotIndex, ct)
            ?? throw new InvalidOperationException($"Ô đất #{model.PlotIndex} chưa được mở khóa");

        if (plot.Status != PlotStatus.Empty)
            throw new InvalidOperationException("Ô đất không ở trạng thái trống để gieo");

        var seedInv = await _inventoryRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ItemType == InventoryItemType.Seed && x.ItemCode == model.CropCode, ct)
            ?? throw new InvalidOperationException($"Không có hạt giống {model.CropCode} trong kho");

        if (seedInv.Quantity <= 0)
            throw new InvalidOperationException("Số lượng hạt giống trong kho đã hết");

        var crop = await _cropRepo.Query()
            .FirstOrDefaultAsync(x => x.Code == model.CropCode, ct)
            ?? throw new InvalidOperationException("Cây trồng không tồn tại trong danh mục");

        // Kiểm tra phân cấp & điều kiện mở khóa hạt giống
        var user = await _userRepo.Query()
            .FirstOrDefaultAsync(x => x.Id == userId, ct)
            ?? throw new InvalidOperationException("Người dùng không tồn tại");

        if (user.Xp < crop.RequiredXp)
            throw new InvalidOperationException($"Hạt giống {crop.NameVi} yêu cầu {crop.RequiredXp} XP (bạn đang có {user.Xp} XP)");

        if (crop.RequiredLessonId.HasValue)
        {
            var isLessonUnlocked = await _progressRepo.Query()
                .AnyAsync(x => x.UserId == userId && x.LessonId == crop.RequiredLessonId.Value && x.IsUnlocked, ct);

            if (!isLessonUnlocked)
            {
                var lesson = await _lessonRepo.Query()
                    .FirstOrDefaultAsync(x => x.Id == crop.RequiredLessonId.Value, ct);

                if (lesson == null || (lesson.OrderIndex != 1 && lesson.RequiredCropQty > 0))
                {
                    throw new InvalidOperationException($"Hạt giống {crop.NameVi} yêu cầu mở khóa bài học '{lesson?.Title ?? "Tương ứng"}' trước khi gieo trồng");
                }
            }
        }

        // Trừ tồn kho hạt giống
        seedInv.Quantity -= 1;
        _inventoryRepo.Update(seedInv);

        // Chuyển trạng thái ô đất
        plot.CropId = crop.Id;
        plot.Status = PlotStatus.Seeded;
        plot.GrowthProgress = 0;
        plot.PlantedAt = DateTime.UtcNow;
        plot.IsWatered = false;
        _plotRepo.Update(plot);

        await _uow.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);

        plot.Crop = crop;
        return FarmMapper.ToResponse(plot);
    }

    public async Task<FarmPlotResponseModel> WaterPlotAsync(int userId, int plotIndex, CancellationToken ct = default)
    {
        using var tx = await _uow.BeginTransactionAsync(ct);

        var plot = await _plotRepo.Query(tracking: true)
            .Include(x => x.Crop)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.PlotIndex == plotIndex, ct)
            ?? throw new InvalidOperationException("Ô đất không tồn tại");

        if (plot.Status != PlotStatus.Seeded && plot.Status != PlotStatus.Growing)
            throw new InvalidOperationException("Ô đất không có cây cần tưới nước");

        var waterInv = await _inventoryRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ItemType == InventoryItemType.Water, ct);
        if (waterInv == null || waterInv.Quantity <= 0)
            throw new InvalidOperationException("Bạn đã hết nước tưới!");

        waterInv.Quantity -= 1;
        _inventoryRepo.Update(waterInv);

        plot.IsWatered = true;
        plot.GrowthProgress = Math.Min(100, plot.GrowthProgress + 50);
        if (plot.GrowthProgress >= 100)
        {
            plot.Status = PlotStatus.Ready;
        }
        else
        {
            plot.Status = PlotStatus.Growing;
        }

        _plotRepo.Update(plot);
        await _uow.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);

        return FarmMapper.ToResponse(plot);
    }

    public async Task<FarmPlotResponseModel> HarvestPlotAsync(int userId, int plotIndex, CancellationToken ct = default)
    {
        using var tx = await _uow.BeginTransactionAsync(ct);

        var plot = await _plotRepo.Query(tracking: true)
            .Include(x => x.Crop)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.PlotIndex == plotIndex, ct)
            ?? throw new InvalidOperationException("Ô đất không tồn tại");

        if (plot.Status != PlotStatus.Ready || plot.Crop == null)
            throw new InvalidOperationException("Cây chưa chín để thu hoạch");

        var user = await _userRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.Id == userId, ct)
            ?? throw new InvalidOperationException("Người dùng không tồn tại");

        // Tăng XP & Coins cho người chơi
        user.Xp += plot.Crop.HarvestXp;
        user.Coins += plot.Crop.HarvestCoins;
        _userRepo.Update(user);

        // Cộng nông sản vào UserInventory (Upsert)
        var cropInv = await _inventoryRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ItemType == InventoryItemType.HarvestedCrop && x.ItemCode == plot.Crop.Code, ct);

        if (cropInv == null)
        {
            cropInv = new UserInventoryEntity
            {
                UserId = userId,
                ItemType = InventoryItemType.HarvestedCrop,
                ItemCode = plot.Crop.Code,
                Quantity = 1
            };
            await _inventoryRepo.AddAsync(cropInv, ct);
        }
        else
        {
            cropInv.Quantity += 1;
            _inventoryRepo.Update(cropInv);
        }

        // Đưa ô đất về trạng thái Empty
        plot.Status = PlotStatus.Empty;
        plot.CropId = null;
        plot.GrowthProgress = 0;
        plot.PlantedAt = null;
        plot.IsWatered = false;
        _plotRepo.Update(plot);

        try
        {
            await _uow.SaveChangesAsync(ct);
            await tx.CommitAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            await tx.RollbackAsync(ct);
            throw new InvalidOperationException("Phát hiện xung đột tài nguyên người dùng. Vui lòng thử lại!");
        }

        return FarmMapper.ToResponse(plot);
    }

    public async Task<List<UserInventoryResponseModel>> GetUserInventoryAsync(int userId, CancellationToken ct = default)
    {
        var items = await _inventoryRepo.Query()
            .Where(x => x.UserId == userId && x.Quantity > 0)
            .ToListAsync(ct);

        return items.Select(FarmMapper.ToResponse).ToList();
    }

    public async Task<List<CropCatalogResponseModel>> GetCropCatalogsAsync(int? userId = null, CancellationToken ct = default)
    {
        var crops = await _cropRepo.Query()
            .Include(x => x.RequiredLesson)
            .OrderBy(x => x.Tier)
            .ThenBy(x => x.RequiredXp)
            .ToListAsync(ct);

        if (!userId.HasValue)
        {
            return crops.Select(c => FarmMapper.ToResponse(c, true)).ToList();
        }

        var user = await _userRepo.Query().FirstOrDefaultAsync(x => x.Id == userId.Value, ct);
        int userXp = user?.Xp ?? 0;

        var unlockedLessonIds = await _progressRepo.Query()
            .Where(x => x.UserId == userId.Value && x.IsUnlocked)
            .Select(x => x.LessonId)
            .ToListAsync(ct);

        var freeLessons = await _lessonRepo.Query()
            .Where(x => x.OrderIndex == 1 || x.RequiredCropQty == 0)
            .Select(x => x.Id)
            .ToListAsync(ct);

        var allUnlockedLessons = new HashSet<int>(unlockedLessonIds.Concat(freeLessons));

        return crops.Select(c =>
        {
            bool hasXp = userXp >= c.RequiredXp;
            bool hasLesson = !c.RequiredLessonId.HasValue || allUnlockedLessons.Contains(c.RequiredLessonId.Value);
            bool isUnlocked = c.Code == "carrot" || (hasXp && hasLesson);
            return FarmMapper.ToResponse(c, isUnlocked);
        }).ToList();
    }
}
