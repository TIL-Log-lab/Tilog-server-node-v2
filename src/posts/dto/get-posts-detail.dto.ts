import { ApiProperty } from '@nestjs/swagger';
import { category, posts, users } from '@prisma/client';

import {
  PostSearchDateScope,
  PostSearchSortScope,
} from '@app/library/constants';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class GetPostsRequestQueryDto {
  @IsEnum(PostSearchDateScope)
  dateScope: PostSearchDateScope;

  @IsEnum(PostSearchSortScope)
  sortScope: PostSearchSortScope;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  userId?: posts['usersID'];

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  categoryId?: posts['categoryID'];

  @IsInt()
  @Type(() => Number)
  page: number;

  @IsInt()
  @Max(20)
  @Min(1)
  @Type(() => Number)
  maxContent: number;
}

class GetPostsItem {
  @Transform(({ value }) => String(value))
  @ApiProperty({ type: 'string' })
  id: posts['id'];

  title: posts['title'];

  @ApiProperty({ type: String, nullable: true })
  subTitle: posts['subTitle'];

  @ApiProperty({ type: String, nullable: true })
  thumbnailUrl: posts['thumbNailURL'];

  view: posts['viewCounts'];

  like: posts['likes'];

  private: posts['private'];

  createdAt: posts['createdAt'];

  user: GetPostsUserItem;

  category: GetPostsCategoryItem;
}

class GetPostsUserItem {
  userId: users['id'];

  username: users['userName'];

  @ApiProperty({ type: String, nullable: true })
  avatar: users['proFileImageURL'];
}

class GetPostsCategoryItem {
  categoryId: category['id'];

  name: category['categoryName'];
}

export class GetPostsResponseDto {
  @Type(() => GetPostsItem)
  list: GetPostsItem[];

  constructor(required: Required<GetPostsResponseDto>) {
    Object.assign(this, required);
  }
}
