import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserCreateDto{
  @Expose()
  @ApiProperty({ description: '用户名称', example: '管理员' })
  @IsNotEmpty({ message: '用户名称不能为空' })
  name:string
}