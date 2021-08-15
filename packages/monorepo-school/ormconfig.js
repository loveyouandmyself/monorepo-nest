/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const core = require('@monorepo-interface/core');

console.log(`配置文件:${core.environment.ENV_FILE}`);
module.exports = {
  type: core.getEnvVariable('database.MYSQL_DIALECT'),
  host: core.getEnvVariable('database.MYSQL_HOST'),
  port: core.getEnvVariable('database.MYSQL_PORT'),
  database: core.getEnvVariable('database.MYSQL_DATABASE'),
  username: core.getEnvVariable('database.MYSQL_USERNAME'),
  password: core.getEnvVariable('database.MYSQL_PASSWORD'),
  synchronize: false,
  entities: [path.resolve(__dirname, 'dist/**/*.entity{.ts,.js}')],
  factories: [path.resolve(__dirname, 'database/factories/*.factory{.ts,.js}')],
  seeds: [path.resolve(__dirname, 'database/seeds/*.seed{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'database/migration/*_migrate{.ts,.js}')],
  cli: {
    migrationsDir: 'database/migration',
  },
};