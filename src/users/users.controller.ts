import { Body, Controller, UnauthorizedException } from '@nestjs/common';
import { SetSetting } from '@api/users/users.decorator';

import { UsersSettingService } from '@api/users/setting/users-setting.service';
import { JwtUserId } from '@app/utils/decorators/jwt-user-Id.decorator';

import { SetSettingRequestBodyDto } from '@api/users/dto/set-setting.dto';
import { TokenPayload } from '@app/utils/token/types/token.type';
import { unauthorizedUser } from '@api/users/auth/errors/users-auth.error';

@Controller('users')
export class UsersController {
  constructor(private readonly usersSettingService: UsersSettingService) {}

  @SetSetting()
  async setSetting(
    @JwtUserId() { userId }: TokenPayload,
    @Body() setSettingRequestBodyDto: SetSettingRequestBodyDto,
  ) {
    if (!userId) throw new UnauthorizedException(unauthorizedUser);
    await this.usersSettingService.upsertSetting({
      userId,
      settingType: setSettingRequestBodyDto.settingType,
      content: setSettingRequestBodyDto.content,
    });
    return null;
  }
}
