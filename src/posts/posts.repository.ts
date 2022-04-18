import { Injectable } from '@nestjs/common';
import { posts, Prisma, PrismaClient } from '@prisma/client';

import { now } from '@app/utils/';
import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class PostsRepository {
  create({
    prismaConnection,
    userId,
    categoryId,
    title,
    subTitle,
    thumbnailUrl,
    markdownContent,
    isPrivate,
  }: {
    prismaConnection: PrismaConnection;
    userId: posts['usersID'];
    categoryId: posts['categoryID'];
    title: posts['title'];
    subTitle: posts['subTitle'];
    thumbnailUrl: posts['thumbNailURL'];
    markdownContent: posts['markDownContent'];
    isPrivate: boolean;
  }) {
    return prismaConnection.posts.create({
      data: {
        usersID: userId,
        categoryID: categoryId,
        title,
        subTitle,
        thumbNailURL: thumbnailUrl,
        markDownContent: markdownContent,
        createdAt: now(),
        createdDay: now(), // NOTE: 인기글 조회를 위한 DATE 형식저장
        private: isPrivate ? 1 : 0,
      },
    });
  }

  getDetailFindById(prismaConnection: PrismaConnection, postId: posts['id']) {
    return prismaConnection.posts.findFirst({
      where: {
        id: postId,
        deletedAt: null,
        users: { deletedAt: null },
      },
      include: {
        users: true,
        category: true,
      },
    });
  }

  addViewCountById(prismaConnection: PrismaConnection, postId: posts['id']) {
    return prismaConnection.posts.update({
      data: { viewCounts: { increment: 1 } },
      where: { id: postId },
    });
  }
}
