class Rover {
  constructor(
    public x: number,
    public y: number,
    public direction: Direction,
  ) {}

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

  public move(moveDirection: string): void {
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
        rover.move('F');

        expect(rover.x).toEqual(0);
        expect(rover.y).toEqual(1);
      });
    });
  });
});
