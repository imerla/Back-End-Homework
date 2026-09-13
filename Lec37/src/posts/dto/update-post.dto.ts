import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    required: false,
    example: 'My First Post',
    description: 'Post title (min 3 characters)',
  })
  title?: string;

  @ApiProperty({
    required: false,
    example: 'This is the content of my post',
    description: 'Post content',
  })
  content?: string;
}
