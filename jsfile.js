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


    const playRound = (row,col) =>{

        board.markXO(row,col,getActivePlayer().mark);
        switchPlayerTurn()
        printNewRound()
    }

    // Initizilze the play
    printNewRound();


    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();