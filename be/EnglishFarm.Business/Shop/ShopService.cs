using EnglishFarm.Business.Common;
using EnglishFarm.Entities.Farm;
using EnglishFarm.Entities.Shop;
using EnglishFarm.Entities.User;
using EnglishFarm.Models.Shop;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.Business.Shop;

public class ShopService : IShopService
{
    private readonly IRepository<ShopProductEntity> _productRepo;
    private readonly IRepository<ShopOrderEntity> _orderRepo;
    private readonly IRepository<UserInventoryEntity> _inventoryRepo;
    private readonly IRepository<UserEntity> _userRepo;
    private readonly IUnitOfWork _uow;

    public ShopService(
        IRepository<ShopProductEntity> productRepo,
        IRepository<ShopOrderEntity> orderRepo,
        IRepository<UserInventoryEntity> inventoryRepo,
        IRepository<UserEntity> userRepo,
        IUnitOfWork uow)
    {
        _productRepo = productRepo;
        _orderRepo = orderRepo;
        _inventoryRepo = inventoryRepo;
        _userRepo = userRepo;
        _uow = uow;
    }

    public async Task<List<ShopProductResponseModel>> GetProductsAsync(string? category = null, CancellationToken ct = default)
    {
        var query = _productRepo.Query().Where(x => x.IsActive);
        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(x => x.Category == category);
        }

        var products = await query.ToListAsync(ct);
        return products.Select(ShopMapper.ToResponse).ToList();
    }

    public async Task<ShopOrderResponseModel> CheckoutAsync(int userId, CheckoutOrderRequestModel model, CancellationToken ct = default)
    {
        using var tx = await _uow.BeginTransactionAsync(ct);

        var user = await _userRepo.Query(tracking: true)
            .FirstOrDefaultAsync(x => x.Id == userId, ct)
            ?? throw new InvalidOperationException("Không tìm thấy người dùng");

        var productIds = model.Items.Select(x => x.ShopProductId).Distinct().ToList();
        var products = await _productRepo.Query()
            .Where(x => productIds.Contains(x.Id) && x.IsActive)
            .ToDictionaryAsync(x => x.Id, ct);

        int totalCoins = 0;
        var order = new ShopOrderEntity { UserId = userId, CreatedAt = DateTime.UtcNow };

        foreach (var item in model.Items)
        {
            if (!products.TryGetValue(item.ShopProductId, out var prod))
                throw new InvalidOperationException($"Vật phẩm #{item.ShopProductId} không tồn tại hoặc ngừng bán");

            totalCoins += prod.PriceCoins * item.Quantity;

            order.Items.Add(new ShopOrderItemEntity
            {
                ShopProductId = prod.Id,
                Quantity = item.Quantity,
                UnitPriceCoins = prod.PriceCoins
            });
        }

        if (user.Coins < totalCoins)
            throw new InvalidOperationException($"Bạn không đủ Xu để mua sắm! (Cần {totalCoins} Xu, hiện có {user.Coins} Xu)");

        // Trừ Xu người dùng
        user.Coins -= totalCoins;
        _userRepo.Update(user);

        order.TotalCoins = totalCoins;
        await _orderRepo.AddAsync(order, ct);

        // Cộng vật phẩm vào UserInventory
        foreach (var item in model.Items)
        {
            var prod = products[item.ShopProductId];
            var itemType = prod.Category == "seeds" ? InventoryItemType.Seed : InventoryItemType.Decor;

            var userInv = await _inventoryRepo.Query(tracking: true)
                .FirstOrDefaultAsync(x => x.UserId == userId && x.ItemType == itemType && x.ItemCode == prod.ItemCode, ct);

            if (userInv == null)
            {
                await _inventoryRepo.AddAsync(new UserInventoryEntity
                {
                    UserId = userId,
                    ItemType = itemType,
                    ItemCode = prod.ItemCode,
                    Quantity = item.Quantity
                }, ct);
            }
            else
            {
                userInv.Quantity += item.Quantity;
                _inventoryRepo.Update(userInv);
            }
        }

        try
        {
            await _uow.SaveChangesAsync(ct);
            await tx.CommitAsync(ct);
        }
        catch (DbUpdateConcurrencyException)
        {
            await tx.RollbackAsync(ct);
            throw new InvalidOperationException("Phát hiện xung đột số dư Xu. Vui lòng thanh toán lại!");
        }

        return new ShopOrderResponseModel
        {
            OrderId = order.Id,
            TotalCoins = order.TotalCoins,
            CreatedAt = order.CreatedAt,
            Items = order.Items.Select(i => new ShopOrderItemResponseModel
            {
                ProductId = i.ShopProductId,
                ProductNameVi = products[i.ShopProductId].NameVi,
                Quantity = i.Quantity,
                UnitPriceCoins = i.UnitPriceCoins
            }).ToList()
        };
    }
}
