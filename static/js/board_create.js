function generateLink() {
    const titleInput = document.getElementById("boardTitleInput").value;
    const squaresInput = document.getElementById("bingoListInput").value;
    const freeSpaceInput = document.getElementById("freeSpaceInput").value;

    // separate squares by commans/new lines
    const squares = squaresInput.split(/[\n,]+/).map(
        s => s.trim()
    ).filter(s => s.length > 0);

    if (squares.length < 2) {
        alert("Enter at least 2 bingo squares!");
        return;
    }

    // compress + construct URL
    const rawSquares = squares.join(",");
    const compressedSquares = LZString.compressToEncodedURIComponent(rawSquares);

    const basePath = window.location.pathname.split('/')[1];
    const baseUrl = window.location.origin + "/" + basePath + '/play/';
    let boardUrl = `${baseUrl}?squares=${compressedSquares}`;

    if (titleInput.length != 0) {
        const compressedTitle = LZString.compressToEncodedURIComponent(titleInput);
        boardUrl += `&title=${compressedTitle}`;
    }
    if (freeSpaceInput.length != 0) {
        const compressedFs = LZString.compressToEncodedURIComponent(freeSpaceInput);
        boardUrl += `&free=${compressedFs}`;
    }

    // show 'success' window + new play link
    document.getElementById('shareLink').value = boardUrl;
    document.getElementById('playLink').href = boardUrl;
    document.getElementById('result').style.display = 'block';

    //console.log(boardUrl)

    // wait for result to render in DOM, then scroll to it
    const resultBox = document.getElementById("result");
    requestAnimationFrame(() => {
        resultBox.scrollIntoView({ behavior: 'smooth' });
    });
}