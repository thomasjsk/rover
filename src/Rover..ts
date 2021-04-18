export class Rover {
  private _x: number;
  private _y: number;
  private _direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
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

  private move(moveDirection: Move): void {
    const move = {
      [Direction.NORTH]: { axis: Axis.Y, modifier: +1 },
      [Direction.SOUTH]: { axis: Axis.Y, modifier: -1 },
      [Direction.EAST]: { axis: Axis.X, modifier: +1 },
      [Direction.WEST]: { axis: Axis.X, modifier: -1 },
    }[this.direction];
    const offset = { [Move.F]: +1, [Move.B]: -1 }[moveDirection];

    this[move.axis] = this[move.axis] + offset * move.modifier;
  }

  public execute(commandString: string): string {
    commandString.split('').forEach((command) => {
      const moveCmd = Move[command];
      const turnCmd = Rotation[command];

      if (moveCmd) {
        this.move(moveCmd);
      }

      if (turnCmd) {
        this.turn(turnCmd);
      }
    });

    return `(${this.x}, ${this.y}) ${this.direction}`;
  }
}

export enum Rotation {
  R = 'R',
  L = 'L',
}

export enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

export enum Move {
  F = 'F',
  B = 'B',
}

enum Axis {
  Y = 'y',
  X = 'x',
}
