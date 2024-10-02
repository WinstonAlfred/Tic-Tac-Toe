const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const xScoreDisplay = document.getElementById('x-score');
const oScoreDisplay = document.getElementById('o-score');
const drawsDisplay = document.getElementById('draws');
const gameBoardElement = document.getElementById('game-board');
const modeSelectionElement = document.getElementById('mode-selection');
const localMultiplayerButton = document.getElementById('local-multiplayer');
const vsBotButton = document.getElementById('vs-bot');

let gameActive = false;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let scores = {
    X: 0,
    O: 0,
    draws: 0
};
let gameMode = null;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame(mode) {
    gameMode = mode;
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    modeSelectionElement.classList.add('hidden');
    gameBoardElement.classList.remove('hidden');
    resetButton.classList.remove('hidden');
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (gameActive && gameMode === 'vs-bot' && currentPlayer === 'O') {
        setTimeout(makeBotMove, 500);
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        updateScore(currentPlayer);
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.textContent = "Game ended in a draw!";
        gameActive = false;
        updateScore('draws');
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScore(winner) {
    scores[winner]++;
    xScoreDisplay.textContent = scores.X;
    oScoreDisplay.textContent = scores.O;
    drawsDisplay.textContent = scores.draws;
}

function handleReset() {
    gameActive = false;
    modeSelectionElement.classList.remove('hidden');
    gameBoardElement.classList.add('hidden');
    resetButton.classList.add('hidden');
    statusDisplay.textContent = 'Choose a game mode';
}

function makeBotMove() {
    if (!gameActive) return;

    let availableMoves = gameState.reduce((acc, cell, index) => {
        if (cell === "") acc.push(index);
        return acc;
    }, []);

    if (availableMoves.length > 0) {
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        let botCell = document.querySelector(`[data-cell-index="${randomMove}"]`);
        handleCellPlayed(botCell, randomMove);
        handleResultValidation();
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleReset);
localMultiplayerButton.addEventListener('click', () => startGame('local-multiplayer'));
vsBotButton.addEventListener('click', () => startGame('vs-bot'));

statusDisplay.textContent = 'Choose a game mode';