import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { extname } from 'path';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucket: string;
  private projectId: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const endpoint = this.configService.get<string>('AWS_S3_ENDPOINT');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const projectId = this.configService.get<string>('PROJECT_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET')!;
    this.projectId = projectId!;

    if (!region || !accessKeyId || !secretAccessKey || !this.bucket) {
      throw new Error('AWS S3 credentials not found in environment variables');
    }

    this.s3Client = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const fileKey = `${randomName}${extname(file.originalname)}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }),
      );

      return `https://${this.projectId}.supabase.co/storage/v1/object/public/${this.bucket}/${fileKey}`;
    } catch (err) {
      console.error('S3 Upload Error:', err);
      throw new InternalServerErrorException('Failed to upload file to S3');
    }
  }
}
