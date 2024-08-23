const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn'); // ปุ่มรีเซ็ตคะแนน
const xScoreDisplay = document.getElementById('xScore');
const oScoreDisplay = document.getElementById('oScore');
const resultDisplay = document.getElementById('result');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xScore = 0;
let oScore = 0;
let winningCells = []; // เก็บช่องที่ชนะ

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

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);
resetScoreBtn.addEventListener('click', resetScores); // เพิ่มการฟังเหตุการณ์ของปุ่ม Reset Score

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        updateScore(currentPlayer);
        resultDisplay.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells();
        return;
    }

    if (board.every(cell => cell !== '')) { // เช็คว่าช่องเต็มทั้งหมดหรือไม่
        gameActive = false;
        resultDisplay.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winningCells = [a, b, c];
            return true;
        }
    }
    return false;
}

function updateScore(winner) {
    if (winner === 'X') {
        xScore++;
        xScoreDisplay.textContent = xScore;
    } else if (winner === 'O') {
        oScore++;
        oScoreDisplay.textContent = oScore;
    }
}

function highlightWinningCells() {
    winningCells.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell'); // เคลียร์การระบายสีช่องที่ชนะ
    });
    currentPlayer = 'X';
    gameActive = true;
    resultDisplay.textContent = ''; // เคลียร์ข้อความผลลัพธ์
}

function resetScores() {
    xScore = 0;
    oScore = 0;
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
}
