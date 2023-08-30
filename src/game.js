import Player from './player';
import {intro, display, displayEnemy, gameOver} from './display';

const attackCB = (x, y) => {
    // When tile on enemy board is clicked, record whether the attack was a hit or miss
    let hit = this.cpu.receiveAttack(x, y);
    // If tile has already been attacked. Do nothing.
    if (hit === -1) return;
    hit = (hit === 0) ? 'O' : 'X';
    this.p1.recordAttack(x, y, hit);
    if (this.cpu.sunk()) gameOver();
    this.cpu.cpuAttack();
    if (this.p1.sunk()) gameOver();
};

function gameLoop(){
    intro();

    // Set up game
    // Create player
    const p1 = new Player();

    // Create CPU
    const cpu = new Player();

    // Add ships to player boards
    p1.randomlyPlace();
    cpu.randomlyPlace();

    display(p1.playerBoard.board);
    displayEnemy(p1.attacked, attackCB);
}

export default gameLoop;



