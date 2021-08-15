import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class MyCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    if (request) {
      const { httpAdapter } = this.httpAdapterHost;
      const httpServer = httpAdapter.getHttpServer();
      const isGetRequest = httpServer.getRequestMethod(httpServer._events.request) === 'GET';
      const excludePaths: string | any[] = [];
      if (
        !isGetRequest ||
        (isGetRequest && excludePaths.includes(httpServer.getRequestUrl))
      ) {
        return undefined;
      }
      return httpServer.getRequestUrl(request);
    } 
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const parentType = info.parentType.name;
    if (parentType === 'Query') {
      return JSON.stringify(gqlContext.getArgs());
    }
    return undefined;
  }
}