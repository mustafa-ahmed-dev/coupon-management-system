import { PartialType, OmitType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    'email',
    'isActive',
    'password',
    'role',
    'username',
  ] as const),
) {}

export class UpdateUserPasswordDto extends OmitType(CreateUserDto, [
  'name',
  'email',
  'isActive',
  'role',
  'username',
] as const) {}

export class UpdateUserEmailDto extends OmitType(CreateUserDto, [
  'name',
  'password',
  'isActive',
  'role',
  'username',
] as const) {}

export class UpdateUserUsernameDto extends OmitType(CreateUserDto, [
  'name',
  'email',
  'password',
  'isActive',
  'role',
] as const) {}

export class UpdateUserRoleDto extends OmitType(CreateUserDto, [
  'name',
  'email',
  'password',
  'isActive',
  'username',
] as const) {}
