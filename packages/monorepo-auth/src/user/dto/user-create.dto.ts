import { SexEnum } from '@monorepo-interface/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateDto{
  @Expose()
  @ApiProperty({ description: '用户名', example: '张三' })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '手机号', example: '15039137192' })
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @Expose()
  @ApiProperty({ description: '密码', example: '123456', required: false })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @Expose()
  @ApiProperty({ description: '邮箱', example: '123456@163.com', required: false })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsOptional()
  email?: string;

  @Expose()
  @ApiProperty({ description: '用户名', example: '张三', required: false })
  @IsOptional()
  IDCard?: string;

  @Expose()
  @ApiProperty({ description: '性别', example: SexEnum.SECRET, enum: SexEnum, required: false })
  @IsOptional()
  sex?: SexEnum;
}