import { ApiProperty } from '@nestjs/swagger';
import { comments } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DeleteCommentRequestDto {
  @Transform(({ value }) => BigInt(value))
  @IsNotEmpty()
  @ApiProperty({ type: String })
  commentId: comments['id'];
}
