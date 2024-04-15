let loggedInUser = ''
const getButton = document.getElementById('getButton')

fetch('http://localhost:3000/user')
  .then(response => response.json())
  .then((data) => {
    if(data.text == 'fail') {
        loggedInUser = 'fail'
    }
    else{
      loggedInUser = data.username
    }
})

fetch(url + '/rewardstatus')
  .then(response => response.json())
  .then((data) => {
    if(data.lastreward == 'noReward') {
      getButton.innerHTML = 'Anmelden, um abzuholen'
    }
    else{
      const nowDate = new Date()
      const lastrewardDate = new Date(data.lastreward)
      if(lastrewardDate.getHours < nowDate.getHours) {
        getButton.innerHTML = 'Abholen'
      } else if (nowDate.getMinutes() > lastrewardDate.getMinutes() + 10){
        getButton.innerHTML = 'Abholen'
      }else {
        var minutes = -(nowDate.getMinutes() - (lastrewardDate.getMinutes() + 10))
        var seconds = nowDate.getSeconds() - lastrewardDate.getSeconds()

        function countdown() {
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            getButton.innerHTML = minutes + ':' + seconds
            if (minutes == 0 && seconds == '00') {
                clearInterval(interval)
                getButton.innerHTML = 'Abholen'
            }
            if (seconds == '00') {
                minutes--
                seconds = 59
            } else {
                seconds--
            }
        }
        let interval = setInterval(countdown, 1000)
      }
      // console.log("now " + nowDate + "\n\nlastreward " + lastrewardDate)
    }
  }
  )

const addMoney = () => {
  const rewardMessage = document.getElementById('rewardMessage')
   
  if(loggedInUser != 'fail') {
    fetch(url + '/rewards')
    .then(response => response.json())
    .then((data) => {
      if(data.message == 'worked') {
        rewardMessage.classList = 'rewardSuccess'
        rewardMessage.innerHTML = '100 <img id="coinImage" class="coinImage" src="../assets/Coin.png" alt=""> zu Ihrem Konto hinzugefügt!'
        getButton.innerHTML = "Abgeholt"
      }else {
        rewardMessage.classList = 'rewardFail'
        rewardMessage.innerHTML = 'Belohnung noch nicht bereit!'
      }
    })
  }
  else{
    rewardMessage.classList = 'rewardFail'
    rewardMessage.innerHTML = 'Niemand Angemeldet!'
  }
}