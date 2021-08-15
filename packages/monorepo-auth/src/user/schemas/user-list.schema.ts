import { ResultListSchema } from '@monorepo-interface/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserInfoSchema } from './user-info.schema';

@ObjectType({ description: '用户列表信息' })
export class UserListSchema extends ResultListSchema{
  @Field(() => [UserInfoSchema], { description: '用户列表信息' })
  records: UserInfoSchema[]
}