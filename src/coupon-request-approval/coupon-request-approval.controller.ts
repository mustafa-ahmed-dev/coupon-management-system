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
import superjson, { SuperJSONResult } from 'superjson';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.admin, Role.manager)
@Controller('coupon-request-approvals')
export class CouponRequestApprovalController {
  constructor(
    private readonly couponRequestApprovalService: CouponRequestApprovalService,
  ) {}

  @Get()
  async findAll(): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestApprovalService.findAll();

    return this.serialize(data);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestApprovalService.findOne(id);

    return this.serialize(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouponRequestApprovalDto,
  ): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestApprovalService.update(id, dto);

    return this.serialize(data);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouponRequestApprovalStatusDto,
    @Request()
    request: ExpressRequest & {
      user: JwtTokenPayload;
    },
  ): Promise<SuperJSONResult['json']> {
    const userId = request.user.sub;

    const data = await this.couponRequestApprovalService.updateStatus(
      id,
      dto,
      userId,
    );

    return this.serialize(data);
  }

  @Post(':id/cancel')
  async cancel(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CancelCouponRequestApprovalDto,
  ): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestApprovalService.cancel(id, dto);

    return this.serialize(data);
  }

  @Roles(Role.admin)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestApprovalService.remove(id);

    return this.serialize(data);
  }

  private serialize(data: any): SuperJSONResult['json'] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return superjson.serialize(data).json;
  }
}
