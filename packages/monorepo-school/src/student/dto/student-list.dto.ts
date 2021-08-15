import { PaginationDto } from '@monorepo-interface/core';
import { ArgsType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ArgsType()
export class StudentListDto extends PaginationDto{
  @Expose()
  @Field(() => [String], { description: '学生ID', nullable: true })
  ids: string[]
}