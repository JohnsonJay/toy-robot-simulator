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

  /**
   * Returns the current position of the robot OR undefined if it does not yet exist
   */
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

  /**
   * Initialises the grid and resets all values
   * */
  public initialiseGrid(): void {
    // Create a 2D array so that we can closely resemble rows & columns
    // y = columns
    // x  = rows
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

  /**
   * Returns current direction that the robot is facing
   * */
  public getRobotDirection(): string {
    return this.robot.getDirection();
  }

  /**
   * Changes direction that the robot is facing
   * */
  public changeDirection(direction: string): void {
    this.robot.changeDirection(direction)
  }

  /**
   * Rotates the robot 90 degrees in the direction that is specified
   * */
  public turnRobot(direction: string): void {
    if (this.findRobot()) {
      if (direction.toUpperCase() === 'LEFT') {
        this.robot.turnLeft();
        console.log('Rotating left');
      } else if (direction.toUpperCase() === 'RIGHT') {
        this.robot.turnRight();
        console.log('Rotating right');
      }
    } else {
      console.error('Robot must first be placed on grid');
    }
  }

  /**
   * Places robot in the specified location, facing in the specified direction
   * */
  public placeRobot(x: number, y: number, direction: string): void {
    if (x < 0 || x > this.xLength || y < 0 || y > this.yLength) {
      console.error('This area of the grid does not exist');
    } else {
      const currentLocation = this.findRobot();
      if (currentLocation) {
        this.tableGrid[currentLocation.yCoordinate][currentLocation.xCoordinate].isRobotPresent = false;
      }

      this.tableGrid[y][x].isRobotPresent = true;
      this.robot.changeDirection(direction);
    }
  }

  /**
   * Returns robot location
   * */
  public getRobotLocation(): string | undefined {
    const robotLocation = this.findRobot();
    if (robotLocation) {
      return `Output: ${ robotLocation.xCoordinate }, ${ robotLocation.yCoordinate }, ${ this.getRobotDirection() }`;
    } else {
      return undefined;
    }
  }

  /**
   * Moves the robot one step in the position that it is facing
   * */
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
