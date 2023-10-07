BOARD_WIDTH = 3;
const gameSquares = document.querySelectorAll(".game-square");
const heading = document.getElementById("game-heading");
const restartButton = document.getElementById("restart-button");
let boardState = generateEmptyBoardState();
let moveCounter = 0;
let currentPlayer = 1;

gameSquares.forEach((gameSquare, idx) => {
  gameSquare.addEventListener("click", () => {
    const row = Math.floor(idx / BOARD_WIDTH);
    const col = Math.floor(idx % BOARD_WIDTH);

    makeMove(gameSquare, row, col);
  });
});

restartButton.addEventListener("click", restartGame);

function makeMove(gameSquare, row, col) {
  gameSquare.textContent = currentPlayer === 1 ? "X" : "O";
  moveCounter++;
  gameSquare.disabled = true;
  boardState[row][col] = currentPlayer;

  if (didPlayerWin()) {
    heading.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (moveCounter >= BOARD_WIDTH * BOARD_WIDTH) {
    endGame();
    heading.textContent = "Tie Game!";
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeading();
  }
}

function didPlayerWin() {
  const rows = [0, 1, 2];
  const wonHorizontal = rows.some((row) => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer
    );
  });

  const cols = [0, 1, 2];

  const wonVertical = cols.some((col) => {
    return (
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer
    );
  });

  const wonTopLeftToBottonRight =
    boardState[0][0] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][2] === currentPlayer;

  const wonToRightToBottomLeft =
    boardState[0][2] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][0] === currentPlayer;

  return (
    wonHorizontal ||
    wonVertical ||
    wonTopLeftToBottonRight ||
    wonToRightToBottomLeft
  );
}

function generateEmptyBoardState() {
  return new Array(BOARD_WIDTH)
    .fill(null)
    .map((_) => new Array(BOARD_WIDTH).fill(null));
}

function setCurrentPlayerHeading() {
  heading.textContent = `Player ${currentPlayer}'s Turn`;
}

function endGame() {
  restartButton.style.display = "block";
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
}

function restartGame() {
  currentPlayer = 1;
  moveCounter = 0;
  setCurrentPlayerHeading();
  boardState = generateEmptyBoardState();
  gameSquares.forEach((gameSquare) => {
    gameSquare.textContent = "";
    gameSquare.disabled = false;
  });
  restartButton.style.display = "none";
}
