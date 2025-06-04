import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@config/config.service';
import { JwtTokenPayload } from '@auth/entities/jwt-token-payload.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtConfig.jwtSecret,
    });
  }

  async validate(payload: JwtTokenPayload) {
    return payload; // Injected into request.user
  }
}
