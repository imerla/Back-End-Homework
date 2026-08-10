import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const product = this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const product = this.productModel.findByIdAndUpdate(id, updateProductDto, { returnDocument: 'after' }).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const product = this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
