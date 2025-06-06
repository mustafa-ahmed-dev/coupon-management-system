import { Module } from '@nestjs/common';
import { CouponRequestApprovalService } from './coupon-request-approval.service';
import { CouponRequestApprovalController } from './coupon-request-approval.controller';

@Module({
  controllers: [CouponRequestApprovalController],
  providers: [CouponRequestApprovalService],
})
export class CouponRequestApprovalModule {}
