import { Injectable } from '@nestjs/common';
import { usersAuth } from '@prisma/client';

import { now } from '@app/library/date';

import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class UsersAuthRepository {
  // NOTE: UserAuth 테이블에 리프레시 토큰 히스토리를 생성합니다
  createHistory({
    prismaConnection,
    userId,
    refreshToken,
    userAgent,
    userIp,
  }: {
    prismaConnection: PrismaConnection;
    userId: usersAuth['userId'];
    refreshToken: usersAuth['refreshToken'];
    userAgent: usersAuth['userAgent'];
    userIp: usersAuth['userIp'];
  }) {
    return prismaConnection.usersAuth.create({
      data: {
        refreshToken,
        userAgent,
        userIp,
        userId,
        lastUseAt: now(),
      },
    });
  }

  findOneByRefreshToken({
    prismaConnection,
    refreshToken,
  }: {
    prismaConnection: PrismaConnection;
    refreshToken: usersAuth['refreshToken'];
  }) {
    return prismaConnection.usersAuth.findUnique({ where: { refreshToken } });
  }

  deleteByRefreshToken({
    prismaConnection,
    refreshToken,
  }: {
    prismaConnection: PrismaConnection;
    refreshToken: usersAuth['refreshToken'];
  }) {
    return prismaConnection.usersAuth.deleteMany({ where: { refreshToken } });
  }
}
