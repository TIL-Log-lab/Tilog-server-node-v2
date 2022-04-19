import {
  Body,
  Controller,
  Ip,
  Query,
  UnauthorizedException,
} from '@nestjs/common';

import { PostsService } from '@api/posts/posts.service';
import { CreatePost, GetPostDetail } from '@api/posts/posts.decorator';
import { JwtUserId } from '@app/utils/decorators/jwt-user-Id.decorator';

import { CreatePostRequestBodyDto } from '@api/posts/dto/create-post.dto';
import { unauthorizedUser } from '@api/users/auth/errors/users-auth.error';
import { TokenPayload } from '@app/utils/token/types/token.type';
import {
  GetPostDetailRequestQueryDto,
  GetPostDetailResponseDto,
} from '@api/posts/dto/get-post-detail.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @CreatePost()
  async createPost(
    @JwtUserId() { userId }: TokenPayload,
    @Body() createPostRequestBodyDto: CreatePostRequestBodyDto,
  ) {
    if (!userId) throw new UnauthorizedException(unauthorizedUser);
    await this.postsService.createPost({ userId, ...createPostRequestBodyDto });
    return null;
  }

  @GetPostDetail()
  async getPostDetail(
    @Query() { postId }: GetPostDetailRequestQueryDto,
    @JwtUserId() { userId }: TokenPayload,
    @Ip() userIp: string,
  ) {
    const result = await this.postsService.getPostDetail(
      postId,
      userId,
      userIp,
    );
    return new GetPostDetailResponseDto({
      id: result.id,
      title: result.title,
      subTitle: result.subTitle,
      thumbnailUrl: result.thumbNailURL,
      view: result.viewCounts,
      like: result.likes,
      content: result.markDownContent,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      user: {
        userId: result.users.id,
        username: result.users.userName,
        avatar: result.users.proFileImageURL,
      },
      category: {
        categoryId: result.category.id,
        name: result.category.categoryName,
      },
    });
  }
}
