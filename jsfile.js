// Create the gameboard factory function
function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = []

    // Create 2d gameboard with 3row and 3 column
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }


    // Method to return the board
    const getBoard = () => board;

    // To Mark the X or O of each player
    const markXO = (row, col, player) => {
        const cell = board[row][col];
        if(cell.getValue() === ""){
            cell.addToken(player)
        }else{
            console.log("Cell already occupied")
        }

    }

    // Print the board on console
    const printBoard = () => {
        const boardwithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardwithCellValues)
    }

 
    return{ getBoard, printBoard, markXO}
}

// create each cell 
function Cell(){
    let value = "";

    // Accept the player mark to change the value of the cell
    const addToken = (player) =>{
        value = player;
    };

    // Retrive the mark of the player
    const getValue = () => value;

    return{
        addToken,
        getValue
    };
}


// Control the flow of the game and state of the game
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    const players = [
        { name: playerOneName, mark: "X" },
        { name: playerTwoName, mark: "O" }
    ];

    let activePlayer = players[0];
    let lastResult = null;
    let isGameOver = false; // Flag to track game state

    const switchPlayerTurn = () => {
        if (!isGameOver) {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        }
    };

    const checkResult = () => {
        const boardMoves = board.getBoard();
        const marker = activePlayer.mark;

        const returnBoard = () => {
            document.querySelector('.board').classList.add("board-finished");
        };

        // Check rows, columns, and diagonals
        for (let i = 0; i < 3; i++) {
            if (
                boardMoves[i][0].getValue() === marker &&
                boardMoves[i][1].getValue() === marker &&
                boardMoves[i][2].getValue() === marker
            ) {
                returnBoard();
                isGameOver = true; // Set game over
                return `${activePlayer.name} Wins`;
            }

            if (
                boardMoves[0][i].getValue() === marker &&
                boardMoves[1][i].getValue() === marker &&
                boardMoves[2][i].getValue() === marker
            ) {
                returnBoard();
                isGameOver = true; // Set game over
                return `${activePlayer.name} Wins`;
            }
        }

        if (
            boardMoves[0][0].getValue() === marker &&
            boardMoves[1][1].getValue() === marker &&
            boardMoves[2][2].getValue() === marker
        ) {
            returnBoard();
            isGameOver = true;
            return `${activePlayer.name} Wins`;
        }

        if (
            boardMoves[0][2].getValue() === marker &&
            boardMoves[1][1].getValue() === marker &&
            boardMoves[2][0].getValue() === marker
        ) {
            returnBoard();
            isGameOver = true;
            return `${activePlayer.name} Wins`;
        }

        // Check for draw
        if (boardMoves.flat().every(cell => cell.getValue() !== "")) {
            isGameOver = true;
            return "Draw, Let's rematch!";
        }

        return null; // No result yet
    };

    const playRound = (row, col) => {
        if (isGameOver) return; // Prevent moves if game is over

        const ground = board.getBoard();
        if (ground[row][col].getValue() !== "") {
            alert("Try another move");
            return;
        }

        board.markXO(row, col, getActivePlayer().mark);
        lastResult = checkResult();
        if (lastResult) {
            console.log(lastResult);
            return;
        } else {
            switchPlayerTurn();
        }
    };

    const getResult = () => lastResult;
    const getActivePlayer = () => activePlayer;

    return { getBoard: board.getBoard, playRound, getActivePlayer, getResult };
}

function ScreenController() {
    const game = GameController();
    const playTurnHolder = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = ""; // Clear the board display

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const result = game.getResult();

        if (result) {
            playTurnHolder.textContent = result; // Show result
        } else {
            playTurnHolder.textContent = `${activePlayer.name}'s turn...`; // Show active player's turn
        }

        // Render board cells
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = row;
                cellButton.dataset.column = col;

                const cellValue = board[row][col].getValue();
                cellButton.textContent = cellValue;

                if (cellValue === "X") {
                    cellButton.classList.add("cell-x");
                } else if (cellValue === "O") {
                    cellButton.classList.add("cell-o");
                }

                boardDiv.appendChild(cellButton);
            }
        }
    };

    boardDiv.addEventListener("click", (e) => {
        const row = e.target.dataset.row;
        const col = e.target.dataset.column;

        if (row !== undefined && col !== undefined) {
            game.playRound(parseInt(row), parseInt(col));
            updateScreen();
        }
    });

    updateScreen();
}


function triggerFunction() {
    let gameInstance = null;
   


    function startGame() {
        const playerOneName = document.getElementById('playerOne').value.trim();
        const playerTwoName = document.getElementById('playerTwo').value.trim();

        restartGame();
        document.querySelector(".playerOneName").textContent = `: ${playerOneName}`;
        document.querySelector(".playerTwoName").textContent = `: ${playerTwoName}`;

        gameInstance = ScreenController();
    }

    function restartGame() {
        const boardDiv = document.querySelector('.board');
        boardDiv.textContent = ''; // Clear board
        gameInstance = null; // Reset game instance
    }

    document.querySelector('#startButton').addEventListener("click", startGame);
    document.querySelector('#resetButton').addEventListener("click", restartGame);


}

triggerFunction();


const html = document.documentElement;
const toggle = document.querySelector(".switch");

toggle.addEventListener("click", () => {
    if (toggle.checked) {
        html.style.setProperty("color-scheme", "dark");
    } else {
        html.style.setProperty("color-scheme", "light");
    }
});


