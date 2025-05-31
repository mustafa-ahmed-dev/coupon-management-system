import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { DatabaseConfigDto } from './database-config.dto';
import { AppConfigDto } from './app-config.dto';
import { JWTConfigDto } from './jwt-config.dto';

export class ConfigDto {
  @ValidateNested()
  @Type(() => DatabaseConfigDto)
  database: DatabaseConfigDto;

  @ValidateNested()
  @Type(() => AppConfigDto)
  app: AppConfigDto;

  @ValidateNested()
  @Type(() => JWTConfigDto)
  jwt: JWTConfigDto;
}
