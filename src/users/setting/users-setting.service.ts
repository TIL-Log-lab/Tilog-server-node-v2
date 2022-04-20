import { Injectable } from '@nestjs/common';
import { usersSetting } from '@prisma/client';

import { PrismaService } from '@app/library/prisma';
import { UsersSettingRepository } from '@api/users/setting/users-setting.repository';

@Injectable()
export class UsersSettingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersSettingRepository: UsersSettingRepository,
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
}
