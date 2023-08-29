import Ship from "./ship";

// Global constants for direction
const NORTH = 0;
const SOUTH = 1;
const EAST = 2;
const WEST = 3;

class GameBoard {
  constructor(grid = 10) {
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
      while (!this.isValid(x, y, dir, i)) {
        x = this.getRandomInt(0, this.size - 1);
        y = this.getRandomInt(0, this.size - 1);
        dir = this.getRandomInt(0, 3);
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
}

export default GameBoard;