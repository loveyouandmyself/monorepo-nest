import { commonOkResponse, ParseArrayValidationPipe, genApiBodySchema } from '@monorepo-interface/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentCreateDto, StudentUpdateDto } from '../dto';
import { StudentService } from '../services';

@ApiTags('学生')
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ){ }

  @ApiOperation({ summary: '学生添加操作' })
  @ApiBody({
    type: StudentCreateDto,
    isArray: true,
  })
  @ApiResponse({ status: 200, schema: commonOkResponse({ example: true }) })
  @Post('add')
  public async create(@Body(new ParseArrayValidationPipe(StudentCreateDto)) args: StudentCreateDto[]): Promise<boolean>{
    return this.studentService.create(args);
  }

  @ApiOperation({ summary: '学生删除操作' })
  @ApiBody({
    required: true,
    description: '学生删除操作',
    schema: genApiBodySchema({
      ids: { type: 'string', description: '学生ID', example: ['1'] },
    }),
  })
  @ApiResponse({ status: 200, schema: commonOkResponse({ example: true }) })
  @Post('remove')
  public async remove(@Body('ids') ids: string[]): Promise<boolean>{
    return this.studentService.remove(ids);
  }

  @ApiOperation({ summary: '学生修改操作' })
  @ApiBody({
    type: StudentUpdateDto,
    isArray: true,
  })
  @ApiResponse({ status: 200, schema: commonOkResponse({ example: true }) })
  @Post('update')
  public async update(@Body(new ParseArrayValidationPipe(StudentUpdateDto))args: StudentUpdateDto[]): Promise<boolean>{
    return this.studentService.update(args);
  }

}
