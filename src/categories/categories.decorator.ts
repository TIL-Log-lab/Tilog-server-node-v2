import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { GetCategoriesResponseDto } from '@api/categories/dto/get-categories.dto';

export const getCategories = () =>
  applyDecorators(
    Get(),
    ApiOkResponse({
      description: '카테고리 조회 성공',
      type: GetCategoriesResponseDto,
    }),
  );
