import { ResultListSchema } from '@monorepo-interface/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { StudentInfoSchema } from './student-info.schema';

@ObjectType({ description: '学生列表信息' })
export class StudentListSchema extends ResultListSchema{
  @Field(() => [StudentInfoSchema], { description: '学生列表信息' })
  records: StudentInfoSchema[]
}