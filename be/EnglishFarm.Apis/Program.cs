using EnglishFarm.Business.Grammar;
using EnglishFarm.DB;

namespace EnglishFarm.Apis;

public class Program
{
    public static async Task Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();

        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            try
            {
                var db = services.GetRequiredService<EnglishFarmDbContext>();
                var env = services.GetRequiredService<IWebHostEnvironment>();
                string seedPath = Path.Combine(env.ContentRootPath, "Data", "toeic_grammar_seed.json");
                if (File.Exists(seedPath))
                {
                    await GrammarDbSeeder.SeedAsync(db, seedPath);
                }
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogWarning(ex, "GrammarDbSeeder warning: {Message}", ex.Message);
            }
        }

        await host.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
