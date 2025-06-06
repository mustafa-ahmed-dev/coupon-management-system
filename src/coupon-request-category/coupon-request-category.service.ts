import { Injectable } from '@nestjs/common';
import { CreateCouponRequestCategoryDto } from './dto/create-coupon-request-category.dto';
import { UpdateCouponRequestCategoryDto } from './dto/update-coupon-request-category.dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CouponRequestCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCouponRequestCategoryDto) {
    return this.prisma.couponRequestCategory.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.couponRequestCategory.findMany();
  }

  findOne(id: number) {
    return this.prisma.couponRequestCategory.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, dto: UpdateCouponRequestCategoryDto) {
    return this.prisma.couponRequestCategory.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.couponRequestCategory.delete({
      where: { id },
    });
  }
}
