import { Robot } from '../src/Classes/Robot';
import { Direction } from '../src/Interfaces/Direction.interface';

const robotMock = new Robot(Direction.NORTH);

beforeEach(() => {
  robotMock.changeDirection(Direction.NORTH);
})

describe('Robot object direction testing', () => {
  test('Turn left', () => {
    robotMock.turnLeft();

    expect(robotMock.getDirection()).toEqual(Direction.WEST);
  });

  test('Turn right', () => {
    robotMock.turnRight();

    expect(robotMock.getDirection()).toEqual(Direction.EAST);
  });

  test('Change direction', () => {
    robotMock.changeDirection(Direction.SOUTH);

    expect(robotMock.getDirection()).toEqual(Direction.SOUTH);
  });

  test('Rotate 180 degrees', () => {
    robotMock.turnRight();
    robotMock.turnRight();

    expect(robotMock.getDirection()).toEqual(Direction.SOUTH);
  });

  test('Rotate 270 degrees', () => {
    robotMock.turnRight();
    robotMock.turnRight();
    robotMock.turnRight();

    expect(robotMock.getDirection()).toEqual(Direction.WEST);
  });

  test('Rotate 360 degrees', () => {
    robotMock.turnRight();
    robotMock.turnRight();
    robotMock.turnRight();
    robotMock.turnRight();

    expect(robotMock.getDirection()).toEqual(Direction.NORTH);
  })
});
