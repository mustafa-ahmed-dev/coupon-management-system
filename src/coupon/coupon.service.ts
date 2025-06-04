import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateCouponDto, userId: number) {
    return this.prismaService.coupon.create({
      data: {
        ...dto,
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findUsed() {
    return this.prismaService.coupon.findMany({
      where: {
        isUsed: true,
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.coupon.findMany({
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(identifier: number | string) {
    if (typeof identifier === 'string') {
      return this.prismaService.coupon.findFirstOrThrow({
        where: { code: identifier },
        include: {
          createdBy: {
            select: {
              name: true,
            },
          },
        },
      });
    }

    return this.prismaService.coupon.findFirstOrThrow({
      where: { id: identifier },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  update(id: number, dto: UpdateCouponDto) {
    return this.prismaService.coupon.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.coupon.delete({
      where: { id },
    });
  }
}
