import { Controller, Get } from '@nestjs/common';
import { RoverService } from './rover.service';

@Controller()
export class AppController {
  constructor(private readonly appService: RoverService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
