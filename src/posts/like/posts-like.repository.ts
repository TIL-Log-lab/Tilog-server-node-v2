import { Injectable } from '@nestjs/common';
import { postLike } from '@prisma/client';

import { now } from '@app/library/date';

import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class PostsLikeRepository {
  create(
    prismaConnection: PrismaConnection,
    userId: postLike['usersID'],
    postId: postLike['postsID'],
  ) {
    return prismaConnection.postLike.create({
      data: { usersID: userId, postsID: postId, likedAt: now() },
    });
  }

  softDeleteByUserIdAndPostId(
    prismaConnection: PrismaConnection,
    userId: postLike['usersID'],
    postId: postLike['postsID'],
  ) {
    return prismaConnection.postLike.updateMany({
      where: { usersID: userId, postsID: postId },
      data: { deletedAt: now() },
    });
  }

  findByUserIdAndPostId(
    prismaConnection: PrismaConnection,
    userId: postLike['usersID'],
    postId: postLike['postsID'],
  ) {
    return prismaConnection.postLike.findFirst({
      where: { usersID: userId, postsID: postId, deletedAt: null },
    });
  }
}
