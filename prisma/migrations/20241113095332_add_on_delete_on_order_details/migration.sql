-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderDetails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;