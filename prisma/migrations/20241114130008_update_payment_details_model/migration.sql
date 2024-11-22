/*
  Warnings:

  - You are about to drop the column `razorpay_order_id` on the `PaymentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `razorpay_payment_id` on the `PaymentDetails` table. All the data in the column will be lost.
  - Added the required column `paymentMethod` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `PaymentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderDetails` ADD COLUMN `paymentMethod` ENUM('COD', 'ONLINE') NOT NULL;

-- AlterTable
ALTER TABLE `PaymentDetails` DROP COLUMN `razorpay_order_id`,
    DROP COLUMN `razorpay_payment_id`,
    ADD COLUMN `bank` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `method` VARCHAR(191) NOT NULL,
    ADD COLUMN `order_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `payment_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `upi` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `wallet` VARCHAR(191) NULL DEFAULT '';
