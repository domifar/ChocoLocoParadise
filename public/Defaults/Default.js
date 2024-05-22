// const url = 'https://chocolocoparadise.onrender.com'
const url = 'http://localhost:3000'

const getUserData = () => {
  fetch(url + '/user')
  .then(response => response.json())
  .then((data) => {
    if(data.text == 'fail') {
        document.getElementById('usernameField').innerHTML = "Anmelden"
        document.getElementById('moneyField').innerHTML = ""
    }
    else{
        document.getElementById('usernameField').innerHTML = data.username
        document.getElementById('moneyField').innerHTML = data.money + ' <img height="40vh" width="40vh" id="coinImage" class="coinImage" src="../assets/Coin.png" alt="Coin">'
    }
  })
}

getUserData()