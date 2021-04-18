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
    const movingRules = {
      [Direction.NORTH]: { axis: Axis.Y, modifier: +1 },
      [Direction.WEST]: { axis: Axis.X, modifier: -1 },
    };
    const offset = { [Move.F]: +1, [Move.B]: -1 }[moveDirection];

    const rule = movingRules[this.direction];
    this[rule.axis] = this[rule.axis] + offset * rule.modifier;
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

enum Axis {
  Y = 'y',
  X = 'x',
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
      {
        initialDirection: Direction.NORTH,
        turn: Rotation.R,
        result: Direction.EAST,
      },
      {
        initialDirection: Direction.NORTH,
        turn: Rotation.L,
        result: Direction.WEST,
      },
      {
        initialDirection: Direction.SOUTH,
        turn: Rotation.R,
        result: Direction.WEST,
      },
      {
        initialDirection: Direction.SOUTH,
        turn: Rotation.L,
        result: Direction.EAST,
      },
      {
        initialDirection: Direction.EAST,
        turn: Rotation.R,
        result: Direction.SOUTH,
      },
      {
        initialDirection: Direction.EAST,
        turn: Rotation.L,
        result: Direction.NORTH,
      },
      {
        initialDirection: Direction.WEST,
        turn: Rotation.R,
        result: Direction.NORTH,
      },
      {
        initialDirection: Direction.WEST,
        turn: Rotation.L,
        result: Direction.SOUTH,
      },
    ].forEach((testCase) => {
      it(`should turn from ${testCase.initialDirection} -> ${testCase.turn}`, () => {
        const simpleRover = new Rover(0, 0, testCase.initialDirection);
        simpleRover.turn(testCase.turn);

        expect(simpleRover.direction).toEqual(testCase.result);
      });
    });
  });

  describe('move', () => {
    const startingCoord = { x: 0, y: 0 };

    [
      {
        initialDirection: Direction.NORTH,
        moveDirection: Move.F,
        result: { x: 0, y: 1 },
      },
      {
        initialDirection: Direction.NORTH,
        moveDirection: Move.B,
        result: { x: 0, y: -1 },
      },
      {
        initialDirection: Direction.WEST,
        moveDirection: Move.F,
        result: { x: -1, y: 0 },
      },
      {
        initialDirection: Direction.WEST,
        moveDirection: Move.B,
        result: { x: 1, y: 0 },
      },
    ].forEach(({ initialDirection, moveDirection, result }) => {
      it(`should move ${moveDirection} facing ${initialDirection}`, () => {
        const rover = new Rover(
          startingCoord.x,
          startingCoord.y,
          initialDirection,
        );

        rover.move(moveDirection);

        expect(rover.x).toEqual(result.x);
        expect(rover.y).toEqual(result.y);
      });
    });
  });
});
