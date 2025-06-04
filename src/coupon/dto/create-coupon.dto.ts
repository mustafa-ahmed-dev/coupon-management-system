import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CouponType } from '@generated-prisma/client';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsBoolean()
  isUsed?: boolean = false;

  @IsOptional()
  @IsEnum(CouponType)
  type?: CouponType = CouponType.fixed;
}
