import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String })
  name!: string;

  @Prop({ type: String })
  description!: string;

  @Prop({ type: Number })
  price!: number;

  @Prop({ type: String })
  category!: string;

  @Prop({ type: Number })
  stock!: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
