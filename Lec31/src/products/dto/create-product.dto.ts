export class CreateProductDto {
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  userId!: string; // Reference to the user who owns this product
}
