import { NestDataLoader } from '@monorepo-interface/core';
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { getRepository, In } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserLoader implements NestDataLoader<string, UserEntity> {
  
  generateDataLoader(): any {
    return new DataLoader<string, UserEntity>(keys =>
      this.findByIDs(keys)
    );
  }

  private async findByIDs(ids: readonly string[]){
    const users = await getRepository(UserEntity).find({
      where: {
        id: In(ids as string[]),
      },
    });
    return ids.map((id: string) => users.find((u: UserEntity) => u.id === id));
  }
}