/*
  Warnings:

  - You are about to drop the column `shoppingSessionId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the `ShoppingSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_shoppingSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `ShoppingSession` DROP FOREIGN KEY `ShoppingSession_userId_fkey`;

-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `shoppingSessionId`;

-- DropTable
DROP TABLE `ShoppingSession`;
