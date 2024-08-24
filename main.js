const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} has won!`;
        message.style.color = "#27ae60";
        highlightWinningCells();
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        message.style.color = "#e67e22";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `It's ${currentPlayer}'s turn`;
    message.style.color = "#333";
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function highlightWinningCells() {
    const winningCondition = winningConditions.find(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });

    winningCondition.forEach(index => {
        cells[index].style.backgroundColor = "#2ecc71";
    });
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = "#ecf0f1";
    });
    message.textContent = `It's ${currentPlayer}'s turn`;
    message.style.color = "#333";
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButto
