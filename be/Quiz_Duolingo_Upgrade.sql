-- =========================================================================
-- MIGRATION SCRIPT: CƠ CHẾ DUOLINGO & FLAT NATURALIST CHO QUIZ
-- EnglishFarm Database Migration
-- =========================================================================

USE [LanguageFarmDb];
GO

-- 1. Thêm cột BestStarsClaimed vào UserLessonProgresses
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[UserLessonProgresses]') AND name = 'BestStarsClaimed')
BEGIN
    PRINT 'Đang thêm cột BestStarsClaimed vào bảng UserLessonProgresses...';
    ALTER TABLE [dbo].[UserLessonProgresses] ADD [BestStarsClaimed] INT NOT NULL CONSTRAINT [DF_UserLessonProgresses_BestStarsClaimed] DEFAULT 0;
    PRINT 'Đã thêm cột BestStarsClaimed thành công.';
END
ELSE
BEGIN
    PRINT 'Cột BestStarsClaimed đã tồn tại trong UserLessonProgresses.';
END
GO

-- 2. Tạo bảng UserWordStats theo dõi độ khó & thống kê từng từ vựng của user
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'UserWordStats')
BEGIN
    PRINT 'Đang tạo bảng UserWordStats...';
    CREATE TABLE [dbo].[UserWordStats] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [UserId] INT NOT NULL,
        [VocabularyId] INT NOT NULL,
        [Attempts] INT NOT NULL DEFAULT 0,
        [WrongCount] INT NOT NULL DEFAULT 0,
        [LastSeenAt] DATETIME2 NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [UpdatedAt] DATETIME2 NULL,
        [IsDeleted] BIT NOT NULL DEFAULT 0,
        CONSTRAINT [FK_UserWordStats_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_UserWordStats_Vocabularies] FOREIGN KEY ([VocabularyId]) REFERENCES [dbo].[Vocabularies]([Id]) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX [IX_UserWordStats_UserId_VocabularyId] ON [dbo].[UserWordStats]([UserId], [VocabularyId]);
    PRINT 'Đã tạo bảng UserWordStats thành công.';
END
ELSE
BEGIN
    PRINT 'Bảng UserWordStats đã tồn tại.';
END
GO

-- 3. Tạo bảng QuizSessions lưu phiên bài thi chống gian lận
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QuizSessions')
BEGIN
    PRINT 'Đang tạo bảng QuizSessions...';
    CREATE TABLE [dbo].[QuizSessions] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [SessionId] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
        [UserId] INT NOT NULL,
        [LessonId] INT NOT NULL,
        [QuestionIdsJson] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
        [TotalQuestions] INT NOT NULL DEFAULT 10,
        [CompletedAt] DATETIME2 NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [UpdatedAt] DATETIME2 NULL,
        [IsDeleted] BIT NOT NULL DEFAULT 0,
        CONSTRAINT [FK_QuizSessions_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_QuizSessions_Lessons] FOREIGN KEY ([LessonId]) REFERENCES [dbo].[Lessons]([Id]) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX [IX_QuizSessions_SessionId] ON [dbo].[QuizSessions]([SessionId]);
    PRINT 'Đã tạo bảng QuizSessions thành công.';
END
ELSE
BEGIN
    PRINT 'Bảng QuizSessions đã tồn tại.';
END
GO
