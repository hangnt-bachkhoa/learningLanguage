namespace EnglishFarm.Models.Grammar;

public class GrammarExampleModel
{
    public string En { get; set; } = string.Empty;
    public string Vi { get; set; } = string.Empty;
}

public class GrammarQuestionResponseModel
{
    public int Id { get; set; }
    public string Prompt { get; set; } = string.Empty;
    public List<string> Options { get; set; } = new();
    public int CorrectIndex { get; set; }
    public string ExplanationVi { get; set; } = string.Empty;
}

public class GrammarTopicResponseModel
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Level { get; set; } = "Pre-A1";
    public string ToeicTarget { get; set; } = string.Empty;
    public int OrderIndex { get; set; }
    public string TitleEn { get; set; } = string.Empty;
    public string TitleVi { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public List<string> Rules { get; set; } = new();
    public List<string> Traps { get; set; } = new();
    public List<GrammarExampleModel> Examples { get; set; } = new();
    public List<GrammarQuestionResponseModel> Questions { get; set; } = new();

    // User Progress
    public bool IsStudied { get; set; }
    public int BestStarsClaimed { get; set; }
    public DateTime? LastPracticedAt { get; set; }
}

public class CompleteGrammarQuizRequestModel
{
    public int FirstTryCorrect { get; set; }
    public int TotalQuestions { get; set; }
}

public class GrammarQuizResultResponseModel
{
    public int Stars { get; set; }
    public int BestStarsClaimed { get; set; }
    public bool IsNewRecord { get; set; }
    public int RewardXp { get; set; }
    public int RewardCoins { get; set; }
    public int FirstTryCorrect { get; set; }
    public int TotalQuestions { get; set; }
    public int ScorePercent { get; set; }
    public int Level { get; set; }
    public int CurrentXp { get; set; }
    public int NextLevelXpRequired { get; set; }
    public string Message { get; set; } = string.Empty;
}
