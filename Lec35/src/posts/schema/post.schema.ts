import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String })
  title!: string;

  @Prop({ type: String })
  content!: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author!: Types.ObjectId;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
