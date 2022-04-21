import { ApiProperty } from '@nestjs/swagger';
import { comments, users } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetCommentsRequestQueryDto {
  @Transform(({ value }) => BigInt(value))
  @IsNotEmpty()
  @ApiProperty({ type: String })
  postId: comments['postsID'];

  @Transform(({ value }) => BigInt(value))
  @IsOptional()
  @ApiProperty({ type: String, nullable: true, required: false })
  replyTo: comments['replyTo'];
}

class GetCommentsItem {
  @Transform(({ value }) => String(value))
  @ApiProperty({ type: String })
  id: comments['id'];

  @ApiProperty({ type: String, nullable: true })
  content: comments['content'] | null;

  @Transform(({ value }) => String(value))
  @ApiProperty({ type: String, nullable: true })
  replyTo: comments['replyTo'];

  @Transform(({ value }) => String(value))
  @ApiProperty({ type: String })
  postId: comments['postsID'];

  createdAt: comments['createdAt'];

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: comments['deletedAt'];

  user: GetCommentsUserItem;
}

class GetCommentsUserItem {
  userId: users['id'];

  username: users['userName'];

  @ApiProperty({ type: String, nullable: true })
  avatar: users['proFileImageURL'];
}

export class GetCommentsResponseDto {
  @Type(() => GetCommentsItem)
  list: GetCommentsItem[];

  constructor(required: Required<GetCommentsResponseDto>) {
    Object.assign(this, required);
  }
}
