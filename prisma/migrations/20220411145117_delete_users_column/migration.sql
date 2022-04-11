/*
  Warnings:

  - You are about to drop the column `accessToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `admin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `oAuthServiceID` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `oAuthType` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `accessToken`,
    DROP COLUMN `admin`,
    DROP COLUMN `oAuthServiceID`,
    DROP COLUMN `oAuthType`,
    DROP COLUMN `password`,
    DROP COLUMN `refreshToken`;
