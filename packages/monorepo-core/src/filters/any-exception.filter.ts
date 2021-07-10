/**
 * 捕获所有异常
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '../utils';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLException } from '../exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (request) { // http异常
      const logFormat = exception instanceof HttpException ?
        `Request original url: ${request.originalUrl} Method: ${request.method} IP: ${request.ip} Response: ${JSON.stringify(exception.getResponse())}` :
        `Request original url: ${request.originalUrl} Method: ${request.method} IP: ${request.ip} Status code: ${status} Response: ${exception.message}`;
      Logger.error(logFormat);
      const errorResponse = {
        code: status,
        message: exception instanceof HttpException ? `${exception.getResponse() instanceof Array ? JSON.stringify(exception.getResponse()) : exception.getResponse()}` : `Service Error: ${exception.message}`,
      };
      // 设置返回的状态码、请求头、发送错误信息
      response.status(status);
      response.header('Content-Type', 'application/json; charset=utf-8');
      response.send(errorResponse);
    } else { // GraphQL异常
      const gqlHost = GqlArgumentsHost.create(host);
      Logger.error('异常提示', JSON.stringify({
        info: gqlHost.getInfo().path,
        args: gqlHost.getArgs(),
        exception: exception.message,
      }));
      throw new GraphQLException(exception.message, status.toString());
    }
  }   
}
