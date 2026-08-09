import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @Min(0)
  @Max(999999)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(999999)
  stock: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category: string;
}
