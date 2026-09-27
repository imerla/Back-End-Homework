import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ISAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
