import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserResolver } from './resolvers';
import { UserLoader } from './loaders';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [
    UserController, 
  ],
  providers: [
    UserService, 
    UserResolver,
    UserLoader,
  ],
  exports: [
    UserService, 
    UserLoader,
  ],
})
export class UserModule {}
