import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { GetCategoriesResponseDto } from '@api/categories/dto/get-categories.dto';
import { GetUserCategoriesResponseDto } from '@api/categories/dto/get-user-categories.dto';

export const getCategories = () =>
  applyDecorators(
    Get(),
    ApiOkResponse({
      description: '카테고리 조회 성공',
      type: GetCategoriesResponseDto,
    }),
  );

export const getUserCategories = () =>
  applyDecorators(
    Get('user'),
    ApiOkResponse({
      description: '유저가 사용한 카테고리 리스트 조회 완료',
      type: GetUserCategoriesResponseDto,
    }),
  );
