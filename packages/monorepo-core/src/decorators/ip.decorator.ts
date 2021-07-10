import { createParamDecorator } from '@nestjs/common';
import requestIp from 'request-ip';

/**
 * 自定义获取ip地址的装饰器
 */
export const IP = createParamDecorator((data, req) => {
  if (req.clientIp) {
    return req.clientIp;
  }
  return requestIp.getClientIp(req); // In case we forgot to include requestIp.mw() in main.ts
});