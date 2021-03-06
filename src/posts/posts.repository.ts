import { Injectable } from '@nestjs/common';
import { posts } from '@prisma/client';

import {
  PostSearchDateScope,
  PostSearchSortScope,
} from '@app/library/constants';
import { arrayOfLastDate, now } from '@app/library/date';

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

  updateById({
    prismaConnection,
    postId,
    categoryId,
    title,
    subTitle,
    thumbnailUrl,
    markdownContent,
    isPrivate,
  }: {
    prismaConnection: PrismaConnection;
    postId: posts['id'];
    categoryId: posts['categoryID'];
    title: posts['title'];
    subTitle: posts['subTitle'];
    thumbnailUrl: posts['thumbNailURL'];
    markdownContent: posts['markDownContent'];
    isPrivate: boolean;
  }) {
    return prismaConnection.posts.update({
      where: { id: postId },
      data: {
        categoryID: categoryId,
        title,
        subTitle,
        thumbNailURL: thumbnailUrl,
        markDownContent: markdownContent,
        private: isPrivate ? 1 : 0,
        updatedAt: now(),
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

  addLikeCountById(prismaConnection: PrismaConnection, postId: posts['id']) {
    return prismaConnection.posts.update({
      data: { likes: { increment: 1 } },
      where: { id: postId },
    });
  }

  subLikeCountById(prismaConnection: PrismaConnection, postId: posts['id']) {
    return prismaConnection.posts.update({
      data: { likes: { decrement: 1 } },
      where: { id: postId },
    });
  }

  getPost({
    prismaConnection,
    dateScope,
    sortScope,
    userId,
    categoryId,
    hasPrivatePosts,
    maxContent,
    page,
  }: {
    prismaConnection: PrismaConnection;
    dateScope: PostSearchDateScope;
    sortScope: PostSearchSortScope;
    userId?: posts['usersID'];
    categoryId?: posts['categoryID'];
    hasPrivatePosts?: boolean;
    maxContent: number;
    page: number;
  }) {
    const dayCount =
      dateScope === PostSearchDateScope.All
        ? undefined
        : Number(PostSearchDateScope[`${dateScope}`]);
    console.log(hasPrivatePosts);
    return prismaConnection.posts.findMany({
      include: {
        users: true,
        category: true,
      },
      where: {
        ...(userId && { usersID: userId }),
        ...(categoryId && { categoryID: categoryId }),
        ...(!hasPrivatePosts && { private: 0 }),
        createdDay: {
          in: dayCount ? arrayOfLastDate(now(), dayCount) : undefined,
        },
        users: { deletedAt: null },
      },
      orderBy: [{ [`${sortScope}`]: 'desc' }],
      skip: page === 0 ? 0 : maxContent * page,
      take: maxContent,
    });
  }
}
