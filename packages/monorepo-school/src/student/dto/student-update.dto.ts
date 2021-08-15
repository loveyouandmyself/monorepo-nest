import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class StudentUpdateDto{
  @Expose()
  @ApiProperty({ example: '1', description: '学生ID' })
  @IsString()
  @IsNotEmpty({ message: '学生ID不能为空' })
  id: string

  @Expose()
  @ApiProperty({ description: '用户名称', example: '张三', required: false })
  @IsNotEmpty({ message: '用户名称不能为空' })
  name:string
}