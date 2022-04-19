import { Body, Controller, Query, UnauthorizedException } from '@nestjs/common';

import {
  HasLiked,
  SetLike,
  UnsetLike,
} from '@api/posts/like/posts-like.decorator';
import { PostsLikeService } from '@api/posts/like/posts-like.service';
import { JwtUserId } from '@app/utils/decorators/jwt-user-Id.decorator';

import {
  HasLikedRequestDto,
  HasLikedResponseDto,
} from '@api/posts/like/dto/has-liked.dto';
import { SetLikedRequestDto } from '@api/posts/like/dto/set-like.dto';
import { UnsetLikedRequestDto } from '@api/posts/like/dto/unset-like.dto';
import { TokenPayload } from '@app/utils/token/types/token.type';
import { unauthorizedUser } from '@api/users/auth/errors/users-auth.error';

@Controller('posts/like')
export class PostsLikeController {
  constructor(private readonly postLikeService: PostsLikeService) {}

  @HasLiked()
  async hasLiked(
    @Query() { postId }: HasLikedRequestDto,
    @JwtUserId() { userId }: TokenPayload,
  ) {
    if (!userId) throw new UnauthorizedException(unauthorizedUser);
    return new HasLikedResponseDto({
      like: await this.postLikeService.hasLiked(userId, postId),
    });
  }

  @SetLike()
  async setLike(
    @Body() { postId }: SetLikedRequestDto,
    @JwtUserId() { userId }: TokenPayload,
  ) {
    if (!userId) throw new UnauthorizedException(unauthorizedUser);

    await this.postLikeService.setLike(userId, postId);

    return null;
  }

  @UnsetLike()
  async unsetLike(
    @Body() { postId }: UnsetLikedRequestDto,
    @JwtUserId() { userId }: TokenPayload,
  ) {
    if (!userId) throw new UnauthorizedException(unauthorizedUser);

    await this.postLikeService.unsetLike(userId, postId);

    return null;
  }
}
