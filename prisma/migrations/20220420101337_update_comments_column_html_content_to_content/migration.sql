/*
  Warnings:

  - You are about to drop the column `htmlContent` on the `comments` table. All the data in the column will be lost.
  - Added the required column `content` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `htmlContent`,
    ADD COLUMN `content` VARCHAR(300) NOT NULL;
