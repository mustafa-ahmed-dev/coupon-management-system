import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCouponRequestApprovalDto } from './create-coupon-request-approval.dto';

export class UpdateCouponRequestApprovalDto extends OmitType(
  PartialType(CreateCouponRequestApprovalDto),
  ['requestId', 'status'],
) {}

export class UpdateCouponRequestApprovalStatusDto extends OmitType(
  CreateCouponRequestApprovalDto,
  ['requestId', 'comment'],
) {}
