import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { ExpressMiddleware } from './middleware/express.middleware';
import { NoBrowserMiddleware } from './middleware/no-browser.middleware';
import { RoleMiddleware } from './middleware/role.middleware';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExpressMiddleware, NoBrowserMiddleware)
      .forRoutes('*');

    consumer
      .apply(RoleMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PATCH },
        { path: 'products/:id', method: RequestMethod.DELETE },
      );
  }
}
