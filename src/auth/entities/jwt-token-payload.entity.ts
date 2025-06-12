import { Role } from '@generated-prisma/client';

export class JwtTokenPayload {
  sub: number; // User ID
  username: string; // Username of the user
  role: Role; // User role, e.g., 'admin', 'user'
}
