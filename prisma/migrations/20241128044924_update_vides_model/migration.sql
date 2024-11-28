/*
  Warnings:

  - Added the required column `hyperLink` to the `Vides` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Vides` DROP FOREIGN KEY `Vides_productId_fkey`;

-- AlterTable
ALTER TABLE `Vides` ADD COLUMN `hyperLink` VARCHAR(191) NOT NULL,
    MODIFY `productId` VARCHAR(191) NULL;
