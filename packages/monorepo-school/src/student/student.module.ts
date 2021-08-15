import { StudentService } from './services';
import { StudentController } from './controllers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities';
import { StudentResolver } from './resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
    ]),
  ],
  controllers: [
    StudentController, 
  ],
  providers: [
    StudentService,
    StudentResolver,
  ],
})
export class StudentModule {}
