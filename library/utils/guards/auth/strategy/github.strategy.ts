import { UsersService } from '@api/users/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { OauthProvider } from '@prisma/client';
import { Strategy, Profile, StrategyOption } from 'passport-github2';

// NOTE: Passport-Github2 타입 확장
interface GithubProfile extends Profile {
  nodeId: string;
  photos: [GithubPhoto];
}
interface GithubPhoto {
  value: string;
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const githubStrategyOptions: StrategyOption = {
      clientID: configService.get<string>('OAUTH_GITHUB_CLIENT_ID', ''),
      clientSecret: configService.get<string>('OAUTH_GITHUB_CLIENT_SECRET', ''),
      callbackURL: configService.get<string>('OAUTH_GITHUB_CALLBACK_URL', ''),
    };
    super(githubStrategyOptions);
  }

  validate(_: string, __: string, profile: GithubProfile) {
    return this.usersService.upSertUserAndGetId({
      provider: OauthProvider.GITHUB,
      providerServiceId: profile.nodeId,
      userName: profile.username ?? 'noname',
      proFileImageURL: profile.photos[0].value,
    });
  }
}
