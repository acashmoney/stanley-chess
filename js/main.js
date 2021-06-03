/*----- constants -----*/
// Images of pieces used in the game
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

class Piece {
    constructor(color, square, onStart) {
        this.color = color;
        this.square = square;
        this.onStart = true;
    }
};

class Pawn extends Piece {
    constructor(color, square, onStart) {
        super(color, square, onStart);
    }

    // Calculate legal moves for piece and 
    // output available squares to an array
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

        if (this.color === 'white' && playerTurn === 'white') {
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
        } else if (this.color === 'black' && playerTurn === 'black') {
            if (board[fileIndex][rankIndex - 1][1] === 'empty') {
                if (board[fileIndex][rankIndex - 2][1] === 'empty' && this.onStart === true) {
                    movesArray.push(board[fileIndex][rankIndex - 2][0])
                }
                movesArray.push(board[fileIndex][rankIndex - 1][0])
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
        }
        return movesArray;
    }

    move(destinationSquare) {
        let fileOneIndex = 0;
        let rankOneIndex = 0;
        let fileTwoIndex = 0;
        let rankTwoIndex = 0;

        for (let i=0; i<7; i++) {
            for (let j=0; j<7; j++) {
                if (board[i][j][0] === this.square) {
                    fileOneIndex = i;
                    rankOneIndex = j;
                }
                if (board[i][j][0] === destinationSquare) {
                    fileTwoIndex = i;
                    rankTwoIndex = j;
                }
            }
        }
        let legalMoves = this.findLegalMoves();
        if (legalMoves.includes(destinationSquare)) {
            this.square = destinationSquare;
            board[fileTwoIndex][rankTwoIndex][1] = this;
            board[fileOneIndex][rankOneIndex][1] = 'empty';
            this.onStart = false;
            updateBoard(board);
        } else {
            console.log('not a legal move');
        }
    }
};
 
/*----- app's state (variables) -----*/

let playerTurn = 'white';

let winCount = 0;
let drawCount = 0;
let lossCount = 0;

let squareOne = '';
let squareTwo = '';

/*----- cached element references -----*/

const boardEl = document.getElementById('board');
const childEls = boardEl.childNodes;

/*----- event listeners -----*/

const newGameBtn = document.getElementById('new-game-btn').addEventListener('click', () => {
    resetBoard();
});

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
            square.addEventListener('click', () => {
                console.log('clicked square: ' + square.id)
            })
            if ((i+j) % 2 === 0) {
                square.style.backgroundColor = '#8A3F09'
            } else {
                square.style.backgroundColor = '#E7AA71'
            }
            boardEl.appendChild(square);
        }
    }
}

// Build starting position with white and black pawns
// on the second second and seventh ranks
function buildStartingPosition() {
    playerTurn = 'white';
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            board[i][j][1] = 'empty';
        }
    }
    for (let i=0; i<8; i++) {
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
    for (let i=0; i<8; i++) {
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

// 
function updateBoard(boardObj) {
    // Remove all child nodes from board element
    while (boardEl.firstChild) {
        boardEl.removeChild(boardEl.firstChild)
    }


    renderBoard(boardObj);
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            if (board[i][j][1] !== 'empty') {
                const squareEl = document.getElementById(board[i][j][0]);
                const pawnEl = document.createElement('div');
                squareEl.appendChild(pawnEl);
                if (board[i][j][1].color === 'white') {
                    pawnEl.setAttribute('class', 'whitePawn');
                    const pawnGraphic = document.createElement('img');
                    pawnGraphic.setAttribute('src', whitePawnPath);
                    pawnEl.appendChild(pawnGraphic);
                } else {
                    pawnEl.setAttribute('class', 'blackPawn');
                    const pawnGraphic = document.createElement('img');
                    pawnGraphic.setAttribute('src', blackPawnPath);
                    pawnEl.appendChild(pawnGraphic);
                }
            }
        }
    }
    if (playerTurn === 'white') {
        playerTurn = 'black';
    } else {
        playerTurn = 'white';
    }
}

function resetBoard() {
    while (boardEl.firstChild) {
        boardEl.removeChild(boardEl.firstChild);
    }
    renderBoard(board);
    buildStartingPosition();
}

init();