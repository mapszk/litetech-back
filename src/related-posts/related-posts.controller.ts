import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RelatedPostsService } from './related-posts.service';
import { CreateRelatedPostDto } from './dto/create-related-post.dto';

@Controller('api/posts')
export class RelatedPostsController {
  constructor(private readonly relatedPostsService: RelatedPostsService) {}

  @Get('related')
  findAll() {
    return this.relatedPostsService.findAll();
  }

  @Post('related')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException('Only images are allowed'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 3 * 1024 * 1024, // 3MB
      },
    }),
  )
  async create(
    @Body() createRelatedPostDto: CreateRelatedPostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image is required');
    }

    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl && process.env.NODE_ENV === 'production') {
      throw new InternalServerErrorException(
        'BACKEND_URL is required in production',
      );
    }

    const imageUrl = `${backendUrl || 'http://localhost:3001'}/uploads/${file.filename}`;
    return this.relatedPostsService.create(createRelatedPostDto, imageUrl);
  }
}
