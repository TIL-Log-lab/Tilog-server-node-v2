import { applyDecorators, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/utils/guards/auth/jwt-access-token.guard';

export const CreateComments = () =>
  applyDecorators(
    Post(),
    JwtAccessTokenGuard(),
    ApiOkResponse({ description: '댓글 생성 성공', type: undefined }),
  );
