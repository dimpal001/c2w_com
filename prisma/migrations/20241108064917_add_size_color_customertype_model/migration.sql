/*
  Warnings:

  - You are about to drop the column `mrp` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `ProductInventory` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ProductInventory` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ProductInventory` table. All the data in the column will be lost.
  - Added the required column `mrp` to the `ProductInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `ProductInventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `mrp`,
    DROP COLUMN `price`,
    DROP COLUMN `stock`,
    ADD COLUMN `customerTypeId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductImage` DROP COLUMN `color`,
    ADD COLUMN `colorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductInventory` DROP COLUMN `color`,
    DROP COLUMN `quantity`,
    DROP COLUMN `size`,
    ADD COLUMN `mrp` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `sizeId` VARCHAR(191) NULL,
    ADD COLUMN `stock` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ProductColor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProductColor_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductSize` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_customerTypeId_fkey` FOREIGN KEY (`customerTypeId`) REFERENCES `CustomerType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `ProductColor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductInventory` ADD CONSTRAINT `ProductInventory_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `ProductSize`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
