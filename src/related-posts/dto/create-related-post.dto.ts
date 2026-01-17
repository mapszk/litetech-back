import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRelatedPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsInt()
  readTime: number;
}
