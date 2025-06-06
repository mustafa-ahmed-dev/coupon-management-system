import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CouponRequestCategoryService } from './coupon-request-category.service';
import { CreateCouponRequestCategoryDto } from './dto/create-coupon-request-category.dto';
import { UpdateCouponRequestCategoryDto } from './dto/update-coupon-request-category.dto';

@Controller('coupon-request-categories')
export class CouponRequestCategoryController {
  constructor(
    private readonly couponRequestCategoryService: CouponRequestCategoryService,
  ) {}

  @Post()
  create(@Body() dto: CreateCouponRequestCategoryDto) {
    return this.couponRequestCategoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.couponRequestCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.couponRequestCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouponRequestCategoryDto,
  ) {
    return this.couponRequestCategoryService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.couponRequestCategoryService.remove(id);
  }
}
