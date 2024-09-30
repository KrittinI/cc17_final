-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `first_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NULL,
    `phone` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `account_type` ENUM('SAVING', 'FIXED', 'CURRENT') NOT NULL,
    `account_name` VARCHAR(100) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Account_account_name_key`(`account_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL,
    `receiver_account_id` INTEGER NULL,
    `sender_account_id` INTEGER NULL,
    `transaction_type` ENUM('EXPENSES', 'INCOME', 'TRANSFER') NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `payee_name` VARCHAR(50) NULL,
    `note` VARCHAR(100) NULL,
    `transaction_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_receiver_account_id_fkey` FOREIGN KEY (`receiver_account_id`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_sender_account_id_fkey` FOREIGN KEY (`sender_account_id`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
