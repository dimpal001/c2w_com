/*
  Warnings:

  - Added the required column `updatedAt` to the `ExclusiveCollection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HeroSliders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HyperLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NewAriivals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ShopByOccasion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ShopBySeason` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ShopBySeasonProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Showcases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ExclusiveCollection` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `HeroSliders` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `HyperLink` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `NewAriivals` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ShopByOccasion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ShopBySeason` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ShopBySeasonProduct` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Showcases` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Trending` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
