import {
  Body,
  Controller,
  Ip,
  Query,
  UnauthorizedException,
} from '@nestjs/common';

import {
  CreatePost,
  GetPostDetail,
  GetPosts,
  ModifyPost,
} from '@api/posts/posts.decorator';
import { PostsService } from '@api/posts/posts.service';
import { JwtUserId } from '@app/library/decorators/jwt-user-Id.decorator';

import {
  CreatePostRequestBodyDto,
  CreatePostResponseBodyDto,
} from '@api/posts/dto/create-post.dto';
import {
  GetPostDetailRequestQueryDto,
  GetPostDetailResponseDto,
} from '@api/posts/dto/get-post-detail.dto';
import {
  GetPostsRequestQueryDto,
  GetPostsResponseDto,
} from '@api/posts/dto/get-posts-detail.dto';
import { ModifyPostRequestBodyDto } from '@api/posts/dto/modify-post.dto';
import { unauthorizedUser } from '@api/users/auth/error/users-auth.error';
import { TokenPayload } from '@app/library/jwt/type/token.type';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @CreatePost()
  async createPost(
    @JwtUserId() { userId }: TokenPayload,
    @Body() createPostRequestBodyDto: CreatePostRequestBodyDto,
  ) {
    if (!userId) throw new UnauthorizedException(unauthorizedUser);
    const createPostId = await this.postsService.createPost({
      userId,
      ...createPostRequestBodyDto,
    });
    return new CreatePostResponseBodyDto({ id: createPostId });
  }

  @ModifyPost()
  async modifyPost(
    @JwtUserId() { userId }: TokenPayload,
    @Body() modifyPostRequestBodyDto: ModifyPostRequestBodyDto,
  ) {
    if (!userId) throw new UnauthorizedException(unauthorizedUser);
    await this.postsService.modifyPost({ userId, ...modifyPostRequestBodyDto });
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
    // NOTE: 유저 아이디가 둘다 없을 경우 참이될 수 있기 때문에 추가 연산이 필요하다
    // 유저가 작성한 게시글 리스트 조회가 아닐경우 개인 요청(private)에서 배재한다
    const isPersonal = getPostsRequestQueryDto.userId
      ? getPostsRequestQueryDto.userId === userId
      : false;
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
