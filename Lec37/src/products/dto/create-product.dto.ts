import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Product name' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'High-performance laptop',
    description: 'Product description',
  })
  @IsString()
  description!: string;

  @ApiProperty({ example: 999.99, description: 'Product price' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 'Electronics', description: 'Product category' })
  @IsString()
  category!: string;

  @ApiProperty({ example: 50, description: 'Product stock quantity' })
  @IsNumber()
  @Min(0)
  stock!: number;
}
