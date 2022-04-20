import { ApiProperty } from '@nestjs/swagger';
import { settingType, usersSetting } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SetSettingRequestBodyDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiProperty({ type: String, nullable: true })
  content: usersSetting['content'];

  @IsEnum(settingType)
  @IsNotEmpty()
  @ApiProperty({ enum: settingType })
  settingType: usersSetting['type'];
}
