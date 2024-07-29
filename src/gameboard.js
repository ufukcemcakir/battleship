class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
  }
  
    placeShip(ship, x, y, isVertical) {
      if (this.isValidPlacement(ship, x, y, isVertical)) {
        this.ships.push(ship);
        for (let i = 0; i < ship.length; i++) {
          if (isVertical) {
            this.board[x][y + i] = ship;
          } else {
            this.board[x + i][y] = ship;
          }
        }
        return true;
      }
      return false;
    }
  
    isValidPlacement(ship, x, y, isVertical) {
      if (isVertical) {
        if (y + ship.length > 10) return false;
        for (let i = 0; i < ship.length; i++) {
          if (this.board[x][y + i] !== null) return false;
        }
      } else {
        if (x + ship.length > 10) return false;
        for (let i = 0; i < ship.length; i++) {
          if (this.board[x + i][y] !== null) return false;
        }
      }
      return true;
    }
  
    receiveAttack(x, y) {
      if (this.board[x][y] === null) {
        this.missedAttacks.push([x, y]);
        return 'miss';
      } else {
        this.board[x][y].hit();
        return this.board[x][y].isSunk() ? 'sunk' : 'hit';
      }
    }
  
    allShipsSunk() {
      return this.ships.every(ship => ship.isSunk());
    }
  }
  
  export default Gameboard;
  