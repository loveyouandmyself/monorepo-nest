import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DateScalar, LoggerMiddleware, MyDataLoaderInterceptor, MyRedisService } from '@monorepo-interface/core';
import { PingModule } from './ping/ping.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, redisConfig } from './common/configs';
import { RedisModule } from 'nestjs-redis';
import { MyAuthGuard } from './auth/guards';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PingModule,
    UserModule, 
    AuthModule,
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
    {
      provide: APP_GUARD,
      useClass: MyAuthGuard,
    },
    MyRedisService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}