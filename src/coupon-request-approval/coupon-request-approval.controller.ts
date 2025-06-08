import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
  UseGuards,
  Put,
  Post,
} from '@nestjs/common';
import { CouponRequestApprovalService } from './coupon-request-approval.service';
import {
  UpdateCouponRequestApprovalDto,
  UpdateCouponRequestApprovalStatusDto,
} from './dto/update-coupon-request-approval.dto';
import { Request as ExpressRequest } from 'express';
import { JwtTokenPayload } from '@auth/entities/jwt-token-payload.entity';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/role.guard';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@generated-prisma/client';
import { CancelCouponRequestApprovalDto } from './dto/cancel-coupon-request-approval.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin, Role.manager)
@Controller('coupon-request-approval')
export class CouponRequestApprovalController {
  constructor(
    private readonly couponRequestApprovalService: CouponRequestApprovalService,
  ) {}

  @Get()
  findAll() {
    return this.couponRequestApprovalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.couponRequestApprovalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouponRequestApprovalDto,
  ) {
    return this.couponRequestApprovalService.update(id, dto);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouponRequestApprovalStatusDto,
    @Request()
    request: ExpressRequest & {
      user: JwtTokenPayload;
    },
  ) {
    const userId = request.user.sub;

    return this.couponRequestApprovalService.updateStatus(id, dto, userId);
  }

  @Post(':id/cancel')
  cancel(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CancelCouponRequestApprovalDto,
  ) {
    return this.couponRequestApprovalService.cancel(id, dto);
  }

  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.couponRequestApprovalService.remove(id);
  }
}
