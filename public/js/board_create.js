function generateLink() {
    const input = document.getElementById("bingoListInput").value;

    // separate squares by commans/new lines
    const squares = input.split(/[\n,]+/).map(
        s => s.trim()
    ).filter(s => s.length > 0);

    if (squares.length < 2) {
        alert("Enter at least 2 bingo squares!");
        return;
    }

    console.log("BITCH");

    // construct URL
    const encodedSquares = encodeURIComponent(squares.join(","));

    const basePath = window.location.pathname.split('/')[1];
    const baseUrl = window.location.origin + "/" + basePath + '/play/';
    const boardUrl = `${baseUrl}?squares=${encodedSquares}`

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