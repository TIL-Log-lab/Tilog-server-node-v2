import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/library/prisma';
import { CommentsService } from '@api/comments/comments.service';
import { CommentsController } from '@api/comments/comments.controller';
import { CommentsRepository } from '@api/comments/comments.repository';
import { PostsRepository } from '@api/posts/posts.repository';

@Module({
  imports: [PrismaModule],
  providers: [CommentsService, CommentsRepository, PostsRepository],
  controllers: [CommentsController],
})
export class CommentsModule {}
