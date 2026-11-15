using EnglishFarm.Entities.Learning;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EnglishFarm.DB.Configurations;

public class LessonConfiguration : IEntityTypeConfiguration<LessonEntity>
{
    public void Configure(EntityTypeBuilder<LessonEntity> builder)
    {
        builder.ToTable("Lessons");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Title).HasMaxLength(150).IsRequired();
        builder.Property(x => x.LanguageCode).HasMaxLength(10).HasDefaultValue("en").IsRequired();
        builder.Property(x => x.LevelTag).HasMaxLength(20).IsRequired();
        builder.HasIndex(x => x.LanguageCode);

        builder.HasOne(x => x.RequiredCrop)
               .WithMany()
               .HasForeignKey(x => x.RequiredCropId)
               .OnDelete(DeleteBehavior.SetNull);
    }
}

public class VocabularyConfiguration : IEntityTypeConfiguration<VocabularyEntity>
{
    public void Configure(EntityTypeBuilder<VocabularyEntity> builder)
    {
        builder.ToTable("Vocabularies");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Word).HasMaxLength(100).IsRequired();
        builder.Property(x => x.Phonetic).HasMaxLength(150);
        builder.Property(x => x.IpaUs).HasMaxLength(100);
        builder.Property(x => x.IpaUk).HasMaxLength(100);
        builder.Property(x => x.WordType).HasMaxLength(50);
        builder.Property(x => x.MeaningVi).HasMaxLength(200).IsRequired();
        builder.Property(x => x.SpriteKey).HasMaxLength(50);

        builder.HasOne(x => x.Lesson)
               .WithMany(l => l.Vocabularies)
               .HasForeignKey(x => x.LessonId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class QuizQuestionConfiguration : IEntityTypeConfiguration<QuizQuestionEntity>
{
    public void Configure(EntityTypeBuilder<QuizQuestionEntity> builder)
    {
        builder.ToTable("QuizQuestions");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Prompt).IsRequired();
        builder.Property(x => x.SpriteKey).HasMaxLength(50);
        builder.Property(x => x.OptionsJson).IsRequired();

        builder.HasOne(x => x.Lesson)
               .WithMany(l => l.QuizQuestions)
               .HasForeignKey(x => x.LessonId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class UserLessonProgressConfiguration : IEntityTypeConfiguration<UserLessonProgressEntity>
{
    public void Configure(EntityTypeBuilder<UserLessonProgressEntity> builder)
    {
        builder.ToTable("UserLessonProgresses");
        builder.HasKey(x => x.Id);

        // Unique index đảm bảo mỗi User chỉ có 1 bản ghi tiến độ cho 1 bài
        builder.HasIndex(x => new { x.UserId, x.LessonId }).IsUnique();

        builder.HasOne(x => x.User)
               .WithMany(u => u.LessonProgresses)
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Lesson)
               .WithMany()
               .HasForeignKey(x => x.LessonId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class ReviewScheduleConfiguration : IEntityTypeConfiguration<ReviewScheduleEntity>
{
    public void Configure(EntityTypeBuilder<ReviewScheduleEntity> builder)
    {
        builder.ToTable("ReviewSchedules");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.ModuleType).HasMaxLength(20);

        builder.HasOne(x => x.User)
               .WithMany()
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Lesson)
               .WithMany()
               .HasForeignKey(x => x.LessonId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class UserWordStatConfiguration : IEntityTypeConfiguration<UserWordStatEntity>
{
    public void Configure(EntityTypeBuilder<UserWordStatEntity> builder)
    {
        builder.ToTable("UserWordStats");
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => new { x.UserId, x.VocabularyId }).IsUnique();

        builder.HasOne(x => x.User)
               .WithMany()
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Vocabulary)
               .WithMany()
               .HasForeignKey(x => x.VocabularyId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}

public class QuizSessionConfiguration : IEntityTypeConfiguration<QuizSessionEntity>
{
    public void Configure(EntityTypeBuilder<QuizSessionEntity> builder)
    {
        builder.ToTable("QuizSessions");
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.SessionId).IsUnique();

        builder.HasOne(x => x.User)
               .WithMany()
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Lesson)
               .WithMany()
               .HasForeignKey(x => x.LessonId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
