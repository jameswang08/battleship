import Player from './player';
import {intro, display, displayEnemy, gameOver} from './display';


// Create player
const p1 = new Player();

// Create CPU
const cpu = new Player();

const attackCB = (x, y) => {
    // When tile on enemy board is clicked, record whether the attack was a hit or miss
    let hit = cpu.playerBoard.receiveAttack(x, y);
    // If tile has already been attacked. Do nothing.
    if (hit === -1) return;
    hit = (hit === 0) ? 'O' : 'X';
    p1.recordAttack(x, y, hit);
    if (cpu.sunk()) gameOver(1);
    let xC;
    let yC;
    [xC,yC] = cpu.cpuAttack();
    p1.playerBoard.receiveAttack(xC,yC);
    if (p1.sunk()) gameOver(0);
    display(p1.playerBoard.board);
    displayEnemy(p1.attacked, attackCB);
};

function waitForButtonPress() {
    return new Promise(resolve => {
      const button = document.getElementById('intro');
  
      button.addEventListener('click', () => {
        button.remove();
        resolve();
      });
    });
  }

function gameLoop(){
    intro();

    waitForButtonPress().then(() => {
        p1.randomlyPlace();
        cpu.randomlyPlace();
    
        display(p1.playerBoard.board);
        displayEnemy(p1.attacked, attackCB);
    });
}

export default gameLoop;



