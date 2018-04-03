var game = new Phaser.Game(300, 400, Phaser.CANVAS, 'puzzle', { preload: preload, create: create }); //

var PIECE_WIDTH = 100,
    PIECE_HEIGHT = 100,
    BOARD_COLS,
    BOARD_ROWS;

var piecesGroup,
    piecesAmount,
    shuffledIndexArray = [];

function preload() {
    game.load.spritesheet("background", "./wws.jpg", PIECE_WIDTH, PIECE_HEIGHT);
}

function create() {
    prepareBoard();
}

function prepareBoard() {


    var piecesIndex = 0,
        i, j,
        piece;

    BOARD_COLS = Math.floor(game.world.width / PIECE_WIDTH);
    BOARD_ROWS = Math.floor(game.world.height / PIECE_HEIGHT);

    piecesAmount = BOARD_COLS * BOARD_ROWS;

    shuffledIndexArray = createShuffledIndexArray();

    piecesGroup = game.add.group();

    for (i = 0; i < BOARD_ROWS; i++)
    {
        for (j = 0; j < BOARD_COLS; j++)
        {
            if (shuffledIndexArray[piecesIndex]) {
                piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "background", shuffledIndexArray[piecesIndex]);
            }
            else { //initial position of black piece
                piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT);
                piece.black = true;
            }
            piece.name = 'piece' + i.toString() + 'x' + j.toString();
            piece.currentIndex = piecesIndex;
            piece.destIndex = shuffledIndexArray[piecesIndex];
            piece.inputEnabled = true;
            piece.events.onInputDown.add(selectPiece, this);
            piece.posX = j;
            piece.posY = i;
            piecesIndex++;
        }
    }

    // console.log(shuffledIndexArray);
}

function selectPiece(piece) {

    var blackPiece = canMove(piece);

    //if there is a black piece in neighborhood
    if (blackPiece) {
        movePiece(piece, blackPiece);
    }

}

function canMove(piece) {

    var foundBlackElem = false;

    piecesGroup.children.forEach(function(element) {
        if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
            element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
            element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
            element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
            foundBlackElem = element;
            return;
        }
    });

    return foundBlackElem;
}

function movePiece(piece, blackPiece) {

    var tmpPiece = {
        posX: piece.posX,
        posY: piece.posY,
        currentIndex: piece.currentIndex
    };

    game.add.tween(piece).to({x: blackPiece.posX * PIECE_WIDTH, y: blackPiece.posY * PIECE_HEIGHT}, 300, Phaser.Easing.Linear.None, true);

    //change places of piece and blackPiece
    piece.posX = blackPiece.posX;
    piece.posY = blackPiece.posY;
    piece.currentIndex = blackPiece.currentIndex;
    piece.name ='piece' + piece.posX.toString() + 'x' + piece.posY.toString();

    //piece is the new black
    blackPiece.posX = tmpPiece.posX;
    blackPiece.posY = tmpPiece.posY;
    blackPiece.currentIndex = tmpPiece.currentIndex;
    blackPiece.name ='piece' + blackPiece.posX.toString() + 'x' + blackPiece.posY.toString();

    //after every move check if puzzle is completed
    checkIfFinished();
}

function checkIfFinished() {

    var isFinished = true;

    piecesGroup.children.forEach(function(element) {
        if (element.currentIndex !== element.destIndex) {
            isFinished = false;
            return;
        }
    });

    if (isFinished) {
        showFinishedText();
    }

}

function showFinishedText() {

    // var style = { font: "40px Arial", fill: "#000", align: "center"};
    // var text = game.add.text(game.world.centerX, game.world.centerY, "Congratulations! \nYou made it!", style);
    // text.anchor.set(0.5);
    showfinish();
    setTimeout(myFunction, 900);


}

function showfinish(){
    document.getElementById("hpz").classList.add("show");
    document.getElementById("bb").classList.add("hideme");
}

function myFunction() {
    // alert('Hello');
    window.location.replace("empat.html");
    // console.log("helllo");
}

function createShuffledIndexArray() {

    var randomnumber = Math.floor(Math.random() * Math.floor(5));

    var indexArray = [];

    if(randomnumber == 0 ){
        indexArray = [3,0,2,6,1,5,9,4,8,10,7,11];
    }
    if(randomnumber == 1){
        indexArray = [5,0,4,2,3,8,1,7,11,6,9,10];
    }
    if(randomnumber ==  2){
        indexArray = [5,3,4,6,0,2,7,1,10,9,11,8];
    }
    if(randomnumber == 3){
        indexArray = [0,4,2,1,5,8,10,6,7,3,9,11];
    }
    if(randomnumber == 4){
        indexArray = [0,2,5,1,3,7,9,6,4,10,11,8];
    }

    // for (var i = 0; i < piecesAmount; i++)
    // {
    //     indexArray.push(i);
    // }

    // return shuffle(indexArray);
    return indexArray;

}

function shuffle(array) {

    var counter = array.length,
        temp,
        index;

    while (counter > 0)
    {
        index = Math.floor(Math.random() * counter);

        counter--;

        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
    
}