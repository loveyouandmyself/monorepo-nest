import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { getSchemaPath } from '@nestjs/swagger';

export const commonOkResponse = (options?: {
  msg?: string;
  type?: any;
  example?: any;
}): SchemaObject => {
  const { msg = '请求成功', type = undefined, example = {} } = options || {};
  if (type) {
    return {
      type: 'object',
      properties: {
        code: { type: 'number', description: '接口状态码', example: 200 },
        message: { type: 'string', description: '接口响应信息', example: msg },
        data: {
          type: 'object',
          description: '接口数据',
          example,
          $ref: getSchemaPath(type),
        },
      },
    };
  }
  return {
    type: 'object',
    properties: {
      code: { type: 'number', description: '接口状态码', example: 200 },
      message: { type: 'string', description: '接口响应信息', example: msg },
      data: {
        type: 'object',
        description: '接口数据',
        example,
      },
    },
  };
};

export const commonArrayResponse = (options?: {
  msg?: string;
  type?: any;
}): SchemaObject => {
  const { msg = '请求成功', type = undefined } = options || {};
  return {
    type: 'object',
    properties: {
      code: { type: 'number', description: '接口状态码', example: 200 },
      message: { type: 'string', description: '接口响应信息', example: msg },
      data: {
        type: 'array',
        description: '接口数据',
        items: { $ref: getSchemaPath(type) },
      },
    },
  };
};
