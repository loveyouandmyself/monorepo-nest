import { Int, Field, ArgsType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ArgsType()
export class PaginationDto {
  @Expose()
  @Field(() => Int, { defaultValue: 1, description: '当前页数', nullable: true })
  page: number;

  @Expose()
  @Field(() => Int, { defaultValue: 20, description: '每页条数', nullable: true })
  limit: number;
}