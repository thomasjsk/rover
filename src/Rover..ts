import { Coordinate } from "./models";
import { Rotation } from "./Rotation";
import { Direction } from "./Direction";

export class Rover {
  private _x: number;
  private _y: number;
  private _direction: Direction;

  constructor(
    x: number,
    y: number,
    direction: Direction,
    public readonly obstacles = [],
  ) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  set x(value: number) {
    this._x = value;
  }

  get x() {
    return this._x;
  }

  set y(value: number) {
    this._y = value;
  }

  get y() {
    return this._y;
  }

  set direction(value: Direction) {
    this._direction = value;
  }

  get direction() {
    return this._direction;
  }

  public execute(commandString: string): string {
    return this.executeCommand(commandString.split(''));
  }

  private turn(rotation: Rotation): void {
    const directions: Direction[] = [
      Direction.NORTH,
      Direction.EAST,
      Direction.SOUTH,
      Direction.WEST,
    ];

    const offset =
      {
        [Rotation.R]: +1,
        [Rotation.L]: -1,
      }[rotation] + directions.length;

    this.direction =
      directions[
        (directions.indexOf(this.direction) + offset) % directions.length
      ];
  }

  private executeCommand(commands: string[]) {
    const cmd = commands[0];
    const moveCmd = Move[cmd];
    const turnCmd = Rotation[cmd];

    if (moveCmd) {
      const newPosition = Rover.calculateNextPosition(
        {
          x: this.x,
          y: this.y,
        },
        this.direction,
        moveCmd,
      );

      if (this.hasObstacle(newPosition)) {
        return `(${this.x}, ${this.y}) ${this.direction} STOPPED`;
      }

      this.x = newPosition.x;
      this.y = newPosition.y;
    }

    if (turnCmd) {
      turnCmd && this.turn(turnCmd);
    }

    const remainingCommands = commands.slice(1, commands.length);
    if (remainingCommands.length) {
      return this.executeCommand(remainingCommands);
    }

    return `(${this.x}, ${this.y}) ${this.direction}`;
  }

  private hasObstacle(position: Coordinate): boolean {
    return Boolean(
      this.obstacles.find(([x, y]) => position.x === x && position.y === y),
    );
  }

  private static calculateNextPosition(
    currentPosition: Coordinate,
    currentDirection: Direction,
    moveDirection: Move,
  ): Coordinate {
    const move = {
      [Direction.NORTH]: { axis: Axis.Y, modifier: +1 },
      [Direction.SOUTH]: { axis: Axis.Y, modifier: -1 },
      [Direction.EAST]: { axis: Axis.X, modifier: +1 },
      [Direction.WEST]: { axis: Axis.X, modifier: -1 },
    }[currentDirection];
    const offset = { [Move.F]: +1, [Move.B]: -1 }[moveDirection];

    return {
      x: currentPosition.x,
      y: currentPosition.y,
      [move.axis]: currentPosition[move.axis] + offset * move.modifier,
    };
  }
}

export enum Move {
  F = 'F',
  B = 'B',
}

enum Axis {
  Y = 'y',
  X = 'x',
}
