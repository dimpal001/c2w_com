/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `OrderDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderDetails` ADD COLUMN `orderId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `OrderDetails_orderId_key` ON `OrderDetails`(`orderId`);
