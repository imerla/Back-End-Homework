import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    required: false,
    example: 'Laptop',
    description: 'Product name',
  })
  name?: string;

  @ApiProperty({
    required: false,
    example: 'High-performance laptop',
    description: 'Product description',
  })
  description?: string;

  @ApiProperty({
    required: false,
    example: 999.99,
    description: 'Product price',
  })
  price?: number;

  @ApiProperty({
    required: false,
    example: 'Electronics',
    description: 'Product category',
  })
  category?: string;

  @ApiProperty({
    required: false,
    example: 50,
    description: 'Product stock quantity',
  })
  stock?: number;
}
