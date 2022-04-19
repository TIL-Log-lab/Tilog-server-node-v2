import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/library/prisma';
import { PostsRepository } from '@api/posts/posts.repository';
import { PostsViewRepository } from '@api/posts/view/posts-view.repository';
import { PostsLikeController } from '@api/posts/like/posts-like.controller';
import { PostsLikeService } from '@api/posts/like/posts-like.service';
import { PostsLikeRepository } from '@api/posts/like/posts-like.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [PrismaModule],
  providers: [
    PostsService,
    PostsRepository,
    PostsViewRepository,
    PostsLikeService,
    PostsLikeRepository,
  ],
  controllers: [PostsController, PostsLikeController],
})
export class PostsModule {}
