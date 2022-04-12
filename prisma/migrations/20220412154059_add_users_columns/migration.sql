-- AlterTable
ALTER TABLE `users` ADD COLUMN `provider` ENUM('GITHUB') NULL,
    ADD COLUMN `providerServiceId` VARCHAR(191) NULL;
