import { Injectable } from '@nestjs/common';
import { OauthProvider, users } from '@prisma/client';

import { UsersRepository } from '@api/users/users.repository';
import { PrismaService } from '@app/library/prisma';

import { UpsertUserAndGetIdResponse } from '@api/users/type/users.service.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async upsertUserAndGetId({
    provider,
    userName,
    proFileImageURL,
    providerServiceId,
  }: {
    providerServiceId: users['providerServiceId'];
    provider: OauthProvider;
    userName: users['userName'];
    proFileImageURL: users['proFileImageURL'];
  }): Promise<UpsertUserAndGetIdResponse> {
    const findUserResult = await this.usersRepository.findIdByProviderServiceId(
      {
        prismaConnection: this.prismaService,
        provider,
        providerServiceId,
      },
    );
    // NOTE: 유저가 존재하지 않을경우 -1, 자동으로 INSERT되게한다
    return this.usersRepository.upsertByUserId({
      prismaConnection: this.prismaService,
      userId: findUserResult ? findUserResult.id : -1,
      userName,
      provider,
      providerServiceId,
      proFileImageURL,
    });
  }
}
