import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExpressMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ExpressMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Request: ${req.method} ${req.url}`);
    this.logger.log(`Headers: ${JSON.stringify(req.headers)}`);
    this.logger.log(`Body: ${JSON.stringify(req.body)}`);
    next();
  }
}
