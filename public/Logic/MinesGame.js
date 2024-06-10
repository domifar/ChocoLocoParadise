const gameMessage = document.getElementById('gameMessage')
const minecountInput = document.getElementById('minecountInput')
const betInput = document.getElementById('moneyInput')
const startButton = document.getElementById('startButton')
const minBetButton = document.getElementById('minBetButton')
const maxBetButton = document.getElementById('maxBetButton')
const CurrentPayout = document.getElementById('CurrentPayout')
const overlay = document.getElementById('keepOnGambling')
let field = document.getElementById('field')
let failedTimes = 0
let buttonToggle = true
let maxBet = 0
const minBet = 1

const handleClick = (event) => {
  var element = document.getElementById(event.target.id)

  fetch(url + '/minetap/' + event.target.id)
  .then((response) => response.json())
  .then((data) => {
    if(data.content == 'mine') {
      element.classList.add('pulseMid')
      setTimeout(() => {
        element.classList.remove('pulseMid')
        event.target.src = '../assets/mine.png'
        getUserData()
        print('gameMessageFail', 'Chili getroffen, Spiel vorbei!')
        startButton.innerHTML = 'Spiel starten'
        CurrentPayout.style.visibility = 'hidden'
        printFullBoard(data.board)
      }, 1000)
      gambleImage()
      buttonToggle = !buttonToggle
    }else if(data.content == 'schoko'  || data.content == 'finish') {
      element.classList.add('pulseMid')
      setTimeout(() => {
        element.classList.remove('pulseMid')
        event.target.src = '../assets/Coin.png'
        if(data.content == 'schoko') {
          CurrentPayout.style.visibility = 'visible'
          document.getElementById('payout').innerHTML = data.potentialTake + '<img style="width:4vh; height:4vh;" src="../assets/Coin.png" alt="Coin"> ( ' + data.multiplyer + 'x )'
        }
      }, 1000)
    }
    if(data.content == 'finish') {
      setTimeout(() => {
        print('gameMessageSuccess', data.multiplyer + 'x | ' + data.potentialTake + ' <img style="width:2.2vh; height:2.2vh;" src="../assets/Coin.png" alt="Coin">')
          getUserData()
          startButton.innerHTML = 'Spiel starten'
          CurrentPayout.style.visibility = 'hidden'
          buttonToggle = !buttonToggle
          failedTimes = 0
          overlay.style.opacity = 0
          printFullBoard(data.board)
      }, 1000)
    }
  })
}

const mainButton = () => {
  if(buttonToggle) {
    newGame()
    minBetButton.disabled = true
    maxBetButton.disabled = true
  }else {
    cashOut()
    minBetButton.disabled = false
    maxBetButton.disabled = false
  }
}

const gambleImage = () => {
  failedTimes++
  if(failedTimes >= 2) {
    setTimeout(() => {
      overlay.style.opacity = 1
    }, 1000)
  }
}

const setMinBet = async() => {
  betInput.value = minBet
}

const setMaxBet = async() => {
  fetch(url + '/getmoney')
  .then(response => response.json())
  .then(data => {
    maxBet = data.currentMoney
    betInput.value = maxBet
    if(betInput.value == 0) {
      print('gameMessageFail', 'Zu wenig Geld!')
    }
  })
}

const newGame = () => {
  if(minecountInput.value == '' || betInput.value == '') {
    print('gameMessageNormal', 'Nicht alle Felder ausgefüllt!')
  }else {
    fetch(url + '/newminefield/' + minecountInput.value + '/' + betInput.value)
    .then((response) => response.json())
    .then((data) => {
      if(data.messageMine == 'noMine' || data.messageBet == 'noBet') {
        print('gameMessageFail', 'Melden Sie sich bitte vorher an!')
      }else if(data.messageBet == -1) {
        print('gameMessageFail', 'Zu wenig Geld um ein Spiel zu starten, Mindestbetrag: 1!')
      }else {
        minecountInput.value = data.messageMine
        betInput.value = data.messageBet
        startButton.innerHTML = 'Auszahlen'
        resetBoard()
        pulseStart()
        buttonToggle = !buttonToggle
      }
    })
    print('', '')
  }
}

const cashOut = () => {
  fetch(url + '/minescashout')
  .then((response) => response.json())
  .then((data) => {
    print('gameMessageSuccess', data.multiplyer + 'x | ' + data.wonmoney.toFixed(2) + '<img style="width:2.2vh; height:2.2vh;" src="../assets/Coin.png" alt="Coin">')
    getUserData()
    startButton.innerHTML = 'Spiel starten'
    CurrentPayout.style.visibility = 'hidden'
    buttonToggle = !buttonToggle
    failedTimes = 0
    overlay.style.opacity = 0
    printFullBoard(data.board)
  })
}

const print = (status, message) => {
  gameMessage.classList = status
  gameMessage.innerHTML = message
  setTimeout(() => {
    gameMessage.classList = ''
    gameMessage.innerHTML = ''
  }, 5000);
}

const printFullBoard = (board) => {
  var cells = document.getElementsByClassName('cell')
  let k = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if(cells[k].src == url +  '/assets/closedMine.png') {
        let source
        if(board[i][j] == 'mine') {
          source = '../assets/mine.png'
        }else {
          source = '../assets/Coin.png'
        }
        cells[k].src = source
        cells[k].style.filter = 'brightness(30%)'
      }
      k++
    }
  }
}

const resetBoard = () => {
  field.innerHTML = ''
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        let cell = document.createElement('img')
        cell.src = '../assets/closedMine.png'
        cell.className = 'cell'
        cell.addEventListener('click', handleClick)
        cell.id = `${i}${j}`
        field.appendChild(cell)
    }
  }
}

const pulseStart = () => {
  var elements = document.getElementsByClassName('cell')
  for(var i = 0; i < elements.length; i++) {
      elements[i].classList.add('pulseStart')
  }
  setTimeout(function() {
      for(var i = 0; i < elements.length; i++) {
          elements[i].classList.remove('pulseStart')
      }
  }, 500)
}

//wird sofort ausgeführt
resetBoard()

document.addEventListener('DOMContentLoaded', function() {
  fetch(url + '/resetMinesBoard')
  .then((response => response.json()))
  .then((data) => {
    if(data == 'fail') {
      console.error('failed to reset old mineboard')
    }
  })
})