import { Module } from '@nestjs/common';

import { UsersAuthController } from '@api/users/auth/users-auth.controller';
import { UsersAuthRepository } from '@api/users/auth/users-auth.repository';
import { UsersAuthService } from '@api/users/auth/users-auth.service';
import { UsersSettingRepository } from '@api/users/setting/users-setting.repository';
import { UsersSettingService } from '@api/users/setting/users-setting.service';
import { UsersController } from '@api/users/users.controller';
import { UsersRepository } from '@api/users/users.repository';
import { UsersService } from '@api/users/users.service';
import { CookieModule } from '@app/library/cookie/cookie.module';
import { GithubStrategy } from '@app/library/guards/auth/strategy/github.strategy';
import { JwtAccessTokenStrategy } from '@app/library/guards/auth/strategy/jwt-access-token.strategy';
import { JwtTokenModule } from '@app/library/jwt/jwt-token.module';
import { PrismaModule } from '@app/library/prisma';

@Module({
  imports: [PrismaModule, CookieModule, JwtTokenModule],
  providers: [
    UsersAuthService,
    UsersAuthRepository,
    GithubStrategy,
    JwtAccessTokenStrategy,
    UsersService,
    UsersRepository,
    UsersSettingRepository,
    UsersSettingService,
  ],
  controllers: [UsersController, UsersAuthController],
})
export class UsersModule {}
