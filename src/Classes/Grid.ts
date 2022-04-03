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
    // Create a 2D array so that we can closely resemble rows & columns

    for (let yCoordinate = 0; yCoordinate <= this.xLength; yCoordinate++) {
      const row: GridBlock[] = [];

      for (let xCoordinate = 0; xCoordinate <= this.yLength; xCoordinate++) {
        const gridBlock: GridBlock = {
          yCoordinate,
          xCoordinate,
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
    const currentLocation = this.findRobot();
    if (currentLocation) {
      this.tableGrid[currentLocation.yCoordinate][currentLocation.xCoordinate].isRobotPresent = false;
    }

    this.tableGrid[y][x].isRobotPresent = true;
    this.robot.changeDirection(direction);
  }

  public getRobotLocation() {
    const robotLocation = this.findRobot();
    if (robotLocation) {
      return `Output: ${ robotLocation.xCoordinate }, ${ robotLocation.yCoordinate }, ${ this.getRobotDirection() }`;
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
        if (this.tableGrid[robotLocation.yCoordinate + 1]) {
          // set new robot location
          this.tableGrid[robotLocation.yCoordinate + 1][robotLocation.xCoordinate].isRobotPresent = true;
          // remove previous robot location
          this.tableGrid[robotLocation.yCoordinate][robotLocation.xCoordinate].isRobotPresent = false;
        } else {
          console.error('You cannot move in that direction');
        }

      } else if (direction === Direction.SOUTH) {
        if (this.tableGrid[robotLocation.yCoordinate - 1]) {
          // set new robot location
          this.tableGrid[robotLocation.yCoordinate - 1][robotLocation.xCoordinate].isRobotPresent = true;
          // remove previous robot location
          this.tableGrid[robotLocation.yCoordinate][robotLocation.xCoordinate].isRobotPresent = false;
        } else {
          console.error('You cannot move in that direction');
        }
      } else if (direction === Direction.WEST) {
        if (this.tableGrid[robotLocation.yCoordinate][robotLocation.xCoordinate - 1]){
          // set new robot location
          this.tableGrid[robotLocation.yCoordinate][robotLocation.xCoordinate - 1].isRobotPresent = true;
          // remove previous robot location
          this.tableGrid[robotLocation.yCoordinate][robotLocation.xCoordinate].isRobotPresent = false;
        } else {
          console.error('You cannot move in that direction');
        }
      } else if (direction === Direction.EAST) {
        if (this.tableGrid[robotLocation.yCoordinate][robotLocation.xCoordinate + 1]){
          // set new robot location
          this.tableGrid[robotLocation.yCoordinate][robotLocation.xCoordinate + 1].isRobotPresent = true;
          // remove previous robot location
          this.tableGrid[robotLocation.yCoordinate][robotLocation.xCoordinate].isRobotPresent = false;
        } else {
          console.error('You cannot move in that direction');
        }
      }
    }
  }
}
