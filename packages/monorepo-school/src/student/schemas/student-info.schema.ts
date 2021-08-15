import { ObjectType } from '@nestjs/graphql';
import { StudentEntity } from '../entities';

@ObjectType({ description: '学生详细信息' })
export class StudentInfoSchema extends StudentEntity{
  
}