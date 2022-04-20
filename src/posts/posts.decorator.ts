import { applyDecorators, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/utils/guards/auth/jwt-access-token.guard';

import { GetPostDetailResponseDto } from '@api/posts/dto/get-post-detail.dto';
import { GetPostsResponseDto } from '@api/posts/dto/get-posts-detail.dto';

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
      description: '게시글 조회 성공',
      type: GetPostDetailResponseDto,
    }),
  );
export const GetPosts = () =>
  applyDecorators(
    Get(),
    JwtAccessTokenGuard(),
    ApiOkResponse({
      description: '게시글 리스트 로드 성공',
      type: GetPostsResponseDto,
    }),
  );
