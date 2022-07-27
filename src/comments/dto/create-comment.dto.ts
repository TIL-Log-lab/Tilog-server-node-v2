import { ApiProperty } from '@nestjs/swagger';
import { comments } from '@prisma/client';

import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommentsRequestBodyDto {
  @Transform(({ value }) => BigInt(value))
  @IsNotEmpty()
  @ApiProperty({ type: String })
  postId: comments['postsID'];

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  content: comments['content'];

  @Transform(({ value }) => (value ? BigInt(value) : null))
  @IsOptional()
  @ApiProperty({ type: String, nullable: true })
  replyTo: comments['replyTo'];
}
