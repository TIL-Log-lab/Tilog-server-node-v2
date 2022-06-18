import { Controller, Query } from '@nestjs/common';

import {
  GetCategories,
  GetUserCategories,
} from '@api/categories/categories.decorator';
import { CategoriesService } from '@api/categories/categories.service';

import {
  GetCategoriesRequestQuery,
  GetCategoriesResponseDto,
} from '@api/categories/dto/get-categories.dto';
import {
  GetUserCategoriesRequestQueryDto,
  GetUserCategoriesResponseDto,
} from '@api/categories/dto/get-user-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @GetCategories()
  async getCategories(@Query() { categoryName }: GetCategoriesRequestQuery) {
    return new GetCategoriesResponseDto({
      list: categoryName
        ? await this.categoriesService.findCategory(categoryName)
        : await this.categoriesService.getAllCategories(),
    });
  }

  @GetUserCategories()
  async getUsersCategories(
    @Query() { userId }: GetUserCategoriesRequestQueryDto,
  ) {
    return new GetUserCategoriesResponseDto({
      list: await this.categoriesService.getUserCategories(userId),
    });
  }
}
