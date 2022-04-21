import { category, users } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetUserCategoriesRequestQueryDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  userId: users['id'];
}

class GetUserCategoriesItem {
  id: category['id'];

  categoryName: category['categoryName'];
}

export class GetUserCategoriesResponseDto {
  @Type(() => GetUserCategoriesItem)
  list: GetUserCategoriesItem[];

  constructor(required: Required<GetUserCategoriesResponseDto>) {
    Object.assign(this, required);
  }
}
