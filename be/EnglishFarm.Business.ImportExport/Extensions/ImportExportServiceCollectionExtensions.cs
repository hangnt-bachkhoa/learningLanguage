using EnglishFarm.Business.ImportExport.Services;
using Microsoft.Extensions.DependencyInjection;

namespace EnglishFarm.Business.ImportExport.Extensions;

public static class ImportExportServiceCollectionExtensions
{
    public static IServiceCollection AddVocabularyImportExport(this IServiceCollection services)
    {
        services.AddScoped<IVocabularyImportExportService, VocabularyImportExportService>();
        return services;
    }
}
