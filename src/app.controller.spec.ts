import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RoverService } from './rover.service';
import { Direction } from './models';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [RoverService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('POST /land', () => {
    it('should return rover position after landing', () => {
      expect(appController.land(5, 8, Direction.WEST)).toEqual(
        'Rover landed on (5, 8) WEST',
      );
    });
  });

  describe('POST /execute', () => {
    it('should return exception if rover has not landed yet', () => {
      expect(() => {
        appController.execute('FFRBL');
      }).toThrow();
    });
  });
});
