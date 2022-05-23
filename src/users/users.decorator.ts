import { applyDecorators, Get, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/library/guards/auth/jwt-access-token.guard';

import { GetMeResponseDto } from '@api/users/dto/get-me.dto';

export const SetSetting = () =>
  applyDecorators(
    Put('setting'),
    JwtAccessTokenGuard(),
    ApiTags('User'),
    ApiOperation({
      summary: '유저 설정을 저장합니다.',
    }),
    ApiOkResponse({ description: '유저 설정 반영', type: undefined }),
  );

export const getMe = () =>
  applyDecorators(
    Get('me'),
    JwtAccessTokenGuard(),
    ApiTags('User'),
    ApiOperation({
      summary: '유저정보를 요청합니다.',
    }),
    ApiOkResponse({ description: '내 정보 로드완료', type: GetMeResponseDto }),
  );
