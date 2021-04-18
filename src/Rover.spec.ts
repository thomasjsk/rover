class Rover {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public direction: string,
  ) {}

  public turn(rotation: Rotation): void {
    const rotations = {
      [Direction.NORTH]: {
        [Rotation.R]: Direction.EAST,
        [Rotation.L]: Direction.WEST,
      },
      [Direction.SOUTH]: {
        [Rotation.R]: Direction.WEST,
        [Rotation.L]: Direction.EAST,
      },
    };

    this.direction = rotations[this.direction][rotation];
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

  const expectedTurningResults = [
    { initial: Direction.NORTH, turn: Rotation.R, result: Direction.EAST },
    { initial: Direction.NORTH, turn: Rotation.L, result: Direction.WEST },
    { initial: Direction.SOUTH, turn: Rotation.R, result: Direction.WEST },
    { initial: Direction.SOUTH, turn: Rotation.L, result: Direction.EAST },
  ];

  describe('change direction', () => {
    expectedTurningResults.forEach((testCase) => {
      it(`should turn from ${testCase.initial} -> ${testCase.turn}`, () => {
        const simpleRover = new Rover(0, 0, testCase.initial);
        simpleRover.turn(testCase.turn);

        expect(simpleRover.direction).toEqual(testCase.result);
      });
    });
  });
});
