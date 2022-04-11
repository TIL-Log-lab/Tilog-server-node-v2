/*
  Warnings:

  - You are about to drop the column `replyLevel` on the `comments` table. All the data in the column will be lost.

    comments 테이블 컬럼 삭제
      - replyLevel 컬럼 삭제

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `replyLevel`;
