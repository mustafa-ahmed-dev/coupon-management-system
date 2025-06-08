import { Module } from '@nestjs/common';
import { CouponRequestApprovalService } from './coupon-request-approval.service';
import { CouponRequestApprovalController } from './coupon-request-approval.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CouponRequestApprovalController],
  providers: [CouponRequestApprovalService],
})
export class CouponRequestApprovalModule {}
