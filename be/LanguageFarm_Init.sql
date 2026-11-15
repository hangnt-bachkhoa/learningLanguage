-- =========================================================================
-- DATABASE: LanguageFarmDb (Hỗ trợ đa ngôn ngữ: Anh, Nhật, Hàn, Trung...)
-- =========================================================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'LanguageFarmDb')
BEGIN
    CREATE DATABASE LanguageFarmDb COLLATE SQL_Latin1_General_CP1_CI_AS;
END
GO

USE LanguageFarmDb;
GO

-- 1. BẢNG Users
IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FullName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        Xp INT NOT NULL DEFAULT 0,
        Coins INT NOT NULL DEFAULT 100,
        Level INT NOT NULL DEFAULT 1,
        RowVersion ROWVERSION NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0
    );
    CREATE UNIQUE INDEX IX_Users_Email ON dbo.Users(Email);
END
GO

-- 2. BẢNG UserPlannerBooks
IF OBJECT_ID('dbo.UserPlannerBooks', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.UserPlannerBooks (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        ModuleType NVARCHAR(30) NOT NULL DEFAULT 'Vocabulary',
        CoverColor NVARCHAR(20) NOT NULL DEFAULT '#78815D',
        Note NVARCHAR(120) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_UserPlannerBooks_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
    );
END
GO

-- 3. BẢNG CropCatalogs (Danh mục nông sản)
IF OBJECT_ID('dbo.CropCatalogs', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.CropCatalogs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Code NVARCHAR(50) NOT NULL,
        NameVi NVARCHAR(100) NOT NULL,
        SeedSpritePath NVARCHAR(150) NULL,
        MatureSpritePath NVARCHAR(150) NULL,
        SeedPriceCoins INT NOT NULL DEFAULT 0,
        GrowthMinutes INT NOT NULL DEFAULT 5,
        HarvestXp INT NOT NULL DEFAULT 20,
        HarvestCoins INT NOT NULL DEFAULT 15,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0
    );
    CREATE UNIQUE INDEX IX_CropCatalogs_Code ON dbo.CropCatalogs(Code);
END
GO

-- 4. BẢNG Lessons (Hỗ trợ cột LanguageCode: en, ja, ko, zh...)
IF OBJECT_ID('dbo.Lessons', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Lessons (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Title NVARCHAR(150) NOT NULL,
        LanguageCode NVARCHAR(10) NOT NULL DEFAULT 'en', -- en | ja | ko | zh | fr | de...
        LevelTag NVARCHAR(20) NOT NULL DEFAULT 'Pre-A1',
        OrderIndex INT NOT NULL DEFAULT 1,
        RequiredCropId INT NULL,
        RequiredCropQty INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_Lessons_CropCatalogs FOREIGN KEY (RequiredCropId) REFERENCES dbo.CropCatalogs(Id) ON DELETE SET NULL
    );
    CREATE INDEX IX_Lessons_LanguageCode ON dbo.Lessons(LanguageCode);
END
GO

-- 5. BẢNG Vocabularies (Hỗ trợ Phonetic dùng chung cho IPA, Romaji, Pinyin, Hangul)
IF OBJECT_ID('dbo.Vocabularies', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Vocabularies (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        LessonId INT NOT NULL,
        Word NVARCHAR(100) NOT NULL,
        Phonetic NVARCHAR(150) NULL, -- Romaji (ja), Pinyin (zh), IPA (en), Hangul (ko)
        IpaUs NVARCHAR(100) NULL,
        IpaUk NVARCHAR(100) NULL,
        WordType NVARCHAR(50) NULL,
        MeaningVi NVARCHAR(200) NOT NULL,
        ExampleEn NVARCHAR(MAX) NULL,
        ExampleVi NVARCHAR(MAX) NULL,
        SpriteKey NVARCHAR(50) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_Vocabularies_Lessons FOREIGN KEY (LessonId) REFERENCES dbo.Lessons(Id) ON DELETE CASCADE
    );
END
GO

-- 6. BẢNG QuizQuestions
IF OBJECT_ID('dbo.QuizQuestions', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.QuizQuestions (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        LessonId INT NOT NULL,
        Prompt NVARCHAR(MAX) NOT NULL,
        SpriteKey NVARCHAR(50) NULL,
        OptionsJson NVARCHAR(MAX) NOT NULL DEFAULT '[]',
        CorrectOptionIndex INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_QuizQuestions_Lessons FOREIGN KEY (LessonId) REFERENCES dbo.Lessons(Id) ON DELETE CASCADE
    );
END
GO

-- 7. BẢNG UserLessonProgresses
IF OBJECT_ID('dbo.UserLessonProgresses', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.UserLessonProgresses (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        LessonId INT NOT NULL,
        IsUnlocked BIT NOT NULL DEFAULT 0,
        BestScorePercent INT NOT NULL DEFAULT 0,
        IsRewardClaimed BIT NOT NULL DEFAULT 0,
        FirstPassedAt DATETIME2 NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_UserLessonProgresses_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        CONSTRAINT FK_UserLessonProgresses_Lessons FOREIGN KEY (LessonId) REFERENCES dbo.Lessons(Id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IX_UserLessonProgresses_User_Lesson ON dbo.UserLessonProgresses(UserId, LessonId);
END
GO

-- 8. BẢNG ReviewSchedules (Ebbinghaus)
IF OBJECT_ID('dbo.ReviewSchedules', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.ReviewSchedules (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        LessonId INT NOT NULL,
        ModuleType NVARCHAR(20) NOT NULL DEFAULT 'Vocabulary',
        ScheduledDate DATE NOT NULL,
        FirstDone BIT NOT NULL DEFAULT 0,
        Day1Done BIT NOT NULL DEFAULT 0,
        Day3Done BIT NOT NULL DEFAULT 0,
        Day7Done BIT NOT NULL DEFAULT 0,
        Day14Done BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_ReviewSchedules_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        CONSTRAINT FK_ReviewSchedules_Lessons FOREIGN KEY (LessonId) REFERENCES dbo.Lessons(Id) ON DELETE CASCADE
    );
END
GO

-- 9. BẢNG FarmPlots (9 ô đất 3x3)
IF OBJECT_ID('dbo.FarmPlots', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.FarmPlots (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        PlotIndex INT NOT NULL,
        Status INT NOT NULL DEFAULT 0, -- 0: Locked, 1: Empty, 2: Seeded, 3: Growing, 4: Ready
        CropId INT NULL,
        IsWatered BIT NOT NULL DEFAULT 0,
        GrowthProgress INT NOT NULL DEFAULT 0,
        PlantedAt DATETIME2 NULL,
        PlantedAtUtc DATETIME2 NULL,
        HarvestableAtUtc DATETIME2 NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_FarmPlots_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        CONSTRAINT FK_FarmPlots_CropCatalogs FOREIGN KEY (CropId) REFERENCES dbo.CropCatalogs(Id) ON DELETE SET NULL
    );
    CREATE UNIQUE INDEX IX_FarmPlots_User_PlotIndex ON dbo.FarmPlots(UserId, PlotIndex);
END
GO

-- 10. BẢNG UserInventories
IF OBJECT_ID('dbo.UserInventories', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.UserInventories (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        ItemType INT NOT NULL, -- 1: Seed, 2: Water, 3: Fertilizer, 4: HarvestedCrop, 5: Decor
        ItemCode NVARCHAR(50) NOT NULL,
        Quantity INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_UserInventories_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IX_UserInventories_User_ItemType_Code ON dbo.UserInventories(UserId, ItemType, ItemCode);
END
GO

-- 11. BẢNG ShopProducts
IF OBJECT_ID('dbo.ShopProducts', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.ShopProducts (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Category NVARCHAR(30) NOT NULL DEFAULT 'seeds',
        NameVi NVARCHAR(120) NOT NULL,
        ItemCode NVARCHAR(50) NOT NULL,
        PriceCoins INT NOT NULL DEFAULT 0,
        Description NVARCHAR(MAX) NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0
    );
END
GO

-- 12. BẢNG ShopOrders & ShopOrderItems
IF OBJECT_ID('dbo.ShopOrders', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.ShopOrders (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        TotalCoins INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_ShopOrders_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
    );
END
GO

IF OBJECT_ID('dbo.ShopOrderItems', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.ShopOrderItems (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        ShopOrderId INT NOT NULL,
        ShopProductId INT NOT NULL,
        Quantity INT NOT NULL DEFAULT 1,
        UnitPriceCoins INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_ShopOrderItems_ShopOrders FOREIGN KEY (ShopOrderId) REFERENCES dbo.ShopOrders(Id) ON DELETE CASCADE,
        CONSTRAINT FK_ShopOrderItems_ShopProducts FOREIGN KEY (ShopProductId) REFERENCES dbo.ShopProducts(Id)
    );
END
GO

-- 13. SEED DỮ LIỆU BAN ĐẦU
-- Cây trồng
IF NOT EXISTS (SELECT 1 FROM dbo.CropCatalogs WHERE Code = 'carrot')
BEGIN
    INSERT INTO dbo.CropCatalogs (Code, NameVi, SeedPriceCoins, GrowthMinutes, HarvestXp, HarvestCoins)
    VALUES 
    ('carrot', N'Cà rốt', 10, 5, 20, 15),
    ('potato', N'Khoai tây', 15, 6, 25, 20),
    ('corn', N'Bắp ngô', 20, 8, 35, 30),
    ('tomato', N'Cà chua', 30, 10, 50, 45),
    ('strawberry', N'Dâu tây', 40, 12, 60, 55),
    ('apple', N'Táo đỏ', 50, 15, 80, 70),
    ('sunflower', N'Hoa hướng dương', 50, 15, 80, 70);
END
GO

-- Shop vật phẩm
IF NOT EXISTS (SELECT 1 FROM dbo.ShopProducts WHERE ItemCode = 'carrot')
BEGIN
    INSERT INTO dbo.ShopProducts (Category, NameVi, ItemCode, PriceCoins, Description)
    VALUES
    ('seeds', N'Túi hạt giống Cà rốt', 'carrot', 10, N'Hạt giống rau củ cơ bản, lớn sau 2 phút'),
    ('seeds', N'Túi hạt giống Bắp ngô', 'corn', 20, N'Cây ngô giàu năng lượng, lớn sau 5 phút'),
    ('seeds', N'Túi hạt giống Cà chua', 'tomato', 30, N'Cà chua mọng nước, lớn sau 8 phút'),
    ('care', N'Bình tưới nước cao cấp', 'water_can', 50, N'Tưới nước tăng trưởng nhanh');
END
GO

-- Bài học mẫu (Đa ngôn ngữ: Tiếng Anh 'en' và Tiếng Nhật 'ja')
IF NOT EXISTS (SELECT 1 FROM dbo.Lessons WHERE Title = 'Fruits & Vegetables')
BEGIN
    -- Bài 1: Tiếng Anh
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES ('Fruits & Vegetables', 'en', 'Pre-A1', 1, NULL, 0);

    DECLARE @LessonEnId INT = SCOPE_IDENTITY();

    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, IpaUs, WordType, MeaningVi, ExampleEn, ExampleVi)
    VALUES 
    (@LessonEnId, 'Carrot', '/ˈkær.ət/', '/ˈkær.ət/', 'noun', N'Củ cà rốt', 'Rabbits love eating carrots.', N'Thỏ rất thích ăn cà rốt.'),
    (@LessonEnId, 'Corn', '/kɔːrn/', '/kɔːrn/', 'noun', N'Bắp ngô', 'We grill corn in the summer.', N'Chúng tôi nướng ngô vào mùa hè.');

    -- Bài 2: Tiếng Nhật
    INSERT INTO dbo.Lessons (Title, LanguageCode, LevelTag, OrderIndex, RequiredCropId, RequiredCropQty)
    VALUES (N'野菜と果物 (Rau củ)', 'ja', 'N5', 1, NULL, 0);

    DECLARE @LessonJaId INT = SCOPE_IDENTITY();

    INSERT INTO dbo.Vocabularies (LessonId, Word, Phonetic, WordType, MeaningVi, ExampleEn, ExampleVi)
    VALUES 
    (@LessonJaId, N'にんじん (Ninjin)', 'ninjin', 'noun', N'Củ cà rốt', 'ウサギはにんじんが好きです。', N'Thỏ thích cà rốt.');
END
GO

-- User mặc định
IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = 'farmer@languagefarm.com')
BEGIN
    INSERT INTO dbo.Users (FullName, Email, PasswordHash, Xp, Coins, Level)
    VALUES (N'Nông Dân Chăm Học', 'farmer@languagefarm.com', 'default_hash', 0, 100, 1);

    DECLARE @NewUserId INT = SCOPE_IDENTITY();

    INSERT INTO dbo.FarmPlots (UserId, PlotIndex, Status)
    VALUES 
    (@NewUserId, 0, 1), (@NewUserId, 1, 1), (@NewUserId, 2, 1),
    (@NewUserId, 3, 0), (@NewUserId, 4, 0), (@NewUserId, 5, 0),
    (@NewUserId, 6, 0), (@NewUserId, 7, 0), (@NewUserId, 8, 0);

    INSERT INTO dbo.UserInventories (UserId, ItemType, ItemCode, Quantity)
    VALUES (@NewUserId, 1, 'carrot', 3);
END
GO

-- 14. BẢNG GrammarTopics, GrammarQuestions, UserGrammarProgresses
IF OBJECT_ID('dbo.GrammarTopics', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.GrammarTopics (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Code NVARCHAR(50) NOT NULL,
        Level NVARCHAR(30) NOT NULL,
        ToeicTarget NVARCHAR(50) NOT NULL,
        OrderIndex INT NOT NULL DEFAULT 1,
        TitleEn NVARCHAR(200) NOT NULL,
        TitleVi NVARCHAR(200) NOT NULL,
        Summary NVARCHAR(1000) NOT NULL,
        RulesJson NVARCHAR(MAX) NOT NULL DEFAULT '[]',
        TrapsJson NVARCHAR(MAX) NOT NULL DEFAULT '[]',
        ExamplesJson NVARCHAR(MAX) NOT NULL DEFAULT '[]',
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0
    );
    CREATE UNIQUE INDEX IX_GrammarTopics_Code ON dbo.GrammarTopics(Code);
    CREATE INDEX IX_GrammarTopics_OrderIndex ON dbo.GrammarTopics(OrderIndex);
END
GO

IF OBJECT_ID('dbo.GrammarQuestions', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.GrammarQuestions (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        GrammarTopicId INT NOT NULL,
        Prompt NVARCHAR(MAX) NOT NULL,
        OptionsJson NVARCHAR(MAX) NOT NULL,
        CorrectIndex INT NOT NULL DEFAULT 0,
        ExplanationVi NVARCHAR(MAX) NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_GrammarQuestions_GrammarTopics FOREIGN KEY (GrammarTopicId) REFERENCES dbo.GrammarTopics(Id) ON DELETE CASCADE
    );
    CREATE INDEX IX_GrammarQuestions_GrammarTopicId ON dbo.GrammarQuestions(GrammarTopicId);
END
GO

IF OBJECT_ID('dbo.UserGrammarProgresses', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.UserGrammarProgresses (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        GrammarTopicId INT NOT NULL,
        IsStudied BIT NOT NULL DEFAULT 0,
        BestStarsClaimed INT NOT NULL DEFAULT 0,
        LastPracticedAt DATETIME2 NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_UserGrammarProgresses_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        CONSTRAINT FK_UserGrammarProgresses_GrammarTopics FOREIGN KEY (GrammarTopicId) REFERENCES dbo.GrammarTopics(Id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IX_UserGrammarProgresses_User_Topic ON dbo.UserGrammarProgresses(UserId, GrammarTopicId);
END
GO
