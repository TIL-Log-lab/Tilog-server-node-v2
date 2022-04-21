import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';

import { PrismaService } from '@app/library/prisma';
import { CategoriesRepository } from '@api/categories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  getAllCategories() {
    return this.categoriesRepository.getAll(this.prismaService);
  }

  getUserCategories(userId: users['id']) {
    return this.categoriesRepository.getManyByUserIdGroupeByCategoryId(
      this.prismaService,
      userId,
    );
  }
}
