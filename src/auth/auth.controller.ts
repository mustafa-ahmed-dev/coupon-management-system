// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtToken } from './entities/jwt-token.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto): Promise<JwtToken> {
    return this.authService.login(body.email, body.password);
  }
}
