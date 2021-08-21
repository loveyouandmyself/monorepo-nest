import { PingModule } from './ping/ping.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { databaseConfig, redisConfig } from './common/configs';
import { DateScalar, LoggerMiddleware, MyDataLoaderInterceptor } from '@monorepo-interface/core';

@Module({
  imports: [
    PingModule, 
    StudentModule, 
    RedisModule.register(redisConfig),
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot({
      debug: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      context: ({ req }) => {
        return {
          request: req,
        };
      },
    }),
  ],
  providers: [
    DateScalar,
    {
      provide: APP_INTERCEPTOR,
      useClass: MyDataLoaderInterceptor,
    },
    // 鉴权
    // {
    //   provide: APP_GUARD,
    //   useClass: MyAuthGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}