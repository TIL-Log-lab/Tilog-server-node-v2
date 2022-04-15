import { UpSertUserAndGetIdResponse } from '@api/users/types/users.service.type';
import { TokenPayload } from '@app/utils/token/types/token.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export type JwtUserId = NullableTokenPayload;

export const JwtUserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): TokenPayload => {
    const request = ctx.switchToHttp().getRequest();
    const tokenPayload = request.user;

    return { userId: tokenPayload.userId ?? null };
  },
);
