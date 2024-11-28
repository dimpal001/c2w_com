-- DropIndex
DROP INDEX `Vides_productId_fkey` ON `Vides`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isLoggedIn` BOOLEAN NOT NULL DEFAULT false;
