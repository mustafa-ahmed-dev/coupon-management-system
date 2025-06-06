import { Injectable } from '@nestjs/common';
import { CreateCouponRequestDto } from './dto/create-coupon-request.dto';
import { UpdateCouponRequestDto } from './dto/update-coupon-request.dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CouponRequestService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCouponRequestDto, userId: number) {
    const { categoryId, ...data } = dto;
    return this.prisma.couponRequest.create({
      data: {
        customerName: data.customerName,
        description: data.description,
        orderNumber: data.orderNumber,
        category: {
          connect: {
            id: categoryId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.couponRequest.findMany();
  }

  findOne(id: number) {
    return this.prisma.couponRequest.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdateCouponRequestDto) {
    const { categoryId, ...data } = dto;

    return this.prisma.couponRequest.update({
      where: { id },
      data: {
        ...data,
        category: categoryId
          ? {
              connect: {
                id: categoryId,
              },
            }
          : undefined,
      },
    });
  }

  remove(id: number) {
    return this.prisma.couponRequest.delete({
      where: { id },
    });
  }
}
