var mode = 'Darüber'
var rotation = 0

function toggleMode() {
  mode = mode == 'Darüber' ? 'Darunter' : 'Darüber'
  document.getElementById('modeButton').textContent = mode
  updateBar()
}

function updateBar() {
  var inputRange = document.getElementById('inputRange').value
  
  if (mode == 'Darüber') {
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

function playGame() {
  var inputRange = document.getElementById('inputRange').value
  var dice = Math.floor(Math.random() * 100) + 1
  
  document.getElementById('dice').textContent = dice
  document.getElementById('diceMarker').style.left = dice + '%'
  rotation += 360
  document.getElementById('diceMarker').style.transform = 'rotate(' + rotation + 'deg)'
  
  if ((mode == 'Darüber' && dice > inputRange) || (mode == 'Darunter' && dice < inputRange)) {
    document.getElementById('result').textContent = 'Sie haben gewonnen!'
    document.getElementById('result').style.color = 'green'
  } else {
    document.getElementById('result').textContent = 'Sie haben verloren. Versuchen Sie es erneut!'
    document.getElementById('result').style.color = 'red'
  }
}

updateBar()