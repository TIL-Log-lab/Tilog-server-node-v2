import { CategoriesRepository } from '@api/categories/categories.repository';
import { PrismaService } from '@app/library/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  getAllCategories() {
    return this.categoriesRepository.getAll(this.prismaService);
  }
}
