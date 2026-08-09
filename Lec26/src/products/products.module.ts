import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { HasPermission } from '../guards/has-permission';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, HasPermission],
})
export class ProductsModule {}
