import { PartialType, OmitType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { MatchProperty } from '@decorators/match-property.decorator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['isActive', 'password'] as const),
) {}

export class UpdateUserPasswordDto extends OmitType(CreateUserDto, [
  'name',
  'email',
  'isActive',
  'role',
  'username',
] as const) {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  @MatchProperty('password', {
    message: 'Passwords do not match',
  })
  passwordConfirm: string;
}
