import { CanActivate } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
export declare class HasUserIdGuard implements CanActivate {
    private readonly usersService;
    constructor(usersService: UsersService);
    canActivate(context: any): Promise<boolean>;
}
