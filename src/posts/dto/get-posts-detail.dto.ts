import { ApiProperty } from '@nestjs/swagger';
import { category, posts, users } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { PostSearchDateScope, PostSearchSortScope } from '@app/utils/';

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
