import { getEnvVariable } from '@monorepo-interface/core';
import { ApiHeaderOptions } from '@nestjs/swagger';
import { defaultTo } from 'lodash';

export const AuthConfig = {
  key: defaultTo(getEnvVariable('auth.key'), 'auth'),
  value: defaultTo(getEnvVariable('auth.value'), '123456'),
  expiresIn: 30 * 60000, // 30 minute
  jwtSecret: defaultTo(getEnvVariable('auth.SECRET'), 'monorepo-nest'),
};

export const AuthHeaderOptions:ApiHeaderOptions[] = [
  {
    name: AuthConfig.key,
    schema: {
      example: AuthConfig.value,
    },
    required: true,
  },
];