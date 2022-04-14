-- CreateTable
CREATE TABLE `usersAuth` (
    `refreshToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `userIp` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `lastUseAt` DATETIME(3) NULL,
    `expireAt` DATETIME(3) NULL,

    PRIMARY KEY (`refreshToken`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
