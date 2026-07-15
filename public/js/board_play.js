const LENGTH = 5;
const WIDTH = 5;

document.addEventListener("DOMContentLoaded", ()  => {
    const board = document.getElementById("bingoBoard");

    const urlParams = new URLSearchParams(window.location.search);
    const squaresParams = urlParams.get('squares');

    if (!squaresParams) {
        board.innerHTML = "<p>No wordbank found in the URL. Go create one!</p>";
        return;
    }

    let squares = decodeURIComponent(squaresParams).split(',');

    // construct + render board
    let totalCells = LENGTH * WIDTH;
    let freeSpaceIdx = Math.floor(totalCells / 2);

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        const cellText = document.createElement("div");
        cell.classList.add("cell");

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
});