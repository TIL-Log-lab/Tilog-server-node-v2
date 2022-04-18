import { CreatePostRequestBodyDto } from '@api/posts/dto/create-post.dto';
import { CreatePost } from '@api/posts/posts.decorator';
import { PostsService } from '@api/posts/posts.service';
import { decodeAccessTokenFail } from '@api/users/auth/errors/users-auth.error';
import { JwtUserId } from '@app/utils/decorators/jwt-user-Id.decorator';
import { JwtAccessTokenGuard } from '@app/utils/guards/auth/jwt-access-token.guard';
import { TokenPayload } from '@app/utils/token/types/token.type';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @CreatePost()
  async createPost(
    @JwtUserId() { userId }: TokenPayload,
    @Body() createPostRequestBodyDto: CreatePostRequestBodyDto,
  ) {
    console.log(createPostRequestBodyDto, userId);
    if (!userId) throw new UnauthorizedException(decodeAccessTokenFail);
    await this.postsService.createPost({ userId, ...createPostRequestBodyDto });
    return null;
  }
}
