import { UsersAuthService } from '@api/users/auth/users-auth.service';
import { UpSertUserAndGetIdResponse } from '@api/users/types/users.service.type';
import { GithubAuthGuard } from '@app/utils/guards/auth/github-auth.guard';
import { Controller, Delete, Get, Headers, Ip, Req, Res } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

@Controller('auth')
export class UsersAuthController {
  constructor(private readonly usersAuthService: UsersAuthService) {}

  @Get('github/login')
  @GithubAuthGuard()
  githubLogin() {
    return null;
  }

  @Get('github/callback')
  @GithubAuthGuard()
  githubLoginCallback(
    @Req() { user }: { user: UpSertUserAndGetIdResponse },
    @Ip() userIp: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = this.usersAuthService.createRefreshToken({
      id: user.id,
      userIp,
      userAgent,
    });
    const refreshTokenCookieOption: CookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    };
    response.cookie('refreshToken', refreshToken, refreshTokenCookieOption);
    return undefined;
  }
}
