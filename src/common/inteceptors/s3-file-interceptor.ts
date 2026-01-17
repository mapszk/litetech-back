import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export class S3FileInterceptor {
  static single(fieldName: string) {
    const options: MulterOptions = {
      storage: multer.memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException('Only images are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
    };

    return FileInterceptor(fieldName, options);
  }
}
