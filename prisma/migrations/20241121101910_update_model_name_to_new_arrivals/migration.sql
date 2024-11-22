/*
  Warnings:

  - You are about to drop the column `newAriivalsId` on the `HyperLink` table. All the data in the column will be lost.
  - You are about to drop the `NewAriivals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `newArrivalId` to the `HyperLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `HyperLink` DROP FOREIGN KEY `HyperLink_newAriivalsId_fkey`;

-- AlterTable
ALTER TABLE `HyperLink` DROP COLUMN `newAriivalsId`,
    ADD COLUMN `newArrivalId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ProductInventory` ADD COLUMN `discount` DOUBLE NULL;

-- DropTable
DROP TABLE `NewAriivals`;

-- CreateTable
CREATE TABLE `NewArrivals` (
    `id` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `hyperLink` VARCHAR(191) NULL,
    `categoryHyperLink` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HyperLink` ADD CONSTRAINT `HyperLink_newArrivalId_fkey` FOREIGN KEY (`newArrivalId`) REFERENCES `NewArrivals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
