import { applyDecorators, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/utils/guards/auth/jwt-access-token.guard';

export const CreatePost = () =>
  applyDecorators(
    Post(),
    JwtAccessTokenGuard(),
    ApiOkResponse({ description: '게시글 생성성공', type: undefined }),
  );
