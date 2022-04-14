import { decodeRefreshTokenFail } from '@api/users/auth/errors/users-auth.error';
import { UsersAuthRepository } from '@api/users/auth/users-auth.repository';
import { PrismaService } from '@app/library/prisma';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { users, usersAuth } from '@prisma/client';

@Injectable()
export class UsersAuthService {
  constructor(
    private readonly usersAuthRepository: UsersAuthRepository,
    private readonly prismaService: PrismaService,
  ) {}

  private injectDeviceType(userAgent: string) {
    const re = /(?<=\().*?(?=;)/;
    return userAgent.match(re) ?? [];
  }

  // 리프레시 토큰 생성
  async createRefreshToken({
    id,
    userAgent,
    userIp,
  }: {
    id: users['id'];
    userAgent: string;
    userIp: usersAuth['userIp'];
  }) {
    const userDevice = this.injectDeviceType(userAgent)[0] ?? null;
    const refreshToken = this.usersAuthRepository.generateRefreshToken(id);

    await this.usersAuthRepository.createHistory({
      prismaConnection: this.prismaService,
      userId: id,
      userAgent: userDevice,
      userIp,
      refreshToken,
    });

    return refreshToken;
  }

  async verifyRefreshTokenAndCreateAccessToken(
    refreshToken: usersAuth['refreshToken'],
    userAgent: string,
  ) {
    // NOTE: 리프레시 토큰 복호화 시도
    try {
      this.usersAuthRepository.decodeRefreshToken(refreshToken);
    } catch (error) {
      await this.usersAuthRepository.deleteByRefreshToken({
        prismaConnection: this.prismaService,
        refreshToken,
      });
      throw new UnauthorizedException(decodeRefreshTokenFail);
    }
    // NOTE: 리프레시 토큰 히스토리 검색및 로드
    const refreshTokenHistory =
      await this.usersAuthRepository.findOneByRefreshToken({
        prismaConnection: this.prismaService,
        refreshToken,
      });
    if (!refreshTokenHistory) {
      throw new UnauthorizedException(decodeRefreshTokenFail);
    }
    // NOTE: 유저 디바이스 타입 비교
    const userDevice = this.injectDeviceType(userAgent)[0] ?? null;
    if (userDevice !== refreshTokenHistory.userAgent) {
      await this.usersAuthRepository.deleteByRefreshToken({
        prismaConnection: this.prismaService,
        refreshToken,
      });
      throw new UnauthorizedException(decodeRefreshTokenFail);
    }
    // NOTE: 엑세스 토큰 발급
    return this.usersAuthRepository.generateAccessToken(
      refreshTokenHistory.userId,
    );
  }
}
