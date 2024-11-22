-- DropIndex
DROP INDEX `HyperLink_newArrivalId_fkey` ON `HyperLink`;

-- CreateTable
CREATE TABLE `Announcements` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
