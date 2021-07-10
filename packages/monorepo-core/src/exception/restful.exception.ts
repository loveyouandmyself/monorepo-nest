import { HttpException } from '@nestjs/common';

/**
 * 抛出Restful异常，统一捕获
 */
export class RestfulException extends HttpException {
  constructor(response: string | Record<string, any>, status: number) {
    super(response, status);
    this.name = this.constructor.name;
  }
}