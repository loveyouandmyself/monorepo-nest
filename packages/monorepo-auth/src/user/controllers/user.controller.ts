import { commonOkResponse, ParseArrayValidationPipe, genApiBodySchema } from '@monorepo-interface/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { UserService } from '../services';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){ }

  @ApiOperation({ summary: '用户添加操作' })
  @ApiBody({
    type: UserCreateDto,
    isArray: true,
  })
  @ApiResponse({ status: 200, schema: commonOkResponse({ example: true }) })
  @Post('add')
  public async create(@Body(new ParseArrayValidationPipe(UserCreateDto)) args: UserCreateDto[]): Promise<boolean>{
    return this.userService.create(args);
  }

  @ApiOperation({ summary: '用户删除操作' })
  @ApiBody({
    required: true,
    description: '用户删除操作',
    schema: genApiBodySchema({
      ids: { type: 'string', description: '用户ID', example: ['1'] },
    }),
  })
  @ApiResponse({ status: 200, schema: commonOkResponse({ example: true }) })
  @Post('remove')
  public async remove(@Body('ids') ids: string[]): Promise<boolean>{
    return this.userService.remove(ids);
  }

  @ApiOperation({ summary: '用户修改操作' })
  @ApiBody({
    type: UserUpdateDto,
    isArray: true,
  })
  @ApiResponse({ status: 200, schema: commonOkResponse({ example: true }) })
  @Post('update')
  public async update(@Body(new ParseArrayValidationPipe(UserUpdateDto))args: UserUpdateDto[]): Promise<boolean>{
    return this.userService.update(args);
  }

}
