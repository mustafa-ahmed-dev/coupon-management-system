import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@user/user.module';
import { JwtConfigModule } from '@jwt/jwt.module';
import { HashModule } from '@hash/hash.module';
import { JwtStrategy } from './startegies/jwt.startegy';
import { ConfigModule } from '@config/config.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    JwtConfigModule,
    HashModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
