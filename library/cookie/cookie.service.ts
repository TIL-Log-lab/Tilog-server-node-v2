import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';

interface RefreshTokenCookiePayload {
  refreshToken: string;
}

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  setRefreshTokenCookie({
    response,
    refreshToken,
  }: {
    response: Response;
    refreshToken: string;
  }) {
    return response.cookie(
      'refreshToken',
      refreshToken,
      this.refreshCookieOptions(),
    );
  }

  clearRefreshTokenCookie({ response }: { response: Response }) {
    return response.clearCookie('refreshToken', this.refreshCookieOptions());
  }

  private refreshCookieOptions(): CookieOptions {
    return {
      httpOnly: this.configService.get<boolean>(
        'REFRESH_COOKIE_HTTP_ONLY',
        true,
      ),
      secure: this.configService.get<boolean>('REFRESH_COOKIE_SECURE', true),
      path: this.configService.get<string>('REFRESH_COOKIE_PATH', '/'),
      domain: this.configService.get<string>('REFRESH_COOKIE_DOMAIN', '/'),
      maxAge: this.configService.get<number>('REFRESH_COOKIE_MAX_AGE', 3600),
      sameSite: this.configService.get<boolean | 'lax' | 'strict' | 'none'>(
        'REFRESH_COOKIE_SAME_SITE',
        'strict',
      ),
    };
  }

  isInRefreshTokenCookie(object: any): object is RefreshTokenCookiePayload {
    if (!object) return false;
    return 'refreshToken' in object;
  }
}
