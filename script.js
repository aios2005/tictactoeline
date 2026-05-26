const boardElement = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const turnElement = document.getElementById('player-turn');
const resetBtn = document.getElementById('reset-btn');

//stategame
let board = ["","","","","","","","",""];
let currentPlayer = "X";
let isGameActive = true;


const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8], //linhas
    [0,3,6], [1,4,7], [2,5,8], //colunas
    [0,4,8], [2,4,6]           //diagonais
];

//chamada a cada click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    //se a casa ja foi clicada ou game over, ignora
    if (board[clickedCellIndex] !== "" || !isGameActive){
        return;
    }

    //update a cada click
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        document.getElementById('status').innerHTML = `Jogador <span style="color: ${currentPlayer === 'X' ? '#ff2e63' : '#00adb5'}">${currentPlayer}</span> Venceu! ;D`;
        isGameActive = false;
        return;
    }

    // Se nao ha espaços vazios e ninguem ganhou, eh empate
    if (!board.includes("")) {
        document.getElementById('status').textContent = "O jogo empatou!";
        isGameActive = false;
        return;
    }

    // Alterna o turno
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnElement.textContent = currentPlayer;
}

//reset
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    turnElement.textContent = currentPlayer;
    document.getElementById('status').innerHTML = `Turno do jogador: <span id="player-turn">X</span>`;
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('X', 'O');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);