import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateCouponRequestCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 512)
  description?: string;
}
