import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import pack from '../package.json';
import { Logger } from '@monorepo-interface/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
  Logger.log(`${pack.name} is running on: ${await app.getUrl()}`);
}
bootstrap();
