using EnglishFarm.Models.Learning;

namespace EnglishFarm.Business.Learning;

public interface ILearningService
{
    Task<List<LessonResponseModel>> GetLessonsAsync(int userId, string? languageCode = null, CancellationToken ct = default);
    Task<List<VocabularyResponseModel>> GetVocabulariesAsync(int lessonId, CancellationToken ct = default);
    Task<QuizSessionResponseModel> GetQuizSessionAsync(int userId, int lessonId, CancellationToken ct = default);
    Task<List<QuizQuestionResponseModel>> GetQuizQuestionsAsync(int lessonId, CancellationToken ct = default);
    Task<QuizResultResponseModel> SubmitQuizAsync(int userId, SubmitQuizRequestModel model, CancellationToken ct = default);
    Task<List<ReviewScheduleResponseModel>> GetReviewSchedulesAsync(int userId, CancellationToken ct = default);
    Task<CompleteReviewResponseModel> CompleteReviewAsync(int userId, CompleteReviewRequestModel model, CancellationToken ct = default);
}
