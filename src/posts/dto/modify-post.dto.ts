import { posts } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ModifyPostRequestBodyDto {
  @Transform(({ value }) => BigInt(value))
  @IsNotEmpty()
  @ApiProperty({ type: String })
  postId: posts['id'];

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
