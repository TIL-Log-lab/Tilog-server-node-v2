import { Injectable } from '@nestjs/common';
import { posts, PrismaClient } from '@prisma/client';

import { now } from '@app/utils/';

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
    prismaConnection: PrismaClient;
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
}
