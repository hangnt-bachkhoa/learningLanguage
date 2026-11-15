using EnglishFarm.Entities.Learning;
using EnglishFarm.Models.Learning;

namespace EnglishFarm.Business.Learning;

public static class LearningMapper
{
    public static LessonResponseModel ToResponse(LessonEntity entity, bool isUnlocked, int bestStarsClaimed = 0)
    {
        return new LessonResponseModel
        {
            Id = entity.Id,
            Title = entity.Title,
            LanguageCode = entity.LanguageCode,
            LevelTag = entity.LevelTag,
            OrderIndex = entity.OrderIndex,
            IsUnlocked = isUnlocked,
            RequiredCropId = entity.RequiredCropId,
            RequiredCropQty = entity.RequiredCropQty,
            RequiredCropName = entity.RequiredCrop?.NameVi,
            BestStarsClaimed = bestStarsClaimed
        };
    }

    public static VocabularyResponseModel ToResponse(VocabularyEntity entity)
    {
        return new VocabularyResponseModel
        {
            Id = entity.Id,
            Word = entity.Word,
            Phonetic = entity.Phonetic,
            IpaUs = entity.IpaUs,
            IpaUk = entity.IpaUk,
            WordType = entity.WordType,
            MeaningVi = entity.MeaningVi,
            ExampleEn = entity.ExampleEn,
            ExampleVi = entity.ExampleVi,
            SpriteKey = entity.SpriteKey
        };
    }
}
