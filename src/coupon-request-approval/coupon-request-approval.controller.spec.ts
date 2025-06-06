import { Test, TestingModule } from '@nestjs/testing';
import { CouponRequestApprovalController } from './coupon-request-approval.controller';
import { CouponRequestApprovalService } from './coupon-request-approval.service';

describe('CouponRequestApprovalController', () => {
  let controller: CouponRequestApprovalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponRequestApprovalController],
      providers: [CouponRequestApprovalService],
    }).compile();

    controller = module.get<CouponRequestApprovalController>(CouponRequestApprovalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
