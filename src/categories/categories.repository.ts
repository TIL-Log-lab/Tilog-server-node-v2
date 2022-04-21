import { PrismaConnection } from '@app/library/prisma/type/prisma.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
  getAll(prismaConnection: PrismaConnection) {
    return prismaConnection.category.findMany();
  }
}
