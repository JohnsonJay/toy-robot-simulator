import { Grid } from '../src/Classes/Grid';
import { Robot } from '../src/Classes/Robot';
import { Direction } from '../src/Interfaces/Direction.interface';

const robot = new Robot(Direction.NORTH);
const grid = new Grid(4, 4, robot);

beforeEach(() => {
  grid.initialiseGrid();
});

test('Robot is placed in correct spot', () => {
  const expectedResult = `Output: 0, 0, ${ Direction.SOUTH }`;

  grid.placeRobot(0, 0, Direction.SOUTH);

  expect(grid.getRobotLocation()).toEqual(expectedResult);
});

describe('testing basic directional movements', () => {
  test('move south', () => {
    const expectedResult = 'Output: 4, 3, SOUTH';

    grid.placeRobot(4, 4, Direction.SOUTH);

    grid.move();

    expect(grid.getRobotLocation()).toEqual(expectedResult);
  });

  test('move west', () => {
    const expectedResult = 'Output: 2, 4, WEST';

    grid.placeRobot(4, 4, Direction.WEST);

    grid.move();
    grid.move();

    expect(grid.getRobotLocation()).toEqual(expectedResult);
  });

  test('move east', () => {
    const expectedResult = 'Output: 4, 2, EAST';

    grid.placeRobot(2, 2, Direction.EAST);

    grid.move();
    grid.move();

    expect.assertions(1);
    expect(grid.getRobotLocation()).toEqual(expectedResult);
  });

  test('move north', () => {
    const expectedResult = 'Output: 2, 3, NORTH';

    grid.placeRobot(2, 1, Direction.NORTH);

    grid.move();
    grid.move();

    expect.assertions(1);
    expect(grid.getRobotLocation()).toEqual(expectedResult);
  });
})

describe('custom tests', () => {
  test('Custom test 1', () => {
    // Output: 0,1,NORTH
    const expectedResult = 'Output: 0, 1, NORTH';

    // PLACE 0,0,NORTH
    grid.placeRobot(0, 0, Direction.NORTH);

    // MOVE
    grid.move();

    // REPORT
    expect(grid.getRobotLocation()).toEqual(expectedResult);
  });

  test('Custom test 2', () => {
    // Output: 0,0,WEST
    const expectedResult = 'Output: 0, 0, WEST'
    // PLACE 0,0,NORTH
    grid.placeRobot(0, 0, Direction.NORTH);

    // LEFT
    grid.turnRobot('LEFT');

    // REPORT
    expect(grid.getRobotLocation()).toEqual(expectedResult);
  });
})
