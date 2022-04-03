import { Direction } from '../Interfaces/Direction.interface';

export class Robot {
  constructor(
    public direction: string
  ) {}

  /**
   * Function that will find the current direction that the robot is facing, and shift it 90 degrees to the left
   * */
  public turnLeft(): void {
    // keep track of current direction & rotate 90 degrees to left
    // switch statement seems way easier to read - also not too many steps for it to become convoluted
    switch(this.direction) {
      case Direction.NORTH:
        this.direction = Direction.WEST;
        break;
      case Direction.WEST:
        this.direction = Direction.SOUTH;
        break;
      case Direction.SOUTH:
        this.direction = Direction.EAST;
        break;
      case Direction.EAST:
        this.direction = Direction.NORTH;
        break;
      default:
        break;
    }
  }

  /**
   * Function that will find the current direction that the robot is facing, and shift it 90 degrees to the right
   * */
  public turnRight(): void {
    switch(this.direction) {
      case Direction.NORTH:
        this.direction = Direction.EAST;
        break;
      case Direction.EAST:
        this.direction = Direction.SOUTH;
        break;
      case Direction.SOUTH:
        this.direction = Direction.WEST;
        break;
      case Direction.WEST:
        this.direction = Direction.NORTH;
        break;
      default:
        break;
    }
  }

  /*
  * This can be used to change the direction which the robot is facing.
  * i.e. If the user decides to use the PLACE command
  * */
  public changeDirection(direction: string): void {
    this.direction = direction;
  }

  /*
  * Returns current direction that the robot is facing
  * */
  public getDirection(): string {
    return this.direction;
  }
}
