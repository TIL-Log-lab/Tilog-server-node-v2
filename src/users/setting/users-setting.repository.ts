import { Injectable } from '@nestjs/common';
import { usersSetting } from '@prisma/client';

import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class UsersSettingRepository {
  findOneByUserIdAndSettingType({
    prismaConnection,
    userId,
    settingType,
  }: {
    prismaConnection: PrismaConnection;
    userId: usersSetting['userId'];
    settingType: usersSetting['type'];
  }) {
    return prismaConnection.usersSetting.findFirst({
      where: { userId, type: settingType },
    });
  }

  upsertBySettingId({
    prismaConnection,
    settingId,
    userId,
    settingType,
    content,
  }: {
    prismaConnection: PrismaConnection;
    settingId: usersSetting['id'];
    userId: usersSetting['userId'];
    settingType: usersSetting['type'];
    content: usersSetting['content'];
  }) {
    return prismaConnection.usersSetting.upsert({
      where: { id: settingId },
      update: {
        type: settingType,
        content,
      },
      create: { userId, content, type: settingType },
    });
  }
}
