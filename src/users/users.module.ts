import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from '@app/library/prisma';
import { UsersAuthController } from '@api/users/auth/users-auth.controller';
import { UsersRepository } from '@api/users/users.repository';
import { UsersAuthRepository } from '@api/users/auth/users-auth.repository';
import { GithubStrategy } from '@app/utils/guards/auth/strategy/github.strategy';
import { UsersAuthService } from '@api/users/auth/users-auth.service';
import { UsersService } from '@api/users/users.service';

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
    UsersService,
    UsersRepository,
  ],
  controllers: [UsersAuthController],
})
export class UsersModule {}
