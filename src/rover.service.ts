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
    this._rover = new Rover(x, y, direction);

    return this._rover;
  }
}
