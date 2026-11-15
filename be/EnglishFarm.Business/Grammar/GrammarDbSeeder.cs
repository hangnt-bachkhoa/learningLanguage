using System.Text.Json;
using EnglishFarm.DB;
using EnglishFarm.Entities.Grammar;
using Microsoft.EntityFrameworkCore;

namespace EnglishFarm.Business.Grammar;

public static class GrammarDbSeeder
{
    private record SeedQuestionDto(string Prompt, List<string> Options, int CorrectIndex, string ExplanationVi);
    private record SeedExampleDto(string En, string Vi);
    private record SeedTopicDto(
        string Code, string Level, string ToeicTarget, int OrderIndex,
        string TitleEn, string TitleVi, string Summary,
        List<string> Rules, List<string> Traps, List<SeedExampleDto> Examples,
        List<SeedQuestionDto> Questions
    );

    public static async Task SeedAsync(EnglishFarmDbContext db, string jsonPath)
    {
        if (await db.GrammarTopics.AnyAsync() || !File.Exists(jsonPath)) return;

        var json = await File.ReadAllTextAsync(jsonPath);
        var items = JsonSerializer.Deserialize<List<SeedTopicDto>>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? [];

        foreach (var item in items)
        {
            var topic = new GrammarTopicEntity
            {
                Code = item.Code,
                Level = item.Level,
                ToeicTarget = item.ToeicTarget,
                OrderIndex = item.OrderIndex,
                TitleEn = item.TitleEn,
                TitleVi = item.TitleVi,
                Summary = item.Summary,
                RulesJson = JsonSerializer.Serialize(item.Rules),
                TrapsJson = JsonSerializer.Serialize(item.Traps),
                ExamplesJson = JsonSerializer.Serialize(item.Examples),
                Questions = item.Questions.Select(q => new GrammarQuestionEntity
                {
                    Prompt = q.Prompt,
                    OptionsJson = JsonSerializer.Serialize(q.Options),
                    CorrectIndex = q.CorrectIndex,
                    ExplanationVi = q.ExplanationVi
                }).ToList()
            };
            db.GrammarTopics.Add(topic);
        }

        await db.SaveChangesAsync();
    }
}
