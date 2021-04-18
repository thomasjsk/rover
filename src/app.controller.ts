import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoverService } from './rover.service';
import { Direction } from './models';

@Controller()
export class AppController {
  constructor(private readonly roverService: RoverService) {}

  @Get()
  getHello(): string {
    return this.roverService.getHello();
  }

  @Post('land')
  land(
    @Body() x: number,
    @Body() y: number,
    @Body() direction: Direction,
  ): string {
    const rover = this.roverService.land(x, y, direction);

    return `Rover landed on (${rover.x}, ${rover.y}) ${rover.direction}`;
  }
}
