import { CommentsRepository } from '@api/comments/comments.repository';
import {
  commentNotFound,
  unauthorizedComment,
} from '@api/comments/error/comments.error';
import { postNotFound } from '@api/posts/errors/posts.error';
import { PostsRepository } from '@api/posts/posts.repository';
import { PrismaService } from '@app/library/prisma';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

    const commentsList = await this.commentsRepository.findMany({
      prismaConnection: this.prismaService,
      postId,
      replyTo,
    });

    return commentsList.map((item) => {
      return {
        ...item,
        content: item.deletedAt ? null : item.content,
      };
    });
  }

  async deleteComment({
    userId,
    commentId,
  }: {
    userId: comments['usersID'];
    commentId: comments['id'];
  }) {
    const hasComment =
      await this.commentsRepository.findOneByUserIdAndCommentId({
        prismaConnection: this.prismaService,
        userId,
        commentId,
      });

    if (!hasComment) throw new NotFoundException(commentNotFound);

    await this.commentsRepository.softDeleteByUserIdAndCommentId({
      prismaConnection: this.prismaService,
      userId,
      commentId,
    });
  }

  async updateComment({
    userId,
    commentId,
    content,
  }: {
    userId: comments['usersID'];
    commentId: comments['id'];
    content: comments['content'];
  }) {
    const hasComment = await this.commentsRepository.findOneByCommentId({
      prismaConnection: this.prismaService,
      commentId,
    });

    if (!hasComment) throw new NotFoundException(commentNotFound);

    const hasUserComment =
      await this.commentsRepository.findOneByUserIdAndCommentId({
        prismaConnection: this.prismaService,
        userId,
        commentId,
      });

    if (!hasUserComment) throw new UnauthorizedException(unauthorizedComment);

    await this.commentsRepository.updateByUserIdAndCommentId({
      prismaConnection: this.prismaService,
      userId,
      commentId,
      content,
    });
  }
}
