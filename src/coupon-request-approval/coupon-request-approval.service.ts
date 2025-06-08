import { Injectable } from '@nestjs/common';
import { CreateCouponRequestApprovalDto } from './dto/create-coupon-request-approval.dto';
import {
  UpdateCouponRequestApprovalDto,
  UpdateCouponRequestApprovalStatusDto,
} from './dto/update-coupon-request-approval.dto';
import { PrismaService } from '@prisma/prisma.service';
import { CouponApprovalStatus } from '@generated-prisma/index';
import { CancelCouponRequestApprovalDto } from './dto/cancel-coupon-request-approval.dto';

@Injectable()
export class CouponRequestApprovalService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCouponRequestApprovalDto, userId: number) {
    const { requestId, ...data } = dto;

    return this.prisma.couponRequestApproval.create({
      data: {
        ...data,
        request: {
          connect: {
            id: requestId,
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
    return this.prisma.couponRequestApproval.groupBy({
      by: ['status'],
    });
  }

  findOne(id: number) {
    return this.prisma.couponRequestApproval.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        request: true,
      },
    });
  }

  update(id: number, dto: UpdateCouponRequestApprovalDto) {
    return this.prisma.couponRequestApproval.update({
      where: { id },
      data: dto,
    });
  }

  updateStatus(
    id: number,
    dto: UpdateCouponRequestApprovalStatusDto,
    userId: number,
  ) {
    return this.prisma.couponRequestApproval.update({
      where: { id },
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  cancel(id: number, dto: CancelCouponRequestApprovalDto) {
    return this.prisma.couponRequestApproval.update({
      where: { id },
      data: {
        status: CouponApprovalStatus.cancelled as CouponApprovalStatus,
        ...dto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.couponRequestApproval.delete({
      where: { id },
    });
  }
}
