import { NestDataLoader } from '@monorepo-interface/core';
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { getRepository, In } from 'typeorm';
import { StudentEntity } from '../entities';

@Injectable()
export class StudentLoader implements NestDataLoader<string, StudentEntity> {
  
  generateDataLoader(): any {
    return new DataLoader<string, StudentEntity>(keys =>
      this.findByIDs(keys)
    );
  }

  private async findByIDs(ids: readonly string[]){
    const students = await getRepository(StudentEntity).find({
      where: {
        id: In(ids as string[]),
      },
    });
    return ids.map((id: string) => students.find((u: StudentEntity) => u.id === id));
  }
}