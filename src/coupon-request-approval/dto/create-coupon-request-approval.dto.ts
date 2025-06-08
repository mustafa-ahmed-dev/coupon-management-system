import { IsNotCancelledStatus } from '@coupon-request-approval/decorators/is-not-cancelled-status.decorator';
import { CouponApprovalStatus } from '@generated-prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateCouponRequestApprovalDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  requestId: number;

  @IsNotEmpty()
  @IsEnum(CouponApprovalStatus)
  @IsNotCancelledStatus()
  status: CouponApprovalStatus;

  @IsNotEmpty()
  @IsString()
  @Length(1, 512)
  comment: string;
}
