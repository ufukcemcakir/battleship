import Gameboard from './gameboard';

class Player {
  constructor(isComputer = false) {
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
    this.attackedCoordinates = new Set();
  }

  attack(enemyGameboard, x, y) {
    return enemyGameboard.receiveAttack(x, y);
  }

  randomAttack(enemyGameboard) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.attackedCoordinates.has(`${x},${y}`));
    
    this.attackedCoordinates.add(`${x},${y}`);
    return this.attack(enemyGameboard, x, y);
  }
}

export default Player;