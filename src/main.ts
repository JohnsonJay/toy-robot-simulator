import * as yargs from 'yargs';
import { Grid } from './Classes/Grid';
import { Robot } from './Classes/Robot';
import { Direction } from './Interfaces/Direction.interface';

const robot = new Robot(Direction.NORTH);
const grid = new Grid(4, 4, robot);

grid.initialiseGrid();

console.info('Toy Robot Simulator');

yargs
  .command(
    "PLACE <X>,<Y><F>",
    "will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST",
    {
      X: {
        type: "number",
        demandOption: true,
        describe: "Column where the robot will be placed"
      },
      Y: {
        type: "number",
        demandOption: true,
        describe: "Row where the robot will be placed"
      },
      F: {
        type: "string",
        demandOption: true,
        describe: "Direction which the robot will face"
      }
    },
    function (argv) {
      grid.placeRobot(argv.X, argv.Y, argv.F);
    }
  ).argv;

yargs.command(
  "LEFT",
  "will rotate the robot 90 degrees in the specified direction without changing",
  {},
  function () {
    grid.turnRobot('LEFT');
  }
).argv;

yargs.command(
  "RIGHT",
  "will rotate the robot 90 degrees in the specified direction without changing",
  {},
  function () {
    grid.turnRobot('RIGHT');
  }
).argv;

yargs.command(
  "MOVE",
  "will move the toy robot one unit forward in the direction it is currently facing",
  {},
  function () {
    grid.move();
  }
).argv;

yargs.command(
  "REPORT",
  "will announce the X,Y and F of the robot",
  {},
  function () {
    console.log(grid.getRobotLocation());
  }
).argv;
console.log(yargs.argv);
