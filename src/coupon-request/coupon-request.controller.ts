import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CouponRequestService } from './coupon-request.service';
import { CreateCouponRequestDto } from './dto/create-coupon-request.dto';
import { UpdateCouponRequestDto } from './dto/update-coupon-request.dto';
import { Request as ExpressRequest } from 'express';
import { JwtTokenPayload } from '@auth/entities/jwt-token-payload.entity';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/role.guard';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@generated-prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('coupon-requests')
export class CouponRequestController {
  constructor(private readonly couponRequestService: CouponRequestService) {}

  @Post()
  create(
    @Body() dto: CreateCouponRequestDto,
    @Request()
    request: ExpressRequest & {
      user: JwtTokenPayload;
    }, // FIXME: create a custom request type
  ) {
    const userId = request.user.sub;

    return this.couponRequestService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.couponRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.couponRequestService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.manager)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouponRequestDto,
  ) {
    return this.couponRequestService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.couponRequestService.remove(id);
  }
}
