import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Post {
  @ApiProperty({ example: 'My First Post', description: 'Post title' })
  @Prop({ type: String })
  title!: string;

  @ApiProperty({ example: 'This is the content of my post', description: 'Post content' })
  @Prop({ type: String })
  content!: string;

  @ApiProperty({ description: 'Author ID' })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author!: Types.ObjectId;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
