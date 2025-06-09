import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateCouponRequestDto } from './dto/create-coupon-request.dto';
import { UpdateCouponRequestDto } from './dto/update-coupon-request.dto';
import { Prisma } from '@generated-prisma/client';

@Injectable()
export class CouponRequestService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new coupon request
  async create(dto: CreateCouponRequestDto, userId: number) {
    const { categoryId, ...data } = dto;
    const category = this.buildCategoryConnectOrCreate(categoryId);

    return this.prisma.couponRequest.create({
      data: {
        ...data,
        orderNumber: BigInt(data.orderNumber),
        category: category!,
        user: { connect: { id: userId } },
        approval: {
          create: {
            user: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
      include: this.requestIncludes,
    });
  }

  // Get all coupon requests
  async findAll() {
    return this.prisma.couponRequest.findMany({
      include: this.requestIncludes,
    });
  }

  // Get a single coupon request by ID
  async findOne(id: number) {
    return this.prisma.couponRequest.findUnique({
      where: { id },
      include: this.requestIncludes,
    });
  }

  // Update a coupon request
  async update(id: number, dto: UpdateCouponRequestDto) {
    const { categoryId, orderNumber, ...data } = dto;

    return this.prisma.couponRequest.update({
      where: { id },
      data: {
        ...data,
        orderNumber: orderNumber ? BigInt(orderNumber) : undefined,
        category: categoryId
          ? this.buildCategoryConnectOrCreate(categoryId)
          : undefined,
      },
    });
  }

  // Delete a coupon request
  async remove(id: number) {
    return this.prisma.couponRequest.delete({
      where: { id },
    });
  }

  // Shared select object for all queries
  private get requestIncludes() {
    return {
      approval: {
        select: {
          id: true,
          comment: true,
          decisionDate: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    };
  }

  private buildCategoryConnectOrCreate(
    categoryId?: number,
  ):
    | Prisma.CouponRequestCategoryCreateNestedOneWithoutCouponRequestsInput
    | undefined {
    if (!categoryId) return undefined;

    return {
      connect: {
        id: categoryId,
      },
    };
  }
}
