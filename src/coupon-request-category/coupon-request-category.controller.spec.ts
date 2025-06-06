import { Test, TestingModule } from '@nestjs/testing';
import { CouponRequestCategoryController } from './coupon-request-category.controller';
import { CouponRequestCategoryService } from './coupon-request-category.service';

describe('CouponRequestCategoryController', () => {
  let controller: CouponRequestCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponRequestCategoryController],
      providers: [CouponRequestCategoryService],
    }).compile();

    controller = module.get<CouponRequestCategoryController>(CouponRequestCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
