import { Controller, Query } from '@nestjs/common';

import {
  getCategories,
  getUserCategories,
} from '@api/categories/categories.decorator';
import { CategoriesService } from '@api/categories/categories.service';

import { GetCategoriesResponseDto } from '@api/categories/dto/get-categories.dto';
import {
  GetUserCategoriesRequestQueryDto,
  GetUserCategoriesResponseDto,
} from '@api/categories/dto/get-user-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @getCategories()
  async getCategories() {
    return new GetCategoriesResponseDto({
      list: await this.categoriesService.getAllCategories(),
    });
  }

  @getUserCategories()
  async getUsersCategories(
    @Query() { userId }: GetUserCategoriesRequestQueryDto,
  ) {
    return new GetUserCategoriesResponseDto({
      list: await this.categoriesService.getUserCategories(userId),
    });
  }
}
