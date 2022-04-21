import { CategoriesController } from '@api/categories/categories.controller';
import { CategoriesRepository } from '@api/categories/categories.repository';
import { CategoriesService } from '@api/categories/categories.service';
import { PrismaModule } from '@app/library/prisma';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
