import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

interface TilogCookie {
  refreshToken: string;
}

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  refreshCookieOptions(): CookieOptions {
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

  isRefreshTokenCookie(object: any): object is TilogCookie {
    if (!object) return false;
    return 'refreshToken' in object;
  }
}
