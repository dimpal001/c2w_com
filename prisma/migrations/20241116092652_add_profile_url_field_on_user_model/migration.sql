-- AlterTable
ALTER TABLE `Product` ADD COLUMN `returnPolicy` TEXT NULL;

-- AlterTable
ALTER TABLE `ProductReview` ADD COLUMN `images` JSON NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `profileUrl` VARCHAR(191) NULL DEFAULT 'https://cdn.thefashionsalad.com/profile-pictures/istockphoto-1130884625-612x612.jpg';
