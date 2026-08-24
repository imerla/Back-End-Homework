import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true, type: Number })
  age!: number;
  @Prop({ required: true })
  email!: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }], default: [] })
  posts!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
