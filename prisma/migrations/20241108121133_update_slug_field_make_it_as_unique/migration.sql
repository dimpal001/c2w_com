/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `CustomerType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ProductSize` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CustomerType_slug_key` ON `CustomerType`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `ProductSize_slug_key` ON `ProductSize`(`slug`);
