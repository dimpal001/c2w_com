/*
  Warnings:

  - You are about to drop the column `categoryHyperLink` on the `NewArrivals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `HyperLink` DROP FOREIGN KEY `HyperLink_newArrivalId_fkey`;

-- AlterTable
ALTER TABLE `NewArrivals` DROP COLUMN `categoryHyperLink`,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `mrp` DOUBLE NULL,
    ADD COLUMN `price` DOUBLE NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductImage` ADD COLUMN `altText` VARCHAR(191) NULL;
