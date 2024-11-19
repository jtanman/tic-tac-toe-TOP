import Game from './game.js';

const renderBoard = () => {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    const board = GameBoard.getBoard();
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleMove(index));
        boardElement.appendChild(cellElement);
    });
};

const handleMove = (index) => {
    if (!Game.isGameActive()) {
        Game.restartGame();
    }
    if (Game.isGameActive() && Game.makeMove(index)) {
        renderBoard();
    }
};

const displayResult = (message) => {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
};

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();

    const startButton = document.getElementById('startGame');
    const restartButton = document.getElementById('restart');
    const resetScoreButton = document.getElementById('resetScore');

    startButton.addEventListener('click', () => {
        const player1Name = document.getElementById('player1Name').value || 'Player 1';
        const player2Name = document.getElementById('player2Name').value || 'Player 2';
        game.startGame(player1Name, player2Name);
    });

    restartButton.addEventListener('click', () => {
        game.restartGame();
    });

    resetScoreButton.addEventListener('click', () => {
        game.resetScores();
    });

    game.renderBoard();
});