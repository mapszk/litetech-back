import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RelatedPostsService } from './related-posts.service';
import { CreateRelatedPostDto } from './dto/create-related-post.dto';
import { S3Service } from 'src/common/services/s3.service';
import { S3FileInterceptor } from 'src/common/inteceptors/s3-file-interceptor';

@Controller('api/posts')
export class RelatedPostsController {
  constructor(
    private readonly relatedPostsService: RelatedPostsService,
    private readonly s3Service: S3Service,
  ) {}

  @Get('related')
  findAll() {
    return this.relatedPostsService.findAll();
  }

  @Post('related')
  @UseInterceptors(S3FileInterceptor.single('image'))
  async create(
    @Body() createRelatedPostDto: CreateRelatedPostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.s3Service.uploadFile(file);
    return this.relatedPostsService.create(createRelatedPostDto, imageUrl);
  }
}
