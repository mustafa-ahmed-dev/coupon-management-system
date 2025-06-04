import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/role.guard';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@generated-prisma/client';
import { Request as ExpressRequest } from 'express';
import { JwtTokenPayload } from '@auth/entities/jwt-token-payload.entity';

@Controller('coupons')
@UseGuards(JwtAuthGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.manager)
  create(
    @Body() dto: CreateCouponDto,
    @Request()
    request: ExpressRequest & {
      user: JwtTokenPayload;
    }, // FIXME: create a custom request type
  ) {
    const userId = request.user.sub; // Extracted user ID from the JWT token payload

    return this.couponService.create(dto, userId);
  }

  @Get('/used')
  findAll() {
    return this.couponService.findUsed();
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.manager)
  findAllCoupons() {
    return this.couponService.findAll();
  }

  @Get(':identifier')
  findOne(@Param('identifier') identifier: number | string) {
    const parsed = Number(identifier);
    const idOrCode = isNaN(parsed) ? `${identifier}` : parsed;

    return this.couponService.findOne(idOrCode);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.manager)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCouponDto) {
    return this.couponService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.couponService.remove(id);
  }
}
