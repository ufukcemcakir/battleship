import Player from './player';
import Ship from './ship';

class Game {
  constructor() {
    this.player = new Player();
    this.computer = new Player(true);
    this.currentPlayer = this.player;
  }

  setup() {
    // Place ships for both players
    this.placeShipsRandomly(this.player.gameboard);
    this.placeShipsRandomly(this.computer.gameboard);
  }

  placeShipsRandomly(gameboard) {
    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach(length => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isVertical = Math.random() < 0.5;
        placed = gameboard.placeShip(new Ship(length), x, y, isVertical);
      }
    });
  }

  playTurn(x, y) {
    if (this.currentPlayer === this.player) {
      const hit = this.player.attack(this.computer.gameboard, x, y);
      if (this.computer.gameboard.allShipsSunk()) {
        return 'player';
      }
      this.currentPlayer = this.computer;
      return hit ? 'hit' : 'miss';
    } else {
      const hit = this.computer.randomAttack(this.player.gameboard);
      if (this.player.gameboard.allShipsSunk()) {
        return 'computer';
      }
      this.currentPlayer = this.player;
      return hit ? 'hit' : 'miss';
    }
  }
}

export default Game;