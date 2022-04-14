import { JwtModule } from '@nestjs/jwt';
import { GithubStrategy } from '@app/utils/guards/auth/strategy/github.strategy';
import { UsersAuthController } from '@api/users/auth/users-auth.controller';
import { UsersAuthService } from '@api/users/auth/users-auth.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@app/library/prisma';
import { UsersRepository } from '@api/users/users.repository';
import { UsersAuthRepository } from '@api/users/auth/users-auth.repository';
import { UsersService } from './users.service';

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
