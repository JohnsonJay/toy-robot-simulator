## Toy Robot Simulator

### Initial App Setup
Once you've cloned the repo, you'll need to install all dependencies first.
Simple run the following command in your terminal:
```shell
npm install
```

### Build App
In order to build the app, you will need to run the following command: 
```shell
npm run build
```
The transpiled code will be in your `dist/` directory

### Running Unit tests
A few basic unit tests have been setup to test the robot functionality & movement. 
There are also some tests that have been listed as part of the requirements.

In order to run the unit tests, enter the following in your terminal:
```shell
npm run test
```
This will run the required tests

### Using CLI
This functionality is incomplete (command chaining is a massive pain).

You'll be able to run one command at a time, which messes this up.
The commands that have been setup are:
- `PLACE <x> <y> <f>`
- `MOVE`
- `LEFT`
- `RIGHT`
- `REPORT`

In order to test out the CLI, try running the following:

```shell
node dist/main.js <command>
```

### Improvements
- Getting the CLI to work properly (I assume I would have to process each command individually)
- Proper validation
- More comprehensive tests
