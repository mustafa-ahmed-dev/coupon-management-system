import { LogValue } from '@decorators/log-value.decorator';
import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateCouponRequestCategoryDto {
  @LogValue()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsOptional()
  @LogValue()
  @IsString()
  @Length(0, 512)
  description?: string;
}
