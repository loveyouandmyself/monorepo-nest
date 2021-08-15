import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { commonOkResponse } from '@monorepo-interface/core';
import pck from '../../../package.json';

@Controller('ping')
@ApiTags('Ping测试')
export class PingController {

  @Get()
  @ApiResponse({ status: 200, schema: commonOkResponse() })
  public async ping(): Promise<any> {
    return {
      name: pck.name, // 项目名称
      module: pck.module, // 项目名称
      version: pck.version, // 项目版本
      description: pck.description, // 项目描述
      author: pck.author, // 项目开发人员
      license: pck.license, // 开源许可证
    };
  }
}
