import {
  Controller,
  Headers,
  Ip,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiParam } from '@nestjs/swagger';

import {
  GetAccessTokenUsingRefreshToken,
  GithubLogin,
  GithubLoginCallback,
  Logout,
} from '@api/users/auth/users-auth.decorator';
import { UsersAuthService } from '@api/users/auth/users-auth.service';
import { CookieService } from '@app/library/cookie/cookie.service';
import { Response, Request } from 'express';

import { GetAccessTokenUsingRefreshTokenResponse } from '@api/users/auth/dto/get-access-token-using-refresh-token.dto';
import { hasNotRefreshToken } from '@api/users/auth/error/users-auth.error';
import { UpsertUserAndGetIdResponse } from '@api/users/type/users.service.type';

@Controller('auth')
export class UsersAuthController {
  constructor(
    private readonly usersAuthService: UsersAuthService,
    private readonly configService: ConfigService,
    private readonly cookieService: CookieService,
  ) {}

  @GithubLogin()
  githubLogin() {
    return null;
  }

  @GithubLoginCallback()
  @ApiParam({ name: 'user-agent', required: false })
  async githubLoginCallback(
    @Req() { user }: { user: UpsertUserAndGetIdResponse },
    @Ip() userIp: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = await this.usersAuthService.createRefreshToken({
      id: user.id,
      userIp,
      userAgent,
    });
    // NOTE: RefreshTokenCookiePayload 준수
    this.cookieService.setRefreshTokenCookie({ response, refreshToken });
    return null;
  }

  @GetAccessTokenUsingRefreshToken()
  @ApiParam({ name: 'user-agent', required: false })
  async getAccessTokenUsingRefreshToken(
    @Req() request: Request,
    @Headers('user-agent') userAgent: string,
  ) {
    if (!this.cookieService.isInRefreshTokenCookie(request.cookies))
      throw new UnauthorizedException(hasNotRefreshToken);
    const token = request.cookies.refreshToken;
    // NOTE: 쿠키가 빈 문자열인지 확인한다
    if (token === '') throw new UnauthorizedException(hasNotRefreshToken);

    return new GetAccessTokenUsingRefreshTokenResponse({
      accessToken:
        await this.usersAuthService.verifyRefreshTokenAndCreateAccessToken(
          token,
          userAgent,
        ),
    });
  }

  @Logout()
  async deleteRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!this.cookieService.isInRefreshTokenCookie(request.cookies))
      throw new UnauthorizedException(hasNotRefreshToken);

    const token = request.cookies.refreshToken;
    // NOTE: 쿠키가 빈 문자열인지 확인한다
    if (token === '') throw new UnauthorizedException(hasNotRefreshToken);

    await this.usersAuthService.deleteRefreshTokenHistory(token);
    this.cookieService.clearRefreshTokenCookie({ response });

    return null;
  }
}
