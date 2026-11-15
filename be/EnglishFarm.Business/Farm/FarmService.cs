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

        // Chuyển trạng thái ô đất theo mốc thời gian UTC (Rule 1)
        var now = DateTime.UtcNow;
        int growthMinutes = crop.GrowthMinutes > 0 ? crop.GrowthMinutes : 5;

        plot.CropId = crop.Id;
        plot.Status = PlotStatus.Seeded;
        plot.GrowthProgress = 0;
        plot.PlantedAt = now;
        plot.PlantedAtUtc = now;
        plot.HarvestableAtUtc = now.AddMinutes(growthMinutes);
        plot.IsWatered = false;
        _plotRepo.Update(plot);

        await _uow.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);

        plot.Crop = crop;
        return FarmMapper.ToResponse(plot);
    }

    public async Task<FarmPlotResponseModel> WaterPlotAsync(int userId, int plotIndex, CancellationToken ct = default)
    {
        return await ApplyCareAsync(userId, new ApplyCareRequestModel
        {
            PlotIndex = plotIndex,
            CareType = "water"
        }, ct);
    }

    public async Task<FarmPlotResponseModel> ApplyCareAsync(int userId, ApplyCareRequestModel model, CancellationToken ct = default)
    {
        using var tx = await _uow.BeginTransactionAsync(ct);

        var plot = await _plotRepo.Query(tracking: true)
            .Include(p => p.Crop)
            .FirstOrDefaultAsync(p => p.UserId == userId && p.PlotIndex == model.PlotIndex, ct)
            ?? throw new KeyNotFoundException("Ô đất không tồn tại.");

        var now = DateTime.UtcNow;
        if (plot.Crop == null || plot.HarvestableAtUtc == null)
            throw new InvalidOperationException("Ô đất chưa có cây trồng.");

        // Anti-Waste Guard: Nếu cây đã chín, từ chối chăm sóc tránh lãng phí vật phẩm (Rule 3)
        if (now >= plot.HarvestableAtUtc.Value)
            throw new InvalidOperationException("Cây đã chín, hãy thu hoạch!");

        string care = model.CareType.ToLowerInvariant();
        int reduceMinutes = care == "fertilizer" ? 5 : 2;
        var itemType = care == "fertilizer" ? InventoryItemType.Fertilizer : InventoryItemType.Water;

        var inv = await _inventoryRepo.Query(tracking: true)
            .FirstOrDefaultAsync(i => i.UserId == userId && i.ItemType == itemType, ct);
        if (inv == null || inv.Quantity < 1)
            throw new InvalidOperationException("Không đủ vật phẩm trong kho.");

        inv.Quantity -= 1;
        _inventoryRepo.Update(inv);

        var shifted = plot.HarvestableAtUtc.Value.AddMinutes(-reduceMinutes);
        plot.HarvestableAtUtc = shifted < now ? now : shifted;
        if (care == "water") plot.IsWatered = true;
        plot.Status = plot.HarvestableAtUtc <= now ? PlotStatus.Ready : PlotStatus.Growing;

        int totalSec = Math.Max(1, (plot.Crop?.GrowthMinutes ?? 5) * 60);
        int remSec = Math.Max(0, (int)Math.Ceiling((plot.HarvestableAtUtc.Value - now).TotalSeconds));
        plot.GrowthProgress = plot.Status == PlotStatus.Ready ? 100 : Math.Min(99, Math.Max(0, (int)Math.Floor(((totalSec - remSec) / (double)totalSec) * 100)));

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

        var now = DateTime.UtcNow;
        if (plot.Crop == null)
            throw new InvalidOperationException("Ô đất chưa có cây trồng.");

        // Anti-Clock-Tampering Guard: Kiểm tra nghiêm ngặt mốc UTC server trước khi cho phép thu hoạch (Rule 5)
        if (plot.Status != PlotStatus.Ready && (!plot.HarvestableAtUtc.HasValue || now < plot.HarvestableAtUtc.Value))
            throw new InvalidOperationException("Cây chưa chín để thu hoạch.");

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

        // Đưa ô đất về trạng thái Empty hoàn chỉnh (Rule 5)
        plot.Status = PlotStatus.Empty;
        plot.CropId = null;
        plot.GrowthProgress = 0;
        plot.PlantedAt = null;
        plot.PlantedAtUtc = null;
        plot.HarvestableAtUtc = null;
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
