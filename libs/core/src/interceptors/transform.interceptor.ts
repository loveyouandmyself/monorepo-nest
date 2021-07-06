import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../utils';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map(data => {
        if (context.getType().toString() === 'graphql') return data;
        const logFormat = `Request original url: ${req.originalUrl} Method: ${req.method} IP: ${req.clientIp} Response data: ok`;
        Logger.info(logFormat);
        return {
          data,
          code: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
