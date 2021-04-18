import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RoverService } from './rover.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RoverService],
})
export class AppModule {}
