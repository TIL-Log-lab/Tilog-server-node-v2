import { applyDecorators, Delete, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { HasLikedResponseDto } from '@api/posts/like/dto/has-liked.dto';

import { JwtAccessTokenGuard } from '@app/library/guards/auth/jwt-access-token.guard';

export const HasLiked = () =>
  applyDecorators(
    Get(),
    JwtAccessTokenGuard(),
    ApiOkResponse({
      description: '포스트 좋아요 유무 반환 성공',
      type: HasLikedResponseDto,
    }),
  );

export const SetLike = () =>
  applyDecorators(
    Post(),
    JwtAccessTokenGuard(),
    ApiOkResponse({
      description: '포스트 좋아요 설정 성공',
      type: undefined,
    }),
  );

export const UnsetLike = () =>
  applyDecorators(
    Delete(),
    JwtAccessTokenGuard(),
    ApiOkResponse({
      description: '포스트 좋아요 해제 성공',
      type: undefined,
    }),
  );
