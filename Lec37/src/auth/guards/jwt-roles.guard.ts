import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from '../../decorators/user.decorators';
import { Role } from '../../enums/role.enum';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    ...roles.length > 0 ? [Roles(...roles)] : []
  );
}