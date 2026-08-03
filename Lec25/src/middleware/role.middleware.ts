import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const role = req.headers['admin'] as string;

    if (role !== '12345') {
      throw new ForbiddenException('Access denied. Admin role required for this operation');
    }

    next();
  }
}
