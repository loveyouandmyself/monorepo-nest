import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@ObjectType()
export class LoginSuccessSchema{
  @Expose()
  @Field({ description: '令牌' })
  @ApiProperty({ description: '令牌', example: '' })
  accessToken: string
}