import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
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

  @Patch(':identifier')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.manager)
  update(
    @Param('identifier') identifier: number | string,
    @Body() dto: UpdateCouponDto,
  ) {
    const parsed = Number(identifier);
    const idOrCode = isNaN(parsed) ? `${identifier}` : parsed;

    return this.couponService.update(idOrCode, dto);
  }

  @Delete(':identifier')
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('identifier') identifier: number | string) {
    const parsed = Number(identifier);
    const idOrCode = isNaN(parsed) ? `${identifier}` : parsed;

    return this.couponService.remove(idOrCode);
  }
}
