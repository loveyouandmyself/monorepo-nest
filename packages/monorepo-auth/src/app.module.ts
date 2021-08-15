import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DateScalar, LoggerMiddleware, MyDataLoaderInterceptor } from '@monorepo-interface/core';
import { PingModule } from './ping/ping.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, redisConfig } from './common/configs';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    PingModule,
    UserModule, 
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}