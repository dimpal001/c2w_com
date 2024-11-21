-- AlterTable
ALTER TABLE `HeroSliders` ADD COLUMN `categoryHyperLink` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Showcases` ADD COLUMN `categoryHyperLink` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ExclusionCollection` (
    `id` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `hyperLink` VARCHAR(191) NULL,
    `categoryHyperLink` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopByOccasion` (
    `id` VARCHAR(191) NOT NULL,
    `occasionName` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `hyperLink` VARCHAR(191) NULL,
    `categoryHyperLink` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trending` (
    `id` VARCHAR(191) NOT NULL,
    `videoUrl` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `hyperLink` VARCHAR(191) NULL,
    `categoryHyperLink` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewAriivals` (
    `id` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `hyperLink` VARCHAR(191) NULL,
    `categoryHyperLink` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
