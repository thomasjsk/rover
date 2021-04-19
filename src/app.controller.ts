import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { RoverService } from './rover.service';
import { Direction } from './models';

@Controller()
export class AppController {
  constructor(private readonly roverService: RoverService) {}

  @Post('land')
  land(
    @Body()
    position: {
      x: number;
      y: number;
      direction: Direction;
      knownObstacles?: string;
    },
  ): string {
    const rover = this.roverService.land(
      +position.x,
      +position.y,
      position.direction,
      this.roverService.parseObstaclesData(position.knownObstacles),
    );

    return `Rover landed on (${rover.x}, ${rover.y}) ${rover.direction}`;
  }

  @Post('execute')
  execute(@Body() executeBody: { command: string }): string | HttpException {
    return this.roverService.execute(executeBody.command);
  }
}
