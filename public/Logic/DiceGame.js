var mode = 'over';
var rotation = 0;

function toggleMode() {
  mode = mode == 'over' ? 'under' : 'over';
  document.getElementById('modeButton').textContent = mode;
  updateBar();
}

function updateBar() {
  var bet = document.getElementById('bet').value;
  
  if (mode == 'over') {
    document.getElementById('winBar').style.width = (100 - bet) + '%';
    document.getElementById('winBar').style.left = bet + '%';
    document.getElementById('loseBar').style.width = bet + '%';
    document.getElementById('loseBar').style.left = '0';
  } else {
    document.getElementById('loseBar').style.width = (100 - bet) + '%';
    document.getElementById('loseBar').style.left = bet + '%';
    document.getElementById('winBar').style.width = bet + '%';
    document.getElementById('winBar').style.left = '0';
  }
}

function playGame() {
  var bet = document.getElementById('bet').value;
  var dice = Math.floor(Math.random() * 100) + 1;
  
  document.getElementById('dice').textContent = dice;
  document.getElementById('diceMarker').style.left = dice + '%';
  rotation += 360;
  document.getElementById('diceMarker').style.transform = 'rotate(' + rotation + 'deg)';
  
  if ((mode == 'over' && dice > bet) || (mode == 'under' && dice < bet)) {
    document.getElementById('result').textContent = 'Sie haben gewonnen!';
    document.getElementById('result').style.color = 'green';
  } else {
    document.getElementById('result').textContent = 'Sie haben verloren. Versuchen Sie es erneut!';
    document.getElementById('result').style.color = 'red';
  }
}