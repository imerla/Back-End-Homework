import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async findByUserId(userId: string) {
    return this.productModel.find({ userId }).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
