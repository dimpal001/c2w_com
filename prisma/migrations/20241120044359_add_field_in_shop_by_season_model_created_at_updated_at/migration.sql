/*
  Warnings:

  - You are about to drop the column `SeasonId` on the `ShopBySeasonProduct` table. All the data in the column will be lost.
  - Added the required column `seasonId` to the `ShopBySeasonProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ShopBySeasonProduct` DROP FOREIGN KEY `ShopBySeasonProduct_SeasonId_fkey`;

-- AlterTable
ALTER TABLE `ShopBySeasonProduct` DROP COLUMN `SeasonId`,
    ADD COLUMN `seasonId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ShopBySeasonProduct` ADD CONSTRAINT `ShopBySeasonProduct_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `ShopBySeason`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
