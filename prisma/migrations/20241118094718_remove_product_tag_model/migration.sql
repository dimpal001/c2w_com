/*
  Warnings:

  - You are about to drop the `ProductTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ProductTags` DROP FOREIGN KEY `_ProductTags_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductTags` DROP FOREIGN KEY `_ProductTags_B_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `tags` JSON NOT NULL;

-- DropTable
DROP TABLE `ProductTag`;

-- DropTable
DROP TABLE `_ProductTags`;
