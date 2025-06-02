import { Role } from '@generated-prisma/client';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date | null;
}
