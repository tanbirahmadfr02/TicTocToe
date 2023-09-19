let cellElements = document.querySelectorAll('.cell');
const playerX = 'X';
const playerO = 'O';
let toggleTurn = true;
let player1 = document.querySelector(".playerX")
let player2 = document.querySelector(".playerO")
let music = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let showResult = document.querySelector(".showResult");
let result_text = document.querySelector(".result h1");
let restart = document.querySelector(".result button");
let gif = document.querySelector(".result img");
const hurray = new Audio("hurray.mp3");

let winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
cellElements.forEach(cell => {
    cell.addEventListener('click', function () {
        cell.classList.add('disable')
        let currentPlayer = toggleTurn ? playerX : playerO;
        music.play()
        addInCell(cell, currentPlayer)
        if (winnerCheck(currentPlayer)) {
            showResult.style.display = "block";
            result_text.innerText = currentPlayer + " " + "is Win";
            gif.style.display = 'block';
            hurray.play()
            music.pause();
        } else if (isDraw()) {
            gameOver.play()
            showResult.style.display = "block";
            result_text.innerText = "The Game is Draw!"
            music.pause()
        } else {
            swapPlayer()
        }
    })
})

function winnerCheck(currentPlayer) {
    return winningCondition.some(condition => {
        return condition.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerO)
    })
}

function swapPlayer() {
    toggleTurn = !toggleTurn;
    if (toggleTurn) {
        // player1.classList.add('active')
        // player2.classList.remove("active")
        player1.innerHTML = "X's turn"
    } else {
        player1.innerHTML = ("O's turn")
        // player2.classList.add('active');
        // player1.classList.remove('active');
    }
}

function addInCell(cell, currentPlayer) {
    cell.innerHTML = currentPlayer;
    cell.classList.add(currentPlayer)
}

restart.addEventListener("click", function () {
    location.reload()
})