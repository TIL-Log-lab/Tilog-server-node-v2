import { PostsRepository } from '@api/posts/posts.repository';
import { PrismaService } from '@app/library/prisma';
import { Injectable } from '@nestjs/common';
import { posts } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postsRepository: PostsRepository,
  ) {}

  async createPost({
    userId,
    categoryId = 0,
    title,
    subTitle,
    thumbnailUrl,
    markdownContent,
    isPrivate = false,
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
}
