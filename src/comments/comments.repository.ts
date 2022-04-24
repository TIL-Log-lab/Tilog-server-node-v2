import { Injectable } from '@nestjs/common';
import { comments } from '@prisma/client';

import { now } from '@app/utils/';

import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class CommentsRepository {
  create({
    prismaConnection,
    userId,
    postId,
    content,
    replyTo,
  }: {
    prismaConnection: PrismaConnection;
    userId: comments['usersID'];
    postId: comments['postsID'];
    content: comments['content'];
    replyTo: comments['replyTo'];
  }) {
    return prismaConnection.comments.create({
      data: {
        usersID: userId,
        postsID: postId,
        content,
        replyTo,
        createdAt: now(),
      },
    });
  }

  findMany({
    prismaConnection,
    postId,
    replyTo,
  }: {
    prismaConnection: PrismaConnection;
    postId: comments['postsID'];
    replyTo: comments['replyTo'];
  }) {
    return prismaConnection.comments.findMany({
      include: {
        users: true,
      },
      where: {
        postsID: postId,
        replyTo: replyTo ?? null,
      },
    });
  }

  findOneByUserIdAndCommentId({
    prismaConnection,
    userId,
    commentId,
  }: {
    prismaConnection: PrismaConnection;
    userId: comments['usersID'];
    commentId: comments['id'];
  }) {
    return prismaConnection.comments.findFirst({
      where: {
        id: commentId,
        usersID: userId,
        deletedAt: null,
      },
    });
  }

  softDeleteByUserIdAndCommentId({
    prismaConnection,
    userId,
    commentId,
  }: {
    prismaConnection: PrismaConnection;
    userId: comments['usersID'];
    commentId: comments['id'];
  }) {
    return prismaConnection.comments.updateMany({
      data: { deletedAt: now() },
      where: {
        id: commentId,
        usersID: userId,
      },
    });
  }

  updateByUserIdAndCommentId({
    prismaConnection,
    userId,
    commentId,
    content,
  }: {
    prismaConnection: PrismaConnection;
    userId: comments['usersID'];
    commentId: comments['id'];
    content: comments['content'];
  }) {
    return prismaConnection.comments.updateMany({
      data: { content, updatedAt: now() },
      where: {
        id: commentId,
        usersID: userId,
        deletedAt: null,
      },
    });
  }
}
