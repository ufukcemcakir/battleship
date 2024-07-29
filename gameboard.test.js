const Gameboard = require('./src/gameboard');
const Ship = require('./src/ship');

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('placeShip should place a ship at valid coordinates', () => {
    const ship = new Ship(3);
    expect(gameboard.placeShip(ship, 0, 0, false)).toBe(true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
  });

  test('placeShip should not place a ship at invalid coordinates', () => {
    const ship = new Ship(3);
    expect(gameboard.placeShip(ship, 8, 0, false)).toBe(false);
  });

  test('receiveAttack should record a hit on a ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, false);
    expect(gameboard.receiveAttack(0, 0)).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('receiveAttack should record a miss', () => {
    expect(gameboard.receiveAttack(0, 0)).toBe(false);
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test('allShipsSunk should return true when all ships are sunk', () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    gameboard.placeShip(ship1, 0, 0, false);
    gameboard.placeShip(ship2, 0, 1, false);
    
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(2, 1);

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});