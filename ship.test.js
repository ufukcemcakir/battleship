const Ship = require('./src/ship');

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('ship should be created with correct length', () => {
    expect(ship.length).toBe(3);
  });

  test('hit() should increase number of hits', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk() should return false when hits < length', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() should return true when hits >= length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});