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
    let lastResult = null;

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

    const checkResult = () =>{
        const boardMoves = board.getBoard();
        const marker = activePlayer.mark;


        // Checks rows
        for(let i = 0; i < 3; i++){
            if(boardMoves[i][0].getValue() === marker &&
               boardMoves[i][1].getValue() === marker &&
               boardMoves[i][2].getValue() === marker){
                return `${activePlayer.name} Win`
               }
        }

        // Checks column
        for(let i = 0; i < 3; i++){
             if(boardMoves[0][i].getValue() === marker &&
               boardMoves[1][i].getValue() === marker &&
               boardMoves[2][i].getValue() === marker){
                return `${activePlayer.name} Win`
               }
        }

        // Check diagonals
         if (boardMoves[0][0].getValue() === marker &&
        boardMoves[1][1].getValue() === marker &&
        boardMoves[2][2].getValue() === marker) {
        return `${activePlayer.name} Wins`;
        }

        if (boardMoves[0][2].getValue() === marker &&
            boardMoves[1][1].getValue() === marker &&
            boardMoves[2][0].getValue() === marker) {
            return `${activePlayer.name} Wins`;
        }

        // Return No winner yet
        return null;

    }
    


    const playRound = (row,col) =>{
        // if the cell in occupied
        const ground = board.getBoard()
        if(ground[row][col].getValue() !== ""){
            console.log("Try another move")
            return;
        }
        // Ma
        board.markXO(row,col,getActivePlayer().mark);

        // Check the result
        lastResult = checkResult();
        if(lastResult){
            console.log(lastResult)
            return;
        }else{
            switchPlayerTurn()
            printNewRound()
        }
        
    }

    const getResult = () => lastResult;

    // Initizilze the play
    printNewRound();


    return {
        getBoard : board.getBoard,
        playRound,
        getActivePlayer,
        getResult
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

        
        let result = game.getResult();
        if(result){
            playTurnHolder.textContent = result;
            return;
        }else{    
            // Display the player's turn
            playTurnHolder.textContent = `${activePlayer.name}'s turn...`;
        }


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

    // Get the result 
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