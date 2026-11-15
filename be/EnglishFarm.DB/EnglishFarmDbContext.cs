using EnglishFarm.Entities.Farm;
using EnglishFarm.Entities.Grammar;
using EnglishFarm.Entities.Learning;
using EnglishFarm.Entities.Shop;
using EnglishFarm.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.DB;

public class EnglishFarmDbContext : DbContext
{
    public EnglishFarmDbContext(DbContextOptions<EnglishFarmDbContext> options) : base(options) { }

    public DbSet<UserEntity> Users => Set<UserEntity>();
    public DbSet<UserPlannerBookEntity> UserPlannerBooks => Set<UserPlannerBookEntity>();
    public DbSet<LessonEntity> Lessons => Set<LessonEntity>();
    public DbSet<VocabularyEntity> Vocabularies => Set<VocabularyEntity>();
    public DbSet<QuizQuestionEntity> QuizQuestions => Set<QuizQuestionEntity>();
    public DbSet<UserWordStatEntity> UserWordStats => Set<UserWordStatEntity>();
    public DbSet<QuizSessionEntity> QuizSessions => Set<QuizSessionEntity>();
    public DbSet<UserLessonProgressEntity> UserLessonProgresses => Set<UserLessonProgressEntity>();
    public DbSet<ReviewScheduleEntity> ReviewSchedules => Set<ReviewScheduleEntity>();
    public DbSet<CropCatalogEntity> CropCatalogs => Set<CropCatalogEntity>();
    public DbSet<FarmPlotEntity> FarmPlots => Set<FarmPlotEntity>();
    public DbSet<UserInventoryEntity> UserInventories => Set<UserInventoryEntity>();
    public DbSet<ShopProductEntity> ShopProducts => Set<ShopProductEntity>();
    public DbSet<ShopOrderEntity> ShopOrders => Set<ShopOrderEntity>();
    public DbSet<ShopOrderItemEntity> ShopOrderItems => Set<ShopOrderItemEntity>();

    // TOEIC Grammar Module
    public DbSet<GrammarTopicEntity> GrammarTopics => Set<GrammarTopicEntity>();
    public DbSet<GrammarQuestionEntity> GrammarQuestions => Set<GrammarQuestionEntity>();
    public DbSet<UserGrammarProgressEntity> UserGrammarProgresses => Set<UserGrammarProgressEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Tự động load toàn bộ IEntityTypeConfiguration trong Assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(EnglishFarmDbContext).Assembly);
    }
}
