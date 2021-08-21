import { Injectable, ExecutionContext, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { get } from 'lodash';
import { GqlExecutionContext } from '@nestjs/graphql';
import { isProduction, IS_PUBLIC_KEY, RestfulException } from '@monorepo-interface/core';
import { AuthConfig } from '../../common/configs';

@Injectable()
export class MyAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector
  ) {
    super();
  }

  getRequest(context: ExecutionContext): Request{
    const contextType = get(context, 'contextType');
    if (contextType === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const contextType = get(context, 'contextType');
    let headers = {};
    if (contextType === 'graphql') {
      headers = GqlExecutionContext.create(context).getContext().req.headers;
    } else {
      headers = context.switchToHttp().getRequest().headers;
    }

    if (!isProduction()) {
      const authValue = get(headers, AuthConfig.key);
      if (authValue === AuthConfig.value) {
        return true;
      }
    }
    
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    try {
      const result = (await super.canActivate(context)) as boolean;
      return result;
    } catch (error) {
      throw new RestfulException('请登录后再操作！', HttpStatus.UNAUTHORIZED);
    }
  }
}