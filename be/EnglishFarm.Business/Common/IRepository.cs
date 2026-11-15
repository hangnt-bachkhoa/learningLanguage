using EnglishFarm.Entities.Common;

namespace EnglishFarm.Business.Common;

public interface IRepository<T> where T : BaseEntity
{
    IQueryable<T> Query(bool tracking = false);
    Task<T?> GetByIdAsync(int id, CancellationToken ct = default);
    Task AddAsync(T entity, CancellationToken ct = default);
    Task AddRangeAsync(IEnumerable<T> entities, CancellationToken ct = default);
    void Update(T entity);
    void Delete(T entity);
}
