import { Test, TestingModule } from '@nestjs/testing';
import { CouponRequestController } from './coupon-request.controller';
import { CouponRequestService } from './coupon-request.service';

describe('CouponRequestController', () => {
  let controller: CouponRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponRequestController],
      providers: [CouponRequestService],
    }).compile();

    controller = module.get<CouponRequestController>(CouponRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
