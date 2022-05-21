import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetCategoriesResponseDto } from '@api/categories/dto/get-categories.dto';
import { GetUserCategoriesResponseDto } from '@api/categories/dto/get-user-categories.dto';

export const GetCategories = () =>
  applyDecorators(
    Get(),
    ApiTags('Category'),
    ApiOperation({
      summary: '전체 카테고리 리스트를 요청합니다.',
    }),
    ApiOkResponse({
      description: '카테고리 조회 성공',
      type: GetCategoriesResponseDto,
    }),
  );

export const GetUserCategories = () =>
  applyDecorators(
    Get('user'),
    ApiTags('Category'),
    ApiOperation({
      summary: '유저가 포스트를 작성할 때 사용한 카테고리 리스트를 요청합니다.',
    }),
    ApiOkResponse({
      description: '유저가 사용한 카테고리 리스트 조회 완료',
      type: GetUserCategoriesResponseDto,
    }),
  );
