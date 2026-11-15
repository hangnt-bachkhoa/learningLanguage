using EnglishFarm.DB;
using Microsoft.EntityFrameworkCore.Storage;

namespace EnglishFarm.Business.Common;

public class UnitOfWork : IUnitOfWork
{
    private readonly EnglishFarmDbContext _context;

    public UnitOfWork(EnglishFarmDbContext context)
    {
        _context = context;
    }

    public async Task<int> SaveChangesAsync(CancellationToken ct = default)
        => await _context.SaveChangesAsync(ct);

    public async Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken ct = default)
        => await _context.Database.BeginTransactionAsync(ct);
}
