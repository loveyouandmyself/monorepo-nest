import { Int, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ isAbstract: true, description: '分页结果' })
export class ResultListSchema {

  @Field(() => Int, { description: '总页数' })
  @ApiProperty({ description: '总页数', example: 5 })
  total: number;

  @Field(() => Int, { description: '当前页数' })
  @ApiProperty({ description: '当前页数', example: 1 })
  page: number;

  @Field(() => Int, { description: '分页数' })
  @ApiProperty({ description: '分页数', example: 20 })
  limit: number;
}
