import { registerEnumType } from '@nestjs/graphql';

export enum SexEnum{
  MALE = 0,
  FEMALE = 1,
  SECRET = 2
}

registerEnumType(SexEnum, {
  name: 'SexEnum',
  description: '性别',
});