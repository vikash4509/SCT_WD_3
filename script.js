let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let mode = null; // "pvp" or "pvc"

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

function setMode(selectedMode) {
  mode = selectedMode;
  restartGame();
  statusText.textContent = mode === "pvp" 
    ? "👥 Player vs Player Mode | X's Turn"
    : "🤖 Player vs Computer Mode | Your Turn (X)";
  gameActive = true;
}

cells.forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = cell.getAttribute("data-index");

  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (board.every(c => c !== "")) {
    statusText.textContent = "😅 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (mode === "pvp") {
    statusText.textContent = `👥 Player vs Player | ${currentPlayer}'s Turn`;
  } else if (mode === "pvc" && currentPlayer === "O") {
    statusText.textContent = "🤖 Computer's Turn...";
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let available = board.map((val, i) => val === "" ? i : null).filter(v => v !== null);
  let move = available[Math.floor(Math.random() * available.length)];
  board[move] = "O";
  cells[move].textContent = "O";

  if (checkWinner()) {
    statusText.textContent = "🤖 Computer Wins!";
    gameActive = false;
    return;
  }

  if (board.every(c => c !== "")) {
    statusText.textContent = "😅 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "Your Turn (X)";
}

function checkWinner() {
  return winningConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Game restarted! Select a mode.";
}
