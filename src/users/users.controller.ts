import { Body, Controller, Param, UnauthorizedException } from '@nestjs/common';

import { UsersSettingService } from '@api/users/setting/users-setting.service';
import { GetMe, GetUserProfile, SetSetting } from '@api/users/users.decorator';
import { JwtUserId } from '@app/library/decorators/jwt-user-Id.decorator';

import { unauthorizedUser } from '@api/users/auth/error/users-auth.error';
import { GetMeResponseDto } from '@api/users/dto/get-me.dto';
import {
  GetUserProfileRequestParamDto,
  GetUserProfileResponseDto,
} from '@api/users/dto/get-user-profile.dto';
import { SetSettingRequestBodyDto } from '@api/users/dto/set-setting.dto';
import { TokenPayload } from '@app/library/jwt/type/token.type';

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

  @GetMe()
  async getMe(@JwtUserId() { userId }: TokenPayload) {
    if (!userId) throw new UnauthorizedException(unauthorizedUser);
    return new GetMeResponseDto(
      await this.usersSettingService.getUserProfileAndSetting(userId),
    );
  }

  @GetUserProfile()
  async getUserProfile(@Param() { userId }: GetUserProfileRequestParamDto) {
    return new GetUserProfileResponseDto(
      await this.usersSettingService.getUserProfileAndSetting(userId),
    );
  }
}
