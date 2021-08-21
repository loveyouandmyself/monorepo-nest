import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto{
  @Expose()
  @ApiProperty({ example: '1', description: '用户ID' })
  @IsString()
  @IsNotEmpty({ message: '用户ID不能为空' })
  id: string;

  @Expose()
  @ApiProperty({ description: '电子邮件', example: '15039137192@163.com', required: false })
  @IsOptional()
  email: string;

  @Expose()
  @ApiProperty({ description: '用户名', example: 'LK', required: false })
  @IsOptional()
  username: string;

  @Expose()
  @ApiProperty({ description: '用户密码', example: '123456.!', required: false })
  @IsOptional()
  password: string;

  @Expose()
  @ApiProperty({ description: '确认密码', example: '123456.!', required: false })
  @IsOptional()
  confirmPassword: string;

  @Expose()
  @ApiProperty({ description: '手机号', example: '15039137192', required: false })
  @IsOptional()
  phone: string;

  @Expose()
  @ApiProperty({ description: '身份证号', example: '410882199609074516', required: false })
  @IsOptional()
  IDCard: string;

  @Expose()
  @ApiProperty({ description: '性别(0=男,1=女,2=保密)', example: '2', required: false })
  @IsOptional()
  sex: number;
}