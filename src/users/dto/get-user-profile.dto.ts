import { ApiProperty } from '@nestjs/swagger';
import { settingType, users, usersSetting } from '@prisma/client';

import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserProfileRequestParamDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  userId: users['id'];
}

class GetUserProfileSettingItem {
  @ApiProperty({ enum: settingType })
  type: usersSetting['type'];

  @ApiProperty({ type: String, nullable: true })
  content: usersSetting['content'];
}

export class GetUserProfileResponseDto {
  name: users['userName'];

  @ApiProperty({ type: String, nullable: true })
  avatar: users['proFileImageURL'];

  createdAt: users['createdAt'];

  settings: GetUserProfileSettingItem[];

  constructor(required: Required<GetUserProfileResponseDto>) {
    Object.assign(this, required);
  }
}
