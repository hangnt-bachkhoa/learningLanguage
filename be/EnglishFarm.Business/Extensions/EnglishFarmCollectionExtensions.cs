using EnglishFarm.Business.Common;
using EnglishFarm.Business.Farm;
using EnglishFarm.Business.Grammar;
using EnglishFarm.Business.Learning;
using EnglishFarm.Business.Shop;
using EnglishFarm.Business.User;
using EnglishFarm.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EnglishFarm.Business.Extensions;

public static class EnglishFarmCollectionExtensions
{
    public static IServiceCollection AddEnglishFarmComponents(this IServiceCollection services, IConfiguration configuration)
    {
        // 1. DbContext
        services.AddDbContext<EnglishFarmDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        // 2. UnitOfWork & Repositories
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        // 3. Domain Services
        services.AddScoped<IFarmService, FarmService>();
        services.AddScoped<IShopService, ShopService>();
        services.AddScoped<ILearningService, LearningService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IGrammarService, GrammarService>();

        return services;
    }
}
