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
import { CouponRequestCategoryModule } from './coupon-request-category/coupon-request-category.module';
import { CouponRequestModule } from './coupon-request/coupon-request.module';
import { CouponRequestApprovalModule } from './coupon-request-approval/coupon-request-approval.module';
import { HealthModule } from './health/health.module';

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
    CouponRequestCategoryModule,
    CouponRequestModule,
    CouponRequestApprovalModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {}
