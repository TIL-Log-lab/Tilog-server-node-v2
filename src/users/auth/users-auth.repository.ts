import { TokenPayload } from '@api/users/auth/types/users-auth.repository.type';
import { now } from '@app/utils/';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, users, usersAuth } from '@prisma/client';

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

  generateRefreshToken(userId: users['id']) {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      },
    );
  }

  decodeRefreshToken(refreshToken: string) {
    return this.jwtService.verify<TokenPayload>(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
    });
  }
}
