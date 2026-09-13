import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Product {
  @ApiProperty({ example: 'Laptop', description: 'Product name' })
  @Prop({ type: String })
  name!: string;

  @ApiProperty({ example: 'High-performance laptop', description: 'Product description' })
  @Prop({ type: String })
  description!: string;

  @ApiProperty({ example: 999.99, description: 'Product price' })
  @Prop({ type: Number })
  price!: number;

  @ApiProperty({ example: 'Electronics', description: 'Product category' })
  @Prop({ type: String })
  category!: string;

  @ApiProperty({ example: 50, description: 'Product stock quantity' })
  @Prop({ type: Number })
  stock!: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
