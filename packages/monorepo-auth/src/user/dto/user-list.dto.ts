import { PaginationDto } from '@monorepo-interface/core';
import { ArgsType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ArgsType()
export class UserListDto extends PaginationDto{
  @Expose()
  @Field(() => [String], { description: '用户ID', nullable: true })
  ids: string[]
}