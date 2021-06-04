/*----- constants -----*/
// Images of pieces used in the game
const whitePawnPath = '../assets/white-pawn.svg';
const blackPawnPath = '../assets/black-pawn.svg';

// Create board object which is a multidimensional array
// with no pieces
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

const boardFileNotationToIndexMap = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7
}

const boardRanks = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 7,
    7: 8
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
        let fileIndex = null;
        let rankIndex = null;

        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                if (board[i][j][0] === this.square) {
                    fileIndex = i;
                    rankIndex = j;
                    break;
                }
            }
            if (rankIndex && fileIndex) {
                break;
            }
        }

        // Determine legal white pawn moves
        if (this.color === 'white' && playerTurn === 'white') {
            // Check if square in front of pawn is empty
            if (board[fileIndex][rankIndex + 1][1] === 'empty') {
                movesArray.push(board[fileIndex][rankIndex + 1][0]);
                // Check if square two spaces up is empty
                if (board[fileIndex][rankIndex + 2] && board[fileIndex][rankIndex + 2][1] === 'empty' && this.onStart === true) {
                    movesArray.push(board[fileIndex][rankIndex + 2][0]);
                }
            }
            // White pawn capture rule while on a-file
            if (this.square.includes('a') === true) {
                if (board[fileIndex + 1][rankIndex + 1][1].color === 'black') {
                    movesArray.push(board[fileIndex + 1][rankIndex + 1][0])
                }
            } 
            // White pawn capture rule while on h-file
            else if (this.square.includes('h') === true) {
                if (board[fileIndex - 1][rankIndex + 1][1].color === 'black') {
                    movesArray.push(board[fileIndex - 1][rankIndex + 1][0])
                }
            } 
            // White pawn capture rules for rest of the board
            else {
                if (board[fileIndex + 1][rankIndex + 1][1].color === 'black') {
                    movesArray.push(board[fileIndex + 1][rankIndex + 1][0])
                }
                if (board[fileIndex - 1][rankIndex + 1][1].color === 'black') {
                    movesArray.push(board[fileIndex - 1][rankIndex + 1][0])
                }
            }
        } 
        // Determine legal black pawn moves
        else if (this.color === 'black' && playerTurn === 'black') {
            // Check if square in front of pawn is empty
            if (board[fileIndex][rankIndex - 1][1] === 'empty') {
                movesArray.push(board[fileIndex][rankIndex - 1][0])
                // Check if square two spaces up is empty
                if (board[fileIndex][rankIndex - 2] && board[fileIndex][rankIndex - 2][1] === 'empty' && this.onStart === true) {
                    movesArray.push(board[fileIndex][rankIndex - 2][0])
                }
            }
            // Black pawn capture rule while on a-file   
            if (this.square.includes('a') === true) {
                if (board[fileIndex + 1][rankIndex - 1][1].color === 'white') {
                    movesArray.push(board[fileIndex + 1][rankIndex - 1][0])
                }
            } 
            // Black pawn capture rule while on h-file
            else if (this.square.includes('h') === true) {
                if (board[fileIndex - 1][rankIndex - 1][1].color === 'white') {
                    movesArray.push(board[fileIndex - 1][rankIndex - 1][0])
                }
            } 
            // Black pawn capture rules for rest of the board
            else {
                if (board[fileIndex + 1][rankIndex - 1][1].color === 'white') {
                    movesArray.push(board[fileIndex + 1][rankIndex - 1][0])
                }
                if (board[fileIndex - 1][rankIndex - 1][1].color === 'white') {
                    movesArray.push(board[fileIndex - 1][rankIndex - 1][0])
                }
            }
        }
        // Output an array of legal moves for a pawn
        return movesArray;
    }

    move(destinationSquare) {
        // Initialize board indices for 
        // current square and intended square
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

        // Store array of legal moves
        let legalMoves = this.findLegalMoves();

        // Check if destination square is in array of legal moves
        if (legalMoves.includes(destinationSquare)) {
            this.square = destinationSquare;
            board[fileTwoIndex][rankTwoIndex][1] = this;
            board[fileOneIndex][rankOneIndex][1] = 'empty';
            this.onStart = false;
            updateBoard(board);
        } else {
            console.log('not a legal move');
        }

        // Switch player turn after a move is made
        if (playerTurn === 'white') {
            playerTurn = 'black';
        } else {
            playerTurn = 'white';
        }

        checkWin(board);
    }
};
 
/*----- app's state (variables) -----*/

let playerTurn = 'white';

let whiteWin = 0;
let blackWin = 0;

let squareOne = null;
let squareTwo = null;

/*----- cached element references -----*/

const boardEl = document.getElementById('board');
const childEls = boardEl.childNodes;

/*----- event listeners -----*/

const newGameBtn = document.getElementById('new-game-btn').addEventListener('click', () => {
    resetBoard();
});

// event listener for pieces

// document.getElementById('board').addEventListener('click', function(e) {
//     childEls.forEach(function(child) {
//         if(child.hasChildNodes) {
//             squareOne = child.id;
//             console.log(squareOne);
//         }
//     })
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
            square.addEventListener('click', () => {
                if (!squareOne) {
                    if (square.hasChildNodes()) {
                        console.log('clicked squareOne: ' + square.id);
                        squareOne = square.id;
                    }
                }
                else {
                    const pieceToMove = getPiece(squareOne);
                    pieceToMove.move(square.id);

                    // reset squares to null
                    squareOne = null;
                    squareTwo = null;
                }
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
}

function getPiece(squareId) {
    const [fileIndex, rankIndex] = getSquareIndices(squareId);
    return board[fileIndex][rankIndex][1];
}

function getSquareIndices(square) {
    const fileIndex = boardFileNotationToIndexMap[square[0]];
    const rankIndex = Number(square[1]) - 1;
    return [fileIndex, rankIndex];
}

function checkWin(boardObj) {
    for (let i=0; i<8; i++) {
        if (boardObj[i][0][1] !== 'empty') {
            playerTurn = 'game over';
            blackWin++;
            console.log('black wins!');
        }
        if (boardObj[i][7][1] !== 'empty') {
            playerTurn = 'game over';
            whiteWin++;
            console.log('white wins!');
        }
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