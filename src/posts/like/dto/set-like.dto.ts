import { ApiProperty } from '@nestjs/swagger';
import { postLike } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SetLikedRequestDto {
  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value))
  @ApiProperty({ type: 'string' })
  postId: postLike['postsID'];
}
