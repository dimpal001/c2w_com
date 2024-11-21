-- CreateTable
CREATE TABLE `ShopBySeason` (
    `id` VARCHAR(191) NOT NULL,
    `videoUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopBySeasonProduct` (
    `id` VARCHAR(191) NOT NULL,
    `SeasonId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `videoUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopBySeasonProduct` ADD CONSTRAINT `ShopBySeasonProduct_SeasonId_fkey` FOREIGN KEY (`SeasonId`) REFERENCES `ShopBySeason`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
