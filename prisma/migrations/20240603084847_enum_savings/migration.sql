/*
  Warnings:

  - The values [SAVING] on the enum `Account_account_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `account_type` ENUM('SAVINGS', 'FIXED', 'CURRENT') NOT NULL;
