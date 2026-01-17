import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatedPost } from './entities/related-post.entity';
import { CreateRelatedPostDto } from './dto/create-related-post.dto';

@Injectable()
export class RelatedPostsService {
  constructor(
    @InjectRepository(RelatedPost)
    private relatedPostsRepository: Repository<RelatedPost>,
  ) {}

  async create(
    createRelatedPostDto: CreateRelatedPostDto,
    imageUrl: string,
  ): Promise<RelatedPost> {
    const post = this.relatedPostsRepository.create({
      title: createRelatedPostDto.title,
      image: imageUrl,
    });
    return this.relatedPostsRepository.save(post);
  }

  async findAll(): Promise<RelatedPost[]> {
    return this.relatedPostsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
