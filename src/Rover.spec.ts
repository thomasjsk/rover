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

  describe('change direction', () => {
    let simpleRover: Rover;

    describe('should turn from NORTH', () => {
      beforeEach(() => {
        simpleRover = new Rover(0, 0, Direction.NORTH);
      });

      it('right', () => {
        simpleRover.turn(Rotation.R);

        expect(simpleRover.direction).toEqual(Direction.EAST);
      });

      it('left', () => {
        simpleRover.turn(Rotation.L);

        expect(simpleRover.direction).toEqual(Direction.WEST);
      });
    });

    describe('should turn from SOUTH', () => {
      beforeEach(() => {
        simpleRover = new Rover(0, 0, Direction.SOUTH);
      });

      it('right', () => {
        simpleRover.turn(Rotation.R);

        expect(simpleRover.direction).toEqual(Direction.WEST);
      });

      it('left', () => {
        simpleRover.turn(Rotation.L);

        expect(simpleRover.direction).toEqual(Direction.EAST);
      });
    });
  });
});
