-- CreateTable
CREATE TABLE `ProductWeek` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `hyperLink` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageWeek` (
    `id` VARCHAR(191) NOT NULL,
    `hyperLink` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
