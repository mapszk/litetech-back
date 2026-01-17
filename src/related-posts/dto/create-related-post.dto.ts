import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateRelatedPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt({ message: 'readTime must be a integer' })
  @IsPositive({ message: 'readTime must be > than 0' })
  readTime: number;
}
