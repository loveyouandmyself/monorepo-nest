import { Int, Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class PaginationDto {
  @Field(() => Int, { defaultValue: 1, description: '当前页数', nullable: true })
  page: number;

  @Field(() => Int, { defaultValue: 20, description: '每页条数', nullable: true })
  limit: number;
}