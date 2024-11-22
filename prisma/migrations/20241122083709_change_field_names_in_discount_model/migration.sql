/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Discount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Discount` DROP COLUMN `userEmail`,
    ADD COLUMN `orders` INTEGER NULL,
    ADD COLUMN `userEmails` JSON NOT NULL;
