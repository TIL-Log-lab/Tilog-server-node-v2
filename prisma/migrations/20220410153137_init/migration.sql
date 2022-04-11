-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(30) NOT NULL,
    `iconURL` VARCHAR(300) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `usersID` INTEGER UNSIGNED NOT NULL,
    `postsID` BIGINT NOT NULL,
    `htmlContent` VARCHAR(300) NOT NULL,
    `replyTo` BIGINT NULL,
    `replyLevel` TINYINT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `deletedAt` DATETIME(0) NULL,

    INDEX `FK_comments_postsID_posts_id`(`postsID`),
    INDEX `FK_comments_usersID_users_id`(`usersID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imageUpload` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `usersID` INTEGER UNSIGNED NULL,
    `pathUrl` VARCHAR(300) NOT NULL,
    `fileSizeBytes` INTEGER NOT NULL,
    `fileType` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,

    INDEX `FK_imageUpload_usersID_users_id`(`usersID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pinnedRepositories` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nodeID` VARCHAR(30) NOT NULL,
    `processPercent` TINYINT NOT NULL DEFAULT 0,
    `demoURL` VARCHAR(300) NULL,
    `position` VARCHAR(10) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pinnedRepositoryCategories` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `categoryID` INTEGER UNSIGNED NOT NULL,
    `pinnedRepositoriesID` INTEGER UNSIGNED NOT NULL,

    INDEX `FK_pinnedRepositoryCategories_categoryID_category_id`(`categoryID`),
    INDEX `FK_pinnedRepositoryCategories_pinnedRepositoriesID_pinnedReposit`(`pinnedRepositoriesID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postLike` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `usersID` INTEGER UNSIGNED NOT NULL,
    `postsID` BIGINT NOT NULL,
    `likedAt` DATETIME(0) NOT NULL,

    INDEX `FK_postLike_postsID_posts_id`(`postsID`),
    INDEX `FK_postLike_usersID_users_id`(`usersID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postView` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userIP` VARCHAR(16) NOT NULL,
    `postsID` BIGINT NOT NULL,
    `viewedAt` DATETIME(0) NOT NULL,

    INDEX `FK_postView_postsID_posts_id`(`postsID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `usersID` INTEGER UNSIGNED NOT NULL,
    `categoryID` INTEGER UNSIGNED NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `thumbNailURL` VARCHAR(300) NULL,
    `viewCounts` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `likes` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `markDownContent` MEDIUMTEXT NULL,
    `private` TINYINT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `deletedAt` DATETIME(0) NULL,

    INDEX `FK_posts_categoryID_category_id`(`categoryID`),
    INDEX `createdAt_likes_INDEX`(`likes`, `createdAt`),
    INDEX `userID_postID_INDEX`(`usersID`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postsTags` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `postsID` BIGINT NOT NULL,
    `tagsID` BIGINT NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,

    INDEX `FK_postsTags_postsID_posts_id`(`postsID`),
    INDEX `FK_postsTags_tagsID_tags_id`(`tagsID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `tagsName` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userblogCustomization` (
    `usersID` INTEGER UNSIGNED NOT NULL,
    `blogTitle` VARCHAR(20) NULL,
    `statusMessage` VARCHAR(30) NULL,
    `selfIntroduction` VARCHAR(300) NULL,

    PRIMARY KEY (`usersID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `oAuthType` VARCHAR(10) NOT NULL,
    `oAuthServiceID` VARCHAR(50) NOT NULL,
    `userName` VARCHAR(50) NOT NULL DEFAULT 'User',
    `proFileImageURL` VARCHAR(300) NULL,
    `mailAddress` VARCHAR(50) NULL,
    `password` VARCHAR(50) NULL,
    `accessToken` VARCHAR(255) NOT NULL,
    `refreshToken` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NULL,
    `deletedAt` DATETIME(0) NULL,
    `admin` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `FK_comments_postsID_posts_id` FOREIGN KEY (`postsID`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `FK_comments_usersID_users_id` FOREIGN KEY (`usersID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imageUpload` ADD CONSTRAINT `FK_imageUpload_usersID_users_id` FOREIGN KEY (`usersID`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pinnedRepositoryCategories` ADD CONSTRAINT `FK_pinnedRepositoryCategories_categoryID_category_id` FOREIGN KEY (`categoryID`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pinnedRepositoryCategories` ADD CONSTRAINT `FK_pinnedRepositoryCategories_pinnedRepositoriesID_pinnedReposit` FOREIGN KEY (`pinnedRepositoriesID`) REFERENCES `pinnedRepositories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postLike` ADD CONSTRAINT `FK_postLike_postsID_posts_id` FOREIGN KEY (`postsID`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postLike` ADD CONSTRAINT `FK_postLike_usersID_users_id` FOREIGN KEY (`usersID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postView` ADD CONSTRAINT `FK_postView_postsID_posts_id` FOREIGN KEY (`postsID`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `FK_posts_categoryID_category_id` FOREIGN KEY (`categoryID`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `FK_posts_usersID_users_id` FOREIGN KEY (`usersID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postsTags` ADD CONSTRAINT `FK_postsTags_postsID_posts_id` FOREIGN KEY (`postsID`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postsTags` ADD CONSTRAINT `FK_postsTags_tagsID_tags_id` FOREIGN KEY (`tagsID`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userblogCustomization` ADD CONSTRAINT `FK_userblogCustomization_usersID_users_id` FOREIGN KEY (`usersID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
