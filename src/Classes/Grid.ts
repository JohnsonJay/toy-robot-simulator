import { Robot } from './Robot';
import { GridBlock } from '../Interfaces/Grid.interface';
import { Direction } from '../Interfaces/Direction.interface';

export class Grid {
  private tableGrid: GridBlock[][] = [];

  constructor(
    public xLength: number,
    public yLength: number,
    private robot: Robot
  ) {}

  private findRobot(): GridBlock | undefined {
    let robotLocation = null;

    for (let x = 0; x <= this.xLength; x++) {
      for (let y = 0; y <= this.yLength; y++) {
        if (this.tableGrid[x][y].isRobotPresent) {
          robotLocation = this.tableGrid[x][y];
          break;
        }
      }
    }

    if (robotLocation) {
      return robotLocation;
    } else {
      return undefined;
    }
  }

  public initialiseTable(): void {

    // starting backwards so that we our "columns" & "rows" are in the correct order
    for (let xCoordinate = 0; xCoordinate <= this.xLength; xCoordinate++) {
      const row: GridBlock[] = [];

      for (let yCoordinate = 0; yCoordinate <= this.yLength; yCoordinate++) {
        const gridBlock: GridBlock = {
          xCoordinate,
          yCoordinate,
          isRobotPresent: false
        };

        row.push(gridBlock);
      }
      this.tableGrid.push(row);
    }
  }

  public getRobotDirection(): string {
    return this.robot.getDirection();
  }

  public changeDirection(direction: string): void {
    this.robot.changeDirection(direction)
  }

  public turnRobot(direction: string): void {
    if (direction.toUpperCase() === 'LEFT') {
      this.robot.turnLeft();
    } else if (direction.toUpperCase() === 'RIGHT') {
      this.robot.turnRight();
    }
  }

  public placeRobot(x: number, y: number, direction: string): void {
    this.robot.changeDirection(direction);
    this.tableGrid[x][y].isRobotPresent = true;
  }

  public getRobotLocation() {
    const robotLocation = this.findRobot();
    if (robotLocation) {
      return {
        x: robotLocation.xCoordinate,
        y: robotLocation.yCoordinate,
        direction: this.getRobotDirection()
      }
    }
  }

  public move(): void {
    // get robot direction, so we know which way we're facing
    const direction = this.robot.getDirection();
    const robotLocation: GridBlock | undefined = this.findRobot();

    //  this is ugly
    if (robotLocation) {
      if (direction === Direction.NORTH) {
        // check we can actually move up
        if (this.tableGrid[robotLocation.xCoordinate + 1]) {
          // set new robot location
          this.tableGrid[robotLocation.xCoordinate + 1][robotLocation.yCoordinate].isRobotPresent = true;
          // remove previous robot location
          this.tableGrid[robotLocation.xCoordinate][robotLocation.yCoordinate].isRobotPresent = false;
        } else {
          console.error('You cannot move in that direction');
        }

      } else if (direction === Direction.SOUTH) {
        if (this.tableGrid[robotLocation.xCoordinate - 1]) {
          // set new robot location
          this.tableGrid[robotLocation.xCoordinate - 1][robotLocation.yCoordinate].isRobotPresent = true;
          // remove previous robot location
          this.tableGrid[robotLocation.xCoordinate][robotLocation.yCoordinate].isRobotPresent = false;
        } else {
          console.error('You cannot move in that direction');
        }
      } else if (direction === Direction.WEST) {
        if (this.tableGrid[robotLocation.xCoordinate][robotLocation.yCoordinate - 1]){
          // set new robot location
          this.tableGrid[robotLocation.xCoordinate][robotLocation.yCoordinate - 1].isRobotPresent = true;
          // remove previous robot location
          this.tableGrid[robotLocation.xCoordinate][robotLocation.yCoordinate].isRobotPresent = false;
        } else {
          console.error('You cannot move in that direction');
        }
      } else if (direction === Direction.EAST) {
        if (this.tableGrid[robotLocation.xCoordinate][robotLocation.yCoordinate + 1]){
          // set new robot location
          this.tableGrid[robotLocation.xCoordinate][robotLocation.yCoordinate + 1].isRobotPresent = true;
          // remove previous robot location
          this.tableGrid[robotLocation.xCoordinate][robotLocation.yCoordinate].isRobotPresent = false;
        } else {
          console.error('You cannot move in that direction');
        }
      }
    }
  }
}

// TODO remove this crap
const robot = new Robot(Direction.NORTH);
const tableTop = new Grid(4, 4, robot);
tableTop.initialiseTable();
tableTop.placeRobot(0, 0, Direction.NORTH);
console.log('firstLocation', tableTop.getRobotLocation());
tableTop.move();
console.log('secondLocation', tableTop.getRobotLocation());
tableTop.move();
console.log('thirdLocation', tableTop.getRobotLocation());
tableTop.turnRobot('right');
console.log('fourthLocation', tableTop.getRobotLocation());
tableTop.move();
console.log('fifthLocation', tableTop.getRobotLocation());
