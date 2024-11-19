import Game from './game.js';

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