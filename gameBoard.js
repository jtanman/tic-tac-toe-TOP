class GameBoard {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
    }

    getBoard() {
        return this.board;
    }

    makeMove(index, player) {
        if (this.board[index] === '') {
            this.board[index] = player;
            return true;
        }
        return false;
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }
        return null;
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    resetBoard() {
        this.board = ['', '', '', '', '', '', '', '', ''];
    }
}

export default GameBoard;