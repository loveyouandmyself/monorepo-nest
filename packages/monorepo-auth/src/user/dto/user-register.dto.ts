import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @Expose()
  @ApiProperty({ description: '用户名', example: '张三' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @Expose()
  @ApiProperty({ description: '手机号', example: '15039137192' })
  @IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @Expose()
  @ApiProperty({ description: '密码', example: '123456789' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @Expose()
  @ApiProperty({ description: '确认密码', example: '123456789' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string;

  @Expose()
  @ApiProperty({ description: '验证码', example: '0907' })
  @IsNotEmpty({ message: '验证码不能为空' })
  captcha: string;
}