import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/library/prisma';
import { PostsRepository } from '@api/posts/posts.repository';
import { PostsViewRepository } from '@api/posts/view/posts-view.repository';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [PrismaModule],
  providers: [PostsService, PostsRepository, PostsViewRepository],
  controllers: [PostsController],
})
export class PostsModule {}
