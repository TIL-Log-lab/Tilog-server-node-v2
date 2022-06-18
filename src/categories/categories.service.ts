import { Injectable } from '@nestjs/common';
import { category, users } from '@prisma/client';

import { CategoriesRepository } from '@api/categories/categories.repository';
import { PrismaService } from '@app/library/prisma';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  getAllCategories() {
    return this.categoriesRepository.getAll(this.prismaService);
  }

  findCategory(categoryName: category['categoryName']) {
    return this.categoriesRepository.findAllByName({
      prismaConnection: this.prismaService,
      categoryName,
    });
  }

  getUserCategories(userId: users['id']) {
    return this.categoriesRepository.getManyByUserIdGroupeByCategoryId(
      this.prismaService,
      userId,
    );
  }
}
