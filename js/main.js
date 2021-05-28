/*----- constants -----*/

// piece class
// pawn, rook, knight, bishop, queen, king objects
// ^ how each of the pieces move

class Piece {
    constructor(color, square) {
        this.color = color;
        this.square = square;
    }
};

class Pawn extends Piece {
    constructor(color, square) {
        super(color, square);
    }

    findLegalMoves() {

    }

    move() {

    }
};
class Rook extends Piece{
    constructor(color, square) {
        super(color, square);
    }    

    findLegalMoves() {

    }

    move() {
        
    }
};

class Knight extends Piece {
    constructor(color, square) {
        super(color, square);
    }

    findLegalMoves() {

    }

    move() {
        
    }
};
class Bishop extends Piece{
    constructor(color, square) {
        super(color, square);
    }

    findLegalMoves() {

    }

    move() {
        
    }
};
class Queen extends Piece{
    constructor(color, square) {
        super(color, square);
    }

    findLegalMoves() {

    }

    move() {
        
    }
};
class King extends Piece{
    constructor(color, square) {
        super(color, square);
    }

    findLegalMoves() {

    }

    move() {
        
    }
};

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

}

// render the gameState to update the board and pieces

// calculate legal moves for each type of piece

// deterrmine checkmate

// init();