import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponRequestDto } from './create-coupon-request.dto';

export class UpdateCouponRequestDto extends PartialType(
  CreateCouponRequestDto,
) {}
