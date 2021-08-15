import { Args, Query, Resolver } from '@nestjs/graphql';
import { StudentAllDto, StudentListDto } from '../dto';
import { StudentInfoSchema, StudentListSchema } from '../schemas';
import { StudentService } from '../services';

@Resolver(() => StudentInfoSchema)
export class StudentResolver{
  constructor(
    private readonly studentService: StudentService
  ){ }

  @Query(() => StudentInfoSchema, { description: '根据ID获取学生详细信息' })
  public async getStudentInfo(@Args({
    name: 'id',
    type: ()=>String,
  }) id: string): Promise<StudentInfoSchema>{
    return this.studentService.getInfo(id);
  }

  @Query(() => StudentListSchema, { description: '获取学生列表' })
  public async getStudentList(
    @Args({
      type: ()=>StudentListDto,
    }) args: StudentListDto
  ): Promise<StudentListSchema>{
    return this.studentService.getList(args);
  }

  @Query(() => [StudentInfoSchema], { description: '获取所有学生' })
  public async getAllStudent(
    @Args({
      type: ()=>StudentAllDto,
    }) args: StudentAllDto
  ): Promise<StudentInfoSchema[]>{
    return this.studentService.getAll(args);
  }


}