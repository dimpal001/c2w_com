/*
  Warnings:

  - You are about to alter the column `price` on the `Vides` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Vides` MODIFY `price` DOUBLE NULL;
