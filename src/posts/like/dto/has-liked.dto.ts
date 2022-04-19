import { ApiProperty } from '@nestjs/swagger';
import { postLike } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class HasLikedRequestDto {
  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value))
  @ApiProperty({ type: 'string' })
  postId: postLike['postsID'];
}

export class HasLikedResponseDto {
  like: boolean;

  constructor(required: Required<HasLikedResponseDto>) {
    Object.assign(this, required);
  }
}
