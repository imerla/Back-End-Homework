import {
  Injectable,
  CanActivate,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class HasUserIdGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['user-id'];

    if (!userId) {
      throw new BadRequestException('User ID header is required');
    }

    try {
      const user = await this.usersService.findOne(userId);
      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('User not found');
      }
      throw error;
    }
  }
}
