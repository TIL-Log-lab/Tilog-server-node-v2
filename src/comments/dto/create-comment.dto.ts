import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { comments } from '@prisma/client';

export class CreateCommentsRequestBodyDto {
  @Transform(({ value }) => BigInt(value))
  @IsNotEmpty()
  @ApiProperty({ type: String })
  postId: comments['postsID'];

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  content: comments['content'];

  @Transform(({ value }) => BigInt(value))
  @IsNotEmpty()
  @ApiProperty({ type: String })
  replyTo: comments['replyTo'];
}
