import Ship from "./ship";

const aShip = new Ship(3);

test('Hit increments number of hits for ship object', () => {
    aShip.hit();
    expect(aShip.hits).toBe(1);
});

test('isSunk returns false when ship hasn\'t sunk', () => {
    expect(aShip.isSunk()).toBe(false);
});

test('isSunk returns true when ship has been sunk', () => {
    aShip.hit();
    aShip.hit();
    expect(aShip.isSunk()).toBe(true);
});