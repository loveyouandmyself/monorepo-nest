import { getSkip, Logger } from '@monorepo-interface/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { arrayNotEmpty } from 'class-validator';
import { pickBy } from 'lodash';
import { getConnection, In, Repository } from 'typeorm';
import { StudentAllDto, StudentCreateDto, StudentListDto, StudentUpdateDto } from '../dto';
import { StudentEntity } from '../entities';
import { StudentListSchema } from '../schemas';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
  ) { }

  public async create(args: StudentCreateDto[]): Promise<boolean> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const saveStudent = args.map(item => this.studentRepo.create({
        ...item,
      }));
      if (saveStudent.length > 0){
        await queryRunner.manager.getRepository(StudentEntity).save(saveStudent);
      }

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      Logger.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async remove(ids: string[]): Promise<boolean>{
    await this.studentRepo.softDelete(ids);
    return true;
  }

  public async update(args: StudentUpdateDto[]): Promise<boolean> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const promiseList = args.map(async item => {
        queryRunner.manager.update(StudentEntity, item.id, {
          ...pickBy({
            ...item,
          }, v => v !== undefined),
        });
      });
      await Promise.all(promiseList);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      Logger.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async getInfo(id: string): Promise<StudentEntity>{
    const result = await this.studentRepo.findOne(id);
    return result;
  }

  public async getList(args: StudentListDto): Promise<StudentListSchema>{
    const {
      limit,
      page,
      ids,
    } = args;
    let where = {};
    if (arrayNotEmpty(ids)) {
      where = {
        ...where,
        id: In(ids),
      };
    }
    const [records, total] = await this.studentRepo.findAndCount({
      take: limit,
      skip: getSkip(page, limit),
      where,
    });
    return {
      records,
      total,
      page,
      limit,
    };
  }

  public async getAll(args: StudentAllDto): Promise<StudentEntity[]>{
    const {
      ids,
    } = args;
    let where = {};
    if (arrayNotEmpty(ids)) {
      where = {
        ...where,
        id: In(ids),
      };
    }
    const result = await this.studentRepo.find({
      where,
    });
    return result;
  }
}
