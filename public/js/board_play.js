const length = 5;
const width = 5;
const totalCells = length * width;

const clearBoardBtn = document.getElementById("clearBoardBtn");
const newBoardBtn = document.getElementById("newBoardBtn");

const board = document.getElementById("bingoBoard");
let squares = []
const wonLines = Set(); // track row/col/diag wins

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
    let freeSpaceIdx = Math.floor(totalCells / 2);

    shuffle(squares);

    board.innerHTML = "";

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("button");
        const cellText = document.createElement("div");
        cell.classList.add("cell");
        cellText.classList.add("cellText")

        if (i == freeSpaceIdx) {
            // TODO: include optional free space customization in URL, otherwise default to free space
            cellText.innerText = "FREE SPACE";
            cellText.style.fontWeight = "bold";
        } else {
            cellText.innerText = squares.pop() || "";
        }

        // mark as selected/dabbed when clicked
        cell.setAttribute("aria-pressed", "false");
        cell.addEventListener("click", () => {
            const isPressed = cell.getAttribute("aria-pressed") === "true";
            cell.setAttribute("aria-pressed", !isPressed);
        });

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
  const bingoCells = document.querySelectorAll(".cell");

  bingoCells.forEach(cell => {
    cell.setAttribute("aria-pressed", "false");
  });
});

// init board on page load
init(squares);
console.log(squares)