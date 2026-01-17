import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRelatedPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
