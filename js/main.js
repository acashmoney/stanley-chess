/*----- constants -----*/

const whitePawnPath = '../assets/white-pawn.svg';
const blackPawnPath = '../assets/black-pawn.svg';

const board = new Array(8);
const boardFiles = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h'
}

for (let i=0; i<8; i++) {
    board[i] = new Array(8);
    for (let j=0; j<8; j++) {
        board[i][j] = [boardFiles[i] + String(j+1), 'empty'];
    }
}

// piece class
// pawn, rook, knight, bishop, queen, king objects
// ^ how each of the pieces move

class Piece {
    constructor(color, square, onStart, isCaptured) {
        this.color = color;
        this.square = square;
        this.onStart = true;
        this.isCaptured = false;
    }
};

class Pawn extends Piece {
    constructor(color, square, onStart, isCaptured) {
        super(color, square, onStart, isCaptured);
    }

    findLegalMoves() {
        let movesArray = [];
        let fileIndex = 0;
        let rankIndex = 0;

        for (let i=0; i<7; i++) {
            for (let j=0; j<7; j++) {
                if (board[i][j][0] === this.square) {
                    fileIndex = i;
                    rankIndex = j;
                }
            }
        }
        
        if (this.color === 'white') {
            if (board[fileIndex][rankIndex + 1][1] === 'empty') {
                if (board[fileIndex][rankIndex + 2][1] === 'empty' && this.onStart === true) {
                    movesArray.push(board[fileIndex][rankIndex + 2][0])
                }
                movesArray.push(board[fileIndex][rankIndex + 1][0])
            }
            if (this.square.includes('a') === true) {
                if (board[fileIndex + 1][rankIndex + 1][1].color === 'black') {
                    movesArray.push(board[fileIndex + 1][rankIndex + 1][0])
                }
            } else if (this.square.includes('h') === true) {
                if (board[fileIndex - 1][rankIndex + 1][1].color === 'black') {
                    movesArray.push(board[fileIndex - 1][rankIndex + 1][0])
                }
            } else {
                if (board[fileIndex + 1][rankIndex + 1][1].color === 'black') {
                    movesArray.push(board[fileIndex + 1][rankIndex + 1][0])
                }
                if (board[fileIndex - 1][rankIndex + 1][1].color === 'black') {
                    movesArray.push(board[fileIndex - 1][rankIndex + 1][0])
                }
            }
        } else {
            if (board[fileIndex][rankIndex - 1][1] === 'empty') {
                if (board[fileIndex][rankIndex - 2][1] === 'empty' && this.onStart === true) {
                    movesArray.push(board[fileIndex][rankIndex - 2][0])
                }
                movesArray.push(board[fileIndex][rankIndex - 1][0])
            }
        }   
        if (this.square.includes('a') === true) {
            if (board[fileIndex + 1][rankIndex - 1][1].color === 'white') {
                movesArray.push(board[fileIndex + 1][rankIndex - 1][0])
            }
        } else if (this.square.includes('h') === true) {
            if (board[fileIndex - 1][rankIndex - 1][1].color === 'white') {
                movesArray.push(board[fileIndex - 1][rankIndex - 1][0])
            }
        } else {
            if (board[fileIndex + 1][rankIndex - 1][1].color === 'white') {
                movesArray.push(board[fileIndex + 1][rankIndex - 1][0])
            }
            if (board[fileIndex - 1][rankIndex - 1][1].color === 'white') {
                movesArray.push(board[fileIndex - 1][rankIndex - 1][0])
            }
        }
        return movesArray;
    }

    move(destinationSquare) {
        let fileIndex = 0;
        let rankIndex = 0;

        for (let i=0; i<7; i++) {
            for (let j=0; j<7; j++) {
                if (board[i][j][0] === this.square) {
                    fileIndex = i;
                    rankIndex = j;
                }
            }
        }
        let legalMoves = findLegalMoves();
        if (legalMoves.includes(destinationSquare)) {
            this.square = destinationSquare;


            this.onStart = false;

            // need to move piece object to new square and update value of previous square to 'empty'
        } else {
            console.log('not a legal move');
        }
    }
};

// starting position


/*----- app's state (variables) -----*/

// initialize starting position to true, then switch to false after starting position has been built
let startingPosition = true;

// chess position
// human move
// Stanley's move
// ^ could be consolidated into one variable

// win, loss, draw 

/*----- cached element references -----*/

// chess board
const boardEl = document.getElementById('board');

/*----- event listeners -----*/

const newGameBtn = document.getElementById('new-game-btn').addEventListener('click', () => {
    resetBoard();
});

// boardEl.addEventListener('click', )

document.querySelectorAll('.square').forEach(squareEl => {
    squareEl.addEventListener('click', event => {
        // highlight square that is clicked
        squareEl.style = 'background-color: rgb(31, 170, 113);'
        console.log('highlighting square');
    })
})

// const a1El = document.getElementById('a1')
// a1El.addEventListener('click', event => {
//     a1El.style = 'background-color: rgb(31, 170, 113);'
//     console.log('highlighted a1')
// })

/*----- functions -----*/

function init() {
    renderBoard(board);
    buildStartingPosition();
}

function renderBoard(boardObj) {
    for (let i=0; i<boardObj.length; i++) {
        for (let j=0; j<boardObj.length; j++) {
            let square = document.createElement('div');
            square.setAttribute('id', boardObj[i][j][0])
            square.setAttribute('class', 'square')
            if ((i+j) % 2 === 0) {
                square.style.backgroundColor = '#8A3F09'
            } else {
                square.style.backgroundColor = '#E7AA71'
            }
            boardEl.appendChild(square);
        }
    }
}

function buildStartingPosition() {
    for (i=0; i<8; i++) {
        let targetSquare = boardFiles[i] + '2';
        const whitePawn = new Pawn('white', targetSquare, true, false);
        const squareEl = document.getElementById(targetSquare);
        const pawnEl = document.createElement('div');
        pawnEl.setAttribute('class', 'whitePawn');
        squareEl.appendChild(pawnEl);
        const pawnGraphic = document.createElement('img');
        pawnGraphic.setAttribute('src', whitePawnPath);
        pawnEl.appendChild(pawnGraphic);
        board[i][1][1] = whitePawn;
    }
    for (i=0; i<8; i++) {
        let targetSquare = boardFiles[i] + '7';
        const blackPawn = new Pawn('black', targetSquare, true, false);
        const squareEl = document.getElementById(targetSquare);
        const pawnEl = document.createElement('div');
        pawnEl.setAttribute('class', 'blackPawn');
        squareEl.appendChild(pawnEl);
        const pawnGraphic = document.createElement('img')
        pawnGraphic.setAttribute('src', blackPawnPath);
        pawnEl.appendChild(pawnGraphic);
        board[i][6][1] = blackPawn;
    }
}

function resetBoard() {
    while (boardEl.firstChild) {
        boardEl.removeChild(boardEl.firstChild);
    }
    renderBoard(board);
    buildStartingPosition();
    console.log('board reset. new game set up')
}

// render the gameState to update the board and pieces

// calculate legal moves for each type of piece

// determine checkmate (or win state)

init();