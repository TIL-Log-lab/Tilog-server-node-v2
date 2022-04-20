import { applyDecorators, Put } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/utils/guards/auth/jwt-access-token.guard';

export const SetSetting = () =>
  applyDecorators(
    Put('setting'),
    JwtAccessTokenGuard(),
    ApiOkResponse({ description: '유저 설정 반영', type: undefined }),
  );
