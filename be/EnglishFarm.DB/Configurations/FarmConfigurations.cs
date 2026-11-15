using EnglishFarm.Entities.Farm;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EnglishFarm.DB.Configurations;

public class CropCatalogConfiguration : IEntityTypeConfiguration<CropCatalogEntity>
{
    public void Configure(EntityTypeBuilder<CropCatalogEntity> builder)
    {
        builder.ToTable("CropCatalogs");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Code).HasMaxLength(50).IsRequired();
        builder.Property(x => x.NameVi).HasMaxLength(100).IsRequired();
        builder.Property(x => x.SeedSpritePath).HasMaxLength(150);
        builder.Property(x => x.MatureSpritePath).HasMaxLength(150);

        builder.HasIndex(x => x.Code).IsUnique();

        builder.HasOne(x => x.RequiredLesson)
               .WithMany()
               .HasForeignKey(x => x.RequiredLessonId)
               .OnDelete(DeleteBehavior.SetNull);
    }
}

public class FarmPlotConfiguration : IEntityTypeConfiguration<FarmPlotEntity>
{
    public void Configure(EntityTypeBuilder<FarmPlotEntity> builder)
    {
        builder.ToTable("FarmPlots");
        builder.HasKey(x => x.Id);

        // Unique index: Mỗi user chỉ có đúng 1 plot tại mỗi vị trí (0..8)
        builder.HasIndex(x => new { x.UserId, x.PlotIndex }).IsUnique();

        builder.HasOne(x => x.User)
               .WithMany(u => u.FarmPlots)
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Crop)
               .WithMany()
               .HasForeignKey(x => x.CropId)
               .OnDelete(DeleteBehavior.SetNull);
    }
}

public class UserInventoryConfiguration : IEntityTypeConfiguration<UserInventoryEntity>
{
    public void Configure(EntityTypeBuilder<UserInventoryEntity> builder)
    {
        builder.ToTable("UserInventories");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.ItemCode).HasMaxLength(50).IsRequired();

        // Unique index chống trùng dữ liệu inventory
        builder.HasIndex(x => new { x.UserId, x.ItemType, x.ItemCode }).IsUnique();

        builder.HasOne(x => x.User)
               .WithMany(u => u.Inventories)
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
