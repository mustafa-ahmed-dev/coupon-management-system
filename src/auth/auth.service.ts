import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@common/modules/hash/hash.service';
import { UserService } from '@user/user.service'; // Adjust the import path as necessary
import { JwtTokenPayload } from './entities/jwt-token-payload.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.verify(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    } as JwtTokenPayload;
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
