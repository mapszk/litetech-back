import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatedPostsController } from './related-posts.controller';
import { RelatedPostsService } from './related-posts.service';
import { RelatedPost } from './entities/related-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelatedPost])],
  controllers: [RelatedPostsController],
  providers: [RelatedPostsService],
})
export class RelatedPostsModule {}
