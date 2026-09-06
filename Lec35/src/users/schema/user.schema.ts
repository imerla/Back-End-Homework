import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../enums/role.enum';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  name!: string;

  @Prop({ type: String })
  email!: string;

  @Prop({ type: String })
  password!: string;

  @Prop({ type: String, enum: Role, default: Role.USER })
  role!: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
