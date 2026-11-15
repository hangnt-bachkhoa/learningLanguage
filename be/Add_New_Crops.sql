-- =========================================================================
-- BỔ SUNG 8 LOẠI CÂY TRỒNG MỚI VÀO CƠ SỞ DỮ LIỆU & BỎ HÀNG RÀO
-- Hoa hướng dương, Hoa hồng, Hoa tulip, Xoài, Kiwi, Chanh, Táo, Cherry
-- =========================================================================

USE [LanguageFarmDb];
GO

-- 1. Bỏ hàng rào khỏi ShopProducts nếu có
DELETE FROM [dbo].[ShopProducts] 
WHERE [ItemCode] = 'fence' OR [ItemCode] = 'd_fence' OR [NameVi] LIKE N'%rào%';
GO

-- 2. Bổ sung các cây trồng mới vào CropCatalogs
DECLARE @NewCrops TABLE (
    [Code] NVARCHAR(50),
    [NameVi] NVARCHAR(100),
    [GrowthMinutes] INT,
    [HarvestCoins] INT,
    [HarvestXp] INT,
    [SeedPriceCoins] INT
);

INSERT INTO @NewCrops ([Code], [NameVi], [GrowthMinutes], [HarvestCoins], [HarvestXp], [SeedPriceCoins])
VALUES 
    (N'sunflower', N'Hoa hướng dương', 4, 25, 30, 18),
    (N'rose',      N'Hoa hồng',         5, 35, 40, 24),
    (N'tulip',     N'Hoa tulip',        4, 30, 35, 20),
    (N'mango',     N'Xoài',             7, 50, 55, 35),
    (N'kiwi',      N'Kiwi',             6, 45, 50, 32),
    (N'lemon',     N'Chanh',            5, 35, 40, 22),
    (N'apple',     N'Táo',              8, 60, 65, 40),
    (N'cherry',    N'Cherry',           10, 80, 85, 50);

MERGE INTO [dbo].[CropCatalogs] AS Target
USING @NewCrops AS Source
ON Target.[Code] = Source.[Code]
WHEN MATCHED THEN
    UPDATE SET 
        Target.[NameVi] = Source.[NameVi],
        Target.[GrowthMinutes] = Source.[GrowthMinutes],
        Target.[HarvestCoins] = Source.[HarvestCoins],
        Target.[HarvestXp] = Source.[HarvestXp],
        Target.[SeedPriceCoins] = Source.[SeedPriceCoins]
WHEN NOT MATCHED THEN
    INSERT ([Code], [NameVi], [GrowthMinutes], [HarvestCoins], [HarvestXp], [SeedPriceCoins], [CreatedAt], [IsDeleted])
    VALUES (Source.[Code], Source.[NameVi], Source.[GrowthMinutes], Source.[HarvestCoins], Source.[HarvestXp], Source.[SeedPriceCoins], SYSUTCDATETIME(), 0);
GO

-- 3. Bổ sung túi hạt giống tương ứng vào ShopProducts để mua được ở Cửa hàng
DECLARE @SeedProducts TABLE (
    [Category] NVARCHAR(30),
    [NameVi] NVARCHAR(100),
    [ItemCode] NVARCHAR(50),
    [PriceCoins] INT,
    [Description] NVARCHAR(200)
);

INSERT INTO @SeedProducts ([Category], [NameVi], [ItemCode], [PriceCoins], [Description])
VALUES
    (N'seeds', N'Túi hạt giống Hoa hướng dương', N'sunflower', 18, N'Hoa hướng dương vàng óng rực rỡ, mang lại nhiều điểm XP.'),
    (N'seeds', N'Túi hạt giống Hoa hồng',         N'rose',      24, N'Hoa hồng đỏ thắm kiêu sa, giúp khu vườn thêm sắc màu.'),
    (N'seeds', N'Túi hạt giống Hoa tulip',        N'tulip',     20, N'Hoa tulip rực rỡ phong cách Hà Lan vintage.'),
    (N'seeds', N'Túi hạt giống Xoài',             N'mango',     35, N'Cây xoài cát ngọt lịm, cho năng suất và giá bán cao.'),
    (N'seeds', N'Túi hạt giống Kiwi',             N'kiwi',      32, N'Kiwi xanh thanh mát, giàu vitamin C.'),
    (N'seeds', N'Túi hạt giống Chanh',            N'lemon',     22, N'Chanh vàng tươi mọng nước, dễ chăm sóc.'),
    (N'seeds', N'Túi hạt giống Táo',              N'apple',     40, N'Cây táo đỏ ngọt giòn, giá trị kinh tế cao.'),
    (N'seeds', N'Túi hạt giống Cherry',           N'cherry',    50, N'Cherry đỏ mọng cao cấp, phần thưởng kinh nghiệm khủng.');

MERGE INTO [dbo].[ShopProducts] AS Target
USING @SeedProducts AS Source
ON Target.[ItemCode] = Source.[ItemCode] AND Target.[Category] = Source.[Category]
WHEN MATCHED THEN
    UPDATE SET 
        Target.[NameVi] = Source.[NameVi],
        Target.[PriceCoins] = Source.[PriceCoins],
        Target.[Description] = Source.[Description],
        Target.[IsActive] = 1
WHEN NOT MATCHED THEN
    INSERT ([Category], [NameVi], [ItemCode], [PriceCoins], [Description], [IsActive], [CreatedAt], [IsDeleted])
    VALUES (Source.[Category], Source.[NameVi], Source.[ItemCode], Source.[PriceCoins], Source.[Description], 1, SYSUTCDATETIME(), 0);
GO

-- 4. Tặng sẵn cho User ID 1 mỗi loại 3 túi hạt để trải nghiệm gieo trồng ngay
DECLARE @UserSeeds TABLE (
    [ItemCode] NVARCHAR(50)
);

INSERT INTO @UserSeeds ([ItemCode])
VALUES (N'sunflower'), (N'rose'), (N'tulip'), (N'mango'), (N'kiwi'), (N'lemon'), (N'apple'), (N'cherry');

MERGE INTO [dbo].[UserInventories] AS Target
USING @UserSeeds AS Source
ON Target.[UserId] = 1 AND Target.[ItemType] = 1 AND Target.[ItemCode] = Source.[ItemCode]
WHEN MATCHED THEN
    UPDATE SET Target.[Quantity] = Target.[Quantity] + 3
WHEN NOT MATCHED THEN
    INSERT ([UserId], [ItemType], [ItemCode], [Quantity], [CreatedAt], [IsDeleted])
    VALUES (1, 1, Source.[ItemCode], 3, SYSUTCDATETIME(), 0);
GO
