import { PrismaModule } from '@app/library/prisma';
import { Module } from '@nestjs/common';

import { CategoriesService } from '@api/categories/categories.service';
import { CategoriesController } from '@api/categories/categories.controller';
import { CategoriesRepository } from '@api/categories/categories.repository';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
