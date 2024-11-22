/*
  Warnings:

  - You are about to drop the `UserPayment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserPayment` DROP FOREIGN KEY `UserPayment_userId_fkey`;

-- AlterTable
ALTER TABLE `Discount` ADD COLUMN `isSpecial` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userEmail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `hyperLink` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `message` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `mobileNumber` VARCHAR(191) NULL,
    ADD COLUMN `whatsAppNumber` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `UserPayment`;
