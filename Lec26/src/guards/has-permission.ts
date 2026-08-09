import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './role';

@Injectable()
export class HasPermission implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    let userRole: string;

    if (user && user.role) {
      userRole = user.role;
    } else {
      userRole = request.headers['role'] as string;
    }

    if (!userRole) {
      return false;
    }

    const roleHierarchy = [Role.VIEWER, Role.EDITOR, Role.ADMIN];
    const userRoleIndex = roleHierarchy.indexOf(userRole as Role);

    return requiredRoles.some((requiredRole) => {
      const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
      return userRoleIndex >= requiredRoleIndex;
    });
  }
}
