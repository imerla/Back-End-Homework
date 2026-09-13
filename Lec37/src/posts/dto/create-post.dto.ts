import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'My First Post',
    description: 'Post title (min 3 characters)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title!: string;

  @ApiProperty({
    example: 'This is the content of my post',
    description: 'Post content',
  })
  @IsString()
  content!: string;
}
