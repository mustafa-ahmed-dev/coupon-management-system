import { Module } from '@nestjs/common';
import { CouponRequestService } from './coupon-request.service';
import { CouponRequestController } from './coupon-request.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CouponRequestController],
  providers: [CouponRequestService],
})
export class CouponRequestModule {}
