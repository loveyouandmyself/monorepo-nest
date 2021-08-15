import { PingController } from './controllers/ping.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    PingController,
  ],
  providers: [],
})
export class PingModule {}
