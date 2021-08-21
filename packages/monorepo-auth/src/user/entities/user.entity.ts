import { BaseEntity, SexEnum } from '@monorepo-interface/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity('user')
@ObjectType({ description: '用户信息' })
export class UserEntity extends BaseEntity{
  @Expose()
  @Field({ description: '用户名' })
  @Column({ comment: '用户名', length: 50 })
  username: string;

  @Expose()
  @Field(() => ID, { description: '手机号' })
  @Column({ comment: '手机号', length: 11 })
  phone: string;

  @Expose()
  @Field({ description: '用户密码' })
  @Column({ comment: '用户密码', length: 50 })
  password: string;

  @Expose()
  @Field(() => ID, { description: '电子邮件', nullable: true })
  @Column({ comment: '电子邮件', unique: true, nullable: true, length: 50 })
  email: string;

  @Expose()
  @Field({ description: '身份证号', nullable: true })
  @Column({ name: 'id_card', comment: '身份证号', unique: true, nullable: true, length: 18 })
  IDCard: string;

  @Expose()
  @Field(() => SexEnum, { description: '性别', nullable: true })
  @Column({ type: 'tinyint', comment: '性别', nullable: true, default: 2 })
  sex: SexEnum;

  @Expose()
  @Field({ description: '最近访问时间', nullable: true })
  @Column({ name: 'last_login_time', type: 'datetime', comment: '最近访问时间', nullable: true, precision: 6 })
  lastLoginTime: Date;

  @Expose()
  @Field({ description: '密码失效时间', nullable: true })
  @Column({ name: 'password_invalid_time', type: 'datetime', comment: '密码失效时间', nullable: true, precision: 6 })
  passwordInvalidTime: Date;
}