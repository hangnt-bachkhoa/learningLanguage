namespace EnglishFarm.Entities.Farm;

public enum PlotStatus
{
    Locked = 0,
    Empty = 1,
    Seeded = 2,
    Growing = 3,
    Ready = 4
}

public enum InventoryItemType
{
    Seed = 1,
    Water = 2,
    Fertilizer = 3,
    HarvestedCrop = 4,
    Decor = 5
}
