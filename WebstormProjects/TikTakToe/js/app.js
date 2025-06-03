const ClassesNames = {
    cell: ".cell",
    resetButton: ".reset-button",
    score: (symbol) => `${symbol}-score`,
    cellSymbol: (symbol) => `${symbol}-cell`,
}
const States = {
    X: "X",
    O: "O",
    EMPTY: "",
};

const WinTypes = {
    vertical: "win1",
    horizontal: "win2",
    diagonal: "win3",
    diagonal2: "win4",
}

const Players = {
    Player1: {
        name: "Player 1",
        symbol: States.X,
        score: 0
    },
    Player2: {
        name: "Player 2",
        symbol: States.O,
        score: 0,
    },
}

const winningCombinations = [
    {
        combination: [0, 1, 2],
        type: WinTypes.horizontal,
    },
    {
        combination: [3, 4, 5],
        type: WinTypes.horizontal,
    },
    {
        combination: [6, 7, 8],
        type: WinTypes.horizontal,
    },
    {
        combination: [0, 3, 6],
        type: WinTypes.vertical,
    },
    {
        combination: [1, 4, 7],
        type: WinTypes.vertical,
    },
    {
        combination: [2, 5, 8],
        type: WinTypes.vertical,
    },
    {
        combination: [0, 4, 8],
        type: WinTypes.diagonal,
    },
    {
        combination: [2, 4, 6],
        type: WinTypes.diagonal2,
    },
];

const GameState = {
    board: Array(9).fill(States.EMPTY),
    currentPlayer: Players.Player1,
};

const cells = document.querySelectorAll(ClassesNames.cell);

const resetButton = document.querySelector(ClassesNames.resetButton);

const togglePlayer = () => {
    if (GameState.currentPlayer === Players.Player1) {
        GameState.currentPlayer = Players.Player2;
        return;
    }
    if (GameState.currentPlayer === Players.Player2) {
        GameState.currentPlayer = Players.Player1;
        return;
    }
    throw new Error(`No player with name ${player}`);
}

const handleReset = () => {
    cells.forEach((cell) => {
        cell.innerText = States.EMPTY;
        cell.className = "cell";
    });
    GameState.board.fill(States.EMPTY);
}

const isCellEmpty = (index) => {
    return GameState.board[index] === States.EMPTY;
}

const checkWinState = () => {
   return winningCombinations.find(({combination, type}) => {
        const [a, b, c] = combination;
        const board = GameState.board;
        if (board[a] !== States.EMPTY && board[a] === board[b] && board[b] === board[c]) {
           const cellA =  document.querySelector(`[data-index="${a}"]`);
           const cellB = document.querySelector(`[data-index="${b}"]`);
           const cellC = document.querySelector(`[data-index="${c}"]`);

           cellA.classList.add(type);
           cellB.classList.add(type);
           cellC.classList.add(type);
           return true;
        }
        return false;
    });
};

const isDraw = () => {
    return !GameState.board.includes(States.EMPTY);
}

const updateCell = (index) => {
    const cell = document.querySelector(`[data-index="${index}"]`);
    GameState.board[index] = GameState.currentPlayer.symbol
    cell.classList.add(ClassesNames.cellSymbol(GameState.currentPlayer.symbol));

    cell.innerText = GameState.currentPlayer.symbol;
}

const increaseScore = () => {
    GameState.currentPlayer.score += 1;
    const scoreElement = document.querySelector(ClassesNames.score(GameState.currentPlayer.symbol));
    scoreElement.innerText = GameState.currentPlayer.score;
}

const handleCellClick = (e) => {
    const index = e.target.dataset.index;

    if (!isCellEmpty(index)) {
        return null
    }

    if (checkWinState()) {
        return;
    }

    updateCell(index);

    if (checkWinState()) {
        alert(`${GameState.currentPlayer.name} wins!`);
        increaseScore();
    }

    if (isDraw(index)) {
        alert(`Its a draw!`);
    }

    togglePlayer();
}

cells.forEach((cell) =>
    cell.addEventListener("click", handleCellClick)
);

resetButton.addEventListener("click", handleReset);
