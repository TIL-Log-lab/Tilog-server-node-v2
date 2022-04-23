import { Body, Controller, Query, UnauthorizedException } from '@nestjs/common';

import { CommentsService } from '@api/comments/comments.service';
import { JwtUserId } from '@app/utils/decorators/jwt-user-Id.decorator';
import {
  CreateComments,
  DeleteComment,
  GetComments,
} from '@api/comments/comments.decorator';

import { TokenPayload } from '@app/utils/token/types/token.type';
import { CreateCommentsRequestBodyDto } from '@api/comments/dto/create-comment.dto';
import { decodeAccessTokenFail } from '@api/users/auth/errors/users-auth.error';
import {
  GetCommentsRequestQueryDto,
  GetCommentsResponseDto,
} from '@api/comments/dto/get-comments.dto';
import { DeleteCommentRequestDto } from '@api/comments/dto/delete-comment.dto';

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
}
