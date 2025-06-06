import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponRequestCategoryDto } from './create-coupon-request-category.dto';

export class UpdateCouponRequestCategoryDto extends PartialType(
  CreateCouponRequestCategoryDto,
) {}
