import Ship from "./ship";

// Global constants for direction
const NORTH = 0;
const SOUTH = 1;
const EAST = 2;
const WEST = 3;

class GameBoard {
  constructor(grid = 10) {
    this.allSunk = false;
    this.size = grid;
    this.ships = [];
    this.board = [];
    for (let i = 0; i < this.size; i += 1) {
      this.board.push(Array(10).fill("."));
    }
  }

  // Helper function to check if a ship is in a valid location
  isValid(x, y, direction, length) {
    for (let i = 0; i < length; i += 1) {
      if (
        x < 0 ||
        x >= this.size ||
        y < 0 ||
        y >= this.size ||
        this.board[y][x] !== "."
      ) {
        return false;
      }
      switch (direction) {
        case NORTH:
          y-=1;
          break;
        case SOUTH:
          y+=1;
          break;
        case EAST:
          x+=1;
          break;
        case WEST:
        default:
          x-=1;
          break;
      }
    }
    return true;
  }

  // Helper function to generate random number
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Generate random ship placements
  generateCoords(len){
    let xCord; let yCord; let direction;
    do{
      xCord = this.getRandomInt(0, this.size - 1);
      yCord = this.getRandomInt(0, this.size - 1);
      direction = this.getRandomInt(0, 3);
    }while (!this.isValid(xCord, yCord, direction, len));
    return [xCord, yCord, direction];
  }

  // Check if all ships have been sunk
  isDefeated(){
    return this.allSunk;
  }

  // Store ship object
  addShip(newShip) {
    this.ships.push(newShip);
  }

  // Add ships to board
  placeShips(...coords) {
    for (let i = 1; i <= coords.length; i += 1) {
      this.addShip(new Ship(i));

      let x = coords[i - 1][0];
      let y = coords[i - 1][1];
      let dir = coords[i - 1][2];

      // If passed coordinate is invalid, generate a random coordinate until valid
      if(!this.isValid(x, y, dir, i)) {
        [x,y,dir] = this.generateCoords(i);
      }
      // Update board array to contain ship
      for (let j = 0; j < i; j += 1) {
        this.board[y][x] = i.toString();
        switch (dir) {
          case NORTH:
            y-=1;
            break;
          case SOUTH:
            y+=1;
            break;
          case EAST:
            x+=1;
            break;
          case WEST:
          default:
            x-=1;
            break;
        }
      }
    }
  }

  checkDefeat(){
    // End game if all ships have been sunk
    let gameEnd = true;
    this.ships.forEach((ship) => {
      if(!ship.isSunk()) gameEnd = false;
    });
    this.allSunk = gameEnd;
  }

  // Check if attack hit ship or not and call necessary function if so
  receiveAttack(x, y){
    // Miss
    if(this.board[y][x]==='.'){
      this.board[y][x]='O';
    }
    // Hit
    else{
      const shipIndex = this.board[y][x]-1;
      this.ships[shipIndex].hit();
      this.board[y][x]='X';
      this.checkDefeat();
    }
  }

}

export default GameBoard;
