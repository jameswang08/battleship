import GameBoard from './gameboard';

const gameBoard = new GameBoard();

test('placeShips correctly adds ships to board array', () => {
    gameBoard.placeShips([0,0,1],[1,0,1],[2,0,1],[3,0,1],[4,0,1]);
    expect(gameBoard.board).toEqual([
        ['1','2','3','4','5','.','.','.','.','.'],
        ['.','2','3','4','5','.','.','.','.','.'],
        ['.','.','3','4','5','.','.','.','.','.'],
        ['.','.','.','4','5','.','.','.','.','.'],
        ['.','.','.','.','5','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.'],
        ['.','.','.','.','.','.','.','.','.','.']]);
    expect(gameBoard.ships).toEqual([
        {
            tiles: 1,
            hits: 0
        },
        {
            tiles: 2,
            hits: 0
        },
        {
            tiles: 3,
            hits: 0
        },
        {
            tiles: 4,
            hits: 0
        },
        {
            tiles: 5,
            hits: 0
        }
    ]);
});
