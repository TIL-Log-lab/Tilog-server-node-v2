import { applyDecorators, Delete, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { HasLikedResponseDto } from '@api/posts/like/dto/has-liked.dto';

import { JwtAccessTokenGuard } from '@app/library/guards/auth/jwt-access-token.guard';

export const HasLiked = () =>
  applyDecorators(
    Get(),
    JwtAccessTokenGuard(),
    ApiTags('Post-like'),
    ApiOperation({
      summary: '해당 포스트에 좋아요를 설정했는지 유무를 요청합니다.',
    }),
    ApiOkResponse({
      description: '포스트 좋아요 유무 반환 성공',
      type: HasLikedResponseDto,
    }),
  );

export const SetLike = () =>
  applyDecorators(
    Post(),
    JwtAccessTokenGuard(),
    ApiTags('Post-like'),
    ApiOperation({
      summary: '해당 포스트에 좋아요를 설정합니다.',
    }),
    ApiOkResponse({
      description: '포스트 좋아요 설정 성공',
      type: undefined,
    }),
  );

export const UnsetLike = () =>
  applyDecorators(
    Delete(),
    JwtAccessTokenGuard(),
    ApiTags('Post-like'),
    ApiOperation({
      summary: '해당 포스트에 좋아요를 설정해제합니다.',
    }),
    ApiOkResponse({
      description: '포스트 좋아요 해제 성공',
      type: undefined,
    }),
  );
