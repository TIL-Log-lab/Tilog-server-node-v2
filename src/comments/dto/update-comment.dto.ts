import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { comments } from '@prisma/client';

export class UpdateCommentRequestDto {
  @Transform(({ value }) => BigInt(value))
  @IsNotEmpty()
  @ApiProperty({ type: String })
  commentId: comments['id'];

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  content: comments['content'];
}
