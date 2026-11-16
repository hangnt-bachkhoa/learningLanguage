-- =========================================================================
-- MIGRATION SCRIPT: CẬP NHẬT 4 CÂY TRỒNG SANG DANH MỤC PNG MỚI (PHƯƠNG ÁN 2)
-- sunflower -> pumpkin (Bí ngô)
-- tulip     -> wheat   (Lúa mì)
-- rose      -> blueberry (Việt quất)
-- kiwi      -> watermelon (Dưa hấu)
-- =========================================================================

-- 1. Cập nhật bảng CropCatalogs
IF EXISTS (SELECT 1 FROM dbo.CropCatalogs WHERE Code = 'sunflower')
BEGIN
    UPDATE dbo.CropCatalogs
    SET Code = 'pumpkin', NameVi = N'Bí ngô', HarvestCoins = 25, HarvestXp = 30
    WHERE Code = 'sunflower';
END

IF EXISTS (SELECT 1 FROM dbo.CropCatalogs WHERE Code = 'tulip')
BEGIN
    UPDATE dbo.CropCatalogs
    SET Code = 'wheat', NameVi = N'Lúa mì', HarvestCoins = 30, HarvestXp = 35
    WHERE Code = 'tulip';
END

IF EXISTS (SELECT 1 FROM dbo.CropCatalogs WHERE Code = 'rose')
BEGIN
    UPDATE dbo.CropCatalogs
    SET Code = 'blueberry', NameVi = N'Việt quất', HarvestCoins = 35, HarvestXp = 40
    WHERE Code = 'rose';
END

IF EXISTS (SELECT 1 FROM dbo.CropCatalogs WHERE Code = 'kiwi')
BEGIN
    UPDATE dbo.CropCatalogs
    SET Code = 'watermelon', NameVi = N'Dưa hấu', HarvestCoins = 45, HarvestXp = 50
    WHERE Code = 'kiwi';
END
GO

-- 2. Cập nhật ShopProducts
UPDATE dbo.ShopProducts
SET ItemCode = 'pumpkin', NameVi = N'Túi hạt giống Bí ngô', Description = N'Trái bí ngô tròn vàng cam đậm đà, thu hoạch cho mùa vụ bội thu.'
WHERE ItemCode = 'sunflower';

UPDATE dbo.ShopProducts
SET ItemCode = 'wheat', NameVi = N'Túi hạt giống Lúa mì', Description = N'Những bông lúa mì vàng óng trĩu hạt, biểu tượng của sự no ấm.'
WHERE ItemCode = 'tulip';

UPDATE dbo.ShopProducts
SET ItemCode = 'blueberry', NameVi = N'Túi hạt giống Việt quất', Description = N'Những chùm việt quất tím thẫm mọng nước, giàu chất chống oxy hóa.'
WHERE ItemCode = 'rose';

UPDATE dbo.ShopProducts
SET ItemCode = 'watermelon', NameVi = N'Túi hạt giống Dưa hấu', Description = N'Trái dưa hấu vỏ xanh ruột đỏ mọng ngọt, giải khát ngày hè oi ả.'
WHERE ItemCode = 'kiwi';
GO

-- 3. Cập nhật FarmPlots đang gieo
UPDATE dbo.FarmPlots SET PlantedCropCode = 'pumpkin' WHERE PlantedCropCode = 'sunflower';
UPDATE dbo.FarmPlots SET PlantedCropCode = 'wheat' WHERE PlantedCropCode = 'tulip';
UPDATE dbo.FarmPlots SET PlantedCropCode = 'blueberry' WHERE PlantedCropCode = 'rose';
UPDATE dbo.FarmPlots SET PlantedCropCode = 'watermelon' WHERE PlantedCropCode = 'kiwi';
GO

-- 4. Cập nhật UserInventories
UPDATE dbo.UserInventories SET ItemCode = 'pumpkin' WHERE ItemCode = 'sunflower';
UPDATE dbo.UserInventories SET ItemCode = 'wheat' WHERE ItemCode = 'tulip';
UPDATE dbo.UserInventories SET ItemCode = 'blueberry' WHERE ItemCode = 'rose';
UPDATE dbo.UserInventories SET ItemCode = 'watermelon' WHERE ItemCode = 'kiwi';
GO
