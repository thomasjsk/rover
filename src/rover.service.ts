import { Injectable } from '@nestjs/common';

@Injectable()
export class RoverService {
  getHello(): string {
    return 'Hello World!';
  }
}
