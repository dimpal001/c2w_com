/*
  Warnings:

  - Added the required column `isDefault` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserAddress` ADD COLUMN `isDefault` BOOLEAN NOT NULL;
