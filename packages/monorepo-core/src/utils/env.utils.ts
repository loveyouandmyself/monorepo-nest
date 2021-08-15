import _get from 'lodash/get';

/** 获取环境变量 */
export const getEnvVariable = (keyPath: string): any => {
  return _get(process.env, keyPath);
};

export const isProduction = (): boolean=> {
  return getEnvVariable('NODE_ENV') ==='production'; 
};