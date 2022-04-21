import { ApiProperty } from '@nestjs/swagger';
import { category } from '@prisma/client';
import { Type } from 'class-transformer';

class GetCategoriesItem {
  id: category['id'];

  categoryName: category['categoryName'];

  @ApiProperty({ type: String, nullable: true })
  content: category['content'];
}

export class GetCategoriesResponseDto {
  @Type(() => GetCategoriesItem)
  list: GetCategoriesItem[];

  constructor(required: Required<GetCategoriesResponseDto>) {
    Object.assign(this, required);
  }
}
