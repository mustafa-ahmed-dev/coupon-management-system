import { IsNotEmpty, IsNumber, IsString, IsInt } from 'class-validator';

export class JWTConfigDto {
  @IsNotEmpty()
  @IsString()
  jwtAccessTokenSecret: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  jwtAccessTokenExpirationTime: number;
}
