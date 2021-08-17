import { ValueTransformer } from 'typeorm';

export const getSkip = (page: number, limit: number): number => {
  const skip = Math.floor(Number(page) - 1) * limit;
  return Math.max(0, skip);
};

// 转换为布尔类型
export const toBoolean = (value: unknown): boolean => {
  if (typeof value === 'boolean')
    return value;

  if (typeof value === 'string')
    return value === 'true' || value === '1';

  if (typeof value === 'number')
    return value > 0;

  return false;
};

class IdToStringTransformer implements ValueTransformer {
  to(value: any) {
    return value;
  }

  from(value: any) {
    return value + '';
  }
}

export const idToStringTransformer = new IdToStringTransformer();