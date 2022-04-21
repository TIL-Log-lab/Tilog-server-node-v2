import { Injectable } from '@nestjs/common';
import { category, Prisma, users } from '@prisma/client';

import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class CategoriesRepository {
  getAll(prismaConnection: PrismaConnection) {
    return prismaConnection.category.findMany();
  }

  // NOTE: 특정 유저가 작성한 게시글의 모든 카테고리내역
  getManyByUserIdGroupeByCategoryId(
    prismaConnection: PrismaConnection,
    userId: users['id'],
  ) {
    return prismaConnection.$queryRaw<Pick<category, 'id' | 'categoryName'>[]>(
      Prisma.sql`SELECT category.id, category.categoryName FROM tilog.posts
      INNER JOIN tilog.category on posts.categoryID = category.id
      WHERE posts.usersID = ${userId}
      GROUP BY category.id;`,
    );
  }
}
