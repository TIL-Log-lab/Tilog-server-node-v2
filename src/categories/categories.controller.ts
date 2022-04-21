import { getCategories } from '@api/categories/categories.decorator';
import { CategoriesService } from '@api/categories/categories.service';
import { GetCategoriesResponseDto } from '@api/categories/dto/get-categories.dto';
import { Controller } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @getCategories()
  async getCategories() {
    console.log(await this.categoriesService.getAllCategories());
    return new GetCategoriesResponseDto({
      list: await this.categoriesService.getAllCategories(),
    });
  }
}
