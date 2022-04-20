import { ApiOkResponse } from '@nestjs/swagger';
import { applyDecorators, Delete, Get, Post } from '@nestjs/common';

import { GithubAuthGuard } from '@app/utils/guards/auth/github-auth.guard';

import { GetAccessTokenUsingRefreshTokenResponse } from '@api/users/auth/dto/get-access-token-using-refresh-token.dto';

export const GithubLogin = () =>
  applyDecorators(
    Get('github/login'),
    GithubAuthGuard(),
    ApiOkResponse({ description: '깃허브 Oauth 로그인', type: undefined }),
  );

export const GithubLoginCallback = () =>
  applyDecorators(
    Get('github/callback'),
    GithubAuthGuard(),
    ApiOkResponse({ description: '깃허브 로그인 콜백', type: undefined }),
  );

export const GetAccessTokenUsingRefreshToken = () =>
  applyDecorators(
    Post('access-token'),
    ApiOkResponse({
      description: 'refreshToken으로 accessToken을 요청합니다',
      type: GetAccessTokenUsingRefreshTokenResponse,
    }),
  );

export const Logout = () =>
  applyDecorators(
    Delete('logout'),
    ApiOkResponse({ description: '로그아웃 합니다', type: undefined }),
  );
