import { ApiProperty } from '@nestjs/swagger';
import { settingType, users, usersSetting } from '@prisma/client';

class GetMeUserSettingItem {
  @ApiProperty({ enum: settingType })
  type: usersSetting['type'];

  @ApiProperty({ type: String, nullable: true })
  content: usersSetting['content'];
}

export class GetMeResponseDto {
  name: users['userName'];

  @ApiProperty({ type: String, nullable: true })
  avatar: users['proFileImageURL'];

  createdAt: users['createdAt'];

  settings: GetMeUserSettingItem[];

  constructor(required: Required<GetMeResponseDto>) {
    Object.assign(this, required);
  }
}
