class Ship {
  constructor(size) {
    this.tiles = size;
    this.hits = 0;
  }

  getID(){
    return this.tiles;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits === this.tiles;
  }
}

export default Ship;
