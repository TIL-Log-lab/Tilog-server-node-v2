/*
  Warnings:

  - You are about to drop the column `iconURL` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `iconURL`,
    ADD COLUMN `content` VARCHAR(300) NULL;
