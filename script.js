const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();

//function to initialise a game:
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");

    //empty UI also:
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";

        //remove green color also, if won-
        box.classList.remove("win");
    }) 

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


newGameBtn.addEventListener("click", initGame);


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();

        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


function swapTurn(){
    if(currentPlayer ==="X") currentPlayer = "O";
    else currentPlayer = "X";

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


//main function:-
function checkGameOver(){
    let winner = "";

    winningPositions.forEach((index) => {

        //all boxes must be empty and of same value for WIN
    if( (gameGrid[index[0]] !== "" || gameGrid[index[1]] !== "" || gameGrid[index[2]] !== "") 
    && (gameGrid[index[0]] === gameGrid[index[1]]) && (gameGrid[index[1]] === gameGrid[index[2]])
    ){

        if(gameGrid[index[0]] === "X") winner = "X";
        else winner = "O";

        //winner found, so stop game here-
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

        boxes[index[0]].classList.add("win");
        boxes[index[1]].classList.add("win");
        boxes[index[2]].classList.add("win");
    }
    })

    if(winner != ""){
        gameInfo.innerText = `Winner - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    let count = 0;
    gameGrid.forEach((box) => {
        if(box === "")
            count++;
    });

    if(count === 0){
        gameInfo.innerText = "Oops! Game Tied"
        newGameBtn.classList.add("active");
    }
}