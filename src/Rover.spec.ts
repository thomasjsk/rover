import { Direction, Move, Rotation, Rover } from './Rover.';

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
      {
        initialDirection: Direction.SOUTH,
        moveDirection: Move.F,
        result: { x: 0, y: -1 },
      },
      {
        initialDirection: Direction.SOUTH,
        moveDirection: Move.B,
        result: { x: 0, y: 1 },
      },
      {
        initialDirection: Direction.EAST,
        moveDirection: Move.F,
        result: { x: 1, y: 0 },
      },
      {
        initialDirection: Direction.EAST,
        moveDirection: Move.B,
        result: { x: -1, y: 0 },
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

  describe('execute', () => {
    it('should execute single move command', () => {
      const rover = new Rover(0, 0, Direction.NORTH);
      const commandString = 'F';

      expect(rover.execute(commandString)).toEqual('(0, 1) NORTH');
    });

    it('should execute single turn command', () => {
      const rover = new Rover(0, 0, Direction.NORTH);
      const commandString = 'L';

      expect(rover.execute(commandString)).toEqual('(0, 0) WEST');
    });

    it('should execute multiple commands', () => {
      const rover = new Rover(0, 0, Direction.EAST);
      const commandString = 'FLFRB';

      expect(rover.execute(commandString)).toEqual('(0, 1) EAST');
    });

    it('should not execute invalid commands', () => {
      const rover = new Rover(0, 0, Direction.NORTH);
      const commandString = '&%Kun0F';

      expect(rover.execute(commandString)).toEqual('(0, 1) NORTH');
    });
  });
});
