import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '@generated-prisma/client';
import { ROLES_KEY } from '@decorators/roles.decorator';
import { JwtTokenPayload } from '@auth/entities/jwt-token-payload.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no specific role is required, allow access
    if (!requiredRoles || !requiredRoles?.length) return true;
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: JwtTokenPayload }>();

    if (!request?.user) {
      throw new ForbiddenException('Access denied: user not authenticated');
    }

    const user = request?.user;
    const isMatchedRole = requiredRoles.some((role) => role === user.role);

    if (!user || !isMatchedRole) {
      throw new ForbiddenException(
        `Access denied: requires roles "${requiredRoles.join(', ')}"`,
      );
    }

    return true;
  }
}
