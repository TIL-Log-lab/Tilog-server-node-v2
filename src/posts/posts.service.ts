import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { posts, postView } from '@prisma/client';

import { PostsRepository } from '@api/posts/posts.repository';
import { PrismaService } from '@app/library/prisma';
import { PostsViewRepository } from '@api/posts/view/posts-view.repository';

import { isPrivatePost, postNotFound } from '@api/posts/errors/posts.error';
import { PostSearchDateScope, PostSearchSortScope } from '@app/utils/';

@Injectable()
export class PostsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postsRepository: PostsRepository,
    private readonly postsViewRepository: PostsViewRepository,
  ) {}

  async createPost({
    userId,
    categoryId,
    title,
    subTitle,
    thumbnailUrl,
    markdownContent,
    isPrivate,
  }: {
    userId: posts['usersID'];
    categoryId: posts['categoryID'];
    title: posts['title'];
    subTitle: posts['subTitle'];
    thumbnailUrl: posts['thumbNailURL'];
    markdownContent: posts['markDownContent'];
    isPrivate: boolean;
  }) {
    await this.postsRepository.create({
      prismaConnection: this.prismaService,
      userId,
      categoryId,
      title,
      subTitle,
      thumbnailUrl,
      markdownContent,
      isPrivate,
    });
  }

  async getPostDetail(
    postId: posts['id'],
    userId: posts['usersID'] | null,
    userIp: postView['userIP'],
  ) {
    try {
      // NOTE: 조회수 카운트 및 히스토리 기록
      await this.prismaService.$transaction(async (prisma) => {
        const hasViewed =
          await this.postsViewRepository.getOneByPostIdAndUserIp(
            prisma,
            postId,
            userIp,
          );
        if (hasViewed) throw new Error('hasViewed');
        await this.postsViewRepository.create(prisma, postId, userIp);
        await this.postsRepository.addViewCountById(prisma, postId);
      });
    } catch (error) {
      if (!(error instanceof Error)) throw new InternalServerErrorException();
    }
    // NOTE: 게시글 조회
    const searchResult = await this.postsRepository.getDetailFindById(
      this.prismaService,
      postId,
    );

    if (!searchResult) throw new NotFoundException(postNotFound);

    // NOTE: 비밀글일 경우 본인만 열람이 가능하다
    if (searchResult.private === 1) {
      if (searchResult.usersID !== userId)
        throw new NotFoundException(isPrivatePost);
    }

    return searchResult;
  }

  getPosts({
    sortScope,
    dateScope,
    userId,
    categoryId,
    personalRequest,
  }: {
    dateScope: PostSearchDateScope;
    sortScope: PostSearchSortScope;
    userId?: posts['usersID'];
    categoryId?: posts['categoryID'];
    personalRequest: boolean;
  }) {
    return this.postsRepository.getPost({
      prismaConnection: this.prismaService,
      dateScope,
      sortScope,
      userId,
      categoryId,
      hasPrivatePosts: personalRequest,
    });
  }
}
