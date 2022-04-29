import {
  applyDecorators,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

import { decodeAccessTokenFail } from '@api/users/auth/error/users-auth.error';

@Injectable()
class JwtAccessToken extends AuthGuard('jwtAccessToken') {
  handleRequest<TUser>(err: Error, user: TUser) {
    if (err) {
      throw new UnauthorizedException(decodeAccessTokenFail);
    }
    // NOTE: 토큰이 존재하지 않는다면 validate를 스킵하고 Boolean 타입을 리턴합니다.
    return user;
  }
}
export const JwtAccessTokenGuard = () =>
  applyDecorators(UseGuards(JwtAccessToken), ApiBearerAuth('accessToken'));
