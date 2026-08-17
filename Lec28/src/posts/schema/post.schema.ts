import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Post {
    @Prop({ required: true })
    title!:string;
    @Prop({ required: true })
    content!:string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user!:mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
