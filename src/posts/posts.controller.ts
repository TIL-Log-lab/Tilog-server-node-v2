import {
  Body,
  Controller,
  Ip,
  Query,
  UnauthorizedException,
} from '@nestjs/common';

import { PostsService } from '@api/posts/posts.service';
import {
  CreatePost,
  GetPostDetail,
  GetPosts,
} from '@api/posts/posts.decorator';
import { JwtUserId } from '@app/utils/decorators/jwt-user-Id.decorator';

import { CreatePostRequestBodyDto } from '@api/posts/dto/create-post.dto';
import { unauthorizedUser } from '@api/users/auth/errors/users-auth.error';
import { TokenPayload } from '@app/utils/token/types/token.type';
import {
  GetPostDetailRequestQueryDto,
  GetPostDetailResponseDto,
} from '@api/posts/dto/get-post-detail.dto';
import {
  GetPostsRequestQueryDto,
  GetPostsResponseDto,
} from '@api/posts/dto/get-posts-detail.dto';

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

  @GetPosts()
  async getPosts(
    @Query()
    getPostsRequestQueryDto: GetPostsRequestQueryDto,
    @JwtUserId() { userId }: TokenPayload,
  ) {
    const isPersonal = getPostsRequestQueryDto.userId === userId;
    const postsList = await this.postsService.getPosts({
      dateScope: getPostsRequestQueryDto.dateScope,
      sortScope: getPostsRequestQueryDto.sortScope,
      userId: getPostsRequestQueryDto.userId,
      categoryId: getPostsRequestQueryDto.categoryId,
      personalRequest: isPersonal,
      page: getPostsRequestQueryDto.page,
      maxContent: getPostsRequestQueryDto.maxContent,
    });
    return new GetPostsResponseDto({
      list: postsList.map((item) => {
        return {
          id: item.id,
          title: item.title,
          subTitle: item.subTitle,
          thumbnailUrl: item.thumbNailURL,
          view: item.viewCounts,
          like: item.likes,
          createdAt: item.createdAt,
          user: {
            userId: item.users.id,
            username: item.users.userName,
            avatar: item.users.proFileImageURL,
          },
          category: {
            categoryId: item.category.id,
            name: item.category.categoryName,
          },
        };
      }),
    });
  }
}
