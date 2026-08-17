import { CanActivate } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../users/schema/user.schema';
export declare class HasUserIdGuard implements CanActivate {
    private userModel;
    constructor(userModel: Model<User>);
    canActivate(context: any): Promise<boolean>;
}
