let gameMessage = document.getElementById('gameMessage')
let mode = 'over'
let rotation = 0

const toggleMode = () => {
  mode = mode == 'over' ? 'under' : 'over'
  document.getElementById('modeButton').textContent = mode == 'over' ? 'Darüber' : 'Darunter'
  updateBar()
}

const print = (status, message) => {
  gameMessage.classList = status
  gameMessage.innerHTML = message
}

const updateBar = () => {
  let inputRange = document.getElementById('inputRange').value
  
  if(inputRange > 99) {
    inputRange = 99
  }
  else if(inputRange < 1) {
    inputRange = 1
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

const playGame = () => {
  let inputRange = document.getElementById('inputRange').value
  let dice

  fetch(url + '/dice/' + document.getElementById('bet').value + '/' + inputRange + '/' + mode)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if(data.message == 'fail'||data.message == 'success') {
      rotation += 360
      dice = parseInt(data.number)
      document.getElementById('bet').value = data.bet
      document.getElementById('dice').textContent = dice
      document.getElementById('diceMarker').style.left = dice + '%'
      document.getElementById('diceMarker').style.transform = 'rotate(' + rotation + 'deg)'
      setTimeout(() => {
        if(data.message == 'success') {
          print('gameMessageSuccess', data.wonmoney + '<img style="width:2.2vh; height:2.2vh;" src="../assets/Coin.png" alt="Coin">')
        } else {
          print('gameMessageFail', data.wonmoney + '<img style="width:2.2vh; height:2.2vh;" src="../assets/Coin.png" alt="Coin">')
        }
        getUserData()
      }, 500)
    }else {
      print('gameMessageFail', 'Niemand eingeloggt!')
    }
  })
}

updateBar()
document.getElementById('diceMarker').style.left = '50%'