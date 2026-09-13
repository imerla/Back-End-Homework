import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @Prop({ type: String })
  name!: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @Prop({ type: String })
  email!: string;

  @Prop({ type: String })
  password!: string;

  @ApiProperty({ enum: Role, example: Role.USER, description: 'User role' })
  @Prop({ type: String, enum: Role, default: Role.USER })
  role!: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
