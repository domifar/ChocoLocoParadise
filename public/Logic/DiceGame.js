let mode = 'over'
let rotation = 0

const toggleMode = () => {
  mode = mode == 'over' ? 'under' : 'over'
  document.getElementById('modeButton').textContent = mode == 'over' ? 'Darüber' : 'Darunter'
  updateBar()
}

const updateBar = () => {
  let inputRange = document.getElementById('inputRange').value
  
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
    if(data.message == 'success') {
      dice = parseInt(data.number)
      document.getElementById('result').innerHTML = data.wonmoney
      document.getElementById('dice').textContent = dice
      document.getElementById('diceMarker').style.left = dice + '%'
      rotation += 360
      document.getElementById('diceMarker').style.transform = 'rotate(' + rotation + 'deg)'
    }
  })

}

updateBar()
document.getElementById('diceMarker').style.left = '50%'