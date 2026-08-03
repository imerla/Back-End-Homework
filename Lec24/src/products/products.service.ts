import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface GetAllOptions {
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

  getAll(options: GetAllOptions): Product[] {
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

  getById(id: number): Product {
    const product = this.products.find(el => el.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(product: Omit<Product, 'id'>): Product {
    const newProduct = {
      id: this.nextId++,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: Partial<Omit<Product, 'id'>>): Product {
    const index = this.products.findIndex(el => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  delete(id: number, password: string): void {
    const index = this.products.findIndex(el => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (password !== 'secret') {
      throw new UnauthorizedException('Invalid password');
    }
    this.products.splice(index, 1);
  }
}
