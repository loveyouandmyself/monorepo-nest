import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UserIsExistDto{
  @Field(() => ID, { description: '用户主键', nullable: true })
  id?: string;

  @Field(() => String, { description: '手机号', nullable: true })
  phone?: string;

  @Field(() => String, { description: '邮箱', nullable: true })
  email?: string;

  @Field(() => String, { description: '身份证号', nullable: true })
  IDCard?: string;
}