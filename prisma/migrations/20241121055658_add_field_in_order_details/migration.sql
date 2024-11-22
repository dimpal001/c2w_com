-- AlterTable
ALTER TABLE `OrderDetails` ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `trackingId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserAddress` ADD COLUMN `fullName` VARCHAR(191) NULL;
