import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async onModuleInit() {
    const count = await this.productModel.countDocuments();
    if (count === 0) {
      console.log('Seeding 1000 products...');
      await this.seedProducts(1000);
      console.log('Products seeded successfully');
    }
  }

  private async seedProducts(count: number) {
    const products: any[] = [];
    const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'];
    
    for (let i = 0; i < count; i++) {
      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
        category: categories[Math.floor(Math.random() * categories.length)],
        stock: Math.floor(Math.random() * 100) + 1,
      });
    }
    
    await this.productModel.insertMany(products);
  }

  create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
