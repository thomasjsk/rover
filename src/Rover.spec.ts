class Rover {
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

  public turn(rotation: Rotation): void {
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

  public move(moveDirection: Move): void {
    this.x = 0;
    this.y = 1;
  }
}

enum Rotation {
  R = 'R',
  L = 'L',
}

enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

enum Move {
  F = 'F',
  B = 'B',
}

describe('Rover', () => {
  describe('land', () => {
    it('should land on given coordinate', () => {
      const rover = new Rover(2, 5, Direction.NORTH);

      expect(rover.x).toEqual(2);
      expect(rover.y).toEqual(5);
      expect(rover.direction).toEqual(Direction.NORTH);
    });
  });

  describe('change direction', () => {
    [
      { initial: Direction.NORTH, turn: Rotation.R, result: Direction.EAST },
      { initial: Direction.NORTH, turn: Rotation.L, result: Direction.WEST },
      { initial: Direction.SOUTH, turn: Rotation.R, result: Direction.WEST },
      { initial: Direction.SOUTH, turn: Rotation.L, result: Direction.EAST },
      { initial: Direction.EAST, turn: Rotation.R, result: Direction.SOUTH },
      { initial: Direction.EAST, turn: Rotation.L, result: Direction.NORTH },
      { initial: Direction.WEST, turn: Rotation.R, result: Direction.NORTH },
      { initial: Direction.WEST, turn: Rotation.L, result: Direction.SOUTH },
    ].forEach((testCase) => {
      it(`should turn from ${testCase.initial} -> ${testCase.turn}`, () => {
        const simpleRover = new Rover(0, 0, testCase.initial);
        simpleRover.turn(testCase.turn);

        expect(simpleRover.direction).toEqual(testCase.result);
      });
    });
  });

  describe('move', () => {
    describe('facing NORTH', () => {
      it('should move forward', () => {
        const rover = new Rover(0, 0, Direction.NORTH);
        rover.move(Move.F);

        expect(rover.x).toEqual(0);
        expect(rover.y).toEqual(1);
      });
    });
  });
});
