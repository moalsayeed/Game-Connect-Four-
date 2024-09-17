const gameBoard = document.querySelector('.game-board');
const resetButton = document.getElementById('reset-button');
const player1Score = document.querySelector('.player-1-score');
const player2Score = document.querySelector('.player-2-score');

const board = []; // Array to store the game state
const rows = 6;
const cols = 7;
let currentPlayer = 1;
let gameOver = false;

// Initialize the board with empty cells
function initializeBoard() {
  for (let r = 0; r < rows; r++) {
    board[r] = new Array(cols).fill(0); // 0 represents an empty cell
  }
  renderBoard();
}

// Create the HTML grid and attach event listeners
function renderBoard() {
  gameBoard.innerHTML = ''; // Clear the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      if (board[r][c] === 1) {
        cell.classList.add('player-1');
      } else if (board[r][c] === 2) {
        cell.classList.add('player-2');
      }
      gameBoard.appendChild(cell);

      cell.addEventListener('click', () => handleClick(r, c));
    }
  }
}

// Handle cell clicks
function handleClick(row, col) {
  if (gameOver) return;

  // Find the lowest available row in the column
  let availableRow = rows - 1;
  while (availableRow >= 0 && board[availableRow][col] !== 0) {
    availableRow--;
  }

  if (availableRow >= 0) {
    board[availableRow][col] = currentPlayer;
    renderBoard(); // Update the visual board

    if (checkWin(availableRow, col)) {
      gameOver = true;
      alert(`Player ${currentPlayer} Wins!`);
      updateScore(); // Update the score
    } else if (checkTie()) {
      gameOver = true;
      alert("It's a Tie!");
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch players
    }
  }
}

// Check for win conditions
function checkWin(row, col) {
  // Check horizontal
  let count = 0;
  for (let c = 0; c < cols; c++) {
    if (board[row][c] === currentPlayer) {
      count++;
      if (count >= 4) return true;
    } else {
      count = 0;
    }
  }

  // Check vertical
  count = 0;
  for (let r = 0; r < rows; r++) {
    if (board[r][col] === currentPlayer) {
      count++;
      if (count >= 4) return true;
    } else {
      count = 0;
    }
  }

  // Check diagonals (top-left to bottom-right)
  count = 0;
  let r = row, c = col;
  while (r >= 0 && c >= 0) {
    if (board[r][c] === currentPlayer) {
      count++;
      if (count >= 4) return true;
    } else {
      count = 0;
    }
    r--;
    c--;
  }
  r = row + 1;
  c = col + 1;
  while (r < rows && c < cols) {
    if (board[r][c] === currentPlayer) {
      count++;
      if (count >= 4) return true;
    } else {
      count = 0;
    }
    r++;
    c++;
  }

  // Check diagonals (bottom-left to top-right)
  count = 0;
  r = row, c = col;
  while (r < rows && c >= 0) {
    if (board[r][c] === currentPlayer) {
      count++;
      if (count >= 4) return true;
    } else {
      count = 0;
    }
    r++;
    c--;
  }
  r = row - 1;
  c = col + 1;
  while (r >= 0 && c < cols) {
    if (board[r][c] === currentPlayer) {
      count++;
      if (count >= 4) return true;
    } else {
      count = 0;
    }
    r--;
    c++;
  }

  return false;
}

// Check if it's a tie (board is full)
function checkTie() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 0) {
        return false; // Found an empty cell, not a tie
      }
    }
  }
  return true; // All cells are filled, it's a tie
}

// Update the score based on the winning player
function updateScore() {
  if (currentPlayer === 1) {
    player1Score.textContent = parseInt(player1Score.textContent) + 1;
  } else {
    player2Score.textContent = parseInt(player2Score.textContent) + 1;
  }
}

// Reset the game to its initial state
function resetGame() {
  gameOver = false;
  currentPlayer = 1;
  initializeBoard();
}

// Start the game
initializeBoard();
resetButton.addEventListener('click', resetGame);