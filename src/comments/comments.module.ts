import { Module } from '@nestjs/common';

import { CommentsController } from '@api/comments/comments.controller';
import { CommentsRepository } from '@api/comments/comments.repository';
import { CommentsService } from '@api/comments/comments.service';
import { PostsRepository } from '@api/posts/posts.repository';
import { PrismaModule } from '@app/library/prisma';

@Module({
  imports: [PrismaModule],
  providers: [CommentsService, CommentsRepository, PostsRepository],
  controllers: [CommentsController],
})
export class CommentsModule {}
