import { ApiProperty } from '@nestjs/swagger';
import { category, posts, users } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class GetPostDetailRequestQueryDto {
  @Transform(({ value }) => BigInt(value))
  @IsNotEmpty()
  @ApiProperty({ type: String })
  postId: bigint;
}

export class GetPostDetailResponseDto {
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

  @ApiProperty({ type: String })
  content: posts['markDownContent'];

  createdAt: posts['createdAt'];

  @ApiProperty({ type: Date, nullable: true })
  updatedAt: posts['updatedAt'];

  user: PostDetailUserInfoItem;

  category: PostDetailCategoryItem;

  constructor(required: Required<GetPostDetailResponseDto>) {
    Object.assign(this, required);
  }
}

class PostDetailUserInfoItem {
  userId: users['id'];

  username: users['userName'];

  @ApiProperty({ type: String, nullable: true })
  avatar: users['proFileImageURL'];
}

class PostDetailCategoryItem {
  categoryId: category['id'];

  name: category['categoryName'];
}
