using System.ComponentModel.DataAnnotations;

namespace EnglishFarm.Models.User;

public class UserProfileResponseModel
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Xp { get; set; }
    public int Coins { get; set; }
    public int Level { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UpdatePlannerBookRequestModel
{
    [Required, MaxLength(30)]
    public string ModuleType { get; set; } = "Vocabulary";

    [MaxLength(20)]
    public string CoverColor { get; set; } = "#78815D";

    [MaxLength(120)]
    public string? Note { get; set; }
}

public class PlannerBookResponseModel
{
    public int Id { get; set; }
    public string ModuleType { get; set; } = string.Empty;
    public string CoverColor { get; set; } = string.Empty;
    public string? Note { get; set; }
}
