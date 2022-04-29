import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from '@app/library/prisma';
import { UsersAuthController } from '@api/users/auth/users-auth.controller';
import { UsersRepository } from '@api/users/users.repository';
import { UsersAuthRepository } from '@api/users/auth/users-auth.repository';
import { GithubStrategy } from '@app/library/guards/auth/strategy/github.strategy';
import { UsersAuthService } from '@api/users/auth/users-auth.service';
import { UsersService } from '@api/users/users.service';
import { CookieService } from '@app/library/cookie/cookie.service';
import { JwtAccessTokenStrategy } from '@app/library/guards/auth/strategy/jwt-access-token.strategy';
import { UsersController } from '@api/users/users.controller';
import { UsersSettingRepository } from '@api/users/setting/users-setting.repository';
import { UsersSettingService } from '@api/users/setting/users-setting.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  providers: [
    UsersAuthService,
    UsersAuthRepository,
    GithubStrategy,
    JwtAccessTokenStrategy,
    UsersService,
    UsersRepository,
    CookieService,
    UsersSettingRepository,
    UsersSettingService,
  ],
  controllers: [UsersController, UsersAuthController],
})
export class UsersModule {}
