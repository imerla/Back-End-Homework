import { Injectable, CanActivate, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User } from '../../users/schema/user.schema';

@Injectable()
export class HasUserIdGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['user-id'];

    if (!userId) {
      throw new BadRequestException('User ID header is required');
    }

    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid User ID format');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }

    request.user = user;
    return true;
  }
}