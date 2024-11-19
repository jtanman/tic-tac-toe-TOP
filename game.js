import GameBoard from './gameBoard.js';
import Player from './player.js';

class Game {
    constructor() {
        this.gameBoard = new GameBoard();
        this.player1 = null;
        this.player2 = null;
        this.currentPlayer = null;
        this.gameActive = false;
        this.player1Score = 0;
        this.player2Score = 0;
    }

    startGame(name1, name2) {
        this.player1 = new Player(name1, 'X');
        this.player2 = new Player(name2, 'O');
        this.currentPlayer = this.player1;
        this.gameActive = true;
        this.gameBoard.resetBoard();
        this.renderBoard();
        this.displayResult('');
        this.updateScoreDisplay();
    }

    restartGame() {
        this.gameBoard.resetBoard();
        this.gameActive = true;
        this.currentPlayer = this.player1;
        this.renderBoard();
        this.displayResult('');
    }

    makeMove(index) {
        if (this.gameBoard.makeMove(index, this.currentPlayer.getSymbol())) {
            if (this.gameBoard.checkWin()) {
                this.gameActive = false;
                this.displayResult(`${this.currentPlayer.getName()} wins!`);
                this.updateScore(this.currentPlayer);
            } else if (this.gameBoard.checkDraw()) {
                this.gameActive = false;
                this.displayResult('It\'s a draw!');
            } else {
                this.switchPlayer();
            }
            this.renderBoard();
            return true;
        }
        return false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    updateScore(player) {
        if (player === this.player1) {
            this.player1Score++;
        } else {
            this.player2Score++;
        }
        this.updateScoreDisplay();
    }

    resetScores() {
        this.player1Score = 0;
        this.player2Score = 0;
        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        document.getElementById('player1Score').textContent = `${this.player1.getName()}: ${this.player1Score}`;
        document.getElementById('player2Score').textContent = `${this.player2.getName()}: ${this.player2Score}`;
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        const board = this.gameBoard.getBoard();
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => this.handleMove(index));
            boardElement.appendChild(cellElement);
        });
    }

    handleMove(index) {
        if (!this.gameActive) {
            this.restartGame();
        }
        if (this.gameActive && this.makeMove(index)) {
            this.renderBoard();
        }
    }

    displayResult(message) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = message;
    }
}

export default Game;