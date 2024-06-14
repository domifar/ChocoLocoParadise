let gameMessage = document.getElementById('gameMessage')
let playButton = document.getElementById('playButton')
let betInput = document.getElementById('bet')
let mode = 'over'
let rotation = 0
let maxBet = 0
const minBet = 1

const toggleMode = () => {
  mode = mode == 'over' ? 'under' : 'over'
  document.getElementById('modeButton').textContent = mode == 'over' ? 'Darüber' : 'Darunter'
  updateBar()
}

const print = (status, message) => {
  gameMessage.classList = status
  gameMessage.innerHTML = message
  setTimeout(() => {
    gameMessage.classList = ''
    gameMessage.innerHTML = ''
  }, 5000);
}

const updateBar = () => {
  let inputRange = document.getElementById('inputRange').value
  
  if(inputRange > 99) {
    inputRange = 99
    print('gameMessageFail', 'Maximale Range 99!')
    playButton.disabled = true
  } else if(inputRange < 1) {
    inputRange = 1
    print('gameMessageFail', 'Minimale Range 1!')
    playButton.disabled = true
  } else {
    playButton.disabled = false
  }

  if (mode == 'over') {
    document.getElementById('winBar').style.width = (100 - inputRange) + '%'
    document.getElementById('winBar').style.left = inputRange + '%'
    document.getElementById('loseBar').style.width = inputRange + '%'
    document.getElementById('loseBar').style.left = '0'
  } else {
    document.getElementById('loseBar').style.width = (100 - inputRange) + '%'
    document.getElementById('loseBar').style.left = inputRange + '%'
    document.getElementById('winBar').style.width = inputRange + '%'
    document.getElementById('winBar').style.left = '0'
  }
}

const setMinBet = () => {
  betInput.value = minBet
}

const setMaxBet = async() => {
  fetch(url + '/getmoney')
  .then(response => response.json())
  .then(data => {
    maxBet = data.currentMoney
    betInput.value = maxBet
    if(betInput.value >= 0) {
      print('gameMessageFail', 'Zu wenig Geld!')
      playButton.disabled = true
    }
  })
}

const playGame = () => {
  const playButton = document.getElementById('playButton')
  let inputRange = document.getElementById('inputRange').value
  let dice
  playButton.disabled = true
  fetch(url + '/dice/' + document.getElementById('bet').value + '/' + inputRange + '/' + mode)
  .then(response => response.json())
  .then(data => {
    if (data.bet == 0) {
      print('gameMessageFail', 'Zu wenig Geld um ein Spiel zu starten, Mindestbetrag: 1!'); 
      playButton.disabled = true
    }else if(data.message == 'fail' || data.message == 'success') {
      rotation += 360
      dice = parseInt(data.number)
      document.getElementById('bet').value = data.bet
      document.getElementById('dice').textContent = dice
      document.getElementById('diceMarker').style.left = dice + '%'
      document.getElementById('diceMarker').style.transform = 'rotate(' + rotation + 'deg)'
      setTimeout(() => {
        playButton.disabled = false
        if(data.message == 'success') {
          print('gameMessageSuccess', data.wonmoney.toFixed(2) + '<img style="width:2.2vh; height:2.2vh;" src="../assets/Coin.png" alt="Coin">')
        } else {
          print('gameMessageFail', data.wonmoney.toFixed(2) + '<img style="width:2.2vh; height:2.2vh;" src="../assets/Coin.png" alt="Coin">')
        }
      }, 500)
    }else {
      print('gameMessageFail', 'Niemand eingeloggt!')
    }
    getUserData()
  })
}

updateBar()
document.getElementById('diceMarker').style.left = '50%'