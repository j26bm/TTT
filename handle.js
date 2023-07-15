// ==================== CONSTANTS ==================== //
const STATUS_DISPLAY = document.querySelector('.game-notification');
const GAME_STATE = ["", "", "", "", "", "", "", "", ""];
// console.log(GAME_STATE);

const WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
// console.log("hola = " + WINNINGS[0]);

const WIN_MESSAGE = () => `El jugador ${currentPlayer} ha ganado!`;
const DRAW_MESSAGE = `El juego ha terminado en empate!`;
const CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPlayer}`;

// ==================== VARIABLES ==================== //
let gameActive = true, currentPlayer = "O"





// ==================== FUNCTIONS ==================== //
// =================================================== //
function main() {
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  listeners()
}



function listeners() {
  document.querySelector('.game-container').addEventListener('click', handleCellClick)
  document.querySelector('.game-restart').addEventListener('click', handleRestartGame)
}



function handleStatusDisplay(message) {
  STATUS_DISPLAY.innerHTML = message
}



// Funcion de GAME RESTART
function handleRestartGame() {
  gameActive = true
  currentPlayer = "X"
  restartGameState()
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = "")
}



// Funcion de GAME CONTAINER
function handleCellClick(para /** Type Event **/) {
  const clickedCell = para.target
  // console.log(clickedCell)

  if (clickedCell.classList.contains('game-cell')) {
    // console.log(clickedCell.parentNode.children)

    
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    // console.log("que es = " + clickedCellIndex)

    // console.log(gameActive)
    if (GAME_STATE[clickedCellIndex] !== '' || !gameActive) {
      return false
    }

    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation()
  }
}



// Almacenar datos en el arreglo de la tabla
function handleCellPlayed(clickedCell /** object HTML **/, clickedCellIndex) {
  GAME_STATE[clickedCellIndex] = currentPlayer // Agrega en la posición correspondiente el valor ya sea "X" u "O" en el estado actual del juego
  clickedCell.innerHTML = currentPlayer // Agrega en el HTML el valor del jugador
}



// 
function handleResultValidation() {
  let roundWon = false
  // const WINNINGS = [
  //   WINNINGS[0] = [0, 1, 2],
  //   WINNINGS[1] = [3, 4, 5],
  //   WINNINGS[2] = [6, 7, 8],
  //   WINNINGS[3] = [0, 3, 6],
  //   WINNINGS[4] = [1, 4, 7],
  //   WINNINGS[5] = [2, 5, 8],
  //   WINNINGS[6] = [0, 4, 8],
  //   WINNINGS[7] = [2, 4, 6]
  // ];

  for (let i = 0; i < WINNINGS.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
    const winCondition = WINNINGS[i] // Guarda la combinación por ejemplo: [0, 1, 2]


    console.log("Posicion Cero de WINNINGS [" + [i] + "] = "+ winCondition[0])
    console.log("Posicion Uno de WINNINGS [" + [i] + "] = "+ winCondition[1])
    console.log("Posicion Dos de WINNINGS [" + [i] + "] = "+ winCondition[2])

    console.log("GAME_STATE 0 = " + GAME_STATE[0]) // click en index 0 of Table
    console.log("GAME_STATE 1 = " + GAME_STATE[1]) // 
    console.log("GAME_STATE 2 = " + GAME_STATE[2]) // a 
    console.log("GAME_STATE 3 = " + GAME_STATE[3]) 
    console.log("GAME_STATE 4 = " + GAME_STATE[4]) // a
    console.log("GAME_STATE 5 = " + GAME_STATE[5])
    console.log("GAME_STATE 6 = " + GAME_STATE[6]) // a
    console.log("GAME_STATE 7 = " + GAME_STATE[7])
    console.log("GAME_STATE 8 = " + GAME_STATE[8])

    let position1 = GAME_STATE[winCondition[0]],
      position2 = GAME_STATE[winCondition[1]],
      position3 = GAME_STATE[winCondition[2]] // Almacena el valor del estado actual del juego según las posiciones de winCondition

      console.log("posicion 1 = "+position1); // O
      console.log("posicion 2 = "+position2); // O
      console.log("posicion 3 = "+position3); // O

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; // Si hay algún valor vacio nadie ha ganado aún
    }
    

    if (position1 === position2 && position2 === position3) {
      roundWon = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
      break
    }
  }

  if (roundWon) {
    handleStatusDisplay(WIN_MESSAGE())
    gameActive = false
    return
  }

  let roundDraw = !GAME_STATE.includes("") // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
  
  console.log("¿Está lleno la tabla? = " + roundDraw)
  
  if (roundDraw) {
    handleStatusDisplay(DRAW_MESSAGE)
    gameActive = false
    return
  }

  handlePlayerChange()
}



function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  console.log("Ahora Toca = " + currentPlayer)
  
  handleStatusDisplay(CURRENT_PLAYER_TURN())
}



function restartGameState() {
  let i = GAME_STATE.length
  // console.log("tabla antes = " + GAME_STATE)

  while (i--) {
    // console.log("entre xd")
    GAME_STATE[i] = ''
    // console.log("tabla despues = " + GAME_STATE)
  }
}



main()


