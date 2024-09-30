/*
  Warnings:

  - You are about to drop the column `receiver_account_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sender_account_id` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_receiver_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_sender_account_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `receiver_account_id`,
    DROP COLUMN `sender_account_id`,
    ADD COLUMN `receiver_id` INTEGER NULL,
    ADD COLUMN `sendert_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_sendert_id_fkey` FOREIGN KEY (`sendert_id`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
