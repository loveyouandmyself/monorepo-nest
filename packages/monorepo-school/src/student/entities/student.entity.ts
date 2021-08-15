import { BaseEntity } from '@monorepo-interface/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@Entity('student')
@ObjectType({ description: '学生信息' })
export class StudentEntity extends BaseEntity{
  @Column({ name: 'name', comment: '学生姓名' })
  @Field({ description: '学生姓名' })
  name: string
}