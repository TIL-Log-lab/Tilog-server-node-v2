import { PrismaConnection } from '@app/library/prisma/type/prisma.type';
import { now } from '@app/utils/';
import { Injectable } from '@nestjs/common';
import { comments } from '@prisma/client';

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
}
