/*
  Warnings:

  - You are about to drop the column `accessToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `admin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `oAuthServiceID` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `oAuthType` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `users` table. All the data in the column will be lost.

    users 테이블 컬럼 삭제
      - oAuthType 컬럼 삭제
      - oAuthServiceID 컬럼 삭제 -> 작업 취소됨, 20220412154059 에서 다시 작업됨
      - password 컬럼 삭제
      - accessToken 컬럼 삭제
      - refreshToken 컬럼 삭제
      - admin 컬럼 삭제

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `accessToken`,
    DROP COLUMN `admin`,
    DROP COLUMN `oAuthType`,
    DROP COLUMN `password`,
    DROP COLUMN `refreshToken`;
