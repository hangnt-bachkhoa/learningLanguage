using EnglishFarm.Entities.Shop;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EnglishFarm.DB.Configurations;

public class ShopProductConfiguration : IEntityTypeConfiguration<ShopProductEntity>
{
    public void Configure(EntityTypeBuilder<ShopProductEntity> builder)
    {
        builder.ToTable("ShopProducts");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Category).HasMaxLength(30).IsRequired();
        builder.Property(x => x.NameVi).HasMaxLength(120).IsRequired();
        builder.Property(x => x.ItemCode).HasMaxLength(50);
    }
}

public class ShopOrderConfiguration : IEntityTypeConfiguration<ShopOrderEntity>
{
    public void Configure(EntityTypeBuilder<ShopOrderEntity> builder)
    {
        builder.ToTable("ShopOrders");
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.User)
               .WithMany()
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class ShopOrderItemConfiguration : IEntityTypeConfiguration<ShopOrderItemEntity>
{
    public void Configure(EntityTypeBuilder<ShopOrderItemEntity> builder)
    {
        builder.ToTable("ShopOrderItems");
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.ShopOrder)
               .WithMany(o => o.Items)
               .HasForeignKey(x => x.ShopOrderId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.ShopProduct)
               .WithMany()
               .HasForeignKey(x => x.ShopProductId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
