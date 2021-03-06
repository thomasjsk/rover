import { Test, TestingModule } from '@nestjs/testing';
import { RoverService } from './rover.service';
import { Direction } from './models';

describe('RoverService', () => {
  let service: RoverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoverService],
    }).compile();

    service = module.get<RoverService>(RoverService);
  });

  it('should land rover on a planet', () => {
    service.land(1, 2, Direction.NORTH);

    expect(service.rover.x).toEqual(1);
    expect(service.rover.y).toEqual(2);
    expect(service.rover.direction).toEqual(Direction.NORTH);
  });

  it('should execute command string on rover', () => {
    const commandString = 'FFR';
    service.land(5, 8, Direction.WEST);

    expect(service.execute(commandString)).toEqual('(3, 8) NORTH');
  });
});
