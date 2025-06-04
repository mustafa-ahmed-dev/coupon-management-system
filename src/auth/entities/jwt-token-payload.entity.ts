export class JwtTokenPayload {
  sub: number; // User ID
  username: string; // Username of the user
  role: string; // User role, e.g., 'admin', 'user'
}
