import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * 公共方法装饰器
 */
export const Public = ():CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);