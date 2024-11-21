-- AlterTable
ALTER TABLE `OrderDetails` MODIFY `status` ENUM('INCOMPLETE', 'PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `PaymentDetails` ADD COLUMN `razorpay_order_id` VARCHAR(191) NULL,
    ADD COLUMN `razorpay_payment_id` VARCHAR(191) NULL;
