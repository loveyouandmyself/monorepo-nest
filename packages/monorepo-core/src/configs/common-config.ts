import path from 'path';
import fs from 'fs';
import ini from 'ini';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { defaultsDeep, defaultTo } from 'lodash';
import { ClassType } from '../metadata';

enum Environment {
  Development = 'dev',
  Test = 'test',
  Production = 'prod',
}

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty({ message: '配置文件路径不能为空' })
  ENV_FILE: string;

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;
}

export function getEnvironmentVariables(configType?: ClassType<EnvironmentVariables>): EnvironmentVariables{
  const filepath = path.resolve(defaultTo(process.env.ENV_FILE, '/config/env.ini'));

  // 读取环境变量
  const config = ini.parse(fs.readFileSync(filepath, 'utf-8'));
  // 绑定环境变量到env
  process.env = defaultsDeep(config, process.env);

  return plainToClass(configType || EnvironmentVariables, process.env);
}

export const environment = getEnvironmentVariables(EnvironmentVariables);