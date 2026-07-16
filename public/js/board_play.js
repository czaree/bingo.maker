const LENGTH = 5;
const WIDTH = 5;

const clearBoardBtn = document.getElementById("clearBoardBtn");
const newBoardBtn = document.getElementById("newBoardBtn");

const board = document.getElementById("bingoBoard");
let squares = []

/**
 * cetches and parses wordbank from URL parameters on page load if they exist, displays
 * an error message otherwise
 */
function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const squaresParams = urlParams.get('squares');

    if (!squaresParams) {
        board.innerHTML = "<p>No wordbank found in the URL. Go create one!</p>";
        return;
    }

    squares.length = 0;
    squares = decodeURIComponent(squaresParams).split(',');

    newBoard(board, [...squares]);
}


/**
 * creates and renders a new bingo board from the full wordbank
 * 
 * @param {*} board div element where the new board is rendered
 * @param {*} squares wordbank of all possible squares to generate board from
 */
function newBoard(board, squares) {
    // construct + render board
    let totalCells = LENGTH * WIDTH;
    let freeSpaceIdx = Math.floor(totalCells / 2);

    shuffle(squares);

    board.innerHTML = "";

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        const cellText = document.createElement("div");
        cell.classList.add("cell");
        cellText.classList.add("cellText")

        if (i == freeSpaceIdx) {
            // TODO: include optional free soace customization in URL, otehrwise default to free space
            cellText.innerText = "FREE SPACE";
            cellText.style.fontWeight = "bold";
        } else {
            cellText.innerText = squares.pop() || "";
        }

        cell.appendChild(cellText);
        board.appendChild(cell);
    }
}

/**
 * sorts the elements of the given array into a random order
 * 
 * @param {*} arr array to be randomly shuffled
 */
function shuffle(arr) {
    let currIdx = arr.length;

    while (currIdx != 0) {
        let randIdx = Math.floor(Math.random() * currIdx);
        currIdx--;
        [arr[currIdx], arr[randIdx]] = [ arr[randIdx], arr[currIdx]]; 
    }

    return arr;
}

function checkWin(board) {

}

newBoardBtn.addEventListener("click", () => {
  newBoard(board, [...squares]);
});

clearBoardBtn.addEventListener("click", () => {
  alert("clear the board!")
});

// init board on page load
init(squares);
console.log(squares)