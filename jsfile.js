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
        if(cell.getValue() === 0){
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
    let value = 0;

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
function GameController(playerOneName = "Player One", playerTwoName = "Player Two"){
    const board = Gameboard()

    
    const players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name : playerTwoName,
            mark: "O"   
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    // Get the active player
    const getActivePlayer = () => activePlayer;

    // Print the board
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const checkResult = () => {
        let boardMoves = board.getBoard;
        let marker = activePlayer.mark;
        const winningMoves = [
        [
            [marker,marker,marker],
            [0,0,0],
            [0,0,0]
        ],
        [
            [marker,0,0],
            [0,marker,0],
            [0,0,marker]
        ],
        [
            [0,marker,0],
            [0,marker,0],
            [0,marker,0]
        ],
        [
            [marker,0,0],
            [marker,0,0],
            [marker,0,0]
        ],
        [
            [0,0,marker],
            [0,0,marker],
            [0,0,marker]
        ],
        [
            [0,0,marker],
            [0,marker,0],
            [marker,0,0]
        ],
        [
            [0,0,0],
            [marker,marker,marker],
            [0,0,0]
        ],
         [
            [0,0,0],
            [0,0,0],
            [marker,marker,marker]
        ]
    ]

    // Check winning postions with board poistion
    for(let i = 0; i < winningMoves.length; i++){
        if(winningMoves[i] === boardMoves){
            console.log(`Winner is ${activePlayer.name}`)
        }
    }
}
    


    const playRound = (row,col) =>{
        // if the cell in occupied
        checkResult();
        const ground = board.getBoard()
        if(ground[row][col].getValue() !== 0){
            console.log("Try another move")
            return;
        }
        board.markXO(row,col,getActivePlayer().mark);
        switchPlayerTurn()
        printNewRound()
    }

    // Initizilze the play
    printNewRound();


    return {
        getBoard : board.getBoard,
        playRound,
        getActivePlayer
    };
}

function ScreenController() {
    const game = GameController();
    const playTurnHolder = document.querySelector(".turn");
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = ""; // Clear the board display

        // Get the board and active player
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display the player's turn
        playTurnHolder.textContent = `${activePlayer.name}'s turn...`;

        // Render the squares to create the board
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = row;
                cellButton.dataset.column = col;
                cellButton.textContent = board[row][col].getValue(); // Display the cell value

                boardDiv.appendChild(cellButton);
            }
        }
    };

    // Event listener for board clicks
    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (selectedColumn === undefined || selectedRow === undefined) return; // Ensure a valid click

        game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen(); // Initial screen update
}

ScreenController();