import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCouponRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  orderNumber: string;

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  categoryId: number;
}
