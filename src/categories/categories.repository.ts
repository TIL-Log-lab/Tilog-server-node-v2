import { Injectable } from '@nestjs/common';

import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class CategoriesRepository {
  getAll(prismaConnection: PrismaConnection) {
    return prismaConnection.category.findMany();
  }
}
