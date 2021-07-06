import _get from 'lodash/get';
import _has from 'lodash/has';

/** 获取环境变量 */
export const getEnvVariable = (keyPath: string): any => {
  return _get(process.env, keyPath);
};

export const getEnvArray = (keyPath: string): any => {
  if(_has(process.env, keyPath)) {
    return _get(process.env, keyPath).split(',');
  }
  return [];
};

export const isProduction = (): boolean=> {
  return getEnvVariable('NODE_ENV') ==='production'; 
};