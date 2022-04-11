import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ExampleCodeRepository {
  // NOTE: Repository에서 PrismaClient를 DI 하지 않습니다.
  getCount(prismaConnection: PrismaClient) {
    return prismaConnection.users.count();
  }
}
