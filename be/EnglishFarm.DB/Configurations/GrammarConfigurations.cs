using EnglishFarm.Entities.Grammar;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EnglishFarm.DB.Configurations;

public class GrammarTopicConfiguration : IEntityTypeConfiguration<GrammarTopicEntity>
{
    public void Configure(EntityTypeBuilder<GrammarTopicEntity> builder)
    {
        builder.ToTable("GrammarTopics");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Code).HasMaxLength(50).IsRequired();
        builder.Property(x => x.Level).HasMaxLength(30).IsRequired();
        builder.Property(x => x.ToeicTarget).HasMaxLength(50).IsRequired();
        builder.Property(x => x.TitleEn).HasMaxLength(200).IsRequired();
        builder.Property(x => x.TitleVi).HasMaxLength(200).IsRequired();
        builder.Property(x => x.Summary).HasMaxLength(1000).IsRequired();

        builder.HasIndex(x => x.Code).IsUnique();
        builder.HasIndex(x => x.OrderIndex);
    }
}

public class GrammarQuestionConfiguration : IEntityTypeConfiguration<GrammarQuestionEntity>
{
    public void Configure(EntityTypeBuilder<GrammarQuestionEntity> builder)
    {
        builder.ToTable("GrammarQuestions");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Prompt).IsRequired();
        builder.Property(x => x.OptionsJson).IsRequired();
        builder.Property(x => x.ExplanationVi).IsRequired();

        builder.HasOne(x => x.GrammarTopic)
               .WithMany(t => t.Questions)
               .HasForeignKey(x => x.GrammarTopicId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class UserGrammarProgressConfiguration : IEntityTypeConfiguration<UserGrammarProgressEntity>
{
    public void Configure(EntityTypeBuilder<UserGrammarProgressEntity> builder)
    {
        builder.ToTable("UserGrammarProgresses");
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => new { x.UserId, x.GrammarTopicId }).IsUnique();

        builder.HasOne(x => x.User)
               .WithMany(u => u.GrammarProgresses)
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.GrammarTopic)
               .WithMany(t => t.UserProgresses)
               .HasForeignKey(x => x.GrammarTopicId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
