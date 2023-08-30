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