import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

interface FindAllOptions {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'milk', description: 'Fresh milk', price: 4 },
    { id: 2, name: 'bread', description: 'White bread', price: 2 },
    { id: 3, name: 'cheese', description: 'Cheddar cheese', price: 8 },
    { id: 4, name: 'butter', description: 'Butter 200g', price: 5 },
    { id: 5, name: 'eggs', description: 'Eggs 10pcs', price: 6 },
  ];
  private nextId = 6;

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.nextId++,
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(options: FindAllOptions): Product[] {
    let filtered = [...this.products];

    if (options.id !== undefined) {
      filtered = filtered.filter(el => el.id === options.id);
    }
    if (options.name) {
      filtered = filtered.filter(el => el.name === options.name);
    }
    if (options.description) {
      filtered = filtered.filter(el => el.description === options.description);
    }
    if (options.price !== undefined) {
      filtered = filtered.filter(el => el.price === options.price);
    }

    return filtered;
  }

  findOne(id: number): Product {
    const product = this.products.find(el => el.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const index = this.products.findIndex(el => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...updateProductDto };
    return this.products[index];
  }

  remove(id: number): void {
    const index = this.products.findIndex(el => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
  }
}
