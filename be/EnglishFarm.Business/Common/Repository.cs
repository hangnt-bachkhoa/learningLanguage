using EnglishFarm.DB;
using EnglishFarm.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.Business.Common;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly EnglishFarmDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(EnglishFarmDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public IQueryable<T> Query(bool tracking = false)
        => tracking ? _dbSet.Where(x => !x.IsDeleted) : _dbSet.AsNoTracking().Where(x => !x.IsDeleted);

    public async Task<T?> GetByIdAsync(int id, CancellationToken ct = default)
        => await _dbSet.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);

    public async Task AddAsync(T entity, CancellationToken ct = default)
        => await _dbSet.AddAsync(entity, ct);

    public async Task AddRangeAsync(IEnumerable<T> entities, CancellationToken ct = default)
        => await _dbSet.AddRangeAsync(entities, ct);

    public void Update(T entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        _dbSet.Update(entity);
    }

    public void Delete(T entity)
    {
        entity.IsDeleted = true;
        entity.UpdatedAt = DateTime.UtcNow;
        _dbSet.Update(entity);
    }
}
