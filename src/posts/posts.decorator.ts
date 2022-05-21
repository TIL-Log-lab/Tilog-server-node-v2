import { applyDecorators, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/library/guards/auth/jwt-access-token.guard';

import { GetPostDetailResponseDto } from '@api/posts/dto/get-post-detail.dto';
import { GetPostsResponseDto } from '@api/posts/dto/get-posts-detail.dto';

export const CreatePost = () =>
  applyDecorators(
    Post(),
    JwtAccessTokenGuard(),
    ApiTags('Post'),
    ApiOperation({
      summary: '포스트를 작성합니다.',
    }),
    ApiOkResponse({ description: '게시글 생성성공', type: undefined }),
  );

export const GetPostDetail = () =>
  applyDecorators(
    Get('detail'),
    JwtAccessTokenGuard(),
    ApiTags('Post'),
    ApiOperation({
      summary: '포스트 세부 정보를 요청합니다.',
    }),
    ApiOkResponse({
      description: '게시글 조회 성공',
      type: GetPostDetailResponseDto,
    }),
  );
export const GetPosts = () =>
  applyDecorators(
    Get(),
    JwtAccessTokenGuard(),
    ApiTags('Post'),
    ApiOperation({
      summary: '포스트 리스트를 요청합니다.',
    }),
    ApiOkResponse({
      description: '게시글 리스트 로드 성공',
      type: GetPostsResponseDto,
    }),
  );
