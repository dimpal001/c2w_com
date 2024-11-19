/*
  Warnings:

  - You are about to drop the column `method` on the `PaymentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `UserPayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PaymentDetails` DROP COLUMN `method`;

-- AlterTable
ALTER TABLE `UserPayment` DROP COLUMN `paymentMethod`;
