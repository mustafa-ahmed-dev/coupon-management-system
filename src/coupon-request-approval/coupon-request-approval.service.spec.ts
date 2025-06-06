import { Test, TestingModule } from '@nestjs/testing';
import { CouponRequestApprovalService } from './coupon-request-approval.service';

describe('CouponRequestApprovalService', () => {
  let service: CouponRequestApprovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponRequestApprovalService],
    }).compile();

    service = module.get<CouponRequestApprovalService>(CouponRequestApprovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
