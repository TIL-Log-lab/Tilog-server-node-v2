import { UsersAuthRepository } from '@api/users/auth/users-auth.repository';
import { PrismaService } from '@app/library/prisma';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
}
