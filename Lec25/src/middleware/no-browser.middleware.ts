import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class NoBrowserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'] || '';
    
    const browserPatterns = [
      /mozilla/i,
      /chrome/i,
      /firefox/i,
      /safari/i,
      /edge/i,
      /opera/i,
      /brave/i,
    ];

    const isBrowser = browserPatterns.some(pattern => pattern.test(userAgent));

    if (isBrowser) {
      throw new ForbiddenException('Browser access is not allowed');
    }

    next();
  }
}
