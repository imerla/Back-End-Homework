import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { timestamp } from 'rxjs';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  stock: number;

  @Prop({ required: true })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
