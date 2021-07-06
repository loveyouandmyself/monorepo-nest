import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import pack from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  console.log(`${pack.name} is running on: ${await app.getUrl()}`);
}
bootstrap();
