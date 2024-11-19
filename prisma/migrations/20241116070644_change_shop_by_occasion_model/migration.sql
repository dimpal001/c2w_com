/*
  Warnings:

  - You are about to drop the column `categoryHyperLink` on the `ShopByOccasion` table. All the data in the column will be lost.
  - You are about to drop the column `hyperLink` on the `ShopByOccasion` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `ShopByOccasion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ShopByOccasion` DROP COLUMN `categoryHyperLink`,
    DROP COLUMN `hyperLink`,
    DROP COLUMN `imageUrl`,
    ADD COLUMN `categoryHyperLinks` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `HyperLink` (
    `id` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `hyperLink` VARCHAR(191) NOT NULL,
    `newAriivalsId` VARCHAR(191) NOT NULL,
    `shopByOccasionId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HyperLink` ADD CONSTRAINT `HyperLink_newAriivalsId_fkey` FOREIGN KEY (`newAriivalsId`) REFERENCES `NewAriivals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HyperLink` ADD CONSTRAINT `HyperLink_shopByOccasionId_fkey` FOREIGN KEY (`shopByOccasionId`) REFERENCES `ShopByOccasion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
