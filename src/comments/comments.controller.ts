import { Body, Controller, Query, UnauthorizedException } from '@nestjs/common';

import {
  CreateComments,
  DeleteComment,
  GetComments,
  UpdateComment,
} from '@api/comments/comments.decorator';
import { CommentsService } from '@api/comments/comments.service';
import { JwtUserId } from '@app/library/decorators/jwt-user-Id.decorator';

import { CreateCommentsRequestBodyDto } from '@api/comments/dto/create-comment.dto';
import { DeleteCommentRequestDto } from '@api/comments/dto/delete-comment.dto';
import {
  GetCommentsRequestQueryDto,
  GetCommentsResponseDto,
} from '@api/comments/dto/get-comments.dto';
import { UpdateCommentRequestDto } from '@api/comments/dto/update-comment.dto';
import { decodeAccessTokenFail } from '@api/users/auth/error/users-auth.error';
import { TokenPayload } from '@app/library/jwt/type/token.type';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @CreateComments()
  async createComment(
    @JwtUserId() { userId }: TokenPayload,
    @Body() createCommentsRequestBodyDto: CreateCommentsRequestBodyDto,
  ) {
    if (!userId) throw new UnauthorizedException(decodeAccessTokenFail);
    await this.commentsService.createComments({
      userId,
      ...createCommentsRequestBodyDto,
    });
    return null;
  }

  @GetComments()
  async getComments(
    @Query() getCommentsRequestQueryDto: GetCommentsRequestQueryDto,
  ) {
    const commentsList = await this.commentsService.getComments(
      getCommentsRequestQueryDto,
    );

    return new GetCommentsResponseDto({
      list: commentsList.map((item) => {
        return {
          id: item.id,
          content: item.content,
          replyTo: item.replyTo,
          createdAt: item.createdAt,
          deletedAt: item.deletedAt,
          postId: item.postsID,
          user: {
            userId: item.users.id,
            username: item.users.userName,
            avatar: item.users.proFileImageURL,
          },
        };
      }),
    });
  }

  @DeleteComment()
  async deleteComment(
    @JwtUserId() { userId }: TokenPayload,
    @Body() deleteCommentRequestDto: DeleteCommentRequestDto,
  ) {
    if (!userId) throw new UnauthorizedException(decodeAccessTokenFail);
    await this.commentsService.deleteComment({
      userId,
      ...deleteCommentRequestDto,
    });
    return null;
  }

  @UpdateComment()
  async updateComment(
    @JwtUserId() { userId }: TokenPayload,
    @Body() updateCommentRequestDto: UpdateCommentRequestDto,
  ) {
    if (!userId) throw new UnauthorizedException(decodeAccessTokenFail);
    await this.commentsService.updateComment({
      userId,
      ...updateCommentRequestDto,
    });
  }
}
