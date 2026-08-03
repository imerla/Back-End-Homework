import { Controller, Get, Post, Put, Delete, Body, Param, Query, Headers, BadRequestException, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProductsService, Product } from './products.service';
import { CreateProductDto, UpdateProductDto } from '../DTO/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('description') description?: string,
    @Query('price') price?: string,
  ) {
    return this.productsService.getAll({
      id: id ? parseInt(id) : undefined,
      name,
      description,
      price: price ? parseInt(price) : undefined,
    });
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getById(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Headers('password') password: string,
  ) {
    if (!password) {
      throw new BadRequestException('password header is required');
    }
    this.productsService.delete(id, password);
    return { message: 'Product deleted successfully' };
  }
}
