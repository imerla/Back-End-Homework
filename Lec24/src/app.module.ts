import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishlistModule } from './wishlist/wishlist.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [WishlistModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
