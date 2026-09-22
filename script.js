let currentPlayer = "X";
let gameOver = false;
let xScore = 0;
let oScore = 0;
let drawScore = 0;
let pointsNeeded = 3;

const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector(".game-status p");
const playerOInput = document.querySelector(".player-o input");
const computerName = document.querySelector(".computer-name");
const playerXInput = document.querySelector(".player-x input");
const playerXNameDisplay = document.querySelector(".player-x-name");
const playerONameDisplay = document.querySelector(".player-o-name");

let playerXName = "Player X";
let playerOName = "Player O";

playerXInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {

        if (playerXInput.value.trim() === "") {
            playerXName = "Player X";
        } else {
            playerXName = playerXInput.value;
        }

        playerXInput.style.display = "none";

        playerXNameDisplay.textContent = playerXName;
        playerXNameDisplay.style.display = "block";

        gameStatus.textContent = playerXName + "'s Turn";

        updateScoreDisplay();
    }
});

playerXNameDisplay.addEventListener("click", function () {
    playerXNameDisplay.style.display = "none";
    playerXInput.style.display = "block";

    playerXInput.value = playerXName;
    playerXInput.focus();
});

playerOInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {

        if (playerOInput.value.trim() === "") {
            playerOName = "Player O";
        } else {
            playerOName = playerOInput.value;
        }

        playerOInput.style.display = "none";

        playerONameDisplay.textContent = playerOName;
        playerONameDisplay.style.display = "block";

        updateScoreDisplay();
    }
});

playerONameDisplay.addEventListener("click", function () {
    playerONameDisplay.style.display = "none";
    playerOInput.style.display = "block";

    playerOInput.value = playerOName;
    playerOInput.focus();
});

const roundButtons = document.querySelectorAll(".round-buttons button");
const twoPlayerButton = document.querySelector(".two-player-button");
const onePlayerButton = document.querySelector(".one-player-button");

let gameMode = "2player";

const resultOverlay = document.querySelector(".result-overlay");
const resultTitle = document.querySelector(".result-title");
const resultMessage = document.querySelector(".result-message");
const playAgainButton = document.querySelector(".play-again-button");
const resetGameButton = document.querySelector(".reset-game-button");

const xScoreDisplay = document.querySelector(".score:nth-child(1) p");
const drawScoreDisplay = document.querySelector(".score:nth-child(2) p");
const oScoreDisplay = document.querySelector(".score:nth-child(3) p");
const xScoreNameDisplay = document.querySelector(".score-x-name");
const oScoreNameDisplay = document.querySelector(".score-o-name");

console.log(cells);


const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            return {
                winner: cells[a].textContent,
                combination: combination
            };
        }
    }

    return null;
}


function checkDraw() {
    return [...cells].every(function (cell) {
        return cell.textContent !== "";
    });
}


function updateScoreDisplay() {
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
    drawScoreDisplay.textContent = drawScore;

    xScoreNameDisplay.textContent = playerXName;
    oScoreNameDisplay.textContent = playerOName;
}


function checkMatchOver() {
    return xScore >= pointsNeeded || oScore >= pointsNeeded;
}


function resetGame() {

    cells.forEach(function (cell) {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });

    xScore = 0;
    oScore = 0;
    drawScore = 0;

    pointsNeeded = 3;

    roundButtons.forEach(function (roundButton) {
        roundButton.classList.remove("selected");
    });

    currentPlayer = "X";
    gameOver = false;

    updateScoreDisplay();

    resultOverlay.style.display = "none";

    gameStatus.textContent = playerXName + "'s Turn";
}


function resetRound() {

    cells.forEach(function (cell) {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });

    currentPlayer = "X";
    gameOver = false;

    resultOverlay.style.display = "none";

    gameStatus.textContent = playerXName + "'s Turn";
}


/* POINT BUTTONS */

roundButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        roundButtons.forEach(function (roundButton) {
            roundButton.classList.remove("selected");
        });

        button.classList.add("selected");

        if (button.textContent === "3 Points") {
            pointsNeeded = 3;
        } else {
            pointsNeeded = 5;
        }

        xScore = 0;
        oScore = 0;
        drawScore = 0;

        updateScoreDisplay();

        resetRound();
    });
});


/* GAME MODE BUTTONS */

twoPlayerButton.addEventListener("click", function () {

    gameMode = "2player";

    twoPlayerButton.classList.add("selected");
    onePlayerButton.classList.remove("selected");

    playerOInput.style.display = "block";
    playerONameDisplay.style.display = "none";
    computerName.style.display = "none";
    playerOName = "Player O";
    resetGame();
});


onePlayerButton.addEventListener("click", function () {

    gameMode = "1player";

    onePlayerButton.classList.add("selected");
    twoPlayerButton.classList.remove("selected");

    playerOInput.style.display = "none";
    playerONameDisplay.style.display = "none";
    computerName.style.display = "block";
    playerOName = "Computer";

    resetGame();
});


/* FIND A WINNING MOVE FOR O */

function findWinningMove() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            cells[a].textContent === "O" &&
            cells[b].textContent === "O" &&
            cells[c].textContent === ""
        ) {
            return c;
        }

        if (
            cells[a].textContent === "O" &&
            cells[b].textContent === "" &&
            cells[c].textContent === "O"
        ) {
            return b;
        }

        if (
            cells[a].textContent === "" &&
            cells[b].textContent === "O" &&
            cells[c].textContent === "O"
        ) {
            return a;
        }
    }

    return undefined;
}


/* FIND A MOVE TO BLOCK X */

function findBlockingMove() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            cells[a].textContent === "X" &&
            cells[b].textContent === "X" &&
            cells[c].textContent === ""
        ) {
            return c;
        }

        if (
            cells[a].textContent === "X" &&
            cells[b].textContent === "" &&
            cells[c].textContent === "X"
        ) {
            return b;
        }

        if (
            cells[a].textContent === "" &&
            cells[b].textContent === "X" &&
            cells[c].textContent === "X"
        ) {
            return a;
        }
    }

    return undefined;
}


/* COMPUTER MOVE */

function computerMove() {

    if (gameOver) {
        return;
    }


    /* 1. TRY TO WIN */

    const winningMove = findWinningMove();

    if (winningMove !== undefined) {

        cells[winningMove].textContent = "O";

    } else {

        /* 2. BLOCK X */

        const blockingMove = findBlockingMove();

        if (blockingMove !== undefined) {

            cells[blockingMove].textContent = "O";

        } else {

            /* 3. TAKE CENTER */

            if (cells[4].textContent === "") {

                cells[4].textContent = "O";

            } else {

                /* 4. TAKE A CORNER */

                const corners = [0, 2, 6, 8];

                const emptyCorners = corners.filter(function (index) {
                    return cells[index].textContent === "";
                });

                if (emptyCorners.length > 0) {

                    const randomCorner = emptyCorners[
                        Math.floor(Math.random() * emptyCorners.length)
                    ];

                    cells[randomCorner].textContent = "O";

                } else {

                    /* 5. TAKE A SIDE */

                    const sides = [1, 3, 5, 7];

                    const emptySides = sides.filter(function (index) {
                        return cells[index].textContent === "";
                    });

                    if (emptySides.length > 0) {

                        const randomSide = emptySides[
                            Math.floor(Math.random() * emptySides.length)
                        ];

                        cells[randomSide].textContent = "O";
                    }
                }
            }
        }
    }


    /* CHECK COMPUTER'S MOVE */

    const result = checkWinner();

    if (result) {

        oScore++;

        updateScoreDisplay();

        gameStatus.textContent = playerOName + " Wins!";

        result.combination.forEach(function (index) {
            cells[index].classList.add("winning-cell");
        });

        gameOver = true;

        setTimeout(function () {

            if (checkMatchOver()) {

                resultTitle.textContent = playerOName + " Wins!";
                resultMessage.textContent = "What a game!";

                cells.forEach(function (cell) {
                    cell.classList.remove("winning-cell");
                });

                resultOverlay.style.display = "flex";

                return;
            }

            resetRound();

        }, 2000);

        return;
    }


    /* CHECK COMPUTER DRAW */

    if (checkDraw()) {

        drawScore++;

        updateScoreDisplay();

        gameOver = true;

        gameStatus.textContent = "It's a Draw!";

        setTimeout(function () {
            resetRound();
        }, 2000);

        return;
    }


    /* RETURN TO PLAYER */

    currentPlayer = "X";

    gameStatus.textContent = playerXName + "'s Turn";
}


/* BOARD CLICK */

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        if (gameOver) {
            return;
        }

        if (cell.textContent !== "") {
            return;
        }

        /* STOP HUMAN FROM CLICKING DURING COMPUTER'S TURN */

        if (gameMode === "1player" && currentPlayer === "O") {
            return;
        }


        cell.textContent = currentPlayer;


        const result = checkWinner();


        /* HUMAN WIN */

        if (result) {

            if (result.winner === "X") {
                xScore++;
            } else {
                oScore++;
            }

            gameOver = true;

            updateScoreDisplay();

           if (result.winner === "X") {
                gameStatus.textContent = playerXName + " Wins!";
            } else {
                gameStatus.textContent = playerOName + " Wins!";
            }


            result.combination.forEach(function (index) {
                cells[index].classList.add("winning-cell");
            });


            setTimeout(function () {

                if (checkMatchOver()) {

                    if (xScore > oScore) {

                        resultTitle.textContent = playerXName + " Wins!";
                        resultMessage.textContent = "What a game!";

                    } else if (oScore > xScore) {

                        resultTitle.textContent = playerOName + " Wins!";
                        resultMessage.textContent = "What a game!";
                    }


                    cells.forEach(function (cell) {
                        cell.classList.remove("winning-cell");
                    });


                    resultOverlay.style.display = "flex";

                    return;
                }


                resetRound();

            }, 2000);

            return;
        }


        /* HUMAN DRAW */

        if (checkDraw()) {

            drawScore++;

            updateScoreDisplay();

            gameOver = true;

            gameStatus.textContent = "It's a Draw!";

            setTimeout(function () {
                resetRound();
            }, 2000);

            return;
        }


        /* CHANGE PLAYER */

        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }


       if (currentPlayer === "X") {
          gameStatus.textContent = playerXName + "'s Turn";
        } else {
           gameStatus.textContent = playerOName + "'s Turn";
        }


        /* COMPUTER'S TURN */

        if (gameMode === "1player" && currentPlayer === "O") {

            setTimeout(function () {
                computerMove();
            }, 700);
        }

    });
});


/* PLAY AGAIN */

playAgainButton.addEventListener("click", function () {
    resetGame();
});


/* RESET GAME */

resetGameButton.addEventListener("click", function () {
    resetGame();
});