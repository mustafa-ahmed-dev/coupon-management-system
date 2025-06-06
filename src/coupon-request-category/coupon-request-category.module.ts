import { Module } from '@nestjs/common';
import { CouponRequestCategoryService } from './coupon-request-category.service';
import { CouponRequestCategoryController } from './coupon-request-category.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CouponRequestCategoryController],
  providers: [CouponRequestCategoryService],
})
export class CouponRequestCategoryModule {}
