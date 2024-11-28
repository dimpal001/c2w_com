/*
  Warnings:

  - You are about to drop the column `categoryHyperLink` on the `Trending` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `SubCategory_slug_key` ON `SubCategory`;

-- AlterTable
ALTER TABLE `Trending` DROP COLUMN `categoryHyperLink`,
    ADD COLUMN `avatarUrl` VARCHAR(191) NULL;
