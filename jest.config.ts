import moment from 'moment';
import path from 'path';
import childProcess from 'child_process';

const getLatestCommit = (): string => {
  return childProcess
    .execSync('git reflog | grep "HEAD@{0}"')
    .toString()
    .split('\n')[0]
    .split(' ')[0];
};

const coverageDir = path.resolve('jest', `${moment().unix()}_${getLatestCommit()}`);

module.exports = {
  rootDir: 'packages',
  testMatch: [
    "**/*.spec.ts"
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  forceExit: true,
  maxConcurrency: 1,
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'tsx',
    'jsx',
    'node',
  ],
  coverageDirectory: coverageDir,
  reporters: [
    'default',
    [
      'jest-stare',
      {
        'resultDir': `${coverageDir}/results`,
        'additionalResultsProcessors': [
          'jest-junit',
        ],
        'coverageLink': '../lcov-report/index.html',
        'jestStareConfigJson': 'jest-stare.json',
        'jestGlobalConfigJson': 'globalStuff.json',
      },
    ],
  ],
};