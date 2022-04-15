import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, users, usersAuth } from '@prisma/client';

import { now } from '@app/utils/';

import { TokenPayload } from '@app/utils/token/types/token.type';

@Injectable()
export class UsersAuthRepository {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // NOTE: UserAuth 테이블에 리프레시 토큰 히스토리를 생성합니다
  createHistory({
    prismaConnection,
    userId,
    refreshToken,
    userAgent,
    userIp,
  }: {
    prismaConnection: PrismaClient;
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
    prismaConnection: PrismaClient;
    refreshToken: usersAuth['refreshToken'];
  }) {
    return prismaConnection.usersAuth.findUnique({ where: { refreshToken } });
  }

  deleteByRefreshToken({
    prismaConnection,
    refreshToken,
  }: {
    prismaConnection: PrismaClient;
    refreshToken: usersAuth['refreshToken'];
  }) {
    return prismaConnection.usersAuth.deleteMany({ where: { refreshToken } });
  }

  generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });
  }

  decodeAccessToken(accessToken: string) {
    return this.jwtService.verify<TokenPayload>(accessToken, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  decodeRefreshToken(refreshToken: string) {
    return this.jwtService.verify<TokenPayload>(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
    });
  }
}
