import { applyDecorators, Get, Put } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/utils/guards/auth/jwt-access-token.guard';
import { GetMeResponseDto } from '@api/users/dto/get-me.dto';

export const SetSetting = () =>
  applyDecorators(
    Put('setting'),
    JwtAccessTokenGuard(),
    ApiOkResponse({ description: '유저 설정 반영', type: undefined }),
  );

export const getMe = () =>
  applyDecorators(
    Get('me'),
    JwtAccessTokenGuard(),
    ApiOkResponse({ description: '내 정보 로드완료', type: GetMeResponseDto }),
  );
