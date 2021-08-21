import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto{
  @Expose()
  @ApiProperty({ description: '用户名', example: '15039137192' })
  @IsString()
  @IsNotEmpty()
  loginName: string;

  @Expose()
  @ApiProperty({ description: '密码', example: '123456.!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}