import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TokenPayload } from '@app/library/token/type/token.type';

export const JwtUserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): TokenPayload => {
    const request = ctx.switchToHttp().getRequest();
    const tokenPayload = request.user;

    return { userId: tokenPayload.userId ?? null };
  },
);
