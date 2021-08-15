import { BaseEntity } from '@monorepo-interface/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity('user')
@ObjectType({ description: '用户信息' })
export class UserEntity extends BaseEntity{
  @Expose()
  @Column({ name: 'name', comment: '用户名称' })
  @Field({ description: '用户名称' })
  name: string
}