-- =========================================================================
-- BỔ SUNG CỘT PHÂN CẤP HẠT GIỐNG & ĐIỀU KIỆN MỞ KHÓA CHO CROPCATALOGS
-- =========================================================================

USE [LanguageFarmDb];
GO

-- 1. Thêm các cột phân cấp hạt giống vào CropCatalogs nếu chưa có
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CropCatalogs]') AND name = 'Tier')
BEGIN
    ALTER TABLE [dbo].[CropCatalogs] ADD [Tier] INT NOT NULL DEFAULT 1;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CropCatalogs]') AND name = 'RequiredXp')
BEGIN
    ALTER TABLE [dbo].[CropCatalogs] ADD [RequiredXp] INT NOT NULL DEFAULT 0;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CropCatalogs]') AND name = 'RequiredLevel')
BEGIN
    ALTER TABLE [dbo].[CropCatalogs] ADD [RequiredLevel] INT NOT NULL DEFAULT 1;
END
GO

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[CropCatalogs]') AND name = 'RequiredLessonId')
BEGIN
    ALTER TABLE [dbo].[CropCatalogs] ADD [RequiredLessonId] INT NULL;
    ALTER TABLE [dbo].[CropCatalogs] ADD CONSTRAINT FK_CropCatalogs_Lessons FOREIGN KEY ([RequiredLessonId]) REFERENCES [dbo].[Lessons]([Id]);
END
GO

-- 2. Cập nhật phân cấp và điều kiện mở khóa cho từng loại cây
-- Tier 1: Mầm xanh / Tập sự (Pre-A1)
UPDATE [dbo].[CropCatalogs]
SET [Tier] = 1, [RequiredLevel] = 1, [RequiredXp] = 0, [RequiredLessonId] = 1
WHERE [Code] = 'carrot';

UPDATE [dbo].[CropCatalogs]
SET [Tier] = 1, [RequiredLevel] = 1, [RequiredXp] = 50, [RequiredLessonId] = 3
WHERE [Code] = 'corn';

-- Tier 2: Hoa trái / Nông dân (TOEIC 450)
UPDATE [dbo].[CropCatalogs]
SET [Tier] = 2, [RequiredLevel] = 2, [RequiredXp] = 100, [RequiredLessonId] = 5
WHERE [Code] = 'tomato';

UPDATE [dbo].[CropCatalogs]
SET [Tier] = 2, [RequiredLevel] = 2, [RequiredXp] = 150, [RequiredLessonId] = 4
WHERE [Code] = 'sunflower';

UPDATE [dbo].[CropCatalogs]
SET [Tier] = 2, [RequiredLevel] = 2, [RequiredXp] = 200, [RequiredLessonId] = 6
WHERE [Code] = 'tulip';

-- Tier 3: Làm vườn / Hoa kiểng (TOEIC 650)
UPDATE [dbo].[CropCatalogs]
SET [Tier] = 3, [RequiredLevel] = 3, [RequiredXp] = 280, [RequiredLessonId] = 8
WHERE [Code] = 'rose';

UPDATE [dbo].[CropCatalogs]
SET [Tier] = 3, [RequiredLevel] = 3, [RequiredXp] = 340, [RequiredLessonId] = 10
WHERE [Code] = 'lemon';

UPDATE [dbo].[CropCatalogs]
SET [Tier] = 3, [RequiredLevel] = 3, [RequiredXp] = 420, [RequiredLessonId] = 12
WHERE [Code] = 'kiwi';

-- Tier 4: Thượng hạng / Bậc thầy (TOEIC 800+)
UPDATE [dbo].[CropCatalogs]
SET [Tier] = 4, [RequiredLevel] = 4, [RequiredXp] = 500, [RequiredLessonId] = 15
WHERE [Code] = 'mango';

UPDATE [dbo].[CropCatalogs]
SET [Tier] = 4, [RequiredLevel] = 4, [RequiredXp] = 650, [RequiredLessonId] = 22
WHERE [Code] = 'apple';

UPDATE [dbo].[CropCatalogs]
SET [Tier] = 4, [RequiredLevel] = 5, [RequiredXp] = 800, [RequiredLessonId] = 34
WHERE [Code] = 'cherry';
GO
