import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  name!: string;

  @Prop({ type: String })
  email!: string;

  @Prop({ type: String })
  password!: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
