-- AlterTable
ALTER TABLE `posts` ADD COLUMN `createdDay` DATE NULL,
    ADD COLUMN `subTitle` VARCHAR(191) NULL;

-- Sync Date
UPDATE `posts` SET `createdDay` = `createdAt`;