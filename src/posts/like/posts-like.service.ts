import { ConflictException, Injectable } from '@nestjs/common';
import { postLike } from '@prisma/client';

import { PostsLikeRepository } from '@api/posts/like/posts-like.repository';
import { PostsRepository } from '@api/posts/posts.repository';
import { PrismaService } from '@app/library/prisma';
import { alreadySetLike } from '@api/posts/like/error/posts-like.error';

@Injectable()
export class PostsLikeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postsLikeRepository: PostsLikeRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async hasLiked(userId: postLike['usersID'], postId: postLike['postsID']) {
    return !!(await this.postsLikeRepository.findByUserIdAndPostId(
      this.prismaService,
      userId,
      postId,
    ));
  }

  setLike(userId: postLike['usersID'], postId: postLike['postsID']) {
    return this.prismaService.$transaction(async (prisma) => {
      const hasLiked = await this.postsLikeRepository.findByUserIdAndPostId(
        prisma,
        userId,
        postId,
      );
      if (hasLiked) throw new ConflictException(alreadySetLike);

      await this.postsLikeRepository.create(prisma, userId, postId);
      const postResult = await this.postsRepository.addLikeCountById(
        prisma,
        postId,
      );
      return postResult.likes;
    });
  }

  unsetLike(userId: postLike['usersID'], postId: postLike['postsID']) {
    return this.prismaService.$transaction(async (prisma) => {
      const hasLiked = await this.postsLikeRepository.findByUserIdAndPostId(
        prisma,
        userId,
        postId,
      );
      if (!hasLiked) throw new ConflictException(alreadySetLike);

      await this.postsLikeRepository.softDeleteByUserIdAndPostId(
        prisma,
        userId,
        postId,
      );

      const postResult = await this.postsRepository.subLikeCountById(
        prisma,
        postId,
      );
      return postResult.likes;
    });
  }
}
