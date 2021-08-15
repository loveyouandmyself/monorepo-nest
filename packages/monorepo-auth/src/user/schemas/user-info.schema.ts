import { ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../entities';

@ObjectType({ description: '用户详细信息' })
export class UserInfoSchema extends UserEntity{
  
}