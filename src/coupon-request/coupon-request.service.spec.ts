import { Test, TestingModule } from '@nestjs/testing';
import { CouponRequestService } from './coupon-request.service';

describe('CouponRequestService', () => {
  let service: CouponRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponRequestService],
    }).compile();

    service = module.get<CouponRequestService>(CouponRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
