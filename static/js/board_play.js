let rows = 5; // number of rows in board
let cols = 5; // number of columns in board
let totalCells = 25;
let boardIsSquare = true;

const clearBoardBtn = document.getElementById("clearBoardBtn");
const newBoardBtn = document.getElementById("newBoardBtn");

const board = document.getElementById("bingoBoard");
let squaresBank = [] // bank of all possible cell values to assign

const rowCounts = new Int32Array(rows); // counter for number of cells selected in each row
const colCounts = new Int32Array(cols); // counter for number of cells selected in each column
let diagCount = 0;                      // counter for number of cells selected in left diagonal
let antiDiagCount = 0;                // counter for number of cells selected in right (anti-)diagonal

const cells = []; // cache of cell DOm objects

/**
 * cetches and parses wordbank from URL parameters on page load if they exist, displays
 * an error message otherwise
 */
function init() {
    totalCells = rows * cols;
    boardIsSquare = rows === cols;
    const urlParams = new URLSearchParams(window.location.search);
    const squaresParams = urlParams.get('squares');

    if (!squaresParams) {
        board.innerHTML = "<p>No wordbank found in the URL. Go create one!</p>";
        return;
    }

    squaresBank.length = 0;
    squaresBank = decodeURIComponent(squaresParams).split(',');

    newBoard(board, [...squaresBank]);
}


/**
 * creates and renders a new bingo board from the full bank of all possible squares
 * 
 * @param {*} board div element where the new board is rendered
 * @param {*} squares bank of all possible squares to select board cells from
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

        cell.setAttribute("aria-pressed", "false");
        cell.dataset.index = i;
        cell.dataset.selected = "false";

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

// when cell is clicked, change to "selected" state, update win trackers, and re-render
board.addEventListener("click", (event) => {
    // find btn closest to click on grid
    const cell = event.target.closest(".cell");
    if (!cell) return;

    // fetch current cell state
    const index = parseInt(cell.dataset.index, 10);
    const wasSelected = cell.dataset.selected === "true";
    const isNowSelected = !wasSelected;

    // re-render cell to flip states (selected <-> unselected)
    cell.dataset.selected = isNowSelected ? "true" : "false";
    cell.setAttribute("aria-pressed", isNowSelected ? "true" : "false");

    // update count of selected cells in row/col/diagonal counters
    const r = Math.floor(index / cols);
    const c = index % cols;
    const change = isNowSelected ? 1 : -1;

    rowCounts[r] += change;
    colCounts[c] += change;

    let hasWon = (rowCounts[r] === cols || colCounts[c] === rows);

   // update diagonal counters if board is square
    if (boardIsSquare) {
        // main diagonal: (0,0), (1,1), (2,2)...
        if (r === c) {
            diagCount += change;
        }
        // anti-diagonal: (0,4), (1,3), (2,2)...
        if (r + c === rows - 1) {
            antiDiagCount += change;
        }

        if (diagCount === rows || antiDiagCount === rows) {
            hasWon = true;
        }
    }

    // win condition(s) fulfilled?
    if (hasWon) {
        setTimeout(() => {
            alert("BINGOOOOO!!!");
        }, 50);
    }
});

// generate new board when "Generate New Board" clicked
newBoardBtn.addEventListener("click", () => {
    newBoard(board, [...squaresBank]);
});

// reset aria-pressed values of all buttons to false when "Clear Board" clicked
clearBoardBtn.addEventListener("click", () => {
    const bingoCells = document.querySelectorAll(".cell");

    bingoCells.forEach(cell => {
    cell.setAttribute("aria-pressed", "false");
    });
});

// init board on page load
init(squaresBank);