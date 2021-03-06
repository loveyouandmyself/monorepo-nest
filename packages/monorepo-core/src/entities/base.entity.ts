import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, AfterLoad } from 'typeorm';
import { idToStringTransformer } from '../utils';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType({ description: '基础实体' })
export class BaseEntity {
  @Expose()
  @Field(() => ID, { description: '自增主键' })
  @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'int', comment: '自增主键', transformer: idToStringTransformer })
  id: string

  @Expose()
  @Field({ description: '创建时间' })
  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  createdAt: Date

  @Expose()
  @Field({ description: '修改时间' })
  @UpdateDateColumn({ name: 'updated_at', comment: '最后修改时间' })
  updatedAt: Date

  @Expose()
  @Field({ description: '删除时间(不为空表示已经删除)', nullable: true })
  @DeleteDateColumn({ name: 'deleted_at', comment: '删除时间(不为空表示已经删除)' })
  deletedAt: Date

  @Expose()
  @Field({ description: '是否删除' })
  isDeleted: boolean 

  @AfterLoad()
  private _setIsDeleted():void {
    this.isDeleted = this.deletedAt !== null;
  }
}