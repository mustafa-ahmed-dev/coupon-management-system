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
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/role.guard';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@generated-prisma/client';
import superjson, { SuperJSONResult } from 'superjson';
import type { AuthenticatedRequest } from '@interfaces/authenticated-request';

@UseGuards(JwtAuthGuard)
@Controller('coupon-requests')
export class CouponRequestController {
  constructor(private readonly couponRequestService: CouponRequestService) {}

  @Post()
  async create(
    @Body() dto: CreateCouponRequestDto,
    @Request() request: AuthenticatedRequest,
  ): Promise<SuperJSONResult['json']> {
    const userId = request.user.sub;

    const couponRequest = await this.couponRequestService.create(dto, userId);

    return this.serialize(couponRequest);
  }

  @Get()
  async findAll(): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestService.findAll();

    return this.serialize(data);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestService.findOne(id);

    return this.serialize(data);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.manager)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouponRequestDto,
  ): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestService.update(id, dto);

    return this.serialize(data);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuperJSONResult['json']> {
    const data = await this.couponRequestService.remove(id);

    return this.serialize(data);
  }

  private serialize(data: any): SuperJSONResult['json'] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return superjson.serialize(data).json;
  }
}
