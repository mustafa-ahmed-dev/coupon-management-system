import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponRequestApprovalDto } from './create-coupon-request-approval.dto';

export class UpdateCouponRequestApprovalDto extends PartialType(CreateCouponRequestApprovalDto) {}
