using EnglishFarm.Models.Grammar;

namespace EnglishFarm.Business.Grammar;

public interface IGrammarService
{
    Task<List<GrammarTopicResponseModel>> GetTopicsAsync(int userId, CancellationToken ct = default);
    Task MarkAsStudiedAsync(int userId, string topicCode, CancellationToken ct = default);
    Task<GrammarQuizResultResponseModel> CompleteQuizAsync(int userId, string topicCode, CompleteGrammarQuizRequestModel model, CancellationToken ct = default);
}
