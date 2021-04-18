import { Injectable } from '@nestjs/common';
import { Direction, Rover } from './models';

@Injectable()
export class RoverService {
  private _rover: Rover;

  get rover() {
    return this._rover;
  }

  getHello(): string {
    return 'Hello World!';
  }

  land(x: number, y: number, direction: Direction) {
    if (!this.rover) {
      this._rover = new Rover(x, y, direction);
    }

    return this.rover;
  }
}
