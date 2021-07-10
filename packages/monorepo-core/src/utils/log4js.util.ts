import * as Path from 'path';
import * as Log4js from 'log4js';
import * as Util from 'util';
import moment from 'moment-timezone'; // 处理时间的工具
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';

export const log4jsConfig: Log4js.Configuration = {
  appenders: {
    console: {
      type: 'console', // 打印到控制台
      layout: {
        type: 'monorepo-interface',
        separator: '',
      },
    },
    dataFile: {
      type: 'dateFile',
      filename: 'logs/monorepo-interface.log',
      alwaysIncludePattern: true,
      layout: {
        type: 'monorepo-interface',
        separator: '',
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      // maxLogSize: 10485760,
      numBackups: 3,
      keepFileExt: true,
    },
  },
  categories: {
    default: {
      appenders: ['console', 'dataFile'],
      level: 'DEBUG',
    },
  },
};

// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

// 内容跟踪类
export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

Log4js.addLayout('monorepo-interface', () => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = '';

    // 日志组装
    const messageList: string[] = [];
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        return;
      }

      if (typeof value !== 'string') {
        const inspectValue = Util.inspect(value, false, null, true);
        messageList.push(inspectValue);
      } else {
        messageList.push(value);
      }
      
    });

    // 日志组成部分
    const levelOutput = `[${logEvent.level}]`;
    const dateOutput = `[${moment(logEvent.startTime).utcOffset(480).format('YYYY-MM-DD HH:mm:ss.SSS')}]`;
    const moduleOutput: string = moduleName ? `[${moduleName}]` : '[LoggerService]';
    const messageOutput: string = messageList.join('');
    
    const logOutput = dateOutput + levelOutput + moduleOutput + messageOutput;

    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
    case LoggerLevel.DEBUG:
      return Chalk.green(logOutput);
    case LoggerLevel.INFO:
      return Chalk.cyan(logOutput);
    case LoggerLevel.WARN:
      return Chalk.yellow(logOutput);
    case LoggerLevel.ERROR:
      return Chalk.red(logOutput);
    default:
      return Chalk.grey(logOutput);
    }

  };
});

// 注入配置
Log4js.configure(log4jsConfig);

// 实例化
const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args: any[]): void {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args: any[]): void {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args: any[]): void {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args: any[]): void {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args: any[]): void {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args: any[]): void {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args: any[]): void {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args: any[]): void {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \t`;
  }
}