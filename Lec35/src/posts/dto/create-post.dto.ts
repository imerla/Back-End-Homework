import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  content!: string;
}
