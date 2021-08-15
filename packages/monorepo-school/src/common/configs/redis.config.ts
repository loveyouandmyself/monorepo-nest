import { getEnvVariable } from '@monorepo-interface/core';

export const redisConfig = {
  host: getEnvVariable('redis.REDIS_HOST'),
  port: getEnvVariable('redis.REDIS_PORT'),
  password: getEnvVariable('redis.REDIS_PASSWORD') || null,
};
