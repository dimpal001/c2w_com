/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `ShopBySeasonProduct` table. All the data in the column will be lost.
  - Added the required column `hyperLink` to the `ShopBySeasonProduct` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `ShopBySeasonProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ShopBySeasonProduct` DROP COLUMN `videoUrl`,
    ADD COLUMN `hyperLink` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL;
