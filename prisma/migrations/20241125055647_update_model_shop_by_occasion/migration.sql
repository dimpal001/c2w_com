/*
  Warnings:

  - You are about to drop the `HyperLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `HyperLink` DROP FOREIGN KEY `HyperLink_shopByOccasionId_fkey`;

-- DropTable
DROP TABLE `HyperLink`;

-- CreateTable
CREATE TABLE `ShopByOccasionProduct` (
    `id` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `hyperLink` VARCHAR(191) NOT NULL,
    `shopByOccasionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopByOccasionProduct` ADD CONSTRAINT `ShopByOccasionProduct_shopByOccasionId_fkey` FOREIGN KEY (`shopByOccasionId`) REFERENCES `ShopByOccasion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
