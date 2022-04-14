import {
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';

import { UsersAuthService } from '@api/users/auth/users-auth.service';
import { CookieService } from '@app/utils/cookie/cookie.service';
import { GithubAuthGuard } from '@app/utils/guards/auth/github-auth.guard';

import { UpSertUserAndGetIdResponse } from '@api/users/types/users.service.type';
import { hasNotRefreshToken } from '@api/users/auth/errors/users-auth.error';
import { GetAccessTokenUsingRefreshTokenResponse } from '@api/users/auth/dto/get-access-token-using-refresh-token.dto';

// TODO: 데코레이터 병합 필요
@Controller('auth')
export class UsersAuthController {
  constructor(
    private readonly usersAuthService: UsersAuthService,
    private readonly configService: ConfigService,
    private readonly cookieService: CookieService,
  ) {}

  @Get('github/login')
  @GithubAuthGuard()
  githubLogin() {
    return null;
  }

  @Get('github/callback')
  @GithubAuthGuard()
  async githubLoginCallback(
    @Req() { user }: { user: UpSertUserAndGetIdResponse },
    @Ip() userIp: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = await this.usersAuthService.createRefreshToken({
      id: user.id,
      userIp,
      userAgent,
    });
    response.cookie(
      'refreshToken',
      refreshToken,
      this.cookieService.refreshCookieOptions(),
    );
    return null;
  }

  @Get('access-token')
  async getAccessTokenUsingRefreshToken(
    @Req() request: Request,
    @Headers('user-agent') userAgent: string,
  ) {
    if (!this.cookieService.isRefreshTokenCookie(request.cookies))
      throw new UnauthorizedException(hasNotRefreshToken);
    const token = request.cookies.refreshToken;

    return new GetAccessTokenUsingRefreshTokenResponse({
      accessToken:
        await this.usersAuthService.verifyRefreshTokenAndCreateAccessToken(
          token,
          userAgent,
        ),
    });
  }

  @Delete('logout')
  async deleteRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!this.cookieService.isRefreshTokenCookie(request.cookies))
      throw new UnauthorizedException(hasNotRefreshToken);
    const token = request.cookies.refreshToken;
    await this.usersAuthService.deleteRefreshTokenHistory(token);

    response.clearCookie(
      'refreshToken',
      this.cookieService.refreshCookieOptions(),
    );

    return null;
  }
}
