import { CommentsRepository } from '@api/comments/comments.repository';
import { postNotFound } from '@api/posts/errors/posts.error';
import { PostsRepository } from '@api/posts/posts.repository';
import { PrismaService } from '@app/library/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { comments } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async createComments({
    userId,
    postId,
    content,
    replyTo,
  }: {
    userId: comments['usersID'];
    postId: comments['postsID'];
    content: comments['content'];
    replyTo: comments['replyTo'];
  }) {
    const hasPost = await this.postsRepository.getDetailFindById(
      this.prismaService,
      postId,
    );

    if (!hasPost) throw new NotFoundException(postNotFound);

    await this.commentsRepository.create({
      prismaConnection: this.prismaService,
      userId,
      postId,
      content,
      replyTo,
    });
  }

  async getComments({
    postId,
    replyTo,
  }: {
    postId: comments['postsID'];
    replyTo: comments['replyTo'];
  }) {
    const hasPost = await this.postsRepository.getDetailFindById(
      this.prismaService,
      postId,
    );

    if (!hasPost) throw new NotFoundException(postNotFound);

    return this.commentsRepository.findMany({
      prismaConnection: this.prismaService,
      postId,
      replyTo,
    });
  }
}
