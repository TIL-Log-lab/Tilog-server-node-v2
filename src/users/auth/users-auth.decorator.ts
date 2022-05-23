import { applyDecorators, Delete, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GithubAuthGuard } from '@app/library/guards/auth/github-auth.guard';

import { GetAccessTokenUsingRefreshTokenResponse } from '@api/users/auth/dto/get-access-token-using-refresh-token.dto';

export const GithubLogin = () =>
  applyDecorators(
    Get('github/login'),
    GithubAuthGuard(),
    ApiTags('Auth'),
    ApiOperation({
      summary: '깃허브 Oauth를 통해 로그인합니다, 계정이 없을경우 생성합니다.',
    }),
    ApiOkResponse({ description: '깃허브 Oauth 로그인', type: undefined }),
  );

export const GithubLoginCallback = () =>
  applyDecorators(
    Get('github/callback'),
    GithubAuthGuard(),
    ApiTags('Auth'),
    ApiOperation({
      summary: '깃허브 콜백 엔드포인트 입니다.',
    }),
    ApiOkResponse({ description: '깃허브 로그인 콜백', type: undefined }),
  );

export const GetAccessTokenUsingRefreshToken = () =>
  applyDecorators(
    Post('access-token'),
    ApiTags('Auth'),
    ApiOperation({
      summary: '액세스 토큰을 요청합니다.',
    }),
    ApiOkResponse({
      description: 'refreshToken으로 accessToken을 요청합니다',
      type: GetAccessTokenUsingRefreshTokenResponse,
    }),
  );

export const Logout = () =>
  applyDecorators(
    Delete('logout'),
    ApiTags('Auth'),
    ApiOperation({
      summary: '리프래시 토큰을 만료시키고 로그아웃합니다.',
    }),
    ApiOkResponse({ description: '로그아웃 합니다', type: undefined }),
  );
