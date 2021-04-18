import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { RoverService } from './rover.service';
import { Direction } from './models';

@Controller()
export class AppController {
  constructor(private readonly roverService: RoverService) {}

  @Post('land')
  land(
    @Body() x: number,
    @Body() y: number,
    @Body() direction: Direction,
  ): string {
    const rover = this.roverService.land(x, y, direction);

    return `Rover landed on (${rover.x}, ${rover.y}) ${rover.direction}`;
  }

  @Post('execute')
  execute(@Body() command: string): string | HttpException {
    return this.roverService.execute(command);
  }
}
