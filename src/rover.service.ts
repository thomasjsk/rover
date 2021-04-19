import { HttpException, Injectable } from '@nestjs/common';
import { Direction, Rover } from './models';

@Injectable()
export class RoverService {
  private _rover: Rover;

  get rover() {
    return this._rover;
  }

  land(
    x: number,
    y: number,
    direction: Direction,
    knownObstacles: number[][] = [],
  ) {
    this._rover = new Rover(x, y, direction, knownObstacles);

    return this.rover;
  }

  execute(commandString: string): string | HttpException {
    if (!this.rover) {
      throw new HttpException('Rover not landed yet!', 500);
    }

    return this.rover.execute(commandString);
  }

  parseObstaclesData(obstaclesData: string): number[][] {
    try {
      return JSON.parse(obstaclesData).map((obstacleCoord: string[]) =>
        obstacleCoord.map(Number),
      );
    } catch (e) {
      return [];
    }
  }
}
