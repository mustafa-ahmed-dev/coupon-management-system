import 'dotenv/config'; // Ensure environment variables are loaded
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditLogsModule } from '@common/modules/audit-log/audit-logs.module';
import { ConfigModule } from '@common/modules/config/config.module';
import { UserModule } from '@user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { HashService } from '@common/modules/hash/hash.service';
import { HashModule } from './common/modules/hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from './common/modules/jwt/jwt.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtConfigModule,
    PrismaModule,
    AuditLogsModule,
    UserModule,
    HashModule,
    AuthModule,
    CouponModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {}
