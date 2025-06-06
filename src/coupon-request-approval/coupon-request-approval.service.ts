import { Injectable } from '@nestjs/common';
import { CreateCouponRequestApprovalDto } from './dto/create-coupon-request-approval.dto';
import { UpdateCouponRequestApprovalDto } from './dto/update-coupon-request-approval.dto';

@Injectable()
export class CouponRequestApprovalService {
  create(createCouponRequestApprovalDto: CreateCouponRequestApprovalDto) {
    return 'This action adds a new couponRequestApproval';
  }

  findAll() {
    return `This action returns all couponRequestApproval`;
  }

  findOne(id: number) {
    return `This action returns a #${id} couponRequestApproval`;
  }

  update(id: number, updateCouponRequestApprovalDto: UpdateCouponRequestApprovalDto) {
    return `This action updates a #${id} couponRequestApproval`;
  }

  remove(id: number) {
    return `This action removes a #${id} couponRequestApproval`;
  }
}
