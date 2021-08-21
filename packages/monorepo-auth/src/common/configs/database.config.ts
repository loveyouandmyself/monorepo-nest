import { getEnvVariable, toBoolean } from '@monorepo-interface/core';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { defaultTo } from 'lodash';
import { redisConfig } from './redis.config';

export const databaseConfig: TypeOrmModuleOptions = {
  type: getEnvVariable('database.MYSQL_DIALECT'),
  host: getEnvVariable('database.MYSQL_HOST'),
  port: getEnvVariable('database.MYSQL_PORT'),
  database: getEnvVariable('database.MYSQL_DATABASE'),
  username: getEnvVariable('database.MYSQL_USERNAME'),
  password: getEnvVariable('database.MYSQL_PASSWORD'),
  charset: 'utf8',
  timezone: getEnvVariable('database.MYSQL_TIMEZONE'),
  synchronize: defaultTo(toBoolean(getEnvVariable('database.MYSQL_SYNCHRONIZE')), false),
  dropSchema: defaultTo(toBoolean(getEnvVariable('database.MYSQL_DROPSCHEMA')), false),
  entities: ['dist/**/*.entity.js'],
  logging: defaultTo(toBoolean(getEnvVariable('database.MYSQL_LOGGING')), false),
  maxQueryExecutionTime: 1000, // 记录查询的执行时间超过1 second的语句
  cache: {
    type: 'ioredis',
    options: {
      ...redisConfig,
    },
    duration: 5000, // 5 seconds
  },
};
