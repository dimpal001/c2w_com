/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,slug]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- AlterTable
ALTER TABLE `PaymentDetails` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `categoryId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductCategory` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Otp` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ProductCategory_slug_key` ON `ProductCategory`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `ProductCategory_name_slug_key` ON `ProductCategory`(`name`, `slug`);

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
