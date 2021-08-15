import { ArgsType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ArgsType()
export class UserAllDto{
  @Expose()
  @Field(() => [String], { description: '用户ID', nullable: true })
  ids: string[]
}