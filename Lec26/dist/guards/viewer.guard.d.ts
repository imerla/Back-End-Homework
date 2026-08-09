import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ViewerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
