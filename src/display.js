const cont = document.createElement('div');
cont.classList.add('container');
cont.style.width = '100vw';
cont.style.height = '100vh'

const playerBoard = document.createElement('div');
const cpuBoard = document.createElement('div');

playerBoard.classList.add('board');
cpuBoard.classList.add('board');

cont.appendChild(playerBoard);
cont.appendChild(cpuBoard);

document.querySelector('body').appendChild(cont);

function intro(){
    const msg = document.createElement('p');
    msg.innerText = `Rules: You will be playing against a CPU. 
    Your objective is to sink all of their ships before yours are all sunk. 
    The board is a 10 by 10 grid. Both your and the CPU's ships will be randomly placed. 
    You both have 5 ships, one of length 1, one of length 2, one of length 3, one of length 4, and one of length 5. 
    Your board is on the left of the screen while the CPU's board is on the right. 
    To attack a tile, click a tile on the enemy board to the right. 
    A successful attack is indicated by a red tile. A miss is indicated by a white tile for you, and a black tile for the CPU. Your ships are represented by gray tiles. 
    Click anywhere on this text once you are familiar with these rules.`;
    msg.id = 'intro';
    cont.appendChild(msg);
}

function resetBoard(element){
    while(element.firstChild) element.removeChild(element.firstChild);
}

function display(pBoard){
    resetBoard(playerBoard);
    for(let i=0;i<10;i+=1){
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j=0;j<10;j+=1){
            const tile = document.createElement('div');
            tile.classList.add('square');
            if(pBoard[j][i]==='X') tile.style.backgroundColor = 'red';
            else if(pBoard[j][i]==='O') tile.style.backgroundColor = 'black';
            else if(pBoard[j][i]!=='.') tile.style.backgroundColor = 'gray';
            row.appendChild(tile);
        }
        playerBoard.appendChild(row);
    }
}

function displayEnemy(atkBoard, cb){
    resetBoard(cpuBoard);
    for(let i=0;i<10;i+=1){
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j=0;j<10;j+=1){
            const tile = document.createElement('div');
            tile.classList.add('square');
            tile.addEventListener('click', () => cb(i,j));
            if(atkBoard[j][i]==='X'){
                tile.innerText = 'X';
                tile.style.backgroundColor = 'red';
            }
            else if(atkBoard[j][i]!=='.'){
                tile.innerText = '*';
                tile.style.backgroundColor = 'white';
            }
            row.appendChild(tile);
        }
        cpuBoard.appendChild(row);
    }
}

function gameOver(winner){
    while(cont.firstChild) cont.removeChild(cont.firstChild);
    const end = document.createElement('div');
    end.classList.add('end');
    end.innerText = `You ${winner ? 'win!' : 'lose!'}`;
    cont.appendChild(end);
}

export {intro, display, displayEnemy, gameOver};