import { Body, Controller, UnauthorizedException } from '@nestjs/common';

import { PostsService } from '@api/posts/posts.service';
import { CreatePost } from '@api/posts/posts.decorator';
import { JwtUserId } from '@app/utils/decorators/jwt-user-Id.decorator';

import { CreatePostRequestBodyDto } from '@api/posts/dto/create-post.dto';
import { decodeAccessTokenFail } from '@api/users/auth/errors/users-auth.error';
import { TokenPayload } from '@app/utils/token/types/token.type';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @CreatePost()
  async createPost(
    @JwtUserId() { userId }: TokenPayload,
    @Body() createPostRequestBodyDto: CreatePostRequestBodyDto,
  ) {
    if (!userId) throw new UnauthorizedException(decodeAccessTokenFail);
    await this.postsService.createPost({ userId, ...createPostRequestBodyDto });
    return null;
  }
}
