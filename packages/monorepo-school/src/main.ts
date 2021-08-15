import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import pack from '../package.json';
import { AllExceptionsFilter, getEnvVariable, Logger, TransformInterceptor, ValidationPipe } from '@monorepo-interface/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

Logger.init(pack.module);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // 路由前缀
  // app.setGlobalPrefix('api/school'); 

  // 全局注册错误的过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 验证管道
  app.useGlobalPipes(new ValidationPipe());

  // Swagger文档
  const options = new DocumentBuilder()
    .setTitle(pack.name)
    .setDescription(pack.description)
    .setVersion(pack.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(getEnvVariable('PORT') || 6002);
  Logger.log(`${pack.description} is running on: ${await app.getUrl()}`);
}
bootstrap();
