import { Injectable } from '@nestjs/common';
import { postView } from '@prisma/client';

import { now } from '@app/utils/';

import { PrismaConnection } from '@app/library/prisma/type/prisma.type';

@Injectable()
export class PostsViewRepository {
  getOneByPostIdAndUserIp(
    prismaConnection: PrismaConnection,
    postId: postView['postsID'],
    userIp: postView['userIP'],
  ) {
    return prismaConnection.postView.findFirst({
      where: { postsID: postId, userIP: userIp },
    });
  }

  create(
    prismaConnection: PrismaConnection,
    postId: postView['postsID'],
    userIp: postView['userIP'],
  ) {
    return prismaConnection.postView.create({
      data: { postsID: postId, userIP: userIp, viewedAt: now() },
    });
  }
}
