import { applyDecorators, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@app/library/guards/auth/jwt-access-token.guard';
import { GetCommentsResponseDto } from '@api/comments/dto/get-comments.dto';

export const CreateComments = () =>
  applyDecorators(
    Post(),
    JwtAccessTokenGuard(),
    ApiTags('Comment'),
    ApiOperation({
      summary: '댓글을 생성합니다.',
    }),
    ApiOkResponse({ description: '댓글 생성 성공', type: undefined }),
  );

export const GetComments = () =>
  applyDecorators(
    Get(),
    ApiTags('Comment'),
    ApiOperation({
      summary: '댓글 리스트를 요청합니다.',
    }),
    ApiOkResponse({
      description: '댓글 리스트 로드 성공',
      type: GetCommentsResponseDto,
    }),
  );

export const DeleteComment = () =>
  applyDecorators(
    Delete(),
    JwtAccessTokenGuard(),
    ApiTags('Comment'),
    ApiOperation({
      summary: '본인이 작성한 댓글을 삭제합니다.',
    }),
    ApiOkResponse({
      description: '댓글 삭제 성공',
      type: undefined,
    }),
  );

export const UpdateComment = () =>
  applyDecorators(
    Put(),
    JwtAccessTokenGuard(),
    ApiTags('Comment'),
    ApiOperation({
      summary: '본인이 작성한 댓글을 수정합니다.',
    }),
    ApiOkResponse({
      description: '댓글 수정 성공',
      type: undefined,
    }),
  );
