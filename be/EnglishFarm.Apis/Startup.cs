using EnglishFarm.Business.Extensions;
using EnglishFarm.Business.ImportExport.Extensions;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace EnglishFarm.Apis;

public class Startup
{
    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        Environment = environment;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();

        // Cấu hình Swagger
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Language Farm API",
                Version = "v1",
                Description = "Hệ thống Web API Nông trại Học ngoại ngữ (Language Farm)"
            });
        });

        // Đăng ký toàn bộ DbContext, Repositories, UnitOfWork và Services
        services.AddEnglishFarmComponents(Configuration);
        services.AddVocabularyImportExport();

        // Cấu hình CORS
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        // Cấu hình Swagger chạy tại index gốc (RoutePrefix = string.Empty)
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Language Farm API v1");
            c.RoutePrefix = string.Empty; // Truy cập trực tiếp tại http://localhost:PORT/ hoặc http://localhost:PORT/index.html
            c.DocumentTitle = "Language Farm Swagger UI";
        });

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
