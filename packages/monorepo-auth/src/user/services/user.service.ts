import { getSkip } from '@monorepo-interface/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { arrayNotEmpty } from 'class-validator';
import { identity, pickBy } from 'lodash';
import { getConnection, In, Repository } from 'typeorm';
import { UserAllDto, UserCreateDto, UserIsExistDto, UserListDto, UserUpdateDto } from '../dto';
import { UserEntity } from '../entities';
import { UserListSchema } from '../schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  public async create(args: UserCreateDto[]): Promise<boolean> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const saveUser = args.map(item => this.userRepo.create({
        ...item,
      }));
      if (saveUser.length > 0){
        await queryRunner.manager.getRepository(UserEntity).save(saveUser);
      }

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async remove(ids: string[]): Promise<boolean>{
    await this.userRepo.softDelete(ids);
    return true;
  }

  public async update(args: UserUpdateDto[]): Promise<boolean> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const promiseList = args.map(async item => {
        queryRunner.manager.update(UserEntity, item.id, {
          ...pickBy({
            ...item,
          }, v => v !== undefined),
        });
      });
      await Promise.all(promiseList);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
    return true;
  }

  public async getInfo(id: string): Promise<UserEntity>{
    const result = await this.userRepo.findOne(id);
    return result;
  }

  public async getList(args: UserListDto): Promise<UserListSchema>{
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
    const [records, total] = await this.userRepo.findAndCount({
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

  public async getAll(args: UserAllDto): Promise<UserEntity[]>{
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
    const result = await this.userRepo.find({
      where,
    });
    return result;
  }

  public async userIsExist(args: UserIsExistDto): Promise<boolean> {
    const where = {
      ...pickBy({
        ...args,
      }, identity()),
    };
    if (where) {
      const user = await this.userRepo.findOne(where);
      if (user) {
        return true;
      }
    }
    return false;
  }

  public async findOneByEmail(email: string, select: (keyof UserEntity)[]=[]): Promise<UserEntity> {
    const result = await this.userRepo.findOne({
      where: {
        email,
        select,
      },
    });
    return result;
  }

  public async findOneByPhone(phone: string, select: (keyof UserEntity)[]=[]): Promise<UserEntity> {
    const result = this.userRepo.findOne({
      where: {
        phone,
      },
      select,
    });
    return result;
  }


}
