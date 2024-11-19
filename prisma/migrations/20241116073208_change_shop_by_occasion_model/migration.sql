/*
  Warnings:

  - You are about to drop the `ExclusionCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ExclusionCollection`;

-- CreateTable
CREATE TABLE `ExclusiveCollection` (
    `id` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `hyperLink` VARCHAR(191) NULL,
    `categoryHyperLink` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
