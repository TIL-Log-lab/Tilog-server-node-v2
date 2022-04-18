import { applyDecorators, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/utils/guards/auth/jwt-access-token.guard';

import { GetPostDetailResponseDto } from '@api/posts/dto/get-post-detail.dto';

export const CreatePost = () =>
  applyDecorators(
    Post(),
    JwtAccessTokenGuard(),
    ApiOkResponse({ description: '게시글 생성성공', type: undefined }),
  );

export const GetPostDetail = () =>
  applyDecorators(
    Get('detail'),
    JwtAccessTokenGuard(),
    ApiOkResponse({
      description: '게시글 생성성공',
      type: GetPostDetailResponseDto,
    }),
  );
