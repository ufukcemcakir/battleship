const Player = require('./src/player');
const Gameboard = require('./src/gameboard');
const Ship = require('./src/ship');

describe('Player', () => {
  let player;
  let enemyGameboard;

  beforeEach(() => {
    player = new Player();
    enemyGameboard = new Gameboard();
  });

  test('attack should hit a ship on enemy gameboard', () => {
    const ship = new Ship(3);
    enemyGameboard.placeShip(ship, 0, 0, false);
    expect(player.attack(enemyGameboard, 0, 0)).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('attack should miss when no ship at coordinates', () => {
    expect(player.attack(enemyGameboard, 0, 0)).toBe(false);
    expect(enemyGameboard.missedAttacks).toContainEqual([0, 0]);
  });

  test('randomAttack should make a valid attack', () => {
    const result = player.randomAttack(enemyGameboard);
    expect(result).toBeDefined();
    expect(typeof result).toBe('boolean');
  });
});