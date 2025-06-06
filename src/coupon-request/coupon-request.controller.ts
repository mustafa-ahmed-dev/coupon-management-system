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
} from '@nestjs/common';
import { CouponRequestService } from './coupon-request.service';
import { CreateCouponRequestDto } from './dto/create-coupon-request.dto';
import { UpdateCouponRequestDto } from './dto/update-coupon-request.dto';
import { Request as ExpressRequest } from 'express';
import { JwtTokenPayload } from '@auth/entities/jwt-token-payload.entity';

@Controller('coupon-request')
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouponRequestDto,
  ) {
    return this.couponRequestService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.couponRequestService.remove(id);
  }
}
