import { ApiProperty } from '@nestjs/swagger';
import { category } from '@prisma/client';

import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetCategoriesRequestQuery {
  @Transform(({ value }) => String(value))
  @IsString()
  @IsOptional()
  categoryName?: category['categoryName'];
}

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
