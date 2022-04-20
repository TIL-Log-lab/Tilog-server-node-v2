import { Body, Controller, UnauthorizedException } from '@nestjs/common';

import { CommentsService } from '@api/comments/comments.service';
import { JwtUserId } from '@app/utils/decorators/jwt-user-Id.decorator';
import { CreateComments } from '@api/comments/comments.decorator';

import { TokenPayload } from '@app/utils/token/types/token.type';
import { CreateCommentsRequestBodyDto } from '@api/comments/dto/create-comment.dto';
import { decodeAccessTokenFail } from '@api/users/auth/errors/users-auth.error';

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
}
