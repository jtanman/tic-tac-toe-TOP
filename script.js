const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;

    const makeMove = (index, player) => {
        if (board[index] === '') {
            board[index] = player;
            return true;
        }
        return false;
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const checkDraw = () => {
        return board.every(cell => cell !== '');
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    return {
        getBoard,
        makeMove,
        checkWin,
        checkDraw,
        resetBoard
    };
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol
    };
};

const Game = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let gameActive = false;
    let player1Score = 0;
    let player2Score = 0;

    const getCurrentPlayer = () => currentPlayer;
    const isGameActive = () => gameActive;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const makeMove = (index) => {
        if (GameBoard.makeMove(index, currentPlayer.getSymbol())) {
            if (GameBoard.checkWin()) {
                gameActive = false;
                displayResult(currentPlayer.getName() + ' wins!');
                updateScore(currentPlayer);
            } else if (GameBoard.checkDraw()) {
                gameActive = false;
                displayResult('It\'s a draw!');
            } else {
                switchPlayer();
            }
            renderBoard(); // Call renderBoard after making a move
            return true;
        }
        return false;
    };

    const startGame = (name1, name2) => {
        player1 = Player(name1, 'X');
        player2 = Player(name2, 'O');
        currentPlayer = player1;
        gameActive = true;
        GameBoard.resetBoard();
        renderBoard();
        displayResult('');
        updateScoreDisplay();
    };

    const restartGame = () => {
        GameBoard.resetBoard();
        gameActive = true;
        currentPlayer = player1;
        renderBoard(); // Call renderBoard after restarting the game
        displayResult('');
    };

    const updateScore = (player) => {
        if (player === player1) {
            player1Score++;
        } else {
            player2Score++;
        }
        updateScoreDisplay();
    };

    const updateScoreDisplay = () => {
        document.getElementById('player1Score').textContent = `${player1.getName()}: ${player1Score}`;
        document.getElementById('player2Score').textContent = `${player2.getName()}: ${player2Score}`;
    };

    return {
        getCurrentPlayer,
        isGameActive,
        makeMove,
        startGame,
        restartGame
    };
})();

window.GameBoard = GameBoard;
window.Player = Player;
window.Game = Game;

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
    if (Game.isGameActive() && Game.makeMove(index)) {
        renderBoard();
    }
};

const displayResult = (message) => {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
};

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    const restartButton = document.getElementById('restart');

    startButton.addEventListener('click', () => {
        const player1Name = document.getElementById('player1Name').value || 'Player 1';
        const player2Name = document.getElementById('player2Name').value || 'Player 2';
        Game.startGame(player1Name, player2Name);
    });

    restartButton.addEventListener('click', () => {
        Game.restartGame();
    });

    renderBoard();
});