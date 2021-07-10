// 转换为布尔类型
export const toBoolean = (value: any): boolean => {
  if (typeof value === 'boolean')
    return value;

  if (typeof value === 'string')
    return value === 'true' || value === '1';

  if (typeof value === 'number')
    return value > 0;

  return false;
};