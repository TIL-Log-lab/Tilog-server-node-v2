import { now } from '@app/utils/';
import { Injectable } from '@nestjs/common';
import { PrismaClient, OauthProvider, users } from '@prisma/client';

@Injectable()
export class UsersRepository {
  findIdByProviderServiceId({
    prismaConnection,
    provider,
    providerServiceId,
  }: {
    prismaConnection: PrismaClient;
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
    prismaConnection: PrismaClient;
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
}
