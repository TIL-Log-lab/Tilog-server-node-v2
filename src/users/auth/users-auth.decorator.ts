import { ApiCreatedResponse } from '@nestjs/swagger';
import { applyDecorators, Delete, Get } from '@nestjs/common';

import { GithubAuthGuard } from '@app/utils/guards/auth/github-auth.guard';

import { GetAccessTokenUsingRefreshTokenResponse } from '@api/users/auth/dto/get-access-token-using-refresh-token.dto';

export const GithubLogin = () =>
  applyDecorators(
    Get('github/login'),
    GithubAuthGuard,
    ApiCreatedResponse({ description: '깃허브 Oauth 로그인', type: undefined }),
  );

export const GithubLoginCallback = () =>
  applyDecorators(
    Get('github/callback'),
    GithubAuthGuard,
    ApiCreatedResponse({ description: '깃허브 로그인 콜백', type: undefined }),
  );

export const GetAccessTokenUsingRefreshToken = () =>
  applyDecorators(
    Get('access-token'),
    ApiCreatedResponse({
      description: 'refreshToken으로 accessToken을 요청합니다',
      type: GetAccessTokenUsingRefreshTokenResponse,
    }),
  );

export const Logout = () =>
  applyDecorators(
    Delete('logout'),
    ApiCreatedResponse({ description: '로그아웃 합니다', type: undefined }),
  );
