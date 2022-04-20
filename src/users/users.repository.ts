import { Injectable } from '@nestjs/common';
import { OauthProvider, users } from '@prisma/client';

import { now } from '@app/utils/';

import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class UsersRepository {
  findIdByProviderServiceId({
    prismaConnection,
    provider,
    providerServiceId,
  }: {
    prismaConnection: PrismaConnection;
    provider: OauthProvider;
    providerServiceId: users['providerServiceId'];
  }) {
    return prismaConnection.users.findFirst({
      select: {
        id: true,
      },
      where: {
        provider,
        providerServiceId,
      },
    });
  }

  upsertByUserId({
    prismaConnection,
    userId,
    provider,
    userName,
    proFileImageURL,
    providerServiceId,
  }: {
    prismaConnection: PrismaConnection;
    userId: users['id'];
    providerServiceId: users['providerServiceId'];
    provider: OauthProvider;
    userName: users['userName'];
    proFileImageURL: users['proFileImageURL'];
  }) {
    return prismaConnection.users.upsert({
      where: {
        id: userId,
      },
      update: {
        proFileImageURL,
        updatedAt: now(),
      },
      create: {
        userName,
        provider,
        providerServiceId,
        proFileImageURL,
        createdAt: now(),
      },
      select: {
        id: true,
      },
    });
  }

  findOneById({
    prismaConnection,
    userId,
  }: {
    prismaConnection: PrismaConnection;
    userId: users['id'];
  }) {
    return prismaConnection.users.findUnique({ where: { id: userId } });
  }
}
