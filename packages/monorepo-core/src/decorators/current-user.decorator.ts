import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { get } from 'lodash';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const contextType = get(context, 'contextType');
  if (contextType === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
  return context.switchToHttp().getRequest().user;
});