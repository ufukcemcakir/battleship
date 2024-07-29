import Game from './game';

const DOM = (() => {
  const game = new Game();
  const playerBoard = document.getElementById('player-board');
  const computerBoard = document.getElementById('computer-board');
  const messageDisplay = document.getElementById('message');
  const startButton = document.getElementById('start-game');

  function initializeBoards() {
    playerBoard.innerHTML = '';
    computerBoard.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const playerCell = document.createElement('div');
        playerCell.classList.add('cell');
        playerCell.dataset.x = i;
        playerCell.dataset.y = j;
        playerBoard.appendChild(playerCell);

        const computerCell = document.createElement('div');
        computerCell.classList.add('cell');
        computerCell.dataset.x = i;
        computerCell.dataset.y = j;
        computerCell.addEventListener('click', handleAttack);
        computerBoard.appendChild(computerCell);
      }
    }
  }

  function handleAttack(e) {
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    
    if (e.target.classList.contains('hit') || e.target.classList.contains('miss')) {
      messageDisplay.textContent = "You've already attacked this square!";
      return;
    }

    const playerResult = game.playTurn(x, y);
    updateBoard();

    if (playerResult === 'player wins') {
      endGame('player');
    } else {
      messageDisplay.textContent = getResultMessage(playerResult);
      
      setTimeout(() => {
        const computerResult = game.playTurn();
        updateBoard();

        if (computerResult === 'computer wins') {
          endGame('computer');
        } else {
          messageDisplay.textContent += ' ' + getResultMessage(computerResult, true);
        }
      }, 500);
    }
  }
  function getResultMessage(result, isComputer = false) {
    const player = isComputer ? 'Computer' : 'You';
    switch (result) {
      case 'hit':
        return `${player} got a hit!`;
      case 'miss':
        return `${player} missed!`;
      case 'sunk':
        return `${player} sunk a ship!`;
      default:
        return '';
    }
  }

  function updateBoard() {
    updatePlayerBoard();
    updateComputerBoard();
  }

  function updatePlayerBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = playerBoard.children[i * 10 + j];
        if (game.player.gameboard.board[i][j]) {
          cell.classList.add('ship');
        }
        if (game.player.gameboard.missedAttacks.some(coord => coord[0] === i && coord[1] === j)) {
          cell.classList.add('miss');
        }
        if (game.player.gameboard.board[i][j] && game.player.gameboard.board[i][j].hits > 0) {
          cell.classList.add('hit');
        }
      }
    }
  }

  function updateComputerBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = computerBoard.children[i * 10 + j];
        if (game.computer.gameboard.missedAttacks.some(coord => coord[0] === i && coord[1] === j)) {
          cell.classList.add('miss');
        }
        if (game.computer.gameboard.board[i][j] && game.computer.gameboard.board[i][j].hits > 0) {
          cell.classList.add('hit');
        }
      }
    }
  }

  function endGame(winner) {
    messageDisplay.textContent = `Game Over! ${winner === 'player' ? 'You win!' : 'Computer wins!'}`;
    computerBoard.removeEventListener('click', handleAttack);
    startButton.textContent = 'Play Again';
    startButton.style.display = 'block';
  }

  function startGame() {
    game.setup();
    initializeBoards();
    updateBoard();
    messageDisplay.textContent = 'Game started! Click on the enemy board to attack.';
    startButton.style.display = 'none';
  }

  return { startGame };
})();

export default DOM;