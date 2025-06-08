import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CancelCouponRequestApprovalDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  cancelReason: string;
}
