function generateLink() {
    const input = document.getElementById("bingoListInput").value;
    const squares = input.split(/[\n,]+/).map(
        s => s.trim()
    ).filter(s => s.length > 0);

    if (squares.length < 2) {
        alert("Enter at least 2 bingo squares!");
        return;
    }

    const encodedSquares = encodeURIComponent(squares.join(","));

    const baseUrl = window.location.origin + '/play/';
    const boardUrl = `${baseUrl}?squares=${encodedSquares}`

    document.getElementById('shareLink').value = boardUrl;
    document.getElementById('playLink').href = boardUrl;
    document.getElementById('result').style.display = 'block';

    console.log(boardUrl)
}