import { Controller } from '@nestjs/common';

import { getCategories } from '@api/categories/categories.decorator';
import { CategoriesService } from '@api/categories/categories.service';

import { GetCategoriesResponseDto } from '@api/categories/dto/get-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @getCategories()
  async getCategories() {
    return new GetCategoriesResponseDto({
      list: await this.categoriesService.getAllCategories(),
    });
  }
}
