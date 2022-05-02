import {
  Injectable,
  PayloadTooLargeException,
  UnauthorizedException,
} from '@nestjs/common';
import { users, usersAuth } from '@prisma/client';

import { PrismaService } from '@app/library/prisma';
import { UsersAuthRepository } from '@api/users/auth/users-auth.repository';

import {
  decodeRefreshTokenFail,
  deviceTypeInjectFail,
} from '@api/users/auth/error/users-auth.error';
import { JwtTokenService } from '@app/library/jwt/jwt-token.service';

@Injectable()
export class UsersAuthService {
  constructor(
    private readonly usersAuthRepository: UsersAuthRepository,
    private readonly prismaService: PrismaService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  private parseDeviceType(userAgent: string) {
    if (userAgent.length > 300)
      throw new PayloadTooLargeException(deviceTypeInjectFail);
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
    const userDevice = this.parseDeviceType(userAgent)[0] ?? null;
    const refreshToken = this.jwtTokenService.generateRefreshToken({
      userId: id,
    });

    await this.usersAuthRepository.createHistory({
      prismaConnection: this.prismaService,
      userId: id,
      userAgent: userDevice,
      userIp,
      refreshToken,
    });

    return refreshToken;
  }

  async deleteRefreshTokenHistory(refreshToken: usersAuth['refreshToken']) {
    const deleteResult = await this.usersAuthRepository.deleteByRefreshToken({
      prismaConnection: this.prismaService,
      refreshToken,
    });
    return deleteResult.count;
  }

  async verifyRefreshTokenAndCreateAccessToken(
    refreshToken: usersAuth['refreshToken'],
    userAgent: string,
  ) {
    // NOTE: 리프레시 토큰 복호화 시도
    try {
      this.jwtTokenService.decodeRefreshToken(refreshToken);
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
    const userDevice = this.parseDeviceType(userAgent)[0] ?? null;
    if (userDevice !== refreshTokenHistory.userAgent) {
      await this.usersAuthRepository.deleteByRefreshToken({
        prismaConnection: this.prismaService,
        refreshToken,
      });
      throw new UnauthorizedException(decodeRefreshTokenFail);
    }
    // NOTE: 엑세스 토큰 발급
    return this.jwtTokenService.generateAccessToken({
      userId: refreshTokenHistory.userId,
    });
  }
}
