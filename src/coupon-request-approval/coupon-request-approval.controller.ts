import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponRequestApprovalService } from './coupon-request-approval.service';
import { CreateCouponRequestApprovalDto } from './dto/create-coupon-request-approval.dto';
import { UpdateCouponRequestApprovalDto } from './dto/update-coupon-request-approval.dto';

@Controller('coupon-request-approval')
export class CouponRequestApprovalController {
  constructor(private readonly couponRequestApprovalService: CouponRequestApprovalService) {}

  @Post()
  create(@Body() createCouponRequestApprovalDto: CreateCouponRequestApprovalDto) {
    return this.couponRequestApprovalService.create(createCouponRequestApprovalDto);
  }

  @Get()
  findAll() {
    return this.couponRequestApprovalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponRequestApprovalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponRequestApprovalDto: UpdateCouponRequestApprovalDto) {
    return this.couponRequestApprovalService.update(+id, updateCouponRequestApprovalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponRequestApprovalService.remove(+id);
  }
}
