import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { idToStringTransformer } from '../utils';

@ObjectType({ description: '位置信息' })
export class AddressEntity{
  @Field({ description: '省级行政区ID', nullable: true })
  @Column({ name: 'province_id', type: 'int', comment: '省级行政区ID', transformer: idToStringTransformer, nullable: true })
  provinceID: string

  @Field({ description: '市级行政区ID', nullable: true })
  @Column({ name: 'city_id', type: 'int', comment: '市级行政区ID', transformer: idToStringTransformer, nullable: true })
  cityID: string

  @Field({ description: '区(县)级行政区ID', nullable: true })
  @Column({ name: 'country_id', type: 'int', comment: '区(县)级行政区ID', transformer: idToStringTransformer, nullable: true })
  countryID: string

  @Field({ description: '街道(乡镇)级行政区ID', nullable: true })
  @Column({ name: 'town_id', type: 'int', comment: '街道(乡镇)级行政区ID', transformer: idToStringTransformer, nullable: true })
  townID: string

  @Field({ description: '详细地址', nullable: true })
  @Column({ name: 'details', comment: '详细地址', nullable: true })
  details: string
}