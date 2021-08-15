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
  @ApiProperty({ description: '用户名称', example: '管理员', required: false })
  @IsNotEmpty({ message: '用户名称不能为空' })
  @IsOptional()
  name:string
}