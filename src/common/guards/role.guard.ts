import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ALLOW_SELF_KEY } from '@decorators/allow-self.decorator';
import { ROLES_KEY } from '@decorators/roles.decorator';
import { Role } from '@generated-prisma/client'; // adjust path if needed
import { JwtTokenPayload } from '@auth/entities/jwt-token-payload.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const allowSelf = this.reflector.getAllAndOverride<boolean>(
      ALLOW_SELF_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: JwtTokenPayload }>();
    const user = request.user;
    const userId = user.sub;
    const paramId = parseInt(request.params?.id, 10);

    if (!user) {
      throw new ForbiddenException('Not authenticated');
    }

    const isAdmin = requiredRoles?.includes(user.role);
    const isSelf = allowSelf && userId === paramId;

    if (isAdmin || isSelf) {
      return true;
    }

    throw new ForbiddenException('Access denied');
  }
}
