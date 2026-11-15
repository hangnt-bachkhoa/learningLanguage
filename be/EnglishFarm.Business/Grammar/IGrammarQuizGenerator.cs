using EnglishFarm.Models.Grammar;

namespace EnglishFarm.Business.Grammar;

public interface IGrammarQuizGenerator
{
    Task<List<GrammarQuestionResponseModel>> BuildGrammarTestSessionAsync(
        string topicCode,
        int userId,
        int sessionSize = 10,
        CancellationToken ct = default);
}
