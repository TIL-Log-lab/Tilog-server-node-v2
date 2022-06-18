import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { usersSetting } from '@prisma/client';

import { UsersSettingRepository } from '@api/users/setting/users-setting.repository';
import { UsersRepository } from '@api/users/users.repository';
import { PrismaService } from '@app/library/prisma';

@Injectable()
export class UsersSettingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersSettingRepository: UsersSettingRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async upsertSetting({
    userId,
    settingType,
    content,
  }: {
    userId: usersSetting['userId'];
    settingType: usersSetting['type'];
    content: usersSetting['content'];
  }) {
    const findResult =
      await this.usersSettingRepository.findOneByUserIdAndSettingType({
        prismaConnection: this.prismaService,
        userId,
        settingType,
      });

    return this.usersSettingRepository.upsertBySettingId({
      prismaConnection: this.prismaService,
      settingId: findResult?.id ?? -1,
      userId,
      settingType,
      content,
    });
  }

  getUserProfileAndSetting(userId: usersSetting['userId']) {
    return this.prismaService.$transaction(async (prisma) => {
      const userSetting = await this.usersSettingRepository.getManyByUserId({
        prismaConnection: prisma,
        userId,
      });

      const userProfile = await this.usersRepository.findOneById({
        prismaConnection: prisma,
        userId,
      });
      if (!userProfile) throw new InternalServerErrorException();

      return {
        userId: userProfile.id,
        name: userProfile.userName,
        avatar: userProfile.proFileImageURL,
        createdAt: userProfile.createdAt,
        settings: userSetting.map((val) => {
          return { type: val.type, content: val.content };
        }),
      };
    });
  }
}
