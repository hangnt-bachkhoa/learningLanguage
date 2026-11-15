namespace EnglishFarm.Entities.Common;

public interface IIdEntity<TKey>
{
    TKey Id { get; set; }
}
