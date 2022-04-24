import { applyDecorators, Delete, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/utils/guards/auth/jwt-access-token.guard';
import { GetCommentsResponseDto } from '@api/comments/dto/get-comments.dto';

export const CreateComments = () =>
  applyDecorators(
    Post(),
    JwtAccessTokenGuard(),
    ApiOkResponse({ description: '댓글 생성 성공', type: undefined }),
  );

export const GetComments = () =>
  applyDecorators(
    Get(),
    ApiOkResponse({
      description: '댓글 리스트 로드 성공',
      type: GetCommentsResponseDto,
    }),
  );

export const DeleteComment = () =>
  applyDecorators(
    Delete(),
    JwtAccessTokenGuard(),
    ApiOkResponse({
      description: '댓글 삭제 성공',
      type: undefined,
    }),
  );
