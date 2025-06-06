import { Test, TestingModule } from '@nestjs/testing';
import { CouponRequestCategoryService } from './coupon-request-category.service';

describe('CouponRequestCategoryService', () => {
  let service: CouponRequestCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponRequestCategoryService],
    }).compile();

    service = module.get<CouponRequestCategoryService>(CouponRequestCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
