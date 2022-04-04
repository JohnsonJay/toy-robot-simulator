import { Command } from 'commander';
import { Grid } from './Classes/Grid';
import { Robot } from './Classes/Robot';
import { Direction } from './Interfaces/Direction.interface';

const robot = new Robot(Direction.NORTH);
const grid = new Grid(4, 4, robot);

const program = new Command();

grid.initialiseGrid();

console.log('Toy Robot Simulator');

program
  .command('PLACE')
  .description('will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST')
  .argument('<x>', 'Column where the robot will be placed')
  .argument('<y>', 'Row where the robot will be placed')
  .argument('<f>', 'Direction which the robot will face')
  .action((x, y, f) => {
    grid.placeRobot(x, y, f);
    console.log('Robot was placed', { 1: x, 2: y, 3: f });
  });

program
  .command('LEFT')
  .description('will rotate the robot 90 degrees in the specified direction without changing')
  .action(() => {
    grid.turnRobot('LEFT');
  });

program
  .command('RIGHT')
  .description('will rotate the robot 90 degrees in the specified direction without changing')
  .action(() => {
    grid.turnRobot('RIGHT');
  });

program
  .command('MOVE')
  .description('will move the toy robot one unit forward in the direction it is currently facing')
  .action(() => {
    grid.move();
  });

program.command('REPORT')
  .description('will announce the X,Y and F of the robot')
  .action(() => {
    console.log(grid.getRobotLocation());
  });

program.parse();

