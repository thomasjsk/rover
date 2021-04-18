class Rover {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly direction: string,
  ) {}
}

describe('Rover', () => {
  describe('land', () => {
    it('should land on given coordinate', () => {
      const rover = new Rover(2, 5, 'NORTH');

      expect(rover.x).toEqual(2);
      expect(rover.y).toEqual(5);
      expect(rover.direction).toEqual('NORTH');
    });
  });
});
