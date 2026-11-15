using EnglishFarm.Entities.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EnglishFarm.DB.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.FullName).HasMaxLength(100).IsRequired();
        builder.Property(x => x.Email).HasMaxLength(150).IsRequired();
        builder.HasIndex(x => x.Email).IsUnique();
        
        // Optimistic Concurrency Token
        builder.Property(x => x.RowVersion).IsRowVersion();
    }
}

public class UserPlannerBookConfiguration : IEntityTypeConfiguration<UserPlannerBookEntity>
{
    public void Configure(EntityTypeBuilder<UserPlannerBookEntity> builder)
    {
        builder.ToTable("UserPlannerBooks");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.ModuleType).HasMaxLength(30).IsRequired();
        builder.Property(x => x.CoverColor).HasMaxLength(20).IsRequired();
        builder.Property(x => x.Note).HasMaxLength(120);

        builder.HasOne(x => x.User)
               .WithMany(u => u.PlannerBooks)
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
