import { ApiProperty } from '@nestjs/swagger';
import { posts } from '@prisma/client';

import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostRequestBodyDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: posts['categoryID'];

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: posts['title'];

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ type: String, nullable: true })
  subTitle: posts['subTitle'];

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @ApiProperty({ type: String, nullable: true })
  thumbnailUrl: posts['thumbNailURL'];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, nullable: true })
  markdownContent: posts['markDownContent'];

  @IsBoolean()
  @IsNotEmpty()
  isPrivate: boolean;
}

export class CreatePostResponseBodyDto {
  @Transform(({ value }) => String(value))
  @ApiProperty({ type: 'string' })
  id: posts['id'];

  constructor(required: Required<CreatePostResponseBodyDto>) {
    Object.assign(this, required);
  }
}
