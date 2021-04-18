import { HttpException, Injectable } from '@nestjs/common';
import { Direction, Rover } from './models';

@Injectable()
export class RoverService {
  private _rover: Rover;

  get rover() {
    return this._rover;
  }

  land(x: number, y: number, direction: Direction) {
    if (!this.rover) {
      this._rover = new Rover(x, y, direction);
    }

    return this.rover;
  }

  execute(commandString: string): string | HttpException {
    if (!this.rover) {
      throw new HttpException('Rover not landed yet!', 500);
    }

    return this.rover.execute(commandString);
  }
}
