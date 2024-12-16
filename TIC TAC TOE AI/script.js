const boardElement = document.getElementById("board");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart");
const difficultySelector = document.getElementById("difficulty");

let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;
let difficulty = "easy";

const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

// Initialize the game
function initGame() {
    boardElement.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
        cell.addEventListener("click", handleHumanMove, { once: true });
    });
    board = Array(9).fill(null);
    currentPlayer = "X";
    isGameOver = false;
    resultElement.textContent = "";
    difficulty = difficultySelector.value;
}

// Handle Human Player Move
function handleHumanMove(event) {
    if (isGameOver) return;

    const index = event.target.dataset.index;
    if (board[index] !== null) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    if (checkWinner(currentPlayer)) {
        endGame(`${currentPlayer} wins!`);
        return;
    }

    if (isDraw()) {
        endGame("It's a draw!");
        return;
    }

    currentPlayer = "O";
    makeAIMove();
}

// AI Move Logic
function makeAIMove() {
    let move;
    if (difficulty === "easy") {
        move = getRandomMove();
    } else if (difficulty === "medium") {
        move = Math.random() > 0.5 ? getBestMove() : getRandomMove();
    } else {
        move = getBestMove(); // Hard Mode (Minimax)
    }

    board[move] = "O";
    const cell = document.querySelector(`.cell[data-index="${move}"]`);
    cell.textContent = "O";
    cell.classList.add("taken");

    if (checkWinner("O")) {
        endGame("O wins!");
        return;
    }

    if (isDraw()) {
        endGame("It's a draw!");
        return;
    }

    currentPlayer = "X";
}

// Easy Mode: Get Random Move
function getRandomMove() {
    const availableMoves = board
        .map((cell, index) => (cell === null ? index : null))
        .filter(index => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Hard Mode: Get Best Move (Minimax)
function getBestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = "O";
            const score = minimax(0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

// Minimax Algorithm
function minimax(depth, isMaximizing) {
    if (checkWinner("O")) return 10 - depth;
    if (checkWinner("X")) return depth - 10;
    if (isDraw()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = "O";
                const score = minimax(depth + 1, false);
                board[i] = null;
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = "X";
                const score = minimax(depth + 1, true);
                board[i] = null;
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}

// Check for Winner
function checkWinner(player) {
    return winCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}

// Check for Draw
function isDraw() {
    return board.every(cell => cell !== null);
}

// End Game
function endGame(message) {
    isGameOver = true;
    resultElement.textContent = message;
    boardElement.querySelectorAll(".cell").forEach(cell =>
        cell.removeEventListener("click", handleHumanMove)
    );
}

// Restart Game
restartButton.addEventListener("click", initGame);

// Initialize on Page Load
initGame();
