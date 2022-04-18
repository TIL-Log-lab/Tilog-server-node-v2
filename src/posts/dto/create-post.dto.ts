import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { posts } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostRequestBodyDto {
  @IsNumber()
  categoryId: posts['categoryID'];

  @IsString()
  @MaxLength(50)
  title: posts['title'];

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ nullable: true })
  subTitle: NonNullable<posts['subTitle']>;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @ApiProperty({ nullable: true })
  thumbnailUrl: NonNullable<posts['thumbNailURL']>;

  @IsString()
  markdownContent: NonNullable<posts['markDownContent']>;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPrivate: boolean;
}
