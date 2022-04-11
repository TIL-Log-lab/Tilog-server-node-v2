/*
  Warnings:

  - You are about to drop the `pinnedRepositories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pinnedRepositoryCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `postsTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userblogCustomization` table. If the table is not empty, all the data it contains will be lost.

  postsTags 테이블 삭제
  tags 테이블 삭제
  userblogCustomization 테이블 삭제
  pinnedRepositoryCategories 테이블 삭제
  pinnedRepositories 테이블 삭제

*/
-- DropForeignKey
ALTER TABLE `pinnedRepositoryCategories` DROP FOREIGN KEY `FK_pinnedRepositoryCategories_categoryID_category_id`;

-- DropForeignKey
ALTER TABLE `pinnedRepositoryCategories` DROP FOREIGN KEY `FK_pinnedRepositoryCategories_pinnedRepositoriesID_pinnedReposit`;

-- DropForeignKey
ALTER TABLE `postsTags` DROP FOREIGN KEY `FK_postsTags_postsID_posts_id`;

-- DropForeignKey
ALTER TABLE `postsTags` DROP FOREIGN KEY `FK_postsTags_tagsID_tags_id`;

-- DropForeignKey
ALTER TABLE `userblogCustomization` DROP FOREIGN KEY `FK_userblogCustomization_usersID_users_id`;

-- DropTable
DROP TABLE `pinnedRepositories`;

-- DropTable
DROP TABLE `pinnedRepositoryCategories`;

-- DropTable
DROP TABLE `postsTags`;

-- DropTable
DROP TABLE `tags`;

-- DropTable
DROP TABLE `userblogCustomization`;
