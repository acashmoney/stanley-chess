/*----- constants -----*/

// board array to logically represent the squares
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

// create 2D array with square notation for each element
for (let i=0; i<8; i++) {
    board[i] = new Array(8);
    for (let j=0; j<8; j++) {
        board[i][j] = boardFiles[i] + String(j+1);
    }
}

// piece class
// pawn, rook, knight, bishop, queen, king objects
// ^ how each of the pieces move

class Piece {
    constructor(color, square, isCaptured) {
        this.color = color;
        this.square = square;
        this.isCaptured = false;
    }
};

class Pawn extends Piece {
    constructor(color, square, isCaptured) {
        super(color, square);
    }

    findLegalMoves() {

    }

    move() {

    }
};

// class Rook extends Piece{
//     constructor(color, square) {
//         super(color, square);
//     }    

//     findLegalMoves() {

//     }

//     move() {
        
//     }
// };

// class Knight extends Piece {
//     constructor(color, square) {
//         super(color, square);
//     }

//     findLegalMoves() {

//     }

//     move() {
        
//     }
// };
// class Bishop extends Piece{
//     constructor(color, square) {
//         super(color, square);
//     }

//     findLegalMoves() {

//     }

//     move() {
        
//     }
// };
// class Queen extends Piece{
//     constructor(color, square) {
//         super(color, square);
//     }

//     findLegalMoves() {

//     }

//     move() {
        
//     }
// };
// class King extends Piece{
//     constructor(color, square) {
//         super(color, square);
//     }

//     findLegalMoves() {

//     }

//     move() {
        
//     }
// };

// starting position


/*----- app's state (variables) -----*/

// chess position
// human move
// Stanley's move
// ^ could be consolidated into one variable

// win, loss, draw 

/*----- cached element references -----*/

// chess board
const boardEl = document.getElementById('board');

/*----- event listeners -----*/



/*----- functions -----*/

function init() {
    renderBoard(board)
}

function renderBoard(boardObj) {
    for (let i=0; i<boardObj.length; i++) {
        for (let j=0; j<boardObj.length; j++) {
            let square = document.createElement('div');
            square.setAttribute('id', boardObj[i][j])
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
    // build white pawns
    

    // build black pawns
}

// render the gameState to update the board and pieces

// calculate legal moves for each type of piece

// determine checkmate (or win state)

init();