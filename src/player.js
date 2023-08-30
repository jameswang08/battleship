import GameBoard from './gameboard';

class Player{
    constructor(){
        this.playerBoard = new GameBoard();
        this.attacked =  [];   
        for (let i = 0; i < 10; i += 1) {
            this.attacked.push(Array(10).fill("."));
        }
    }

    randomlyPlace(){
        const coordinateArray = [];
        for(let i=1;i<=5;i+=1){
            coordinateArray.push(this.playerBoard.generateCoords(i));
        }
        this.playerBoard.placeShips(...coordinateArray);
    }

    recordAttack(x,y, char){
        this.attacked[y][x]=char;
    }

    cpuAttack(){
        let x;
        let y;
        do{
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }while(this.attacked[y][x]!=='.');
        this.recordAttack(x,y, 'X');
        return [y,x];
    }

    sunk(){
        return this.playerBoard.isDefeated();
    }

}

export default Player;